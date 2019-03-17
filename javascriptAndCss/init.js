function init(){
  $('.btn-group-vertical').hide();



  parseURL();

  //parse URL and call BiVeS




}

function initButtons(){
  console.log('test');
  showButtons($('.carousel-item:first')[0].classList);
}

function showButtons(classes){
  if(classes.contains('update' || 'move')){
    $('.btn-group-vertical').hide();
    $('#bgChoice').show();
  } else {
    $('.btn-group-vertical').hide();
    $('#bgSingle').show();

  }
}
