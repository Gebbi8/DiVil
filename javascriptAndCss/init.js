function init(){

  
//  $('.leftBtns').hide();



  parseURL();

  //parse URL and call BiVeS





}

function initButtons(){
  console.log('test');
  showButtons($('.carousel-item:first')[0].classList);
}

function showButtons(classes){
  if(classes.contains('update' || 'move')){
    $('.leftBtns').hide();
    $('#bgChoice').show();
  } else {
    $('.leftBtns').hide();
    $('#bgSingle').show();

  }
}
