
## Testing

During planning my project I knew a quality testing plan had to be prepared. Creating this plan began with having 
a clear purpose and vision in mind. I had to ask myself how to fulfil the user's expectations and what needed to be 
done to accomplish my stated goal. I had to scrutinise each line of my code to make sure everything was working properly.
Thanks to the wireframes I created I was able to pick a selected feature and conduct a test which provided a clear outcome.
These individual tests confirmed the selected elements had been implemented correctly. I also used widely known and popular
validation services to check the project's content. The following tools were used to confirm its validation:

* [**W3C Markup validation**](https://validator.w3.org/) - to make sure I created a valid HTML code.

* [**W3C CSS Validation**](https://jigsaw.w3.org/css-validator/) - to validate my CSS style sheet embedded in my HTML document.

* [**JS Hint**](https://jshint.com/) - to detect errors and potential problems in my JavaScript code.


I knew my project needed to be fully responsive but I was aware it can be difficult to achieve that using a canvas element. 
I decided to take a slightly different approach and inform the user that the game functionality can be fully achieved using
devices with bigger screens i.e. iPads/laptops/desktops. I created a warning message button called **PLEASE READ!** which 
displays a warning message to the user. I also took this approach due to the fact I used a **mousemove** event to control player's 
moves. It works efficiently on bigger screen devices. The **GAME MENU**, **START THE GAME** and **CLOSE THE GAME** buttons are hidden 
if the user using smaller devices (between the min-width of 319.98px and max-width of 767.98px). The **PLEASE READ!** button displays
only on small devices and is hidden if the screen min-width reaches 768px and more.

### User Stories

#### User’s expectations:

* As a new user, I am hoping to have an easy access to website's content

    - the user can smoothly navigate through website and find what is looking for;
    - the user will not feel overwhelmed with a volume of the information as it was the designer's 
    intention to keep the text content to minimum.

* As a new user, I am hoping to enjoy the game
    - the simplicity of the game will be its biggest value as there is no complicated set of game rules which 
    could make the player confused.

* As a new user, I want to connect with the website host using the available social-media links;
    - the available social-media links are active and once an icon is clicked/tapped it will take the user 
    to the external websites where the information about the website's host can be found.

#### Testing Stories 

**1.** I was advised by my mentor the background colors for individual elements I initially used should be more vivid. I decided 
to follow his suggestion and had changed it using [**Coolors**](https://coolors.co/) pallete. 

**2.** It was suggested by one of the test-users that a **RESET GAME** button could be built in, so the game users would have a chance to 
re-start the game anytime they want and the game result will reset too. I decided to implement this feature in the future.


### Features testing

When the user visits the page for the first time she/he will be presented with a vivid background color which attracts user's attention
but it is not aggressive. The users will notice a limited text content was embedded which makes the general experience less overwhelming
and more user-friendly. 

#### Elements tested:

* **PLEASE READ!** button - appears on small screen devices. When the user clicks/taps the button a warning message modal opens. The message 
box contains a message informing the user the game best functionality can be seen using bigger screen devices. It also warns the user that 
if a small device is used there can be a limited access to the game. 

* **GAME MENU** - the user can only see the embedded text if bigger screen devices are used. It disappears when the user is accessing website 
using small screen devices. 

* **HOW TO PLAY?** button - when the user clicks/taps the button, it opens a modal which contains a list of the game tips/suggestions.
This was implemented to ensure the user will not be confused with how the game should be played. The modal closes when the user clicks/taps
anywhere outside the box. There is a small print text added which notifies the user how the modal can be closed. 

* **START THE GAME** button - once clicked/tapped, it opens the actual game playfield and the user can enjoy a round of **Ping-Pong**.

* **CLOSE THE GAME** button - the user can click/tap on the button which closes the game completely and brings the user back to the intro page. 
The button is not active on the intro page and can be used once the user moves to actual game playfield.

    * the **HOW TO PLAY?**, **START THE GAME** and **CLOSE THE GAME** buttons can be seen by the user only if bigger screen devices are used.
    The user is unable to see the buttons if using a small device as their display is set to **none**.

    * the user can refresh the game by reloading the page. 

* **Playfield** - the user is able to move the paddle up and down to hit the ball and score the point. The user notices the speed of the ball increases
with the number of the hits. The user can see the score changes once the point is earned. 

* **Social-Links** icons - the user can access an additional information about the designer by using the following icons:

    * [**LinkedIn**](https://www.linkedin.com/in/kris-kempa-77a752162/)
    * [**GitHub**](https://github.com/KrisK1978)

These icons redirect the user to external websites where other details can be found about the website's creator. 

* **Instagram** and **Twitter** icons were used for visual effect and are not active. 

They icons' scale and the background color change when the user clicks/taps on them. 

#### Bugs 

**1.** I came across an issue related to the overflow on my website while creating it. I found the solution to debug it using 
[**Unicorn Revealer**](https://chrome.google.com/webstore/detail/unicorn-revealer/lmlkphhdlngaicolpmaakfmhplagoaln). 

**2.** I was experiencing a problem with drawing and placing the **net** in the middle of the playfield. I managed to resolve this issue by testing
different function scenarios and finding the one which drew the net exactly where I wanted. 

**3.** While validating my JavaScript code in [**JS Hint**](https://jshint.com/) I received the following warnings:

*   *const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz)*
*   *arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6')* - they do not affect the game functionality.


**Additional Testing**

I have asked my family members, friends and fellow [**Code Institute**](https://codeinstitute.net/) students to test and review my website. 
I was advised the game could have a leaderboard with the best scorer, number of wins and defeats, the **RESET GAME** button and sounds effects.
These ideas were included in **Features to be implemented in the future** paragraph in [**README.md**](https://github.com/KrisK1978/play-whiff-whaff-game/blob/master/README.md) file.

