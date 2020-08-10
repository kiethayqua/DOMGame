/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying; // bien gamePlaying giu trang thai cua game

// khoi tao gia tri ban dau cho game
init();
// xu li khi an nut roll

var lastDice;
var inputScore;
document.querySelector('.input-score').addEventListener('change', function(){
	inputScore = document.querySelector('.input-score').value;
	console.log(inputScore);
});

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){

		// 1. Random dice
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		// 2. Hien thi xuc xac
		var dices = document.getElementsByClassName('dice');
		dices[0].style.display = 'block';
		dices[1].style.display = 'block';
		dices[0].src = 'dice-' + dice1 + '.png';
		dices[1].src = 'dice-' + dice2 + '.png';

		// 3. Cap nhat round score, neu quay vao 1 thi chuyen luot
		if(dice1 !== 1 && dice2 !== 1){
			roundScore += (dice1 + dice2);
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		}else{
			// Chuyen player
			nextPlayer();
		}
	}	
});

// xu li khi an hold
document.querySelector('.btn-hold').addEventListener('click', function(){

	if(gamePlaying){
		// reset lastDice
		lastDice = 0;

		// them diem thanh diem chinh thuc
		scores[activePlayer] += roundScore;

		// hien thi diem
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// xu li chien chien thang
		if(inputScore ? scores[activePlayer] >= inputScore : scores[activePlayer] >= 100){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementsByClassName('dice')[0].style.display = 'none';
			document.getElementsByClassName('dice')[1].style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}else{
			//Next Player
			nextPlayer();
		}
	}
});

// xu li new game
document.querySelector('.btn-new').addEventListener('click', init);


function init(){
	scores = [0, 0]; // diem cua moi Player
	roundScore = 0;
	activePlayer = 0;// Player1, =1 la Player2
	gamePlaying = true;

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// xoa class winner de reset UI
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	
	// Reset lai name cua Player
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	// Reset lai player active
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	// Reset lai input score
	document.querySelector('.input-score').value = '';

	var dices = document.getElementsByClassName('dice');
	dices[0].style.display = 'none';
	dices[1].style.display = 'none';
}

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	// Reset round score
	roundScore = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	// red dot hien thi player dang active
	// toggle, neu co class ton tai thi xoa, khong co thi them
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-0-panel').classList.add('active');

	// an xuc xac khi chuyen luot
	document.getElementsByClassName('dice')[0].style.display = 'none';
	document.getElementsByClassName('dice')[1].style.display = 'none';
}


/**************************************** CODING CHALLENGES **************************************/
// 1. Nguoi choi mat diem khi roll 2 lan 6, luot cua nguoi tiep theo 
// 2. Them 1 input cho nguoi dung nhap so diem thang cuoc
// 3. 2 xuc xac





/***************************** CODE INTRO ***************************************************/

//document.querySelector('#current-0').textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
