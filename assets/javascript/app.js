		//Game Variables

		var correct = 0;
		var incorrect = 0;
		var unanswered = 0;
		var questionNumber = 0;

		//Questions:
		var questions =[

			question1 = {
			"question": "What actor played in both Star Wars and Star Trek?",
			"answers": [
				"Brent Spire",
				"LaVar Burton",
				"Robert Picardo",
				"Katherine Mulgrew"
			]
			},

			question2 = {
			"question": "What star Wars movie was originally two episodes of a TV show?",
			"answers": [
				"Star Wars: The Clone Wars", 
				"Star Wars Episode 1: The Phantom Menace",
				"Rouge One: A Star Wars Story",
				"Star Wars: Han and Chewie go back in time"
			]
			},

			question3 = {
			"question": "What is the name of Genral Greivous' flagship?",
			"answers": [ 
				"Malevolence", 
				"Harbinger",
				"Dominance",
				"Executor"
			]
			},
				
			question4 = {
			"question": "Before his appearance in the game Force Unleased, Starkiller was originally the name of what character?",
			"answers": [
				"Luke Skywalker",
				"Anikan Skywalker",
				"Senator/Emporer Palpatine",
				"Leia Organa"
			]
			},

			question5 = {
			"question": "Before there appearance in Star Wars: The Clone Wars, the Bendu were the original name for what organization?",
			"answers": [
				"The Sith Empire",
				"The Galactic Republic",
				"The Rebel Alliance",
				"The Jedi Order"
			]
			},

			question6 = {
			"question": "What Planet from the Knights of The Old Republic was made cannon by the Clone Wars and Rebels TV show?",
			"answers": [
				"Jakul",
				"Naboo",
				"Alderan",
				"Mandalore"
			]
			},

			question7 = {
			"question": 'Speaking of Mandalore... What character is also known as "The Last Mandalorian?"',
			"answers": [
				"Sabine",
				"Mandalore the Great",
				"Boba Fett",
				"Asoka Tano"
			]
			},

			question8 = {
			"question": "What character has appeared in every Star Wars movie?",
			"answers": [
				"Chewbacca",
				"R2D2",
				"Darth Vader",
				"Leia Organa"
			]
			},

		];			

		//array of correct answers to check against
		var correctAnswers = ["Brent Spire","Star Wars: The Clone Wars","Malevolence","Luke Skywalker","The Jedi Order","Mandalore","Boba Fett","R2D2"  ];
		

		$(document).ready(function() {

			var i=0;
			number= 15;
			var counter;
			var triviaInterval;


			function secondCounter(){
				counter = setInterval(decrement, 1000);
			}


		    function decrement() {

				//  Decrease number by one.
				number--;

				//  Show the number in the #show-number tag.
				$("#time").html("<h2>" + number + "</h2>");


				//  Once number hits zero...
				if (number === 0) {

				//  ...run the timeOut function.
					timeOut()

				//  reset timer
					number=15;
				}
		    }

			//Triva Screen Populator

			function loadTrivia(){

				if (i > (questions.length-1)) {
					clearInterval(counter);
					clearInterval(triviaInterval);
					$("#time").empty();
					$("#answers").empty();
					$("#question").empty();
					$(".answer").empty();
					$("#answers").text("So how well do you know your Star Wars?");
					$("#answers").append('<div>' + "Correct Answers: " + correct);
					$("#answers").append('<div>' + "Incorrect Answers: " + incorrect);
					$("#answers").append('<div>' + "Unanswered questions: " + unanswered);
					resetGenerator();

					}else{

						var question = $("<div class= 'question'>");
						var option = $("<div class= 'answer'>");
						var option1 = $("<div class= 'answer'>");
						var option2 = $("<div class= 'answer'>");
						var option3 = $("<div class= 'answer'>");

						//clear anything left over from the previous round.
						$("#answers").empty();

						question.text(questions[i].question);

						option.text(questions[i].answers[0]);
						option1.text(questions[i].answers[1]);
						option2.text(questions[i].answers[2]);
						option3.text(questions[i].answers[3]);


						$("#question").html(question);
						$("#answers").append(option);
						$("#answers").append(option1);
						$("#answers").append(option2);
						$("#answers").append(option3);

						// Answer selection handling
						$(".answer").on("click", function(){
							clearInterval(counter);
							clearInterval(triviaInterval);
							var userChoice = $(this).text();
							console.log(userChoice);

							if (correctAnswers.indexOf(userChoice) !== -1 ) {
								$("#answers").empty();
								$(".answer").empty();
								correct ++;
								$("#answers").html("You are correct!!!");
								setTimeout(gameLoad, 3000);
								}else{				
									$("#answers").empty();
									$(".answer").empty();
									incorrect++;
									$("#answers").html("Sorry the correct answer is, " + correctAnswers[i-1]);
									setTimeout(gameLoad, 5000);

								}

						});
						i++;
						console.log(i);
						number=15;
					}

				}


			// timeOut function runs when the clock times out
			function timeOut(){
				//clear answers.
				clearInterval(counter);
				clearInterval(triviaInterval);
				$("#answers").empty();
				$(".answer").empty();
				unanswered++;
				$("#answers").html("The correct answer is, " + correctAnswers[i-1]);
				setTimeout(gameLoad, 5000);
			}


			function gameLoad(){
				secondCounter();
				loadTrivia();
				triviaInterval = setInterval(loadTrivia, 15000);
			}

			//called on game completion
			function resetGenerator(){
				$("#reset").html("<button class='reset'> Start Over </button>");
			} 

			// dynamically create the button  
			$("#question").html("<button class='startButton'> Start </button>");

			$(".startButton").on("click", gameLoad);


			$("#reset").on("click", function() {
				clearInterval(counter);
				clearInterval(triviaInterval);
				i=0;
				correct = 0;
				incorrect = 0;
				unanswered = 0;
				gameLoad();
				$("#reset").empty();
			})

		});