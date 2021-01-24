let answersFirst = [];
let answersSecond = [];
let answersThird = [];
let answersFourth = [];
let answersFifth = [];
let answersSixth = [];
// arr keep a random order of quizes
let arr = [];
// currIter is the current iteration
let currIter;
// currQuizNum is the current quiz
let currQuizNum;

// Saves the amount of unanswered questions
let numNotFilled = 0;


function startQuestionnaires(){
     moderator.showButtons(false,true);
    
    const screenTitle = document.getElementById('pre_screen_title');
    const quizContainer = document.getElementById('main_instructions');
    
    const submitButton = document.getElementById('a_next');
   
    document.getElementById('f').style.position = "relative";
    document.getElementById('f1').style.position = "relative";


    // Create the order of the quizes
    createRandomOrderArr();
    currIter = 0;
    currQuizNum = arr[currIter];
    runCurrentQuiz(screenTitle, quizContainer);

    submitButton.addEventListener('click', function(){
      showResults(questions, quizContainer);

      // If the user has answered all the questions, we will continue to the next questionnaire, 
      // otherwise we will reset the auitable array and present the current questionnaire again
      if (numNotFilled === 0){
        currIter += 1;
      } else {
        alert("please answer all the questions before pressing 'next'");
        clearCurrentArr();
      }
      currQuizNum = arr[currIter];

      runCurrentQuiz(screenTitle, quizContainer);
    }, false);
};


function createRandomOrderArr(){
  while(arr.length < 6){
      var r = Math.floor(Math.random() * 6) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  console.log(arr);
}

function runCurrentQuiz(screenTitle, quizContainer){
  switch(currQuizNum){
    case 1:
        questions = buildFirstQuiz(screenTitle, quizContainer);
        break;
    case 2:
        questions = buildSecondQuiz(screenTitle, quizContainer);
        break;
    case 3:
        questions = buildThirdQuiz(screenTitle, quizContainer);
        break;
    case 4:
        questions = buildFourthQuiz(screenTitle, quizContainer);
        break;
    case 5:
        questions = buildFifthQuiz(screenTitle, quizContainer);            
        break;   
      case 6:
        questions = buildSixthQuiz(screenTitle, quizContainer);            
        break;
    default:
      writePreScreenTitle(screenTitle, "THE END!");
      writePreScreenTitle(quizContainer, '<p> Thank you for your participation!<br>If you would like to receive information about this experiment <br>please contact the researcher, <a href="mailto:noabreg@post.bgu.ac.il">Noa Bregman-Hai</a>.<br> </p>');
      
      document.getElementById('a_next').style.display="none"
  }
}

function clearCurrentArr(){
  switch(currQuizNum){
    case 1:
      answersFirst = [];
      break;
    case 2:
      answersSecond = [];
      break;
    case 3:
      answersThird = [];
      break;
    case 4:
      answersFourth = [];
      break;
    case 5:
      answersFifth = [];
      break;
      case 6:
        answersSixth = [];
        break;
  }
}

function writePreScreenTitle(screenTitle, title){
  screenTitle.style.fontSize = "30px";
  screenTitle.innerHTML = title;
}
//DES
function buildFirstQuiz(screenTitle, quizContainer){
    writePreScreenTitle(screenTitle, " <br/> This questionnaire asks about experiences that you may have in your daily life.<br> We are interested in how often you have these experiences. It is important, however, that your answers show<br> how often these experiences happen to you when you are not under the influence of alcohol or drugs. <br>To answer the questions, please determine to what degree each experience described in the question applies to you,<br> and choose the number to show what percentage of the time you have the experience. <br> For example: 	0% (Never)  &nbsp  10 &nbsp 20 &nbsp 30 &nbsp 40 &nbsp 50 &nbsp 60 &nbsp 70 &nbsp 80 &nbsp 90 &nbsp 100% (Always)");
    questions = prepareFirstQuizQuestions();
    buildQuiz(questions, quizContainer);
    return questions; 
}
//OCI
function buildSecondQuiz(screenTitle, quizContainer){
    writePreScreenTitle(screenTitle, " <br/> The following statements refer to experiences that many people have in their everyday lives. <br>Circle the number that best describes HOW MUCH that experience has DISTRESSED or BOTHERED you during the PAST MONTH.");
    questions = prepareSecondQuizQuestions();
    buildQuiz(questions, quizContainer);
    return questions; 
}
//MDS
function buildThirdQuiz(screenTitle, quizContainer){
    writePreScreenTitle(screenTitle, " <br/> In answering the following questions, please refer to your daydreaming activities in the last month,<br> if not otherwise specified. Choose the option that best fits your experience.<br> For example: Some people get so caught up in their daydreaming that they forget where they are. <br>How often do you forget where you are when you daydream? In this example, 20% is chosen.");
    questions = prepareThirdQuizQuestions();
    buildQuiz(questions, quizContainer);
    return questions; 
}
//SOAS
function buildFourthQuiz(screenTitle, quizContainer){
    writePreScreenTitle(screenTitle, " <br/> For each question, choose the number that describes you best.");
    questions = prepareFourthQuizQuestions();
    buildQuiz(questions, quizContainer);
    return questions; 
}
//SCL
function buildFifthQuiz(screenTitle, quizContainer){ 
    writePreScreenTitle(screenTitle, ' <br/> Below is a list of problems and complaints that people sometimes have.<br> Please read each one carefully. After you have done so,<br> select one of the numbered descriptors that best describes how much that problem has bothered<br> or distressed you during the past week, including today.');
    questions = prepareFifthQuizQuestions();
    buildQuiz(questions, quizContainer);
    return questions; 
}
//FILD
function buildSixthQuiz(screenTitle, quizContainer){
  writePreScreenTitle(screenTitle, ' <br/> Please read the following description carefully:<br>'+ 
  'In a lucid dream, the dreamer is aware of the fact that he or she is dreaming, within the dream state.<br>'
  +'That awareness can last for a brief moment (for example, the realization that one is dreaming followed by an immediate awakening) <br>'
  +' or for a longer period of time (i.e., prolonged awareness within the dream).<br>'
  +'In some cases, after achieving lucidity, the dreamer may also control the content <br>'+
  ' of the dream and voluntarily alter the dream events. Notably, some people experience <br>'
  +' lucid dreams spontaneously (i.e., lucidity occurs without deliberately attempting to achieve it), <br>'
  + 'while others experience initiated lucidity (i.e., lucidity occurs following the deliberate implementation of lucidity induction techniques). <br>');
  questions = prepareSixthQuizQuestions();
  buildQuiz(questions, quizContainer);
  return questions; 
}
// Build a quiz
function buildQuiz(questions, quizContainer){
    const output = [];

    questions.forEach((currentQuestion, questionNumber) => {
        // variable to store the list of possible answers
        const answers = [];

        // Add an HTML radio button for each available answer 
        for(number in currentQuestion.answers){
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${number}">
                    ${number}
                    ${currentQuestion.answers[number] != " " ? " - " + currentQuestion.answers[number] : " "} &nbsp &nbsp &nbsp
                </label>`
            );          
        }
        // Add this question and its answers to the output
        output.push(
          `<div class="question" style="font-size:25px; margin-left: 30px; font-weight: 500; text-align: left;"> ${currentQuestion.question} </div>
          <div class="answers" style="font-size:20px;margin-left: 30px; text-align: left;"> ${answers.join('')} </div> <br/>`
        );
      }
    );

    quizContainer.innerHTML = output.join('');
}

// save the answers of the user in the suitable array and print the array
function showResults(questions, quizContainer){
  const answerContainers = quizContainer.querySelectorAll('.answers');

  numNotFilled = 0;

  questions.forEach( (currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === undefined){
        numNotFilled += 1;
      }

      // Save the current answer to the suitable array
      saveResults(currentQuestion, userAnswer);
  });

  // If the user has filled in all the questions - print them to the console
  if (numNotFilled === 0){
    printResults();
  }
}


// push the answers of the user to the suitable array
function saveResults(currentQuestion, userAnswer){
    let results = currentQuestion.answers[userAnswer] == " " ? userAnswer : userAnswer + " - " + currentQuestion.answers[userAnswer];
    switch(currQuizNum){
        case 1:
            answersFirst.push(results);
            //todo: send to server
            break;
        case 2:
            answersSecond.push(results);
            //todo: send to server
            break;
        case 3:
            answersThird.push(results);
            //todo: send to server
            break;
        case 4:
            answersFourth.push(results);
            //todo: send to server
            break;
        case 5:
            answersFifth.push(results);
            //todo: send to server
            break;
    }
}

// print the answers of the user to the consol. TO DO: save on a CSV file
function printResults(){// TO DO send results to server insted of printing;
    switch(currQuizNum){
        case 1:
            console.log(answersFirst);
            break;
        case 2:
            console.log(answersSecond);
            break;
        case 3:
            console.log(answersThird);
            break;
        case 4:
            console.log(answersFourth);
            break;
        case 5:
            console.log(answersFifth);
            break;
    }
}

function prepareFirstQuizQuestions(){
    const questions = [
        {
          question: "1. Some people have the experience of driving or riding in a car or bus or subway and suddenly realizing that they don’t remember what has happened during all or part of the trip.",
          answers: {
            '0%': "(Never)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Always)",
          }
        },
        {
          question: "2. Some people find that sometimes they are listening to someone talk and they suddenly realize that they did not hear part or all of what was said.",
          answers: {
            '0%': "(Never)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Always)",
          }
        },
        {
          question: "3. Some people have the experience of finding themselves in a place and have no idea how they got there.",
          answers: {
            '0%': "(Never)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Always)",
          }
        },
        {
          question: "4. Some people have the experience of finding themselves dressed in clothes that they don’t remember putting on.",
          answers: {
            '0%': "(Never)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Always)",
          }
        },
        {
          question: "5. Some people have the experience of finding new things among their belongings that they do not remember buying.",
          answers: {
            '0%': "(Never)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Always)",
          }
        },
        {
          question: "6. Some people sometimes find that they are approached by people that they do not know, who call them by another name or insist that they have met them before.",
          answers: {
            '0%': "(Never)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Always)",
          }
        },
        {
            question: "7. Some people sometimes have the experience of feeling as though they are standing next to themselves or watching themselves do something and they actually see themselves as if they were looking at another person.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
              }
          },
          {
            question: "8. Some people are told that they sometimes do not recognize friends of family members.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
              }
          },
          {
            question: "9. Some people find that they have no memory for some important events in their lives (for example, a wedding or graduation).",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
              }
          },
          {
            question: "10. Some people have the experience of being accused of lying when they do not think that they have lied.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "11. Some people have the experience of looking in a mirror and not recognizing themselves.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
              }
          },
          {
            question: "12. Some people have the experience of feeling that other people, objects, and the world around them are not real.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "13. Some people have the experience of feeling that their body does not seem to belong to them.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "14. Some people have the experience of sometimes remembering a past event so vividly that they feel as if they were reliving that event.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "15. Some people have the experience of not being sure whether things that they remember happening really did happen or whether they just dreamed them.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "16. Some people have the experience of being in a familiar place but finding it strange and unfamiliar.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "17. Some people find that when they are watching television or a movie they become so absorbed in the story that they are unaware of other events happening around them.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "18. Some people find that they become so involved in a fantasy or daydream that it feels as though it were really happening to them.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "19. Some people find that they sometimes are able to ignore pain.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "20. Some people find that they sometimes sit staring off into space, thinking of nothing, and are not aware of the passage of time.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "21. Some people sometimes find that when they are alone they talk out loud to themselves.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "22. Some people find that in one situation they may act so differently compared with another situation that they feel almost as if they were two different people.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "23. Some people sometimes find that in certain situations they are able to do things with amazing ease and spontaneity that would usually be difficult for them (for example, sports, work, social situations, etc.).",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "24. Some people sometimes find that they cannot remember whether they have done something or have just thought about doing that thing (for example, not knowing whether they have just mailed a letter or have just thought about mailing it).",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "25. Some people find evidence that they have done things that they do not remember doing.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "26. Some people sometimes find writings, drawings, or notes among their belongings that they must have done but cannot remember doing.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "27. Some people sometimes find that they hear voices inside their head that tell them to do things or comment on things that they are doing.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
          {
            question: "28. Some people sometimes feel as if they are looking at the world through a fog, so that people and objects appear faraway or unclear.",
            answers: {
                '0%': "(Never)",
                '10%': " ",
                '20%': " ",
                '30%': " ",
                '40%': " ",
                '50%': " ",
                '60%': " ",
                '70%': " ",
                '80%': " ",
                '90%': " ",
                '100%': "(Always)",
            }
          },
    ];

    return questions;
}

function prepareSecondQuizQuestions(){
    const questions = [
        {
          question: "1.   I have saved up so many things that they get in the way.",
          answers: {
            0: "Not at all",
            1: "A little bit",
            2: "Moderately",
            3: "Quite a bit",
            4: "Extremely"
          }
        },
        {
          question: "2.   I check things more often than necessary.",
          answers: {
            0: "Not at all",
            1: "A little bit",
            2: "Moderately",
            3: "Quite a bit",
            4: "Extremely"
          }
        },
        {
          question: "3.  I get upset if objects are not arranged properly.",
          answers: {
            0: "Not at all",
            1: "A little bit",
            2: "Moderately",
            3: "Quite a bit",
            4: "Extremely"
          }
        },
        {
          question: "4.   I feel compelled to count while I am doing things.",
          answers: {
            0: "Not at all",
            1: "A little bit",
            2: "Moderately",
            3: "Quite a bit",
            4: "Extremely"
          }
        },
        {
          question: "5.   I find it difficult to touch an object when I know it has been touched by strangers or certain people.",
          answers: {
            0: "Not at all",
            1: "A little bit",
            2: "Moderately",
            3: "Quite a bit",
            4: "Extremely"
          }
        },
        {
          question: "6.   I find it difficult to control my own thoughts.",
          answers: {
            0: "Not at all",
            1: "A little bit",
            2: "Moderately",
            3: "Quite a bit",
            4: "Extremely"
          }
        },
        {
            question: "7.   I collect things I don’t need.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "8.   I repeatedly check doors, windows, drawers, etc.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "9.   I get upset if others change the way I have arranged things.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "10.   I feel I have to repeat certain numbers.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "11.   I sometimes have to wash or clean myself simply because I feel contaminated.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "12.   I am upset by unpleasant thoughts that come into my mind against my will.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "13.   I avoid throwing things away because I am afraid I might need them later.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "14.   I repeatedly check gas and water taps and light switches after turning them off.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "15.   I need things to be arranged in a particular way.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "16.   I feel that there are good and bad numbers.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "17.   I wash my hands more often and longer than necessary.",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
          {
            question: "18.   I frequently get nasty thoughts and have difficulty in getting rid of them",
            answers: {
                0: "Not at all",
                1: "A little bit",
                2: "Moderately",
                3: "Quite a bit",
                4: "Extremely"
            }
          },
    ];

    return questions;
}

function prepareThirdQuizQuestions(){
    const questions = [
        {
          question: "1. Some people notice that certain music can trigger their daydreaming. To what extent does music activate your daydreaming?",
          answers: {
            '0%': "(Never)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Very often)",
          }
        },
        {
          question: "2. Some people feel a need to continue a daydream that was interrupted by a real world event at a later point. When a real world event has interrupted one of your daydreams, how strong was your need or urge to return to that daydream as soon as possible?",
          answers: {
            '0%': "(No urge at all)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Extremely urge)",
          }
        },
        {
          question: "3. How often are your current daydreams accompanied by vocal noises or facial expressions e.g. laughing, talking or mouthing the words?",
          answers: {
            '0%': "(Never)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Extreme frequent)",
          }
        },
        {
          question: "4. If you go through a period of time when you are not able to daydream as much as usual due to real world obligations, how distressed are you by your inability to find time to daydream?",
          answers: {
            '0%': "(No distress at all)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Extreme distress)",
          }
        },
        {
          question: "5. Some people have the experience of their daydreaming interfering with their daily chores or tasks. How much does your daydreaming interfere with your ability to get basic chores accomplished?",
          answers: {
            '0%': "(No interference at all)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Extreme interference)",
          }
        },
        {
          question: "6. Some people feel distressed or concerned about the amount of time they spend daydreaming. How distressed do you currently feel about the amount of time you spend daydreaming?",
          answers: {
            '0%': "(No distress at all)",
            '10%': " ",
            '20%': " ",
            '30%': " ",
            '40%': " ",
            '50%': " ",
            '60%': " ",
            '70%': " ",
            '80%': " ",
            '90%': " ",
            '100%': "(Extreme distress)",
          }
        },
        {
            question: "7. When you know you have had something important or challenging to pay attention to or finish, how difficult was it for you to stay on task and complete the goal without daydreaming?",
            answers: {
              '0%': "(No difficulty at all)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(Extreme difficulty)",
            }
          },
          {
            question: "8. Some people have the experience of their daydreaming hindering the things that are most important to them. How much do you feel that your daydreaming activities interfere with achieving your overall life goals?",
            answers: {
              '0%': "(No interference at all)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(Extreme interference)",
            }
          },
          {
            question: "9. Some people experience difficulties in controlling or limiting their daydreaming. How difficult has it been for you to keep your daydreaming under control?",
            answers: {
              '0%': "(No difficulty at all)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(Extreme difficulty)",
            }
          },
          {
            question: "10. Some people feel annoyed when a real world event interrupts one of their daydreams. When the real world interrupts one of your daydreams, on average how annoyed do you feel? ",
            answers: {
              '0%': "(No annoyance at all)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(Extreme annoyance)",
            }
          },
          {
            question: "11. Some people have the experience of their daydreaming interfering with their academic/occupational success or personal achievements. How much does your daydreaming interfere with your academic/occupational success?",
            answers: {
              '0%': "(No interference at all)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(Extreme interference)",
            }
          },
          {
            question: "12. Some people would rather daydream than do most other things. To what extent would you rather daydream than engage with other people or participate in social activities or hobbies?",
            answers: {
              '0%': "(Not at all)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(To the fullest extent)",
            }
          },
          {
            question: "13. When you first wake up in the morning, how strong has your urge been to immediately start daydreaming?",
            answers: {
              '0%': "(No urge at all)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(Extreme urge)",
            }
          },
          {
            question: "14. How often are your current daydreams accompanied by physical activity such as pacing, swinging or shaking your hands?",
            answers: {
              '0%': "(Never)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(Very Often)",
            }
          },
          {
            question: "15. Some people love to daydream. While you are daydreaming, to what extent do you find it comforting and/or enjoyable?",
            answers: {
              '0%': "(Not comforting/enjoyable at all)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(Very comforting/enjoyable)",
            }
          },
          {
            question: "16. Some people find it hard to maintain their daydreaming when they are not listening to music. To what extent is your daydreaming dependent on continued listening to music?",
            answers: {
              '0%': "(Not dependent)",
              '10%': " ",
              '20%': " ",
              '30%': " ",
              '40%': " ",
              '50%': " ",
              '60%': " ",
              '70%': " ",
              '80%': " ",
              '90%': " ",
              '100%': "(Totally dependent)",
            }
          },
    ];

    return questions;
}


function prepareFourthQuizQuestions(){
    const questions = [
        {
          question: "1.   I am in full control of what I do.",
          answers: {
            1: "Do not agree at all",
            2: "Mostly disagree",
            3: "Somewhat disagree",
            4: "Neither agree nor disagree",
            5: "Somewhat agree",
            6: "Mostly agree",
            7: "Absolutely agree"
          }
        },
        {
          question: "2.   It feels like I am just an instrument in the hands of somebody or something else.",
          answers: {
            1: "Do not agree at all",
            2: "Mostly disagree",
            3: "Somewhat disagree",
            4: "Neither agree nor disagree",
            5: "Somewhat agree",
            6: "Mostly agree",
            7: "Absolutely agree"
          }
        },
        {
          question: "3.  My actions just happen without my intention.",
          answers: {
            1: "Do not agree at all",
            2: "Mostly disagree",
            3: "Somewhat disagree",
            4: "Neither agree nor disagree",
            5: "Somewhat agree",
            6: "Mostly agree",
            7: "Absolutely agree"
          }
        },
        {
          question: "4.   I am the origin of my actions.",
          answers: {
            1: "Do not agree at all",
            2: "Mostly disagree",
            3: "Somewhat disagree",
            4: "Neither agree nor disagree",
            5: "Somewhat agree",
            6: "Mostly agree",
            7: "Absolutely agree"
          }
        },
        {
          question: "5.   The consequences of my actions feel like they	don't logically follow my actions.",
          answers: {
            1: "Do not agree at all",
            2: "Mostly disagree",
            3: "Somewhat disagree",
            4: "Neither agree nor disagree",
            5: "Somewhat agree",
            6: "Mostly agree",
            7: "Absolutely agree"
          }
        },
        {
          question: "6.   My movements are automatic - my body simply makes them.",
          answers: {
            1: "Do not agree at all",
            2: "Mostly disagree",
            3: "Somewhat disagree",
            4: "Neither agree nor disagree",
            5: "Somewhat agree",
            6: "Mostly agree",
            7: "Absolutely agree"
          }
        },
        {
            question: "7.   The outcomes of my actions generally surprise me.",
            answers: {
                1: "Do not agree at all",
                2: "Mostly disagree",
                3: "Somewhat disagree",
                4: "Neither agree nor disagree",
                5: "Somewhat agree",
                6: "Mostly agree",
                7: "Absolutely agree"
            }
          },
          {
            question: "8.   Things I do are subject only to my free will.",
            answers: {
                1: "Do not agree at all",
                2: "Mostly disagree",
                3: "Somewhat disagree",
                4: "Neither agree nor disagree",
                5: "Somewhat agree",
                6: "Mostly agree",
                7: "Absolutely agree"
            }
          },
          {
            question: "9.   The decision whether and when to act is within my hands.",
            answers: {
                1: "Do not agree at all",
                2: "Mostly disagree",
                3: "Somewhat disagree",
                4: "Neither agree nor disagree",
                5: "Somewhat agree",
                6: "Mostly agree",
                7: "Absolutely agree"
            }
          },
          {
            question: "10.   Nothing I do is actually voluntary.",
            answers: {
                1: "Do not agree at all",
                2: "Mostly disagree",
                3: "Somewhat disagree",
                4: "Neither agree nor disagree",
                5: "Somewhat agree",
                6: "Mostly agree",
                7: "Absolutely agree"
            }
          },
          {
            question: "11.   When I am in action, it feels like I am a remote controlled robot",
            answers: {
                1: "Do not agree at all",
                2: "Mostly disagree",
                3: "Somewhat disagree",
                4: "Neither agree nor disagree",
                5: "Somewhat agree",
                6: "Mostly agree",
                7: "Absolutely agree"
            }
          },
          {
            question: "12.   My behavior is planned by me from the very beginning to the very end.",
            answers: {
                1: "Do not agree at all",
                2: "Mostly disagree",
                3: "Somewhat disagree",
                4: "Neither agree nor disagree",
                5: "Somewhat agree",
                6: "Mostly agree",
                7: "Absolutely agree"
            }
          },
          {
            question: "13.   I am completely responsible for everything that results from my actions.",
            answers: {
                1: "Do not agree at all",
                2: "Mostly disagree",
                3: "Somewhat disagree",
                4: "Neither agree nor disagree",
                5: "Somewhat agree",
                6: "Mostly agree",
                7: "Absolutely agree"
            }
          },
    ];

    return questions;
}


function prepareFifthQuizQuestions(){
    const questions = [
        {
          question: "1.   Feeling hopeless about the future",
          answers: {
              0: "Not at all",
              1: "A little bit",
              2: "Moderately",
              3: "Quite a bit",
              4: "Extremely"
          }
        },
        {
          question: "2.   Feeling blue.",
          answers: {
              0: "Not at all",
              1: "A little bit",
              2: "Moderately",
              3: "Quite a bit",
              4: "Extremely"
          }
        },
        {
          question: "3. Feeling lonely even when you are with people",
          answers: {
              0: "Not at all",
              1: "A little bit",
              2: "Moderately",
              3: "Quite a bit",
              4: "Extremely"
          }
        },
        {
          question: "4. The idea that something is wrong with your mind",
          answers: {
              0: "Not at all",
              1: "A little bit",
              2: "Moderately",
              3: "Quite a bit",
              4: "Extremely"
          }
        },
        {
          question: "5. Feeling tense or keyed up",
          answers: {
              0: "Not at all",
              1: "A little bit",
              2: "Moderately",
              3: "Quite a bit",
              4: "Extremely"
          }
        },
        {
          question: "6. Feeling fearful",
          answers: {
              0: "Not at all",
              1: "A little bit",
              2: "Moderately",
              3: "Quite a bit",
              4: "Extremely"
          }
        }
    ];

    return questions;
}

function prepareSixthQuizQuestions(){
  const questions = [
      {
        question: "1.   Try to estimate the frequency with which you experience momentary lucidity in a dream, following by an immediate awakening.",
        answers: {
          1: "Do not agree at all",
          2: "Mostly disagree",
          3: "Somewhat disagree",
          4: "Neither agree nor disagree",
          5: "Somewhat agree",
          6: "Mostly agree",
          7: "Absolutely agree"
        }
      },
      {
        question: "2.   It feels like I am just an instrument in the hands of somebody or something else.",
        answers: {
          1: "Do not agree at all",
          2: "Mostly disagree",
          3: "Somewhat disagree",
          4: "Neither agree nor disagree",
          5: "Somewhat agree",
          6: "Mostly agree",
          7: "Absolutely agree"
        }
      },
      {
        question: "3.  My actions just happen without my intention.",
        answers: {
          1: "Do not agree at all",
          2: "Mostly disagree",
          3: "Somewhat disagree",
          4: "Neither agree nor disagree",
          5: "Somewhat agree",
          6: "Mostly agree",
          7: "Absolutely agree"
        }
      },
      {
        question: "4.   I am the origin of my actions.",
        answers: {
          1: "Do not agree at all",
          2: "Mostly disagree",
          3: "Somewhat disagree",
          4: "Neither agree nor disagree",
          5: "Somewhat agree",
          6: "Mostly agree",
          7: "Absolutely agree"
        }
      },
      {
        question: "5.   The consequences of my actions feel like they	don't logically follow my actions.",
        answers: {
          1: "Do not agree at all",
          2: "Mostly disagree",
          3: "Somewhat disagree",
          4: "Neither agree nor disagree",
          5: "Somewhat agree",
          6: "Mostly agree",
          7: "Absolutely agree"
        }
      },
      {
        question: "6.   My movements are automatic - my body simply makes them.",
        answers: {
          1: "Do not agree at all",
          2: "Mostly disagree",
          3: "Somewhat disagree",
          4: "Neither agree nor disagree",
          5: "Somewhat agree",
          6: "Mostly agree",
          7: "Absolutely agree"
        }
      },
      {
          question: "7.   The outcomes of my actions generally surprise me.",
          answers: {
              1: "Do not agree at all",
              2: "Mostly disagree",
              3: "Somewhat disagree",
              4: "Neither agree nor disagree",
              5: "Somewhat agree",
              6: "Mostly agree",
              7: "Absolutely agree"
          }
        },
        {
          question: "8.   Things I do are subject only to my free will.",
          answers: {
              1: "Do not agree at all",
              2: "Mostly disagree",
              3: "Somewhat disagree",
              4: "Neither agree nor disagree",
              5: "Somewhat agree",
              6: "Mostly agree",
              7: "Absolutely agree"
          }
        },
        {
          question: "9.   The decision whether and when to act is within my hands.",
          answers: {
              1: "Do not agree at all",
              2: "Mostly disagree",
              3: "Somewhat disagree",
              4: "Neither agree nor disagree",
              5: "Somewhat agree",
              6: "Mostly agree",
              7: "Absolutely agree"
          }
        },
        {
          question: "10.   Nothing I do is actually voluntary.",
          answers: {
              1: "Do not agree at all",
              2: "Mostly disagree",
              3: "Somewhat disagree",
              4: "Neither agree nor disagree",
              5: "Somewhat agree",
              6: "Mostly agree",
              7: "Absolutely agree"
          }
        },
        {
          question: "11.   When I am in action, it feels like I am a remote controlled robot",
          answers: {
              1: "Do not agree at all",
              2: "Mostly disagree",
              3: "Somewhat disagree",
              4: "Neither agree nor disagree",
              5: "Somewhat agree",
              6: "Mostly agree",
              7: "Absolutely agree"
          }
        },
        {
          question: "12.   My behavior is planned by me from the very beginning to the very end.",
          answers: {
              1: "Do not agree at all",
              2: "Mostly disagree",
              3: "Somewhat disagree",
              4: "Neither agree nor disagree",
              5: "Somewhat agree",
              6: "Mostly agree",
              7: "Absolutely agree"
          }
        },
        {
          question: "13.   I am completely responsible for everything that results from my actions.",
          answers: {
              1: "Do not agree at all",
              2: "Mostly disagree",
              3: "Somewhat disagree",
              4: "Neither agree nor disagree",
              5: "Somewhat agree",
              6: "Mostly agree",
              7: "Absolutely agree"
          }
        },
  ];

  return questions;
}