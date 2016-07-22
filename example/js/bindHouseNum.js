
$(function(){
  var ErrorText = {
    number: '客户编号输入有误！',
    name: '户名输入有误！',
    addr: '地址输入有误！',
    idcard: '身份证号输入有误！'
  }

  //校验输入
  $(document).on('blur', '.J_number', function(){
    var $this = $(this);
    var value = $this.val().trim();
    if(!/\d{7,10}/g.test(value)){
      Utils.tip('客户编号输入有误！');
      $this.addClass('error');
    }else{
      $this.removeClass('error');
    }
  });
  $(document).on('blur', '.J_name', function(){
    var $this = $(this);
    var value = $this.val().trim();
    if(!/\d{7,10}/g.test(value)){
      Utils.tip('户名输入有误！');
      $this.addClass('error');
    }else{
      $this.removeClass('error');
    }
  });
  $(document).on('blur', '.J_addr', function(){
    var $this = $(this);
    var value = $this.val().trim();
    if(!value){
      Utils.tip('地址输入有误！');
      $this.addClass('error');
    }else{
      $this.removeClass('error');
    }
  });
  $(document).on('blur', '.J_id_card', function(){
    var $this = $(this);
    var value = $this.val().trim();
    if(!/\d{18}/g.test(value)){
      Utils.tip('身份证号输入有误！');
      $this.addClass('error');
    }else{
      $this.removeClass('error');
    }
  });

  $('.J_bind_form').submit(function(){
    var $input = $(this).find('input');
    var hasError;
    $input.each(function(i, $item){
      $item = $($item);
      if ($item.hasClass('error')|| !$item.val()){
        Utils.tip(ErrorText[$item.attr('name')]);
        $item.focus();
        hasError = true;
        return false;
      }
    });
    if(hasError){
      return false;
    }
  });

});
