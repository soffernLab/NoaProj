var timeoutFiveSecExpBO;
var BOiterationCount;
var BOstartTime, BOendTime;
var soundDelay;
var BO_COND_STATE = 0; // ther arcondition state :  BA_COND_STATE = 1--> instruction display
                        // BA_COND_STATE= 2 --> display counter
                        // BA_COND_STATE= 3 -->  rotating clock display
                        // BA_COND_STATE= 4 -->  input clock display

// numRoundsExpBA is the amount of stages in the experiment
var numStepsCondBO ;
// currNumExpBA is the current stage
var currStepCondBO = 0;
//var expNumber;
var BOestimated_prees_time;


function  experimentBO_start(){

//dotElement = document.getElementById("dot");// createDotElement();
numStepsCondBO = moderator.RunConter;

BO_COND_STATE = 1; // 1= instruction display



BOdisplay_instr();//1/ display the condition instruction

document.getElementById('a_next').addEventListener('click',BOnext_pressed);

}

function BOdisplay_instr(){
    document.getElementById("pre_screen_title").innerHTML =moderator.LANG.BOdisplay_instr_header;
    document.getElementById("main_instructions").innerHTML = moderator.LANG.BOdisplay_instr;
    moderator.showButtons(false,true);
}

function display_step_1_BO(){

    moderator.prepareFeedback();

    showDemoClockBO();
    

}

function showDemoClockBO(){   

    BOiterationCount =0;

    var delaySound 

    BO_COND_STATE =3;

   
    delaySound = Math.floor(Math.random() * 2460)+100;
    document.getElementById("pre_screen_title").innerHTML ="          <br>     </br>  ";
    document.getElementById("main_instructions").innerHTML = '<div id="demo_clock"><div id="demo_marks"><img src="img/dot450.png"  id="demo_dot"/></div></div>';   
    var animated = document.getElementById('demo_dot');
   
    animated.addEventListener('animationstart', () => {
        BOstartTime = performance.now();
         
      //  console.log("delay: " + delaySound);
       soundDelay = setTimeout(BOplaySound,delaySound);

      });
      animated.addEventListener('animationiteration', () => {

        BOiterationCount=2560;
        
      });
     
}


function BOplaySound(){

    BOendTime = performance.now();
    moderator.playFeedback();
    var diff = BOendTime - BOstartTime ;
    data_collector.BO_real_timing.push(diff);
    BO_COND_STATE = 3.1;
    hundredmsDelay = setTimeout(step2_BO,300);

     //clearTimeout(twofifty_milsec);

    


}



function step2_BO(){

    document.getElementById("pre_screen_title").innerHTML =moderator.LANG.step2_BO;
    document.getElementById("main_instructions").innerHTML = '<div id="demo_clock"><div id="demo_marks"></div></div>';
 
    //  $("html, body").animate({
      //  scrollTop: 0
       //}, 0); 
        
         

          

         document.getElementById("demo_clock").addEventListener("click", function(e){
       
          if(BO_COND_STATE==3.1)  {

            moderator.prepareFeedback();

           console.log("click");

            moderator.showButtons(false,true);
            document.getElementById('a_next').addEventListener('click',BOnext_pressed);
            clickHandlerAddDotBO(e);
             
            //AA_COND_STATE = 4;

           
            

          }
     

       
    })



}
// Positions the point in the location that the user clicked
function clickHandlerAddDotBO(event) {


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
    BOsetAngle(centerX, centerY, event.clientX, event.clientY);
}

function BOsetAngle(x1, y1, x2, y2) {
    var theta = Math.atan2(x2-x1, y2-y1);
    var degree = (theta * (180 / Math.PI) * -1) - 180;
    //console.log(degree);
    var d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    if (d < 225) {
        if (degree < 0) {
            degree += 360;
        }        
        //dotElement = createDotElement();
        
        addDotUserToScreen(degree);
        deg=degree;
    }
}

function calc_estimated_press_timeBO(){
   
    BOestimated_prees_time = deg * (2.56/360)*1000;
    data_collector.BO_estimtion.push(BOestimated_prees_time);
   // console.log(deg + "  " + estimated_prees_time);

}



function addDotUserToScreenBO(degree){
    dotElement.style.webkitTransform = 'rotate('+degree+'deg)';
    //document.getElementById("dot").style.webkitTransform = 'rotate('+degree+'deg)';
    dotElement.style.mozTransform = 'rotate('+degree+'deg)';
   // document.getElementById("dot").style.mozTransform = 'rotate('+degree+'deg)';
   dotElement.style.transform = 'rotate('+degree+'deg)';

    //document.getElementById("dot").style.transform = 'rotate('+degree+'deg)';
    dotElement.style.display = "block";
    //document.getElementById("dot").style.display = "block";
}


function BOnext_pressed(){
    console.log("_press_was_made");
    switch (BO_COND_STATE) {
     
     case (1):

         
         BO_COND_STATE = 2;// display counter
         setcounter(display_step_1_BO,1000,1)
         currStepCondBO++;
     break
     
     case (3.1):

         calc_estimated_press_timeBO();
            console.log("calc_estimated_press_time");

         if(currStepCondBO<numStepsCondBO){

             BO_COND_STATE = 2;// display counter
             currStepCondBO++;
             setcounter(display_step_1_BO,500,1)
             

         } 
         else {
      
             BO_COND_STATE = 5;
             subjective_action.set_screen();

         }


     break
     case(5):
     moderator.CondNumber++;
     console.log("ccondnumber:" +moderator.CondNumber );
     data_collector.BO_action_subjective = subjective_action.get_slider_value();
     document.getElementById('a_next').removeEventListener('click',BOnext_pressed);
     moderator.StartCond();

     break

   }    

}