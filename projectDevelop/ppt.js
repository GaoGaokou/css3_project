var ppt = {
    $wrapper: $('.wrapper'),
    $slider: $('.slider'),
    nowIndex: 0,
    timer:undefined,
    lastIndex: undefined,
    len: $('.slider').length,
    init: function () {
        this.createDom(this.len);
        this.bindEvent();
        this.autoFuc('right');
        // this.$wrapper.mouseover(function(){
        //     clearInterval(this.timer);
        // });
        // this.$wrapper.mouseout(function(){
        //     // this.autoFuc('right');
        // })
    },
    createDom: function (len) {
        var str = '',
            strBtn = '';
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                str += '<li class="active"></li>';
            } else {
                str += '<li></li>';
            }
        }
        str = '<div class="slider-cir"><ul>' + str + '</ul></div>';
        this.$wrapper.append(str);

        //anniu
        strBtn = '<div class="slider-btn">\
                  <div class="btn-left">&lt;&lt;</div>\
                  /<div class="btn-right">&gt;&gt;</div>\
               </div>';
        this.$wrapper.append(strBtn);
    },
    bindEvent: function () {
        var _this = this;//this指向ppt;与当前点击的事件的this冲突
        $('.btn-left').add($('.btn-right')).add($('.slider-cir li')).on('click', function () {
            if ($(this).attr('class') == 'btn-left') {
                _this.getIndex('left');
            } else if ($(this).attr('class') == 'btn-right') {
                _this.getIndex('right');
            } else {
                var index = $(this).index();//获取li索引值
                _this.getIndex(index);
            }
            // console.log(_this.nowIndex);
            if (_this.lastIndex != _this.nowIndex) {
                _this.$slider.eq(_this.lastIndex).trigger('go');
                _this.$slider.eq(_this.nowIndex).trigger('come');
                _this.changeActive(_this.nowIndex);
            }
        });
        this.$slider.on('go', function () {
            $(this).fadeOut(300)//ppt淡出
                .find($('.title')).animate({ fontSize: '16px' }).end()//end()结束本层节点返回到第一层操作找到最开始的父节点this
                .find($('.img')).animate({ width: '0%' });   //退去时候文字 图片 慢慢缩小       
        });
        this.$slider.on('come', function () {
            $(this).delay(300).fadeIn(300)//在本层ppt300秒淡出之后300秒内显示下一页ppt
                .find($('.title')).delay(300).animate({ fontSize: '20px' }).end()//字体变大
                .find($('.img')).delay(300).animate({ width: '50%' });//图片也变大
        });
    },
    getIndex: function (deriction) {
        this.lastIndex = this.nowIndex;//记录当前ppt还没被更改的索引值
        if (deriction == 'left' || deriction == 'right') {
            if (deriction == 'left') {
                this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
            } else {
                this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
            }
        } else {
            this.nowIndex = deriction;
        }
    },
    //改变小圆点的样式
    changeActive: function (index) {
        $('.active').removeClass('active');
        $('li').eq(index).addClass('active');
    },
    autoFuc: function (deriction) {
        var _this=this;
        clearInterval(this.timer);
        this.timer=setInterval(function () {//定时器中this指向的是window，所以还是需要把ppt的this保存在_this中
            _this.getIndex(deriction);
            if (_this.nowIndex != _this.lastIndex) {
                _this.$slider.eq(_this.lastIndex).trigger('go');
                _this.$slider.eq(_this.nowIndex).trigger('come');
                _this.changeActive(_this.nowIndex);
            }
        }, 3000);
    }
}

ppt.init();