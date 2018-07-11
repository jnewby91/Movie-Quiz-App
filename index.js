//Need a specific place to store each question for the quiz
const STORE = [
	{
		questions:
			'In this 1990s comedy, unorthodox parental skills teach a child to pee on buildings, throw sticks at skaters, and become an expert at spelling hippopotamus. This movie is called:  ',
		answers: [
			'The Problem Child',
			'Dennis the Menace',
			'Big Daddy',
			'Good Will Hunting',
		],
		correctAnswer: 2,
		poster: 'https://media.giphy.com/media/pPNsdYwjC7GDu/giphy.gif',
	},
	{
		questions:
			'War Dogs, a 2016 drama/crime film, Jonah Hill extends a job offer to a childhood friend to make a fortune. What type of work did this lucrative job offer entail?  ',
		answers: [
			'Trading Government Stocks on Wall Street',
			'Running an Underground in Vegas',
			'Securing Weapons from a Website',
			'Drug Trafficking in Mexico',
		],
		correctAnswer: 2,
		poster:
			'http://www.themovieblog.com/wp-content/uploads/2016/08/share-752x440.jpg',
	},
	{
		questions:
			'In Lion King, Nala and Simba find themselves in danger after going to a forbidden area of the land. What animal tried to eat them? How many were there?:  ',
		answers: [
			'They were surrounded by three Hyenas',
			'They were surrounded by four Hyenas',
			'They were surrounded by three Crocodiles',
			'They were surrounded by four Crocodiles',
		],
		correctAnswer: 0,
		poster:
			'https://78.media.tumblr.com/b84b2a81db176f4abfe03d838d0d2a83/tumblr_o0m3vr5E1C1rr5qhqo1_540.gif',
	},
	{
		questions:
			'In this 1990s, Romance/Drama, Kathleen a struggling bookseller competes with John, a corporate books store owner across the street. Throughout the movie Kathleen loathes John yet in the end of the movie both fall in love. What movie is this?  ',
		answers: [
			'10 Things I Hate About You',
			'Cinderella',
			'You’ve Got Mail',
			'Sleepless in Seattle',
		],
		correctAnswer: 2,
		poster:
			'http://img.moviepostershop.com/youve-got-mail-movie-poster-1998-1020231250.jpg',
	},
	{
		questions:
			'I Know What You Did Last Summer involved gruesome murders of surrounding a group of guilty teens. What terrible crime was committed that drove the killers ill intent?   ',
		answers: [
			'Kidnapping a Senior Citizen for Fun',
			'A Hit and Run after a Night of Fun',
			'JAYWalking during Rush Hour',
			'Dog Fighting in a underground pin',
		],
		correctAnswer: 1,
		poster: 'https://media.giphy.com/media/wplc4TAAnnDfa/giphy.gif',
	},
];

let counter = 0;
var correctScore = 0;
let incorrectScore = 0;
let status = 1;

//Start screen should have a button that users click to start quiz
/*function showStartScreen(){


}*/
//Function below listen for the button to start quiz and then hides the start page 
//and presents questions 
function startQuiz() {
	$('#start').click(function(event) {
		event.preventDefault();
		$('.page').hide();
		renderQuestions();
	});
}




//Users should be prompted through a series of at least 5 multiple choice questions
/*When the start quiz button is clicked. The previous screen is replaced with the first question of the quiz */

function renderQuestions() {
	console.log('renderQuestions function has started');
	const testQuestion = STORE[counter].questions;
	$('.question').html(`<div class="testQuestion"> ${testQuestion}</div>`);
	generateAnswers(STORE[counter].answers);
	$('.questionForm').append(
		'<button type="submit" name="submitQuestion" id="renderButton"> Submit </button>'
	);
}

function nextQuestionListener() {
	$('.questionContainer').on('click', '#nextQuestion', function(event) {
		if (STORE.length - 1 === counter) {
			showFinalPage();
			restartQuiz();
		} else {
			changeQuestion();
			renderQuestions();
		}
	});
}

//Users should be asked questions 1 after the other and should only be prompted with one question at a time

function generateAnswers(multiplechoice) {
	const item = multiplechoice.map(function(answer, index) {
		$('.question').append(
			`<label for='answer'>
        <input for='answer' type="radio" name="answers" data-attr="${index}" required> ${answer} </label> 
        <br> `
		);
	});
	return item;
}



function selectedAnswer() {
	$('.questionForm').submit(function(event) {
		event.preventDefault();
		var selectedItem = $('.question')
			.find('input:radio:checked')
			.attr('data-attr');
		var answerIndex = STORE[counter].correctAnswer;
		console.log(selectedItem);
		console.log(answerIndex);
		if (
			parseInt(selectedItem, 10) === STORE[counter].correctAnswer &&
			counter < STORE.length
		) {
			ifCorrectAnswer(selectedItem, answerIndex);
		} else if (
			parseInt(selectedItem, 10) !== STORE[counter].correctAnswer &&
			counter < STORE.length
		) {
			ifIncorrectAnswer(selectedItem, answerIndex);
		}
		return false;
	});
	nextQuestionListener();
}

//After each question User should see a feedback page if their answer is right or wrong


//If answer is Correct the function below is ran in selectedAnswer function above 
function ifCorrectAnswer(selectedItem, answerIndex) {
	$('.questionForm').find('#renderButton').remove();
	$('.question').html(`<h1> Correct Answer!!!</h1><img src="${STORE[counter]
		.poster}" alt="movie poster image" />
        <p> The CorrectAnswer is ${STORE[counter].answers[
					answerIndex
				]}<br> Cool. Get Ready for the next question.
        <br>
        <button name='nextQuestion' id='nextQuestion'>Next</button>
    </div>`);
	changecorrectScore();
}


//If answer is Incorrect the function below is ran in selectedAnswer function above 

function ifIncorrectAnswer(selectedItem, answerIndex) {
	$('.questionForm').find('#renderButton').remove();
	$('.question').html(`<h1> Incorrect Answer...</h1> <img src="${STORE[counter]
		.poster}" alt="movie poster image"/>
    <p> The CorrectAnswer is ${STORE[counter].answers[
			answerIndex
		]}.<br> You chose ${STORE[counter].answers[
		selectedItem
	]}. <br> Click Button below to move on.
      <button name='nextQuestion' id='nextQuestion'>Next</button>
          </div>`);
	changeIncorrectScore();
}

//function will change the question after answer is submitted
function changeQuestion() {
	counter++;
	status++;
	questionNumber();
}

//function will change the Correct Score after answer is submitted
function changecorrectScore() {
	correctScore++;
	answerStatus();
}

//function will change the Incorrect Score after answer is submitted
function changeIncorrectScore() {
	incorrectScore++;
	answerStatus();
}

//Users should be able to see what question they are on in the quiz
function questionNumber() {
	console.log(' questionNumber function was just ran');
	$('.questionNumber').html(`Question ${status} of 5`);
}

//Users should be able to see how many questions are correct and incorrect on the quiz
function answerStatus() {
	console.log('answerStatus function was just ran');
	$('.score').html(
		`You have a correct score of:<span class="scoreNumber"><strong> ${correctScore}</strong></span> <br> You have a incorrect score of:<span class="scoreNumber"><strong> ${incorrectScore}</strong></span>`
	);
}


//When quiz is finished a results page with score total is shown in the DOM and there is a option to start the quiz over
function showFinalPage() {
	$('.question')
		.html(`<h1> End of Quiz..</h1><p>  You got ${correctScore} questions correct.
      You got ${incorrectScore} questions Incorrect.
       <button name ='restart' id='restartButton'>
      Restart Quiz</button>
          </div>`);
}

//function runs to restart the Quiz 

function restartQuiz() {
	$('main').on('click', '#restartButton', function(event) {
		location.reload();
	});
}


//the function below will be responsible for activating all functions above
function quizApp() {
	startQuiz();
	questionNumber();
	answerStatus();
	selectedAnswer();
}

$(quizApp);

//Could enter all the pages of the quizApp into HTML and assign each page a hidden class
//When user clicks a button it toggles a class to be activated and move on to the new page
