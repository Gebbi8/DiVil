function init(){
  $('.btn-group').hide();



  parseURL();

  //parse URL and call BiVeS




}

function initButtons(){
  console.log('test');
  showButtons($('.carousel-item:first')[0].classList);
}

function showButtons(classes){
  if(classes.contains('update' || 'move')){
    $('.btn-group').hide();
    $('#bgChoice').show();
  } else {
    $('.btn-group').hide();
    $('#bgSingle').show();

  }
}
