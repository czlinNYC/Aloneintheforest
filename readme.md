![Screenshot here](https://github.com/czlinNYC/Aloneintheforest/blob/master/ss.png)
## What is Alone in the forest?
Alone in the forest is a combat game where you fight a sorceror to the death in the forest for the right to be alone in the forest. What it was supposed to be was a sprawling rpg with many actions and choices. Poor planning and time management has made this game what it is today.
## Tech involved:
This projects starts with a mostly clean Html boilerplate and 2 dozen classes. Majority of the elements are dynamically created. Although I had wished to use multiple classes, my code began to sprawl to 450 lines and I feared I would not be able to complete the project if I took time to refactor it.

The background was constructed using 2 2-dimensional arrays, cycled through a function. The animation function is a single function which calls 2 different functions, one which sets the image and one that actually cycles it. All parameters are fed into the run animation function with a 'mobject' an object from an array with all necessary data.

The game uses fake collision detection to determine if the enemy/user can be attacked. There are 4 user inputs, left and right to move, up to slash and down to block. A single number which is multiplied by 63px to determine position.
## Controls:
###### up arrow to slash
###### down arrow to block
###### left arrow to move left
###### right arrow to move right
## There are many mechanics at play 
###### if a player is above 75% morale he does 2x damage, to represent good spirits.
###### if a player is below 50% health he does 2x damage, to represent desperation.
###### if a player is below 50% morale he takes 2x damage, to represent hopelessness.
###### if a player blocks he is immune to morale damage and takes 20% less damage for 3sec.
###### if a player attacks he builds morale and does damage to the enemy health.
                                  
Health and morale bars are simply a div with 2 divs insde and using health values to calculate the flex. 

The game features many different states which are not clearly stated some internal and other for player usage. I relied heavily on booleans to manage these and also feel that at some point I should graphical representations of the states that affect player decision making (defenseup).

## Glitches: 
Sorceror animation runs 3 times-5 times on death. no Idea why. spent 6 hours debugging with no success.
PLayer death animation glitches out if player dies while in middle of a executing a slash.
          
## Area for improvement:
I would like to refactor the code to allow for multiple classes and JS pages. A wall of functions is very disconcerting. Also I would like to rewrite my enemy animation functions as well. Most of the code in the last 24 hours of project time is poorly written and not very extensible.

Would also like to add other areas of of the game, like random encounters, overhead map, inventory and powerups.

Functions of note: The runAnimation function and its children are especially cool. The autoscroll as well.

## Sources: 
Tenery operator was from w3school tutorial.
Game assets are from itch.io, open source.
Fonts are from fontmeme.com, free for personal use.

