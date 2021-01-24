
var timeoutFiveSecExpBA;
var BAiterationCount;
var startTime, endTime;
var dotElement;
var deg;
var BA_COND_STATE = 0; // ther arcondition state :  BA_COND_STATE = 1--> instruction display
                        // BA_COND_STATE= 2 --> display counter
                        // BA_COND_STATE= 3 -->  rotating clock display
                        // BA_COND_STATE= 4 -->  input clock display

// numRoundsExpBA is the amount of stages in the experiment
var numStepsCondBA; 
// currNumExpBA is the current stage
var currStepCondBA = 0;
//var expNumber;
var estimated_prees_time;
// When the user clicks on space, we stop counting if 5 seconds have passed and move to 
// the last screen of the current stage.

// var animated = document.getElementByI('demo_dot');

 
 //animated.addEventListener("animationstart", myStartFunction);

 
 //$("#a_next").on("click",next_pressed);

 //document.removeEventListener('keydown',logKey)

// In the last screen of the current stage, the experimenter should place a dot on the clock
function step2_BA(){

    document.getElementById("pre_screen_title").innerHTML =moderator.LANG.step2_AA;
    document.getElementById("main_instructions").innerHTML = '<div id="demo_clock"><div id="demo_marks"></div></div>';
 
    //  $("html, body").animate({
      //  scrollTop: 0
       //}, 0);

        
          
         document.getElementById("demo_clock").addEventListener("click", function(e){//demo_marks
       
         
          if(BA_COND_STATE==3.1)  {

            

           moderator.showButtons(false,true);
           document.getElementById('a_next').addEventListener('click',next_pressed);
            clickHandlerAddDotBA(e);
             
           // BA_COND_STATE = 4;

           
            

          }
     

       
    })
}

// Positions the point in the location that the user clicked
function clickHandlerAddDotBA(event) {


    var obj = document.getElementById("demo_marks"),//demo_marks

        leftValue = 0,
        topValue = 0;

    while (obj) {
        console.log("while entered");
        leftValue += obj.offsetLeft;
        topValue += obj.offsetTop;
        obj = obj.offsetParent;

      //  console.log(leftValue);
       // console.log(topValue);
    }
    
    var centerX = leftValue + event.target.offsetWidth / 2;
    var centerY = topValue + event.target.offsetHeight / 2;
    console.log("centerx =" + centerX);
    console.log("centerY =" + centerY);
    console.log("event.clientX =" + event.clientX);
    console.log("event.clientY =" + event.clientY);

    setAngle(centerX, centerY, event.clientX, event.clientY);
}

function setAngle(x1, y1, x2, y2) {
    var theta = Math.atan2(x2-x1, y2-y1);
    var degree = (theta * (180 / Math.PI) * -1) - 180;
    //console.log(degree);
    var d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    if (d < 225) {
        if (degree < 0) {
            degree += 360;
        }        
     
        deg =degree;

        //document.getElementById('demo_marks').appendChild(dotElement);
        
        addDotUserToScreen(degree);

       // calc_estimated_press_time(degree);
    }
}

function calc_estimated_press_time(){
   
    estimated_prees_time = deg * (2.56/360)*1000;



    data_collector.BA_estimtion.push(estimated_prees_time);

    console.log(deg + "  " + estimated_prees_time);

}



function addDotUserToScreen(degree){

     //dotElement = document.getElementById("dot");// createDotElement();

     document.getElementById('demo_marks').appendChild(dotElement);

    //dotElement.style.webkitTransform = 'rotate('+degree+'deg)';
    document.getElementById("dot").style.webkitTransform = 'rotate('+degree+'deg)';
  //  dotElement.style.mozTransform = 'rotate('+degree+'deg)';
   document.getElementById("dot").style.mozTransform = 'rotate('+degree+'deg)';
 //  dotElement.style.transform = 'rotate('+degree+'deg)';

    document.getElementById("dot").style.transform = 'rotate('+degree+'deg)';
 //  dotElement.style.display = "block";
    document.getElementById("dot").style.display = "block";

}




// The first screen in the experiment is an explanation of the current stage
function display_instr(){
    document.getElementById("pre_screen_title").innerHTML =moderator.LANG.BAdisplay_instr_header;
    document.getElementById("main_instructions").innerHTML =moderator.LANG.BAdisplay_instr;// '<p>.במטלה זו יוצג על המסך שעון אנלוגי, שבו נקודה תשמש במקום מחוג<br>.תוך זמן קצר, השעון יתחיל לרוץ<br>.המשימה שלך היא ללחוץ על מקש הרווח בתזמון לבחירתך<br>.יש ללחוץ על "הבא" כדי להתחיל <br/></br></br></p>'
    moderator.showButtons(false,true);
}


function display_step_1_BA(){
   
    showDemoClock();//wait for spacebar press
    

}
 
function logKey(e){

    //alert("logkeyBA");

    if(e.keyCode == 32 && BA_COND_STATE==3){  // if the space bar is ressed AND clock is visible
      
       
        endTime =  e.timeStamp;

    

       var diff =endTime -startTime -BAiterationCount ;

    
        console.log(diff);

        clearTimeout(timeoutFiveSecExpBA);

        BA_COND_STATE = 3.1;
       
        data_collector.BA_real_timing.push(diff);

        hundredmsDelay = setTimeout(BAcontinue,200);

    
            
    }

}

//document.body.onkeydown  = function(e){
            
    function BAcontinue(){

        step2_BA();
    }
//}

// Display of clock with a dot that moves on it (no next button)
function showDemoClock(){   
    
    BAiterationCount = 0;
    timeoutFiveSecExpBA = setTimeout(startNextStep_5secpass, 5600); 

    BA_COND_STATE =3;
    document.getElementById("pre_screen_title").innerHTML = " <br>     </br>  ";
    document.getElementById("main_instructions").innerHTML = '<div id="demo_clock"><div id="demo_marks"><img src="img/dot450.png"   id="demo_dot"/></div></div>';   
    var animated = document.getElementById('demo_dot');
    
    
    animated.addEventListener('animationstart', () => {
        startTime = performance.now();
        console.log(startTime);
      });

      animated.addEventListener('animationiteration', () => {

        BAiterationCount=2560;
        
      });
   

   
   // startTime = performance.now()
}

function startNextStep_5secpass(){

    BA_COND_STATE = 2;// display counter
    currStepCondBA++;
    data_collector.BA_estimtion.push(0);
    data_collector.BA_real_timing.push(0);

    if(currStepCondBA<numStepsCondBA){
    
    
        setcounter(display_step_1_BA,500,0)
        
        
    }
    else
    {
        moderator.CondNumber++;

        BA_COND_STATE = 0;

        document.removeEventListener('keydown',logKey);

        document.getElementById('a_next').removeEventListener('click',next_pressed);

        moderator.StartCond();


    }
    
   
}

function  experimentBA_start(){
       


        // dotElement = document.getElementById("dot");// createDotElement();

    numStepsCondBA = moderator.RunConter;

         // document.getElementById("dot").style.display = "none";
   BA_COND_STATE = 1; // 1= instruction display
   display_instr();//1/ display the condition instruction
   document.getElementById('a_next').addEventListener('click',next_pressed);
   document.addEventListener('keydown', logKey);

}
//this is the condition input recognition 

//$("#a_next").on("click",next_pressed);

//$("#a_next").on("click", function(e){
 function next_pressed(){

       switch (BA_COND_STATE) {
        
        case (1):

            
            BA_COND_STATE = 2;// display counter
            currStepCondBA++;
            setcounter(display_step_1_BA,1000)
            
        break
        
        case (3.1):

            calc_estimated_press_time();
            
               console.log("calc_estimated_press_time");

            if(currStepCondBA<numStepsCondBA){

                BA_COND_STATE = 2;// display counter
                currStepCondBA++;
                setcounter(display_step_1_BA,500)
                

            } 
            else {
                 

                moderator.CondNumber++;

                BA_COND_STATE = 0;

                document.removeEventListener('keydown',logKey);

                document.getElementById('a_next').removeEventListener('click',next_pressed);
                
               // moderator.CondNumber = 4;
               //console.log(moderator.CondNumber);

                moderator.StartCond();
                
               // console.log("est:" + data_collector.BA_estimtion +"" + "realt:" + data_collector.BA_real_timing);


            }


        break
 
      }    

}