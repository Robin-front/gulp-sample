$(function() {
  var $screen = $('.J_screen');
  var $body = $('body');
  var $nav  = $('.J_nav');

  $(document).on('click', '.J_hongbao', function(){
    $('.J_dialog_rules').toggle();
    return false;
  });
  $('.J_dialog_rules').on('click', '.J_close', function(){
    $('.J_dialog_rules').toggle();
  });

  // 下注步骤
  $(document).on('click', '.J_step', function(){
    $('.J_dialog_step').toggle();
    return false;
  });
  $('.J_dialog_step').on('click', '.J_close', function(){
    $('.J_dialog_step').toggle();
  });

  //便捷小工具
  $(document).on('click', '.J_bianjie', function(){
    $('.J_dialog_tools').toggle();
    return false;
  });
  $('.J_dialog_tools').on('click', '.J_close', function(){
    $('.J_dialog_tools').toggle();
  });

  var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

  var throttleV2 = function(fn, delay){
   	var timer = null;
   	return function(){
   		var context = this, args = arguments;
   		clearTimeout(timer);
   		timer = setTimeout(function(){
   			fn.apply(context, args);
   		}, delay);
   	};
   };
  var lastScrollTop = null;
  $(window).scroll(throttleV2(function(){
    var scrollTop = $body.scrollTop();
    $screen.each(function(index){
      var top = $(this).offset().top;

      // 对应菜单
      if ((top - scrollTop) < 350 && (top - scrollTop) > 0){
        console.log('index', index);
        $nav.find('.J_item').eq(index)
          .addClass('current')
          .siblings().removeClass('current');
      }
    });
    lastScrollTop = scrollTop;
  }, 500));

  $nav.on('click', '.J_item', function(){
    var index = $nav.children().index($(this));
    var top = $screen.eq(index).offset().top - 66;
    $(this).addClass('current').siblings().removeClass('current');
    $body.animate({scrollTop: top}, 300);
    return false;
  });

  $(document).on('click', '.J_next_screen', function(){
    var $parent = $(this).closest('.J_screen');
    var top = $parent.next('.J_screen').offset().top - 66;
    $body.animate({scrollTop: top}, 300);
  });

  $(document).on('click', '.J_toTop', function(){
    $body.animate({scrollTop: 0}, 300);
  });

  $(document).on('click', '.J_toBottom', function(){
    var top = $screen.eq(-1).offset().top;
    $body.animate({scrollTop: top}, 300);
  });
});
