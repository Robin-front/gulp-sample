$(function() {
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
});
