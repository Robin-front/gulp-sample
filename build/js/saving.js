$(function(){
  // submit
  $('.J_saving').submit(function(){
    var $this = $(this);

    var payment = $('input[name="payment"]').val(),
        amout = $('#amout').val();

    if(amout < 20 || amout > 5000){
      alert('单次存款最低金额20元，最高金额5000元');
      return false;
    }

    $.ajax({
      url: 'url',
      type: 'post',
      data: {},
      dataType: 'json'
    }).done(function(){
      $('.J_success').show();
    }).fail(function(){
      // 请求失败
    });
  });

  // close alert
  $('.J_close_tips').on('click', function(){
    $('.J_success').hide();
  });
});
