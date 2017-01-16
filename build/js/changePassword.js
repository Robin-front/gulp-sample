$(function(){

  $('.J_changPassword').submit(function(){
    var $this = $(this);

    var password = $('#password').val().trim(),
        newPassword = $('#newPassword').val().trim(),
        repassword = $('#repassword').val().trim();

        if(newPassword !== repassword){
          alert('确认密码不一致！');
        }

        $.ajax({
          url: 'url',
          type: 'post',
          dataType: 'json',
          data: {
            password: password,
            newPassword: newPassword,
            repassword: repassword
          }
        }).done(function(){
          
        });
  });
});
