
var timeoutFiveSecExpAA;
var twofifty_milsec;
var AAstartTime, AAendTime;
var AAiterationCount;
var AAdotElement;
var AA_COND_STATE = 0; // ther arcondition state :  BA_COND_STATE = 1--> instruction display
                        // BA_COND_STATE= 2 --> display counter
                        // BA_COND_STATE= 3 -->  rotating clock display
                        // BA_COND_STATE= 4 -->  input clock display

// numRoundsExpBA is the amount of stages in the experiment
var numStepsCondAA ;
// currNumExpBA is the current stage
var currStepCondAA = 0;
//var expNumber;
var AAestimated_prees_time;
// When the user clicks on space, we stop counting if 5 seconds have passed and move to 
// the last screen of the current stage.



// In the last screen of the current stage, the experimenter should place a dot on the clock
function step2_AA(){


    document.getElementById("pre_screen_title").innerHTML =moderator.LANG.step2_AA;
    document.getElementById("main_instructions").innerHTML = '<div id="demo_clock"><div id="demo_marks"></div></div>';
 
    //  $("html, body").animate({
      //  scrollTop: 0
       //}, 0); 
        
         

          

         document.getElementById("demo_clock").addEventListener("click", function(e){
       
          if(AA_COND_STATE==3.1)  {

            moderator.prepareFeedback();

           // moderator.stopFeedback();

            moderator.showButtons(false,true);
            document.getElementById('a_next').addEventListener('click',AAnext_pressed);
            clickHandlerAddDotAA(e);
             
            //AA_COND_STATE = 4;

           
            

          }
     

       
    })
}

// Positions the point in the location that the user clicked
function clickHandlerAddDotAA(event) {


    var obj = document.getElementById("demo_marks"),

        leftValue = 0,
        topValue = 0;

    while (obj) {
        leftValue += obj.offsetLeft;
        topValue += obj.offsetTop;
        obj = obj.offsetParent;
    }
    
    var centerX = leftValue + event.target.offsetWidth / 2;
    var centerY = topValue + event.target.offsetHeight / 2;
    AAsetAngle(centerX, centerY, event.clientX, event.clientY);
}

function AAsetAngle(x1, y1, x2, y2) {
    var theta = Math.atan2(x2-x1, y2-y1);
    var degree = (theta * (180 / Math.PI) * -1) - 180;
    //console.log(degree);
    var d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    if (d < 225) {
        if (degree < 0) {
            degree += 360;
        }        
        //dotElement = createDotElement();

       // document.getElementById('demo_marks').appendChild(AAdotElement);

        addDotUserToScreen(degree);

        deg=degree;
    }
}

function calc_estimated_press_timeAA(){
   
    estimated_prees_time = deg * (2.56/360)*1000;
    data_collector.AA_estimtion.push(estimated_prees_time);
   // console.log(deg + "  " + estimated_prees_time);

}








// The first screen in the experiment is an explanation of the current stage
function display_instrAA(){

    document.getElementById("pre_screen_title").innerHTML =moderator.LANG.AAdisplay_instr_header;

    document.getElementById("main_instructions").innerHTML = moderator.LANG.AAdisplay_instr;
    
    moderator.showButtons(false,true);
}


function display_step_1_AA(){
   
    showDemoClockAA();//wait for spacebar press
    

}



function AAlogKey(e){

    
    

    if(e.keyCode == 32 && AA_COND_STATE==3){  // if the space bar is ressed AND clock is visible
       
        AAendTime =  e.timeStamp; 
        
        twofifty_milsec = setTimeout(AAsound,250); 

        clearTimeout(timeoutFiveSecExpAA);

        var diff =AAendTime -AAstartTime -AAiterationCount;

        console.log(diff);

        data_collector.AA_real_timing.push(diff);
            
    }

}


function AAsound(){
   

    moderator.playFeedback();

     

     clearTimeout(twofifty_milsec);

     AA_COND_STATE = 3.1;
  
    step2_AA();
}





// Display of clock with a dot that moves on it (no next button)
function showDemoClockAA(){   
    AAiterationCount =0;

    timeoutFiveSecExpAA = setTimeout(startNextStep_5secpassAA, 5600); 

    AA_COND_STATE =3;

    
    document.getElementById("pre_screen_title").innerHTML ="          <br>     </br>  ";
    document.getElementById("main_instructions").innerHTML = '<div id="demo_clock"><div id="demo_marks"><img src="img/dot450.png"   id="demo_dot"/></div></div>';   
    var animated = document.getElementById('demo_dot');
   
    animated.addEventListener('animationstart', () => {
        AAstartTime = performance.now();
      });
      animated.addEventListener('animationiteration', () => {

        AAiterationCount=2560;
        
      });
  
   
}

function startNextStep_5secpassAA(){
    AA_COND_STATE = 2;// display counter
    currStepCondAA++;
    data_collector.AA_estimtion.push(0);
    data_collector.AA_real_timing.push(0);

    if(currStepCondAA<numStepsCondAA){
    
    
        setcounter(display_step_1_AA,500,0)
        
        
    }
    else
    {
        moderator.CondNumber++;

        AA_COND_STATE = 0;

        document.removeEventListener('keydown',logKey);

        document.getElementById('a_next').removeEventListener('click',next_pressed);


        moderator.StartCond();


    }
    
   
}

function  experimentAA_start(){
  
    //AAdotElement = document.getElementById("dot");// createDotElement();
    numStepsCondAA = moderator.RunConter;
   AA_COND_STATE = 1; // 1= instruction display
   display_instrAA();//1/ display the condition instruction
   document.getElementById('a_next').addEventListener('click',AAnext_pressed);
   document.addEventListener('keydown', AAlogKey);

}
//this is the condition input recognition 




function AAnext_pressed(e) {
 
       switch (AA_COND_STATE) {

        case (1):

            
            AA_COND_STATE = 2;// display counter
            setcounter(display_step_1_AA,1000,0)
            currStepCondAA++;
        break
        
        case (3.1):
            calc_estimated_press_timeAA();
            if(currStepCondAA<numStepsCondAA){

                AA_COND_STATE = 2;// display counter
                setcounter(display_step_1_AA,500,0);
                currStepCondAA++;

            } 
            else {

                AA_COND_STATE = 5;

                subjective_action.set_screen();


            }


        break
        
        case(5):


        data_collector.AA_action_subjective = subjective_action.get_slider_value();
        
        console.log(data_collector.AA_action_subjective);

        // console.log(data_collector.AA_action_subjective);

         //moderator.CondNumber =5; /// for testing
         moderator.CondNumber++;

         console.log(moderator.CondNumber);

         AA_COND_STATE = 0;


         document.removeEventListener('keydown',AAlogKey);

         document.getElementById('a_next').removeEventListener('click',AAnext_pressed);

         moderator.StartCond();


        break
       
     
       
      }
    
     

      

    

}