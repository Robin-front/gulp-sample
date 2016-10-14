;(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                    window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
          var id = window.setTimeout(function() {
              callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };
  }
  if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
  }
}());
$.fn.scrollTo =function(options){
    var defaults = {
        toT : 0,    //滚动目标位置
        durTime : 300,  //过渡动画时间
        delay : 20,     //定时器时间
        callback:null   //回调函数
    };
    var opts = $.extend(defaults,options),
        timer = null,
        _this = this,
        curTop = _this.scrollTop(),//滚动条当前的位置
        subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
        index = 0,
        dur = Math.round(opts.durTime / opts.delay),
        smoothScroll = function(t){
            index++;
            var per = Math.round(subTop/dur);
            if(index >= dur){
                _this.scrollTop(opts.toT);
                window.cancelAnimationFrame(timer);
                if(opts.callback && typeof opts.callback == 'function'){
                    opts.callback();
                }
                return;
            }else{
                _this.scrollTop(curTop + index*per);
                requestAnimationFrame(smoothScroll);
            }
        };
    timer = window.requestAnimationFrame(smoothScroll);
    return _this;
};

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

  $(document).on('tap', '.J_menu', function() {
    $(this).parent().toggleClass('active');
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

  $(document).on('tap', '.J_feature_item', function(){
    var index = $('.J_feature_item').index($(this));
    var top = $screen.eq(++index).offset().top;
    $body.scrollTo({toT: top});
    $screen.addClass('current').siblings().removeClass('current');
  });

  // // to top
  $(document).on('tap', '.J_top', function() {
    // console.log('top');
    $body.scrollTo({toT: 0});
  });

  // next screen
  $(document).on('tap', '.J_next_screen', function() {
    var $this = $(this);
    var $parant = $this.closest('.J_screen');
    var $nextScreen = $parant.next();
    switchTo($screen.index($nextScreen));
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

  document.addEventListener('touchend', function(){
    // console.log('touchEnd');
    var scrollTop = $body.scrollTop();
    var $current = $screen.filter('.current');
    var currentTop = $current.offset().top;
    var $next = $current.next('.J_screen');
    // console.log('$next', !$next.length);
    if(scrollTop == currentTop) { return false;}
    if($next.length && Math.abs(currentTop - scrollTop) < 100){
      $body.scrollTo({toT: currentTop});
    } else { // Math.abs(currentTop - scrollTop) > 100
      if (currentTop > scrollTop) {
        // console.log('up');
        var $prev = $current.prev('.J_screen');

        switchTo($screen.index($prev));
      } else { // currentTop < scrollTop
        // console.log('down');
        if(!$next.length){ return false;}
        switchTo($screen.index($next));
      }
    }
  }, false);

  // switch screen
  $nav.on('tap', '.J_item', function(){
    var $this = $(this);
    var index = $nav.children().index($this)
    // console.log('index', index);
    // var top = $screen.eq(index).offset().top;
    // $body.scrollTo({toT: top});
    switchTo(index);
    $nav.parent().removeClass('active');
  });

  //list slide
  $(document).on('tap', '.J_list', function() {
    var $this = $(this);
    var $parent = $this.parent();
    if($parent.hasClass('active')){
      $parent.removeClass('active');
      $this.siblings('.J_desc').fadeToggle(300);
    } else {
      $this.siblings('.J_desc').fadeToggle(300);
      $parent.addClass('active').siblings('.active').removeClass('active').children('.J_desc').fadeOut(300);
    }

  });

  function switchTo(index){
    $screen.eq(index).addClass('current').siblings().removeClass('current');
    $nav.children().eq(index).addClass('current').siblings().removeClass('current');
    $body.scrollTo({toT: $screen.eq(index).offset().top});
  }

});
