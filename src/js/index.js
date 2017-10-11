;(function (){
  function setCookie(cname,cvalue,exdays) {
  		var d = new Date();
  		d.setTime(d.getTime() + (exdays*24*60*60*1000));
  		var expires = "expires=" + d.toGMTString();
  		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  	}

  	function getCookie(cname) {
  		var name = cname + "=";
  		var decodedCookie = decodeURIComponent(document.cookie);
  		var ca = decodedCookie.split(';');
  		for(var i = 0; i < ca.length; i++) {
  			var c = ca[i];
  			while (c.charAt(0) == ' ') {
  				c = c.substring(1);
  			}
  			if (c.indexOf(name) == 0) {
  				return c.substring(name.length, c.length);
  			}
  		}
  		return "";
  	}

  $('.J-downloadApp-close').on('click', function(e) {
    var $this = $(this),
        $parent = $this.parent();

    $parent.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (){
      $parent.hide().removeClass('bounceOutDown');
    });
    $parent.addClass('bounceOutDown');
  });

  /**
   * 展示弹窗，点击下载跳转相应移动端APP下载页，关闭则继续进入彩种。
   * @return {[type]} [description]
   */
  $('.J-download-dialog-close').on('click', function (){
    setCookie('downloadApp-dialog', 1, 365);
    var $parent = $(this).parent();
    $parent.hide();
    location.href = $parent.data('href');
  });

  /**
   * 进入彩种时，如果不符合弹窗推荐下载APP，则直接跳转；符合则展示弹窗
   * @return {[type]} [description]
   */
  $('.container').on('click', 'a', function (){
    var $this = $(this), href;
    if ($this.attr('id')) {
      href = $this.attr('href');
      if (!getCookie('downloadApp-dialog')) {
        $('.J-download-dialog').show().data('href', href);
      } else {
        location.href = href;
      }
    }
  });


})();
