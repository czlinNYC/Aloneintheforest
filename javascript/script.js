// no easy way to do this.. decided to hardcode it for simplicity
// class gameModel {
// }
class View {
  constructor() {
    // background variables
    this.background = [];
    this.mainContainer = document.querySelector('#mainContainer');
    this.newPos = [[], [], []];
    this.moveWeights = [];
    this.width = 928;
    this.titleClear = false;
    this.gameOver = false;
    // hero varibales
    this.heroBox = document.querySelector('#charContainer');
    this.heroCurrentX = 0;
    this.hero = document.querySelector('#character');
    this.heroHealthGone = document.querySelector('#healthGone');
    this.heroHealthFull = document.querySelector('#healthFull');
    this.heroMoraleFull = document.querySelector('#moraleFull');
    this.heroMoraleGone = document.querySelector('#moraleGone');
    this.heroFrame = 0;
    this.heroInMotion = false;
    this.heroCombatMotion = false;
    this.test = false;
    this.faceLeft = false;
    this.heroHealth = 300;
    this.heroMorale = 300;
    this.playerDefenseUp = false;
    // enemy variables
    this.enemy = document.querySelector('#enemy');
    this.enemyBox = document.querySelector('#enemyCont');
    this.enemyFaceRight = false;
    this.enemyFrame = 0;
    this.enemyCurrentX = 21;
    this.enemyHealth = 400;
    // animations objects to be fed into the runanimation function
    this.animations = [
      {
        name: 'walk',
        frames: 8,
        width: 126,
        height: 126,
        timing: 80,
        type: this.heroBox,
        image: this.hero,
      },
      {
        name: 'idle',
        frames: 4,
        width: 126,
        height: 126,
        timing: 120,
        type: this.heroBox,
      },
      {
        name: 'slash',
        frames: 10,
        width: 150,
        height: 120,
        timing: 80,
        type: this.heroBox,
        image: this.hero,
      },
      {
        name: 'death',
        frames: 9,
        width: 126,
        height: 126,
        timing: 120,
        type: this.heroBox,
        image: this.hero,
      },
      {
        name: 'block',
        frames: 7,
        width: 126,
        height: 126,
        timing: 80,
        type: this.heroBox,
        image: this.hero,
      },
      {
        name: 'sumwalk',
        frames: 12,
        width: 160,
        height: 160,
        timing: 240,
      },
      {
        name: 'sumdie',
        frames: 12,
        width: 160,
        height: 160,
        timing: 240,
      },
    ];
  }

  // building the UI graphics, probably could have been done better
  buildUI() {
    const UIcont = document.createElement('div');
    UIcont.id = 'UIcont';
    UIcont.classList.add('hidden');
    this.mainContainer.appendChild(UIcont);
    const healthBar = document.createElement('div');
    healthBar.id = 'health';
    UIcont.appendChild(healthBar);
    healthBar.innerHTML = '<h1>health</h1>';
    healthBar.style.display = 'flex';
    const enemyHealthBar = document.createElement('div');
    enemyHealthBar.id = 'enemyHealth';
    this.mainContainer.appendChild(enemyHealthBar);
    enemyHealthBar.innerHTML = '<h1>overly dramatic sorceror</h1>';
    enemyHealthBar.classList.add('hidden');

    const moraleBar = document.createElement('div');
    moraleBar.id = 'morale';
    UIcont.appendChild(moraleBar);
    moraleBar.innerHTML = '<h1>morale</h1>';
    moraleBar.style.display = 'flex';

    const map = document.createElement('img');
    map.id = 'mapPic';
    UIcont.appendChild(map);

    for (let i = 0; i < 2; i += 1) {
      const newDiv = document.createElement('div');
      if (i === 0) {
        newDiv.id = 'healthFull';
      } else {
        newDiv.id = 'healthGone';
      }
      healthBar.appendChild(newDiv);
    }
    for (let i = 0; i < 2; i += 1) {
      const newDiv = document.createElement('div');
      if (i === 0) {
        newDiv.id = 'enemyHealthFull';
      } else {
        newDiv.id = 'enemyHealthGone';
      }
      enemyHealthBar.appendChild(newDiv);
    }
    for (let i = 0; i < 2; i += 1) {
      const newDiv = document.createElement('div');
      if (i === 0) {
        newDiv.id = 'moraleFull';
      } else {
        newDiv.id = 'moraleGone';
      }
      moraleBar.appendChild(newDiv);
    }
    this.heroHealthGone = document.querySelector('#healthGone');
    this.heroHealthFull = document.querySelector('#healthFull');
    this.heroMoraleFull = document.querySelector('#moraleFull');
    this.heroMoraleGone = document.querySelector('#moraleGone');
    this.enemyHealthFull = document.querySelector('#enemyHealthFull');
    this.enemyHealthGone = document.querySelector('#enemyHealthGone');
  }

  // dynamically creates the parallaxing background with 2 dimensional array, one for the
  buildBackground(width) {
    for (let p = 0; p < 11; p += 1) {
      for (let b = 0; b < 3; b += 1) {
        const newImg = document.createElement('img');
        newImg.classList.add(`pane${p}`);
        newImg.classList.add(`background${b}`);
        newImg.src = (`./assets/back/layer${p}.png`);
        this.mainContainer.appendChild(newImg);
      }
    }
    for (let x = 0; x < 3; x += 1) {
      this.background.push(document.querySelectorAll(`.background${x}`));
      for (let y = 0; y < 11; y += 1) {
        this.newPos[x].push(x * width);
      }
    }
  }

  // can be easily refactored to take different sizes of background panes
  moveWeightsConstruction() {
    for (let i = 0; i < 11; i += 1) {
      if (i === 0) {
        this.moveWeights.push(0);
      } else if (i === 1) {
        this.moveWeights.push(0.0125);
      } else {
        this.moveWeights.push(this.moveWeights[i - 1] * 2);
      }
    }
  }

  // setting the opening animations
  autoScroll() {
    for (let x = 0; x < 3; x += 1) {
      for (let y = 0; y < 11; y += 1) {
        if (x === 0 && view.newPos[x][y] < -928) {
          view.newPos[x][y] = view.newPos[2][y] + 928;
        } else if (view.newPos[x][y] < -928) {
          view.newPos[x][y] = view.newPos[x - 1][y] + 928;
        }
        view.newPos[x][y] -= this.moveWeights[y];
        this.background[x][y].style.left = `${view.newPos[x][y]}px`;
        if (this.heroInMotion === false) {
          this.opening = this.runAnimation(this.animations[0]);
          this.opening2 = this.runEnemyAnimation(this.animations[5]);
          this.heroInMotion = true;
        }
      }
    }
  }

  // hero animations
  cycleAnimation(mobject) {
    this.hero.style.left = `-${this.heroFrame * mobject.width}px`;
    this.heroFrame += 1;
    if (this.heroFrame < mobject.frames) {
      this.cycle = setTimeout(this.cycleAnimation.bind(this, mobject), mobject.timing);
    }
    if (this.heroFrame > (mobject.frames - 1)) {
      this.heroFrame = 0;
      if (this.gameOver === false) {
        this.setAnimation(this.animations[1]);
      }
      this.heroInMotion = false;
      if (mobject.name === 'slash' || 'block') {
        this.heroCombatMotion = false;
      }
    }
  }

  // main function that handles the hero animations
  runAnimation(mobject) {
    this.setAnimation(mobject);
    setTimeout(this.cycleAnimation.bind(this, mobject), mobject.timing);
  }

  // resets the animation sprite sheet to lessen glitching
  setAnimation(mobject) {
    this.heroBox.style.height = `${mobject.height}px`;
    this.heroBox.style.width = `${mobject.width}px`;
    this.hero.remove();
    this.hero = document.createElement('img');
    this.heroBox.appendChild(this.hero);

    this.hero.src = `assets/characterSprite/${mobject.name}.png`;
    this.hero.style.width = `${(mobject.frames) * mobject.width}px`;
    this.hero.style.position = 'absolute';
    this.hero.style.height = `${mobject.height}px`;

    if (this.faceLeft === true) {
      this.hero.style.transform = 'scaleX(-1)';
    }
  }

  // enemy animation functions identical almost to player ones... very difficult to refactor into a
  // a single function
  cycleEnemyAnimation(mobject) {
    this.enemy.style.left = `-${this.enemyFrame * mobject.width}px`;
    this.enemyFrame += 1;
    if (this.enemyFrame < mobject.frames) {
      this.enemyCycle = setTimeout(this.cycleEnemyAnimation.bind(this, mobject), mobject.timing);
    }
    if (this.enemyFrame > (mobject.frames - 1)) {
      this.enemyFrame = 0;
      this.enemyInMotion = false;
      // if (mobject.name === 'slash' || 'block') {
      //   this.enemyCombatMotion = false;
      // }
    }
  }

  runEnemyAnimation(mobject) {
    this.setEnemyAnimation(mobject);
    setTimeout(this.cycleEnemyAnimation.bind(this, mobject), mobject.timing);
  }

  setEnemyAnimation(mobject) {
    this.enemy.remove();
    this.enemyBox.style.height = `${mobject.height}px`;
    this.enemyBox.style.width = `${mobject.width}px`;
    this.enemy = document.createElement('img');
    this.enemy.src = `assets/characterSprite/${mobject.name}.png`;
    this.enemy.style.width = `${(mobject.frames) * mobject.width}px`;
    this.enemy.style.position = 'absolute';
    this.enemy.style.height = `${mobject.height}px`;
    this.enemyBox.appendChild(this.enemy);
    if (this.enemyFaceRight === true) {
      this.enemy.style.transform = 'scaleX(-1)';
    }
  }

  // enemy ai just makes the enemy follow and auto attack, nothing special
  enemyAi(mobject) {
    if (this.titleClear === false) {
      this.enemyCurrentX = 24;
    } else if (this.titleClear === true) {
      this.enemyCurrentX = 21;
    }
    if (this.enemyCurrentX > this.heroCurrentX + 1) {
      this.enemyFaceRight = false;
      this.enemyCurrentX -= 1;
      this.enemyBox.style.transform = `translateX(${this.enemyCurrentX * 63}px)`;
    } else if (this.enemyCurrentX < this.heroCurrentX - 1) {
      this.enemyFaceRight = true;
      this.enemyCurrentX += 1;
      this.enemyBox.style.transform = `translateX(${this.enemyCurrentX * 63}px)`;
    } else if (this.enemyCurrentX === this.heroCurrentX - 1 || this.enemyCurrentX === this.heroCurrentX + 1 || this.enemyCurrentX === this.heroCurrentX) {
      this.enemyAttack();
    }
    if (this.enemyInMotion === false) {
      this.enemyInMotion = true;
      this.enemyMove = setTimeout(this.runEnemyAnimation.bind(this, mobject), mobject.timing);
    }
  }

  // battle calculations, defenseUp/morale mechanic is in this function
  enemyAttack() {
    if (Math.floor(Math.random() * 85) > 15) {
      let healthLoss = Math.floor(Math.random() * 12);
      if (this.heroMorale < 150) {
        healthLoss *= 2;
      } if (this.playerDefenseUp === true) {
        healthLoss *= 0.8;
      }
      this.heroHealth -= healthLoss;
      if (this.playerDefenseUp === false) {
        this.heroMorale -= (Math.floor(Math.random() * 12) * 4);
      }
    }
    this.updateHealth();
  }

  // all other mechanics are in the player attack one
  playerAttack() {
    if ((this.enemyCurrentX === (this.heroCurrentX + 1) && this.faceLeft === false) || (this.enemyCurrentX === (this.heroCurrentX - 1) && this.faceLeft === true) || (this.enemyCurrentX === this.heroCurrentX)) {
      if (Math.floor(Math.random() * 85) > 15) {
        let healthLoss = Math.floor(Math.random() * 12);
        if (this.heroMorale > 225) {
          healthLoss *= 2;
        }
        if (this.heroHealth < 150) {
          healthLoss *= 2;
        }
        this.enemyHealth -= healthLoss;
        this.heroMorale += (Math.floor(Math.random() * 12) * 3);
      }
      this.updateHealth();
    }
  }

  // to be called with a set timeout to represent the defensive buff ending
  defenseDown() {
    this.playerDefenseUp = false;
  }

  // calls the defense down and sets defense up
  playerBlock() {
    clearTimeout(this.block);
    this.playerDefenseUp = true;
    this.block = setTimeout(this.defenseDown.bind(this), 3000);
  }

  // real time updates to health on every attack for player and enemy, called in the attack functions
  updateHealth() {
    if (this.heroHealth < 0) {
      this.heroHealthFull.style.flex = 0;
    }
    if (this.heroMorale < 0) {
      this.heroMoraleFull.style.flex = 0;
    }
    if (this.heroMorale > 300) {
      this.heroMorale = 300;
    }
    if (this.enemyHealth < 0) {
      this.enemyHealthFull.style.flex = 0;
    }
    this.enemyHealthFull.style.flex = this.enemyHealth;
    this.enemyHealthGone.style.flex = 400 - this.enemyHealth;
    this.heroHealthFull.style.flex = this.heroHealth;
    this.heroMoraleFull.style.flex = this.heroMorale;
    this.heroHealthGone.style.flex = 300 - this.heroHealth;
    this.heroMoraleGone.style.flex = 300 - this.heroMorale;
    this.checkDeath();
  }

  // check if anyone dies and ends game
  checkDeath() {
    if (this.heroHealth < 0) {
      this.hero.remove();
      this.playerWin = false;
      this.gameOver = true;
      this.faceLeft = false;
      clearTimeout(this.cycle);
      clearInterval(this.enemyCombat);
      this.runAnimation(this.animations[3]);
      setTimeout(this.winLose.bind(this), 3000);
    }
    if (this.enemyHealth < 0) {
      this.playerWin = true;
      clearTimeout(this.enemyMove);
      clearInterval(this.enemyCombat);
      this.enemyFaceRight = false;
      this.runEnemyAnimation(this.animations[6]);
      setTimeout(this.winLose.bind(this), 3000);
    }
  }

  // checks and displays win or loss
  winLose() {
    this.heroBox.remove();
    this.enemyBox.remove();
    document.querySelector('#UIcont').remove();
    document.querySelector('#enemyHealth').remove();
    if (this.playerWin === true) {
      document.querySelector('#title').style.transform = 'translateX(0px)';
      document.querySelector('#title').innerHTML = 'you are now alone in the forest';
    } else {
      document.querySelector('#title').style.transform = 'translateX(0px)';
      document.querySelector('#title').innerHTML = 'you have died alone in the forest';
    }
  }

  // user input functions, clear out to remove title screen and start the game
  clearOut() {
    clearInterval(this.scroll);
    clearTimeout(this.opening);
    this.enemyBox.style.display = 'block';
    this.titleClear = 'true';
    document.querySelector('#enemyHealth').style.display = 'flex';
    document.querySelector('#UIcont').style.display = 'block';
  }

  moveRight() {
    if (this.heroCurrentX < 21) {
      this.heroCurrentX += 1;
      this.heroBox.style.transform = `translateX(${this.heroCurrentX * 63}px)`;
    }
  }

  moveLeft() {
    if (this.heroCurrentX > 0) {
      this.heroCurrentX -= 1;
      this.heroBox.style.transform = `translateX(${this.heroCurrentX * 63}px)`;
    }
  }

  render() {
    this.scroll = setInterval(this.autoScroll.bind(this), 40);
    this.enemyCombat = setInterval(this.enemyAi.bind(this, this.animations[5]), 720);
    // 928 is frame width of the parallaxing background
    this.buildBackground(928);
    this.buildUI();
    this.moveWeightsConstruction();
  }
}
// handles controls
document.onkeydown = function (e) {
// got this ternery operator off of w3schools
  const keycode = window.event ? window.event.keyCode : e.which;
  if (keycode === 13 && view.gameOver === false) {
    // var timer = setTimeout(function(){
    //     alert('Down key held');
    //     document.onkeyup = function(){};
    // }, 200);   draw.io priority matrix
    document.onkeyup = function () {
      view.clearOut();
      document.querySelector('#title').style.transform = 'translateX(-1500px)';
      document.querySelector('#start').style.transform = 'translateX(1500px)';
    };
  } else if (keycode === 39 && view.gameOver === false) {
    if (view.heroCombatMotion === false) {
      view.moveRight();
    }
    if (view.heroInMotion === false) {
      view.faceLeft = false;
      view.runAnimation(view.animations[0]);
      view.heroInMotion = true;
    }
  } else if (keycode === 37 && view.gameOver === false) {
    if (view.heroCombatMotion === false) {
      view.moveLeft();
    }
    if (view.heroInMotion === false) {
      view.faceLeft = true;
      view.runAnimation(view.animations[0]);
      view.heroInMotion = true;
    }
  } else if (keycode === 38 && view.gameOver === false) {
    if (view.heroInMotion === false) {
      view.runAnimation(view.animations[2]);
      view.heroInMotion = true;
      view.heroCombatMotion = true;
      view.playerAttack();
    }
  } else if (keycode === 40 && view.gameOver === false) {
    if (view.heroInMotion === false) {
      view.runAnimation(view.animations[4]);
      view.heroInMotion = true;
      view.heroCombatMotion = true;
      view.playerBlock();
    }
  }
};
const view = new View();
view.render();
