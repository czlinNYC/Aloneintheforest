// no easy way to do this.. decided to hardcode it for simplicity
// class gameModel {
// }
class View {
  constructor (moveIncrement, backWidth, panes){
    this.moveIncrement = moveIncrement;
    this.backWidth = backWidth;
    this.panes = panes;
    this.background = [];
    this.mainContainer = document.querySelector('#mainContainer');
    this.newPos = [[],[],[]];
    this.moveWeights = [];
    this.width = 928;
    this.frameSkip = 0;
    this.heroBox = document.querySelector('#charContainer');
    this.heroCurrentX = 0;
    this.hero = document.querySelector('#character');
    this.aniCount = 0;
    this.maps = 0;
    this.titleClear = false;
    this.heroFrame = 0;
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
  moveWeightsConstruction() {
    for( let i = 0; i < 11; i += 1 ) {
      if ( i  === 0 ) {
        this.moveWeights.push(0);
      } else if( i === 1) { 
        this.moveWeights.push(0.0125);
      } else {
        this.moveWeights.push(this.moveWeights[i-1] * 2);
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
  setIdle(){
    this.hero.remove();
    this.hero = document.createElement('img');
    this.hero.src = 'assets/characterSprite/idle.png';
    this.hero.style.width = '504px';
    this.hero.style.position= 'absolute';
    this.hero.style.height = '126px';
    this.heroBox.appendChild(this.hero);
    
  }
  idle() {
    this.hero.style.left = `-${this.heroFrame * 126}px`
    this.heroFrame++;
    if (this.heroFrame > 3) {
      this.heroFrame = 0;
    }
  }
  buildUI(){
    let UIcont = document.createElement('div');
    UIcont.id ='UIcont';
    this.mainContainer.appendChild(UIcont);
    
    let healthBar = document.createElement('div');
    healthBar.id = 'health';
    UIcont.appendChild(healthBar);
    healthBar.innerHTML = '<h1>health</h1>';
    
    let moraleBar = document.createElement('div');
    moraleBar.id = 'morale';
    UIcont.appendChild(moraleBar);
    moraleBar.innerHTML = '<h1>morale</h1>';

    let map =  document.createElement('img');
    map.id = 'mapPic';
    UIcont.appendChild(map);

  }
  detailUI(){
  

  }
  animate(){
    this.con = setInterval(this.idle.bind(this),120);
  }
  render(){
    this.con = setInterval(this.autoScroll.bind(this), 40);
    //928 is frame width of the parallaxing background
    this.buildBackground(928);
    this.buildUI();
    this.moveWeightsConstruction();
    
  }

  clearOut(){
    clearInterval(this.con);
  }  
  moveRight() {
    if (this.heroCurrentX < 63) {
    this.heroCurrentX++;
    this.heroBox.style.transform = `translateX(${this.heroCurrentX * 21}px)`;
  }
  }
  moveLeft() {
    // if (this.heroMoving === false) {
    if (this.heroCurrentX > 0) {
    this.heroCurrentX--;
    this.heroBox.style.transform = `translateX(${this.heroCurrentX * 21}px)`;
    this.hero.style.transform= 'scaleX(-1)';
  }
}
}
document.onkeydown = function(e){
  var keycode = window.event ? window.event.keyCode : e.which;
  if(keycode == 13){
      // var timer = setTimeout(function(){
      //     alert('Down key held');
      //     document.onkeyup = function(){};
      // }, 200);   draw.io priority matrix
      document.onkeyup = function(){
          view.clearOut();
          document.querySelector('#title').style.transform = 'translateX(-1500px)';
          document.querySelector('#start').style.transform = 'translateX(1500px)'; 
          view.setIdle();
          view.animate();
      }
  } else if (keycode === 39) {
    view.moveRight();

  } else if (keycode === 37){
    view.moveLeft();
  }
  
}

const view = new View;
view.render();
 