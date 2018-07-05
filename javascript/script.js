// no easy way to do this.. decided to hardcode it for simplicity
const background = document.querySelectorAll('.background');
const background2 = document.querySelectorAll('.background2');
const background3 = document.querySelectorAll('.background3');
let moveWeights = [0,0.05,0.10,0.2,0.4,0.8,1.6,2.4,3.2,3.9,5];
  let newPos = [0,0,0,0,0,0,0,0,0,0,0];
  let newPos2 = [928,928,928,928,928,928,928,928,928,928,928];
  let newPos3 = [1856,1856,1856,1856,1856,1856,1856,1856,1856,1856,1856];
 
//auto scrolls without user input-- for title screen
function autoScroll() {
  for( let x =0; x <11; x+= 1) {
    if (newPos[x] < -928){
      newPos[x] = newPos3[x]+928;
    }
    if (newPos2[x] < -928) {
      newPos2[x] = newPos[x]+928;
    }
    if (newPos3[x] < -928) {
      newPos3[x] = newPos2[x]+928;
    }
    newPos[x] = newPos[x] - moveWeights[x];
    newPos2[x] = newPos2[x] - moveWeights[x];
    newPos3[x] = newPos3[x] - moveWeights[x];
    background[x].style.left = newPos[x] + 'px';
    background2[x].style.left = newPos2[x] + 'px';
    background3[x].style.left = newPos3[x] + 'px';
  }
  
}
document.onkeydown = function(e){
  var keycode = window.event ? window.event.keyCode : e.which;
  if(keycode == 40){
      var timer = setTimeout(function(){
          alert('Down key held');
          document.onkeyup = function(){};
      }, 200); 
      document.onkeyup = function(){
          clearTimeout(timer);
          alert('Down key pressed');   
      }
  }
};
  setInterval(autoScroll,40);
