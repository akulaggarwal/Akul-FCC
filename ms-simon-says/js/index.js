/* 
FCC Challenge:
http://www.freecodecamp.com/challenges/build-a-simon-game

Images:
[url=http://postimg.org/image/w7qk572zr/][img]http://s7.postimg.org/w7qk572zr/Blue_Square.jpg[/img][/url]

[url=http://postimg.org/image/p775q5qlj/][img]http://s7.postimg.org/p775q5qlj/Green_Square.jpg[/img][/url]

[url=http://postimg.org/image/fip49a6ef/][img]http://s7.postimg.org/fip49a6ef/MS_Squares.jpg[/img][/url]

[url=http://postimg.org/image/57crgmep3/][img]http://s7.postimg.org/57crgmep3/Red_Square.jpg[/img][/url]

[url=http://postimg.org/image/scn62mjtz/][img]http://s7.postimg.org/scn62mjtz/Yellow_Square.jpg[/img][/url]
*/

$(document).ready(function() {

  var soundArr = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];

  //Following code needed to make sounds
  var obj = document.createElement("audio");
  //obj.src="http://kahimyang.info/resources/sound/click.mp3"; //Needed to test sound
  obj.volume=.5;
  obj.autoPlay=false;
  obj.preLoad=true;       

  /* //Following tests that above code plays sounds with button
  //Must enable button in HTML code
  $(".playSound").click(function() {
    obj.play();
  });*/

  var colorStorage = []; //Stores random nums corresponding to squares

  //Following controls toggle button for strict mode
  $('a.toggler').click(function(){
    $(this).toggleClass('off');
  });

  function resetCounter() { //Used to reset to 0, now updates every time animate() runs
    $('.count').html(colorStorage.length);
  }

  function randomGen (){ //generators random number and sends it to colorStorage
    var rawRandom = Math.random();
    // For integrating different difficulty modes, insert code here

    var numToAdd = Math.floor(4 * rawRandom); 
    colorStorage.push(numToAdd); //pushes to array
    //Following Tester code
    //console.log('new number generated: ' + numToAdd);
    //console.log(colorStorage);
    //console.log('randomGen() done running');
  }

  //Used to pre-define order for testing:
  var colorStorage = [0,1];

  function flashy(arr) { //Associates colorStorage[] with specific color

    console.log('flashy() started')
    //for(i = 0; i < arr.length; i++) { //couldn't get for loop to work with setTimeout properly
    $(arr).each(function(i) { //Runs for each entry(i) in colorStorage[]
      setTimeout(function() { //Forces following code to wait XXX sec before running
        //console.log(i);
        var current = arr[i]; //Current arr value being considered

        var classCurr = 'flash'; //class to be inserted into current arr value

        //removes glow and class 'flash' from previous selection
        $('.colors').children().css({'box-shadow' : '', ' -moz-box-shadow': '',
                                     '-webkit-box-shadow' : ''});
        $('.colors').children().removeClass(classCurr);

        //Adds appropriate id to current elem in arr
        //In future, make color array corresponding to values in colorStorage[]
        if (current == 0){ 
          $('#red').addClass(classCurr);
        } else if (current == 1){
          $('#green').addClass(classCurr);
        } else if (current == 2){
          $('#blue').addClass(classCurr);
        }else{ ////current == 3, yellow
          $('#yellow').addClass(classCurr);
        }

        color = $('.flash').attr('id'); //Obtains appropriate color from above
        animate('.flash', current); 

        /*Following code migrated over to animate(arg1,arg2)
        //Remains below for testing & troubleshooting

        //actually makes it glow using some css
        $('.flash').css({'box-shadow' : '0 0 40px ' + color, ' -moz-box-shadow': '0 0 40px ' + color, '-webkit-box-shadow' : '0 0 80px ' + color});

        //console.log('flashy' + i)

        setTimeout(function() { //waits and then removes glow
          $('.flash').css({'box-shadow' : '', ' -moz-box-shadow': '', '-webkit-box-shadow' : ''});
        }, 1000);
      }, i*2000); // end of bigger setTimeout*/

      }, i*1000) //end of bigger setTimeout

    })//end of large (arr).each
    console.log('flashy ENDED');
  } //end of flashy()

  //Actually causes glow and sound effects
  //text: selector for current color square
  //soundNumber: number for current color square
  function animate(text, soundNumber) { 

    //console.log( $('.toggler').attr('class') )

    resetCounter(); //Most effective to set counter to number of elems in colorStorage[]
    console.log('animate() started running');
    //console.log($(text).attr('id'));

    //Play sound code:
    console.log('soundNumber is: ' + soundNumber);  
    //var soundID = $('#playMe');
    //$('source').attr('src', soundArr[soundNumber]);
    obj.src = soundArr[soundNumber]; //Assigns correct html from sound arr to color square
    obj.play(); //actually plays the sound
    console.log($('source').attr('src'));
    //soundID[0].play();

    //Glow animation code:
    $(text).css({'box-shadow' : '0 0 40px ' + color, ' -moz-box-shadow': '0 0 40px ' + color, '-webkit-box-shadow' : '0 0 80px ' + color});

    //console.log('flashy' + i)

    setTimeout(function() { //Waits and then removes glow
      $(text).css({'box-shadow' : '', ' -moz-box-shadow': '', '-webkit-box-shadow' : ''});
    }, 500);
    console.log(colorStorage);
    console.log('END OF ANIMATION');
  }


  $('.start').click(function () { //User starts game or resets
    $('.title').html('Akul\'s Simon "Microsoft" Says Game'); //Forces reset after win or mistake
    j = 0; //j is counter for number of correct user hits
    $('.start').html('Reset Game');
    colorStorage = [];
    randomGen();
    flashy(colorStorage);
    resetCounter();
  });


  var userNumber; //Initializes number associated with current user color selection
  j = 0; //j is counter for number of correct user hits, initializes j
  //colorStorage = [0,1,2,3] //Pre-defines arr for testing/debugging

  $('.colors').children().click(function() { //When user presses any color box
    //$('.colors').children().stop(true, true); //In theory disables above, but buggy
    console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
    console.log(j);

    var userColor = $(this).attr('id'); //Currently selected user color

    //Following assigns appropriate number depending on selected userColor
    if (userColor === 'red') {
      userNumber = 0;
    } else if (userColor === 'green') {
      userNumber = 1;
    } else if (userColor === 'blue') {
      userNumber = 2;
    } else { ////current == 3, yellow
      userNumber = 3;
    }

    //Following checks if user: (1 if)got sequence right, (2 else if)got one right, (3 else)wrong
    //////////////////////////////////////////////////////////////////////////////////
    //USER IS RIGHT, PLUS LAST SELECTION IN CURRENT SEQUENCE
    if (j >= colorStorage.length - 1 && userNumber == colorStorage[j]) {
      color = $(this).attr('id');
      console.log('CORRECT & MOVING ON');
      animate(this, userNumber); //Causes glow and sound
      j = 0;
      //Following if means user hasn't won whole game yet, so adds 1 to sequence
      if (colorStorage.length < 20) {
        randomGen();
        setTimeout(function() {flashy(colorStorage)}, 1800);
        console.log('color storage after correct guesses: ' + colorStorage);
      } //End of inner if
      //Following else means user won the game
      else { //WON 20 IN A ROW
        $('.title').html("Congratulations! You won! You rock!");
        colorStorage = [];
      } //End of inner else
    } //END OF FIRST if STATEMENT
    //////////////////////////////////////////////////////////////////////////////////
    //USER IS RIGHT, BUT THERE IS MORE TO CURRENT SEQUENCE
    else if (userNumber == colorStorage[j]) { //GOT IT RIGHT
      //console.log('user selected ' + userNumber + ', compared against: ' + colorStorage[j]);
      console.log('CORRECT');
      color = $(this).attr('id');
      animate(this, userNumber); //Causes glow and sound

      //console.log(color);
      j = j + 1; //To check next user entry
      //console.log('j ends as: ' + j);
    } //END OF else if STATEMENT
    ////////////////////////////////////////////////////////////////////////////////////
    else { //GOT IT WRONG
      console.log('WRONG');
      console.log('epected: ' + colorStorage[j] + ', user put in: ' + $(this).attr('id'));
      //$('.colors').children().stop(); //Couldn't get to work

      //Following alerts user for 2 seconds they got it wrong
      $('.title').html('Oops, try again...');
      setInterval(function() {
        $('.title').html('Akul\'s Simon "Microsoft" Says Game');
      }, 2000)
      
      j = 0; //Resetting j forces user to start inputting from beginning
      
      //Following if statement runs if strict mode is toggled on
      //Forces user to start new game if wrong
      if ( $('.toggler').attr('class') !== 'toggler off' ){
        colorStorage = [];
        randomGen();
      } //End of inner if
      
      flashy(colorStorage); //Reminds user of sequence by re-animating
    } //END OF else STATEMENT AND OF ENTIRE if/else LOOP
    ////////////////////////////////////////////////////////////////////////////////////
    console.log('LAST ENTRY: ' + $(this).attr('id'));
  }) //End of color click method
}) //End of $doc.ready