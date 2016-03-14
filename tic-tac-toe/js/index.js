/*Images:
http://s20.postimg.org/idjx1z98t/image.png
http://s20.postimg.org/8rqcloi31/placeholdero.png
http://s20.postimg.org/kksr3n3wt/placeholderx.png
http://s20.postimg.org/utgmvq2kt/image.png
http://s20.postimg.org/bguc372bx/bluex.png
*/

$(document).ready(function () {
  ////////////////////////////////////////////////////////////
  //logic functions for computer turn/////////////////////////
  ////////////////////////////////////////////////////////////
  var allCombos = {'H1':[], 'H2':[], 'H3':[], 
                   'V1':[],'V2':[], 'V3':[],
                   'D1':[],'D2':[]};
  var horArr = ['H1', 'H2', 'H3'];
  var vertArr = ['V1', 'V2', 'V3'];
  var diagArr = ['D1', 'D2'];

  var corner = ['A1', 'A3', 'A7', 'A9'];

  var currentCompMoveID;

  var winCombos = jQuery.extend({}, allCombos); //creates clone, no effect to original
  var defenseArr = jQuery.extend({}, allCombos); //would add parameter 'true' to beginning to make deep copy
  //var compSymb = 'X';
  //var userSymb = 'O';
  //////////////////////////////////////////////////////////////////////
  function loss() {
    for (set in allCombos) {
      var lossArray = allCombos[set];
      if (lossArray[0] == userSymb && lossArray[1] == userSymb && lossArray[2] == userSymb) {
        return true;
      } //end of if( &&  && )
    } //end of for( in )
  } //end of loss() function
  function checkTie() {
    /*
    for (set in allCombos) {
      //console.log(allCombos[set])
      var thisArray = allCombos[set];
      console.log('set: ' + set);
      console.log(thisArray)
      var testerVarComp = thisArray.indexOf(compSymb);
      var testerVarUser = thisArray.indexOf(userSymb);
      if (testerVarComp !== -1 && testerVarUser !== -1) { //has X and O
        //then loop through next one
        console.log('had BOTH x and o')
      }
      else { //doesn't have X or O
        console.log('DOESNT have x or o')
        return false;
      } //end of if/else
    } //end of for (.. in.. )
    return true; //in case all have X and O
    */

    if (possibleBoxes.length < 1) {
      return true;
    }
  } //end of checkTie()

  /////////////////////////////////////////////////////////////////
  function checkWin() {
    for (set in winCombos) {
      //console.log(allCombos[set])
      var thisArray = winCombos[set];
      console.log('set: ' + set);
      console.log(thisArray);
      var testerVarUser = thisArray.indexOf(userSymb); 
      if (testerVarUser !== -1) { //deletes arrays with user mark
        delete winCombos[set];
        console.log(winCombos);
      } //end of if()
      else if (thisArray[0] == compSymb && thisArray[1] == compSymb) { //checks for winning arrs

        $('.' + set).each(function(i, obj) {
          if ( $.inArray( $(this).attr('id'), possibleBoxes ) !== -1) {
            currentCompMoveID = $(this).attr('id');
            //compPlacement();
          } //end of if(  )
        }) //end of set.each()
        //console.log('WIN TESTER, ID: ' currentCompMoveID);
        return true;
      } //end of else if() 
    } //end of for (.. in ..)
  } //end of checkWin()
  ///////////////////////////////////////////////////////////////
  function defense() {
    console.log('defense function')
    console.log(allCombos);
    for (set in defenseArr) {
      //console.log(allCombos[set])
      var thisArray = defenseArr[set];
      console.log('set: ' + set);
      console.log(thisArray);
      var testerVarUser = thisArray.indexOf(userSymb); 
      var testerVarComp = thisArray.indexOf(compSymb);
      if (testerVarComp !== -1) { //deletes arrays with comp mark
        delete defenseArr[set];
        console.log('defense if statement activated')
        console.log(defenseArr);
      } //end of if()
      else if (thisArray[0] == userSymb && thisArray[1] == userSymb){ //checks for losing arrs
        console.log('defense function else if statement activated');
        var thisSet = set;

        $('.' + set).each(function(i, obj) {
          console.log('-----defense correction----');
          console.log($(this).attr('id'));
          var checkExistense = $.inArray( $(this).attr('id'), possibleBoxes );
          console.log(checkExistense);          
          if ( checkExistense !== -1  ) {
            console.log('if statement activated, is in possibleBoxes[]');
            console.log( $.inArray( $(this).attr('id') ) );
            currentCompMoveID = $(this).attr('id');
            //compPlacement();
          } //end of if(  )
        }) //end of set.each()

        return true;
      } //end of else if()
    } //end of for (.. in ..)
  } //end of defesne()
  /////////////////////////////////////////////////////////////
  function cleverestAttack() {
    if (possibleBoxes.length !== 7) {
      return false;
    }

    console.log('troubleshoot clever');
    var cornersObj = {'A1':'A9', 'A3':'A7', 'A7':'A3', 'A9':'A1'};
    for (idCheck in cornersObj) {
      var neg1check = $.inArray(idCheck, possibleBoxes);
      if (neg1check === -1) {
        currentCompMoveID = cornersObj[idCheck];
        return true;
      } //end of if()
    } //end of for(idCheck)

  } //end of cleverestAttack()
  //////////////////////////////////////////////////////////////
  function bestDefenseIsOffense() {
    if (possibleBoxes.length !== 6) {
      return false;
    }
    console.log('better check OXO and XOO');
    var UCU = [userSymb, compSymb, userSymb];
    console.log(UCU);
    console.log(allCombos['D2']);
    if ( (allCombos['D2'][0] === userSymb && allCombos['D2'][0] === userSymb) || (allCombos['D1'][0] === userSymb && allCombos['D1'][0] === userSymb)){
      console.log('else if OXO activated');
      if (currentCompMoveID === 'A5') {
        currentCompMoveID = 'A2';
        return true;
      }
      else {
        currentCompMoveID = 'A3';
        return true;
      }
    } //end of else if( || )

    /*
    var simplerCornersObj = {'A1':'A3', 'A7':'A9'}

    for (key in simplerCornersObj) {
      var neg1check = $.inArray(key, possibleBoxes);
      if (neg1check === -1) {
        var neg2check = $.inArray( simplerCornersObj[key], possibleBoxes )
        if (neg2check === -1) {
          //currentCompMoveID = 
          return true;
        } //end of inner if()
      } //end of outer if()
    } //end of for(key)*/

  } //end of bestDefenseIsOffense()
  //////////////////////////////////////////////////////////////
  function secondaryDefense() { // if 1 horiz and 1 vert have user mark
    for (i = 0; i < 3; i++) {
      console.log('iiiiiiiiiiouter for loop with i iiiiiiiiiiiii: ' + i)
      var thisVert = vertArr[i]; //i.e. H1, or H2, or H3
      //var thisHor = horArr[i]; //i.e. V1

      if( defenseArr.hasOwnProperty(thisVert) ) {
        var thisVertObjArr = defenseArr[thisVert]; //i.e. val[] of key/val pair
        //var thisHorObjArr = defenseArr[thisHor]; //i.e. val[] of key/val pair

        console.log(thisVertObjArr)
        var verZero = thisVertObjArr[0]; //1st value inside val[]
        //var horZero = thisHorObjArr[0]; ////1st value inside val[]

        /*
       console.log('INSIDE SECONDARY DEFENSE i =  ' + i);
       console.log(defenseArr);
       console.log('thisVert:');
       console.log(thisVert);
       console.log('defenseArr[thisVert]:')
       console.log(defenseArr[thisVert]);
       console.log('USING VARS:')
       var dA = defenseArr[thisVert];
       console.log(dA);
       var dAO = dA[0];
       console.log(dAO);
       console.log('-----------------')
       console.log('[userSymb]');
       console.log([userSymb])
       console.log(defenseArr[thisVert[0]]);
       console.log('userSymb: ' + userSymb);
       */

        if (verZero === userSymb){ //&& defenseArr[thisHor[0]] === userSymb) {
          console.log('1st secondaryDefense if statement activated');
          console.log('vertical col exists with just one O');
          //////////////PASSED 1ST IF SECONDARY DEFENSE CHECK///////////////////////
          for (j = 0; j < 3; j++) { //shifting to check horizontal sets
            console.log('------inner for loop with j activated--------' + j);
            var thisHor = horArr[j]; //i.e. V1, or V2, or V3

            if ( defenseArr.hasOwnProperty(thisHor) ) { //checks if object has key
              var thisHorObjArr = defenseArr[thisHor]; //i.e. val[] of key/val pair
              console.log(thisHorObjArr);
              var horZero = thisHorObjArr[0]; ////1st value inside val[]
              console.log('repair secondaryDefense');
              console.log('thisHor: ' + thisHor);
              console.log('thisVert: ' + thisVert);


              if (horZero === userSymb){
                console.log('2nd (inner) secondaryDefense if statement activated');
                console.log('horizonatl col exists with just one O as well')

                /////////check that they are different/////////
                var horArrCompare = [];
                $('.' + thisHor).each(function(i,obj) {
                  console.log('i: ' + i);
                  //console.log('obj: ' + obj);
                  var thisHorID = $(this).attr('id');
                  console.log('thisID: ' + thisHorID);
                  horArrCompare.push(thisHorID);
                })

                var vertArrCompare = [];
                $('.' + thisVert).each(function(i,obj) {
                  console.log('i: ' + i);
                  //console.log('obj: ' + obj);
                  var thisVertID = $(this).attr('id');
                  console.log('thisID: ' + thisVertID);
                  vertArrCompare.push(thisVertID);
                })

                console.log('vertArrCompare: ' + vertArrCompare);
                console.log('horArrCompare: ' + horArrCompare);

                //find shared value bet. two above arrays
                for(i = 0; i < 3; i++) {
                  var compareHorID = horArrCompare[i];
                  var checkStorageArr = $.inArray(compareHorID, possibleBoxes);
                  var checkVertArrCompare = $.inArray(compareHorID, vertArrCompare);
                  if (checkStorageArr === -1 && checkVertArrCompare === -1) {
                    console.log('success');

                    //Find shared value between 2 sets, tell comp to place mark there
                    for (k = 0; k < 3; k++){
                      console.log('k: ' + k)
                      var sameHorID = horArrCompare[k];
                      var checkVertValID = $.inArray(sameHorID, vertArrCompare);
                      console.log('sameHorID: ' + sameHorID);
                      console.log('vertArrCompare: ' + vertArrCompare);
                      console.log('checkVertValID: ' + checkVertValID);
                      if (checkVertValID !== -1) {
                        currentCompMoveID = sameHorID;
                        console.log('true');
                        return true;
                      } //end of if()
                    } //end of for(k)

                    //return true;
                  } //end of if()
                } //end of for(i)

                //return true;
              } //end of inner most if(hor test passed)
            } //end of if(hor has key)
          } //end of inner for(j) loop
        } //end of middle if(vert test passed)
      } //end of if(vert has key)
    } //end of for(i) loop
  } //end of secondaryDefense()
  /////////////////////////////////////////////////////////////
  function secondaryWin() { //if 1 horiz and 1 vert have comp mark
    for (i = 0; i < 3; i++) {
      console.log('WINiiiiiiiiiiouter for loop with i iiiiiiiiiiiii: ' + i)
      var thisVert = vertArr[i]; //i.e. H1, or H2, or H3
      //var thisHor = horArr[i]; //i.e. V1

      if( winCombos.hasOwnProperty(thisVert)) {
        var thisVertObjArr = winCombos[thisVert]; //i.e. val[] of key/val pair
        //var thisHorObjArr = defenseArr[thisHor]; //i.e. val[] of key/val pair
        var verZero = thisVertObjArr[0]; //1st value inside val[]
        //var horZero = thisHorObjArr[0]; ////1st value inside val[]


        if (verZero === compSymb){ //&& winCombos[thisHor[0]] === userSymb) {
          console.log('1st secondaryWin if statement activated');
          console.log('vertical col exists with just one X')
          //////////////PASSED 1ST IF SECONDARY WIN CHECK///////////////////////
          for (j = 0; j < 3; j++) { //shifting to check horizontal sets
            console.log('------inner for loop with j activated--------' + j);
            var thisHor = horArr[j]; //i.e. V1, or V2, or V3

            if ( winCombos.hasOwnProperty(thisHor) ) { //checks if object has key
              var thisHorObjArr = winCombos[thisHor]; //i.e. val[] of key/val pair
              console.log(thisHorObjArr);
              var horZero = thisHorObjArr[0]; ////1st value inside val[]
              if (horZero === compSymb){
                console.log('2nd (inner) sondaryWin if statement activated');
                console.log('horizontal col exists with just one X as well')

                /////////check that they are different/////////
                var horArrCompare = [];
                $('.' + thisHor).each(function(i,obj) {
                  console.log('i: ' + i);
                  //console.log('obj: ' + obj);
                  var thisHorID = $(this).attr('id');
                  console.log('thisID: ' + thisHorID);
                  horArrCompare.push(thisHorID);
                })

                var vertArrCompare = [];
                $('.' + thisVert).each(function(i,obj) {
                  console.log('i: ' + i);
                  //console.log('obj: ' + obj);
                  var thisVertID = $(this).attr('id');
                  console.log('thisID: ' + thisVertID);
                  vertArrCompare.push(thisVertID);
                })

                console.log('vertArrCompare: ' + vertArrCompare);
                console.log('horArrCompare: ' + horArrCompare);

                //find shared value bet. two above arrays
                for(i = 0; i < 3; i++) {
                  var compareHorID = horArrCompare[i];
                  var checkStorageArr = $.inArray(compareHorID, possibleBoxes);
                  var checkVertArrCompare = $.inArray(compareHorID, vertArrCompare);
                  if (checkStorageArr === -1 && checkVertArrCompare === -1) {
                    console.log('success');


                    //Find shared value between 2 sets, tell comp to place mark there
                    for (k = 0; k < 3; k++){
                      var sameHorID = horArrCompare[k];
                      var checkVertValID = $.inArray(sameHorID, vertArrCompare);
                      if (checkVertValID !== -1) {
                        currentCompMoveID = sameHorID;
                        return true;
                      } //end of if()
                    } //end of for(k)

                    //return true;
                  } //end of if()
                } //end of for(i)

                //return true;
              } //end of inner most if(hor test passed)
            } //end of if(hor has key)
          } //end of inner for(j) loop
        } //end of middle if(vert test passed)
      } //end of if(vert has key)
    } //end of for(i) loop
  } //end of secondaryWin()
  /////////////////////////////////////////////////////////////
  function checkMiddle() {
    console.log('checkMiddle function');
    if ( $.inArray('A5', possibleBoxes) !== -1) { //true if empty
      console.log('middle is empty');
      currentCompMoveID = 'A5';
      return true; 
    } //end of if()
    //return false;
  } //end of checkMiddle()
  /////////////////////////////////////////////////////////////
  function randomCorner() {
    console.log('randomCorner function');
    var greaterThan0 = [];
    $('.C').each(function run (i, obj) {
      //console.log( $('.C').html() );
      var ifEmpty = $(this).attr('id');
      console.log(ifEmpty);
      if( $.inArray(ifEmpty, possibleBoxes) !== -1) {
        console.log(i + ' is empty!!');
        greaterThan0.push(ifEmpty)
      }
    })
    if (greaterThan0.length > 0){
      currentCompMoveID = greaterThan0[0];
      return true;
    }
  }
  /////////////////////////////////////////////////////////////
  function theRest() {
    console.log('theRest function');
    //get computer to place using an array of left over spots
    currentCompMoveID = possibleBoxes[0];
  }

  ////////////////////////////////////////////////////////////
  ////////end of logic functions for computer AI//////////////
  ////////user click logic start//////////////////////////////
  ////////////////////////////////////////////////////////////

  $('#gameBoard').hide();
  $('#secondSelection').hide();
  $('.message').hide();
  //$('.restart').hide();
  var userSymb;
  var userImageURL;
  var firstMove;
  var userImageURLobject = {'http://s20.postimg.org/idjx1z98t/image.png':'http://s20.postimg.org/8rqcloi31/placeholdero.png','http://s20.postimg.org/bguc372bx/bluex.png':'http://s20.postimg.org/kksr3n3wt/placeholderx.png'};
  var compImageURL;
  var compSymb;

  $('.XorO').click(function() {
    userSymb = $(this).attr('id');
    console.log('userSymb; ' + userSymb);
    userImageURL = $(this).attr('src');
    console.log('userImageURL: ' + userImageURL);
    if (userSymb === 'X') {
      compSymb = 'O';
      compImageURL = $('#O').attr('src');
    }
    else {
      compSymb = 'X';
      compImageURL = $('#X').attr('src');
    }
    console.log('compImageURL: ' + compImageURL);

    $('#secondSelection').show();
    $(this).parent().hide();
  })

  var userPref;
  $('#secondSelection').children('button').click(function() {
    //following depends on what user chose
    userPref = $(this).attr('id');

    if (userPref == 'random') {
      var numnum = Math.floor( 2*( Math.random() ) );
      console.log('numnum: ' + numnum);
      if (numnum == 0) {
        userPref = 'userFirst';
      }
      else {
        userPref = 'compFirst';
      }
    } //end of if(random)


    $(this).parent().hide();
    $('.box').attr('src', userImageURLobject[userImageURL]);
    $('#gameBoard').show();
    compGoesFirst();
  }) //end of function(user || comp first)



  function compGoesFirst() {
    console.log('COMPGOESFIRST');
    if (userPref === 'compFirst') {
      currentCompMoveID = 'A5';
      compPlacement();
    }
  }

  var possibleBoxes = ['A1','A2','A3','A4','A5','A6','A7','A8','A9'];

  $('.box').click(function() {
    var currentBox = $(this).attr('id');
    if ( $.inArray(currentBox, possibleBoxes) !== -1 ) {

      console.log('its a new box');
      $(this).attr('src', userImageURL);
      //following removes from allowed clickable spaces arr
      possibleBoxes = $.grep(possibleBoxes, function(value, i) {
        return ( value !== currentBox );
      }); //end of $.grep

      //following adds to master object allCombos{}
      var currentSets = $(this).attr('sets'); 
      var setsArr = currentSets.split(' ');
      console.log('setsArr:')
      console.log(setsArr);
      $(setsArr).each(function(i, val) {
        console.log('val:');
        console.log(val);
        //var combosArr = allCombos[val];
        //console.log('combosArr:');
        //console.log(combosArr);
        allCombos[val].push(userSymb);
        console.log(allCombos);
      })

      compTurn();
    }// end of if()
    console.log(possibleBoxes);
    console.log(allCombos);
    console.log('end of user Click');

  }) //end of user choosing placement func
  //////////////////////////////////////////////////////////////////////
  //////end of user click logic/////////////////////////////////////////
  ////////////////////start of computer executcion/////////////////////

  function compPlacement() {
    console.log('COMPPLACEMENT HAS RUN')
    $('#' + currentCompMoveID).attr('src', compImageURL);

    //following removes from allowed clickable spaces arr
    possibleBoxes = $.grep(possibleBoxes, function(value, i) {
      return ( value !== currentCompMoveID );
    }); //end of $.grep
    console.log(possibleBoxes)

    //following adds to master object allCombos{}
    var currentSets = $('#' + currentCompMoveID).attr('sets'); 
    var setsArr = currentSets.split(' ');
    console.log('setsArr:')
    console.log(setsArr);
    $(setsArr).each(function(i, val) {
      console.log('val:');
      console.log(val);
      //var combosArr = allCombos[val];
      //console.log('combosArr:');
      //console.log(combosArr);
      allCombos[val].push(compSymb);
      console.log(allCombos);
    })

  } //end of compPlacement()


  function compTurn() {
    console.log('COMPTURN HAS RUN');
    
    if (loss()) {
      $('.message').html('YOU\'VE BEAT ME THIS TIME - CLICK HERE TO PLAY AGAIN');
      $('.message').show();
      $('.restart').show();
      return;
    }
    else if (checkTie()){
      console.log("we're at a TIE");
      //$('#hashTag').attr('src','');
      $('.message').html('TIE, WE\'RE AT AN IMPASSE');
      $('.message').show();
      $('.restart').show();
      return;
    }
    else if (checkWin()) {
      //console.log("NO tie");
      //$('#hashTag').attr('src','');
      console.log("YOU HAVE BEEN DEFEATED"); //mark winning box
      $('.message').html('YOU HAVE BEEN DEFEATED, CLICK HERE TO RESTART');
      compPlacement();
      $('.message').show();
      //$('.restart').show();
      //return;
    }
    else if(bestDefenseIsOffense()) {
      console.log('BESTDEFENSEISOFFENSE ACTIVATED');
    }
    else if (defense()) {
      defense();
      console.log('defensive measures taken'); //mark to protect from user win
      //console.log('thisSet' + thisSet);
    }
    else if (secondaryDefense()) {
      console.log('SECONDARYD DEFENSE activated');
    }
    else if(cleverestAttack()) {
      console.log('CLEVEREST ATTACK ACTIVATED');
    }
    
    else if (secondaryWin()) {
      console.log('SECONDARY WIN activated');
    }
    else if (checkMiddle()) {
      console.log('need to put comp mark in middle square');
    }
    else if (randomCorner()) {
      console.log('need to put in random corner');
    }
    else {
      theRest()
      console.log('we"re at the bottom of the barrel');
    }

    compPlacement();

    if (possibleBoxes.length < 1) {
      //checkTie();
      $('.message').html('TIE, WE\'RE AT AN IMPASSE - CLICK HERE TO RESTART');
      $('.message').show();
      $('.restart').show();
      return;
    } //end of if(tie)

  } //end of compTurn()

}) //end of $doc.ready

//$(document).delegate('.message','click',function(){});