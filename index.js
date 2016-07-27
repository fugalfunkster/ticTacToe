//minimax tictactoe 
//Oregon Civil War Edition
//thanks to http://neverstopbuilding.com/minimax for the introduction to the minimax algorithm

var humanPlayer, computerPlayer, turn, choice;
var gameBoard = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
var wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

$(document).ready(function(){
  
  newGame();
  
  ///////START A NEW GAME//////////////
  
  function newGame(){
    //console.log("it's a new game!");
    humanPlayer = null;
    computerPlayer= null;
    turn = 1;
    gameBoard = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
    renderGameBoard();
    $('#newGameModal').modal('show');
    return
  }
  
  ///////HANDLE TEAM SELECTION///////////
  
  $('#ducks').on('click', function(){
      humanPlayer = "O";
      computerPlayer = "X";
      //console.log("our players are\nhuman: " + humanPlayer + "\nand computer: " + computerPlayer);
      return takeTurn();
    });
    $('#beavers').on('click', function(){
      humanPlayer = "X";
      computerPlayer = "O";
      //console.log("our players are\nhuman: " + humanPlayer + "\nand computer: " + computerPlayer);
      return takeTurn();
    });  
  
  ////////RENDER GAMEBOARD/////////////
  
  function renderGameBoard(){
    //console.log("rendering gameBoard" + "\n" + gameBoard);
    for(i=0; i < gameBoard.length; i++){
      var tag = "#" + i;
      if(gameBoard[i] === "X"){
        $(tag).html('<img src="http://collegevault.com/wp-content/uploads/2014/11/OSU_cv2.png"/>');
      }
      else if (gameBoard[i] === "O"){
        $(tag).html('<img src="https://s-media-cache-ak0.pinimg.com/originals/cc/2b/50/cc2b50ec1166f2eaa73d9594c1ed198e.jpg"/>');
      }
      else{
        $(tag).html("");
      } 
    }
  }
  
  ///////////TAKE TURN/////////////////
  
  function takeTurn(){

    //console.log("takeTurn called on turn " + turn);
    
    var analysis = gameOver(gameBoard, turn);
    if(analysis){
      $('#gameOverModal').modal('show');
      $('.again').on('click', function(){
        newGame();
      });
      
      if(analysis === "X"){
        $(".winningTeamIcon").html('<img src="http://collegevault.com/wp-content/uploads/2014/11/OSU_cv2.png"/>');
        $(".winningTeam").html("The Beavers Win!");
      }
      else if (analysis === "O"){
        $(".winningTeamIcon").html('<img src="https://s-media-cache-ak0.pinimg.com/originals/cc/2b/50/cc2b50ec1166f2eaa73d9594c1ed198e.jpg"/>');
        $(".winningTeam").html("The Ducks Win!");
      }
      else{
        $(".winningTeam").html("It's a TIE!");
      }
      return
    }
    
    if(turn % 2 === 0){
      if(humanPlayer === "O"){
        //console.log("It's the human's turn");
        acceptUserInput();
      }
      else{
        //console.log("It's the computer's turn");
        minimax(gameBoard, turn);
        gameBoard[choice] = "O";
        //console.log(choice);
        renderGameBoard();
        return nextTurn();
      }
    }
    else{
      if(humanPlayer === "X"){
        //console.log("It's the human's turn");
        acceptUserInput();
      }
      else{
        //console.log("It's the computer's turn");
        if(turn === 1){ 
          randomMove();
        }
        else {
          minimax(gameBoard, turn);
        }
        gameBoard[choice] = "X";
        //console.log(choice);
        renderGameBoard();
        return nextTurn();
      }
    }
  }
  
  ///////RandomMove///////////
  
	function randomMove(){
    var num =  Math.floor(10 * Math.random());
    choice = num;
	}
  
  
 ////////NEXT TURN/////////
  
  function nextTurn(){
    turn = turn + 1;
    takeTurn();
  }
  
  function acceptUserInput(){
    //console.log("acceptUserInput" + humanPlayer);
    $('#0').on('click', function(){
      if(gameBoard[0] !== gameBoard[0]){
        gameBoard[0] = humanPlayer;
        renderGameBoard();
        return nextTurn();
      }
    });
    $('#1').on('click', function(){
      if(gameBoard[1] !== gameBoard[1]){
        gameBoard[1] = humanPlayer;
        renderGameBoard();
        return nextTurn();
      }
    });
    $('#2').on('click', function(){
      if(gameBoard[2] !== gameBoard[2]){
        gameBoard[2] = humanPlayer;
        renderGameBoard();
        return nextTurn();
      }
    });
    $('#3').on('click', function(){
      if(gameBoard[3] !== gameBoard[3]){
        gameBoard[3] = humanPlayer;
        renderGameBoard();
        return nextTurn();
      }
    });
    $('#4').on('click', function(){
      if(gameBoard[4] !== gameBoard[4]){
        gameBoard[4] = humanPlayer;
        renderGameBoard();
        return nextTurn();
      }
    });
    $('#5').on('click', function(){
      if(gameBoard[5] !== gameBoard[5]){
        gameBoard[5] = humanPlayer;
        renderGameBoard();
        return nextTurn();
      }
    });
    $('#6').on('click', function(){
      if(gameBoard[6] !== gameBoard[6]){
        gameBoard[6] = humanPlayer;
        renderGameBoard();
        return nextTurn();
      }
    });
    $('#7').on('click', function(){
      if(gameBoard[7] !== gameBoard[7]){
        gameBoard[7] = humanPlayer;
        renderGameBoard();
        return nextTurn();
      }
    });
    $('#8').on('click', function(){
      if(gameBoard[8] !== gameBoard[8]){
        gameBoard[8] = humanPlayer;
        renderGameBoard();
        return nextTurn();
      }
    });
  }
  
  
  ///////SCORE THE GAME _ WHO WON?/////////
  
  function score(game){
    for(var i = 0; i < wins.length; i++){
      var winCheck = wins[i].map(function(third){
        return game[third];
      });
      //console.log(winCheck);
      if(winCheck[0] === winCheck[1] && winCheck[0] === winCheck[2]){
        return(winCheck[0]);
        i = wins.length;
      }
    }
    return false;
  }

  //////////GAME OVER CHECK/////////////
  
  function gameOver(game, turn){
    if(turn >= 5){
        var winner = score(game);
          if(turn === 10 && winner === false){
              return "cat";
          }
          else{
            return winner;
          }
      }
      else {
        return false;
      }
  }

  ///////CALCULATE THE AVAILABLE MOVES////////////
  
  function availMoves(game){
     var moves = [];
     for(var i = 0; i < game.length; i++){
        if(typeof game[i] !== "string"){
            moves.push(i)
          }
     }
     return moves;
  }

  /////////MINIMAX ALGORITHM///////////

  function minimax(game, turn){
    //console.log("minimax called with the game:" + "\n" + game + "\n" + "On turn: " + turn);
    // is the game over?
    var endState = gameOver(game, turn);
	if(endState){
        //console.log("Game Over, " + endState + " wins!");
        return endState;
   	}
    // create a scores and moves array
    var scores = [];
    var moves = [];
    
    //what are the possible moves?
    var possibleMoves = availMoves(game);
    //console.log("Possible Moves include: " + possibleMoves);
    
    possibleMoves.forEach(function(move){
        var possibleGame = game;
        var currentPlayer;
        var currentTurn = turn;
        if(currentTurn % 2 === 0){
            currentPlayer = "O";
        }
        else{
            currentPlayer = "X";
        }
        //console.log(currentPlayer + " moves on " + move);
        possibleGame[move] = currentPlayer;
        currentTurn = currentTurn + 1;
        scores.push(minimax(possibleGame, currentTurn));
    	moves.push(move);
        //console.log("scores array:" + "\n" + scores + "\n" + "moves array:" + "\n" + moves);
        possibleGame[move] = NaN;
    });       
    
    if(turn % 2 === 0){
        var rankedScores = scores.map(function(each){
        	if(each === "O"){
            	return (10 - turn);
            }
            else if(each === "X"){
            	return (turn - 10);
            }
            else{
            	return 0;
            }
        });
        //console.log(rankedScores);
        var value = rankedScores.reduce(function(a, b){
        	if(b >= a){
                return b;
            }
            else{
                return a;
            }
        });
		//console.log(value);
        var max = rankedScores.lastIndexOf(value);
        //console.log(max);
        //console.log("The best move for O is " + moves[max]);
        choice = moves[max];
		return scores[max];
        
    }
    else{
        var rankedScores = scores.map(function(each){
        	if(each === "O"){
            	return  (turn - 10);
            }
            else if(each === "X"){
            	return (10 - turn);
            }
            else{
            	return 0;
            }
        });
        //console.log(rankedScores);
        var value = rankedScores.reduce(function(a, b){
        	if(b >= a){
                return b;
            }
            else{
                return a;
            }
        });
		//console.log(value);
        var max = rankedScores.lastIndexOf(value);
        //console.log(max);
        //console.log("The best move for X is " + moves[max]);
        choice = moves[max];
        return scores[max];
    }
  }
  
});
