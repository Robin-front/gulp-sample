$(function(){
  var winH = $(window).height();
  var $body = $('body');
  var $screen = $('.J_screen');
  var $nav = $('.J_nav');
  // console.log(winH);

  // screen布局
  $screen.each(function() {
    var $this = $(this);
    var contentH = $this.find('.J_content').height();
    // console.log('contentH', contentH);
    var padding = (winH -contentH)/2;
    padding = padding <= 50 ? 50 : padding;
    // console.log('padding', padding);
    if (!contentH) { return false; }
    $(this).css({ padding: padding + 'px 0'});
  });

  // 轮换首屏焦点
  (function slide(){
    setTimeout(function(){
      var $current = $('.J_feature_item').filter('.current');
      var index = $('.J_feature_item').index($current);
      $current.removeClass('current');
      index = ++index > 2 ? 0 : index;
      // console.log('index', index);
      $('.J_feature_item').eq(index).addClass('current');
      slide();
    }, 2000);
  })();

  $(document).on('click', '.J_feature_item', function(){
    var index = $('.J_feature_item').index($(this));
    var top = $screen.eq(++index).offset().top;
    $body.animate({scrollTop: top}, 300);
  });

  // to top
  $(document).on('click', '.J_top', function() {
    // console.log('top');
    $body.animate({scrollTop: 0}, 300);
  });

  // next screen
  $(document).on('click', '.J_next_screen', function() {
    var $this = $(this);
    var $parant = $this.closest('.J_screen');
    var $nextScreen = $parant.next();
    var nextOffsetTop = $nextScreen.offset().top;
    // console.log('nextOffsetTop', nextOffsetTop);
    $body.animate({scrollTop: nextOffsetTop}, 300);
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
  // var throttleV2 = function(fn, delay, mustRunDelay){
  //   var timer = null;
  //   var t_start;
  //   return function(){
  //   	var context = this, args = arguments, t_curr = +new Date();
  //   	clearTimeout(timer);
  //   	if(!t_start){
  //   		t_start = t_curr;
  //   	}
  //   	if(t_curr - t_start >= mustRunDelay){
  //   		fn.apply(context, args);
  //   		t_start = t_curr;
  //   	} else {
  //   		timer = setTimeout(function(){
  //   			fn.apply(context, args);
  //   		}, delay);
  //   	}
  //   };
  // };
  var lastScrollTop = null;
  $(window).scroll(throttleV2(function(){
    var scrollTop = $body.scrollTop();
    $screen.each(function(index){
      var top = $(this).offset().top;
      if(lastScrollTop > scrollTop){
        // console.log('up');
        if(top < scrollTop && (scrollTop - top) < 600) {
          // console.log(123);
          $body.animate({scrollTop: top}, 300);
          // $nav.find('.J_item').eq(index)
          //   .addClass('current')
          //   .siblings().removeClass('current');
        }
      } else {
        // console.log('down');
        if(top > scrollTop && (top - scrollTop) < 600) {
          $body.animate({scrollTop: top}, 300);

        }
      }

      // 对应菜单
      if ((top - scrollTop) < 600){
        $nav.find('.J_item').eq(index)
          .addClass('current')
          .siblings().removeClass('current');
      }
    });
    lastScrollTop = scrollTop;
  }, 50, 1000));

  // switch screen
  $nav.on('click', '.J_item', function(){
    var $this = $(this);
    var index = $nav.children().index($this)
    // console.log('index', index);
    var top = $screen.eq(index).offset().top;
    $body.animate({scrollTop: top}, 300);
    $this.addClass('current').siblings().removeClass('current');
  });

  //list slide
  $(document).on('click', '.J_list', function() {
    var $this = $(this);
    var $parent = $this.parent();
    if($parent.hasClass('active')){
      $parent.removeClass('active');
      $this.siblings('.J_desc').slideToggle(300);
    } else {
      $this.siblings('.J_desc').slideToggle(300);
      $parent.addClass('active').siblings('.active').removeClass('active').children('.J_desc').slideToggle(300);
    }

  });

});
