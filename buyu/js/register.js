$(function(){
  // 提交注册表单
  $('.J_register').submit(function(){

    var $this = $(this);

    var username = $('#username').val().trim()
        ,password = $('#password').val().trim()
        ,repassword = $('#repassword').val().trim()
        ,realname = $('#realname').val().trim()
        ,tel = $('#tel').val().trim()
        ,qq = $('#qq').val().trim()
        ,email = $('#email').val().trim()
        ,code = $('#code').val().trim();

    var params = {
      username: username,
      password: password,
      repassword: repassword,
      realname: realname,
      tel: tel,
      qq: qq,
      email: email,
      code: code
    };

    var regs = {
      username: /[0-9|a-zA-Z]{6,10}/g,
      password: /[0-9|a-zA-Z]{6,10}/g,
      repassword: /[0-9|a-zA-Z]{6,10}/g,
      realname: null,
      tel: /$1\d{10}/g,
      qq: null,
      email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      code: null
    }


    var required = true;
    for(var p in params){
      if(!params[p] && p != 'qq'){
        required = false;
        $('.'+p).finds('.tips').addClass('error');
      } else { // 有值
        if (regs[p] && !regs[p].test(params[p])){ // 有校验
          $('.'+p).finds('.tips').addClass('error');
        }
      }
    }
    if(!required){
      $this.find('.error-tips').show();
      return false;
    }
    if($('.J_tips').hasClass('error')){
      return false;
    }

    $.ajax({
      url: 'url',
      type: 'post',
      data: data,
      dataType: 'json'
    }).done(function(res){
      $('.J_success').show();

    }).fail(function(){

    });

  });

  // 点击成功提示里的确定
  $('.J_confirm').on('click', function(){
    $('.J_success').hide();
    location.href = '/index.html';
  });
});
