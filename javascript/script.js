// no easy way to do this.. decided to hardcode it for simplicity
class gameModel {

}
class View {
  constructor (moveIncrement, backWidth, panes){
    this.moveIncrement = moveIncrement;
    this.backWidth = backWidth;
    this.panes = panes;
    this.background = [];
    this.mainContainer = document.querySelector('#mainContainer');
    this.newPos = [[],[],[]];
    this.moveWeights = [0,0.0125,0.025,0.05,0.1,0.2,0.4,0.8,1.6,3.2,6.4];
    this.width = 928;
    this.frameSkip = 0;
    this.hero = document.querySelector('#character');
    this.aniCount = 0;
  }

  buildBackground(width){
    for (let p = 0; p < 11; p += 1){
      for(let b = 0; b < 3; b += 1) {
        let newImg = document.createElement('img');
        newImg.classList.add(`pane${p}`);
        newImg.classList.add(`background${b}`);
        newImg.src = (`./assets/back/layer${p}.png`);
        this.mainContainer.appendChild(newImg);
      }
    }

    for(let x = 0;x < 3; x += 1){
      this.background.push(document.querySelectorAll(`.background${x}`));
        for(let y = 0; y<11; y += 1){
          this.newPos[x].push(x * width);
        }
      }
    }
  autoScroll() {
    for (let x = 0; x < 3; x += 1){
      for(let y = 0; y < 11; y += 1) {
        if (x=== 0 && view.newPos[x][y] < -928){
          view.newPos[x][y]  = view.newPos[2][y] + 928; 
        } else if (view.newPos[x][y] < -928){
          view.newPos[x][y] = view.newPos[x - 1][y] + 928;
        }
      
      view.newPos[x][y] = view.newPos[x][y] - this.moveWeights[y];
      this.background[x][y].style.left = view.newPos[x][y] + 'px';
      this.walking()
      }
    }
  }
  walking(){
    if (this.frameSkip % 2 === 0) {
      if (this.hero.style.left === '-882px') {
        this.aniCount = 0;
        } else { 
        this.aniCount -= 126; 
      } 
    this.hero.style.left = this.aniCount + 'px'; 
    }
    this.frameSkip++;
  }
  buildUI(){
    let UIcont = document.createElement('div');
    UIcont.id ='UIcont';
    UIcont.innerText ="hello";
      this.mainContainer.appendChild(UIcont);
  }
  render(){
    let con = setInterval(this.autoScroll.bind(this), 40);
    this.buildBackground(928);
    this.buildUI();
    
  }

}
  

// document.onkeydown = function(e){
//   var keycode = window.event ? window.event.keyCode : e.which;
//   if(keycode == 13){
//       // var timer = setTimeout(function(){
//       //     alert('Down key held');
//       //     document.onkeyup = function(){};
//       // }, 200);   draw.io priority matrix
//       document.onkeyup = function(){
//           clearInterval(scroll);
//           document.querySelector('#title').style.transform = 'translateX(-1500px)';
//           document.querySelector('#start').style.transform = 'translateX(1500px)';
        
//       }
//   }
// };
const view = new View;
view.render();
 
