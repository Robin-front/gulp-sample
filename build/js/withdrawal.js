$(function(){
  $('.J_withdrawal').submit(function(){
    var $this = $(this);

    var bank = $('#bank').val()
        ,amount = $('#amount').val();


    if(amount < 100 || amount > 100000){
      alert('最低取款金额100元，最高10万元');
    }

    // $.ajax({});
  });
});
