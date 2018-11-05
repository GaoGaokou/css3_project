// var $wrap=$(.wrapper')
var timer=setTimeout(function(){
    $('.wrapper').removeClass('init');
},200);
$('.item').click(function(){
    $(this).addClass('active');
    $('.wrapper').addClass('wrapper-active');
})
$('.close').click(function(e){
    e.stopPropagation();
    $('.wrapper').removeClass('wrapper-active');
    $('.item').removeClass('active');
})