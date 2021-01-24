
    

var timeoutFiveSecExpAO;
var AOiterationCount;
var AOstartTime, AOendTime;
var hundredmsDelay;
var AOdotElement;
var AO_COND_STATE = 0; // ther arcondition state :  BA_COND_STATE = 1--> instruction display
                        // BA_COND_STATE= 2 --> display counter
                        // BA_COND_STATE= 3 -->  rotating clock display
                        // BA_COND_STATE= 4 -->  input clock display

// numRoundsExpBA is the amount of stages in the experiment
var numStepsCondAO;
// currNumExpBA is the current stage
var currStepCondAO = 0;
//var expNumber;
var AOestimated_prees_time;

function step2_AO(){


    document.getElementById("pre_screen_title").innerHTML =moderator.LANG.step2_BO;
    document.getElementById("main_instructions").innerHTML = '<div id="demo_clock"><div id="demo_marks"></div></div>';
 
    //  $("html, body").animate({
      //  scrollTop: 0
       //}, 0); 
        
         

          

         document.getElementById("demo_clock").addEventListener("click", function(e){
       
          if(AO_COND_STATE==3.1)  {

            moderator.prepareFeedback();

           // moderator.stopFeedback();

            moderator.showButtons(false,true);
            document.getElementById('a_next').addEventListener('click',AOnext_pressed);
            clickHandlerAddDotAO(e);
             
            //AA_COND_STATE = 4;

           
            

          }
     

       
    })
}

// Positions the point in the location that the user clicked
function clickHandlerAddDotAO(event) {


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
    AOsetAngle(centerX, centerY, event.clientX, event.clientY);
}

function AOsetAngle(x1, y1, x2, y2) {
    var theta = Math.atan2(x2-x1, y2-y1);
    var degree = (theta * (180 / Math.PI) * -1) - 180;
    //console.log(degree);
    var d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    if (d < 225) {
        if (degree < 0) {
            degree += 360;
        }        
        //dotElement = createDotElement();

       // document.getElementById('demo_marks').appendChild(AOdotElement);

        addDotUserToScreen(degree);

        deg=degree;
    }
}

function calc_estimated_press_timeAO(){
   
    AOestimated_prees_time = deg * (2.56/360)*1000;
    data_collector.AO_estimtion.push(AOestimated_prees_time);
   // console.log(deg + "  " + estimated_prees_time);

}



function addDotUserToScreenAO(degree){
    AOdotElement.style.webkitTransform = 'rotate('+degree+'deg)';
    //document.getElementById("dot").style.webkitTransform = 'rotate('+degree+'deg)';
    AOdotElement.style.mozTransform = 'rotate('+degree+'deg)';
   // document.getElementById("dot").style.mozTransform = 'rotate('+degree+'deg)';
   AOdotElement.style.transform = 'rotate('+degree+'deg)';

    //document.getElementById("dot").style.transform = 'rotate('+degree+'deg)';
    AOdotElement.style.display = "block";
    //document.getElementById("dot").style.display = "block";
}








function  experimentAO_start(){
       

    numStepsCondAO = moderator.RunConter;
   // createDotElement();

    AO_COND_STATE = 1; // 1= instruction display
    display_instrAO();//1/ display the condition instruction
    document.getElementById('a_next').addEventListener('click',AOnext_pressed);
    document.addEventListener('keydown', AOlogKey);

 }

 function display_instrAO(){

    document.getElementById("pre_screen_title").innerHTML =moderator.LANG.AOdisplay_instr_header;

    document.getElementById("main_instructions").innerHTML = moderator.LANG.AOdisplay_instr;
    
    moderator.showButtons(false,true);
}

function display_step_1_AO(){
   
    showDemoClockAO();//wait for spacebar press
    

}
function startNextStep_5secpassAO(){
    AO_COND_STATE = 2;// display counter
    currStepCondAA++;
    data_collector.AO_estimtion.push(0);
    data_collector.AO_real_timing.push(0);

    if(currStepCondAO<numStepsCondAO){
    
    
        setcounter(display_step_1_AO,500,0)
        
        
    }
    else
    {
        moderator.CondNumber++;

        AO_COND_STATE = 0;

        document.removeEventListener('keydown',logKey);

        document.getElementById('a_next').removeEventListener('click',next_pressed);

       

      

        moderator.StartCond();


    }
    
   
}
function showDemoClockAO(){   

    AOiterationCount =0;

    timeoutFiveSecExpAO = setTimeout(startNextStep_5secpassAO, 5600); 

    AO_COND_STATE =3;

    
    document.getElementById("pre_screen_title").innerHTML ="          <br>     </br>  ";
    document.getElementById("main_instructions").innerHTML = '<div id="demo_clock"><div id="demo_marks"><img src="img/dot450.png"  id="demo_dot"/></div></div>';   
    var animated = document.getElementById('demo_dot');
   
    animated.addEventListener('animationstart', () => {
        AOstartTime = performance.now();
      });
      animated.addEventListener('animationiteration', () => {

        AOiterationCount=2560;
        
      });
  
   
}
function AOsound(){
   

    moderator.playFeedback();
    AO_COND_STATE = 3.1;
    hundredmsDelay = setTimeout(AOcontinue,300);

     //clearTimeout(twofifty_milsec);

     
  
    
}


function AOcontinue(){

    step2_AO();
}


 function AOlogKey(e){

    //alert("logkeyBA");

    if(e.keyCode == 32 && AO_COND_STATE==3){  // if the space bar is ressed AND clock is visible
      
       
        AOendTime =  e.timeStamp;
        clearTimeout(timeoutFiveSecExpAO);

        twofifty_milsec = setTimeout(AOsound,250); 

       var diff =AOendTime -AOstartTime -AOiterationCount ;

    
        console.log(diff);

       

        AO_COND_STATE = 3.1;
       
        data_collector.AO_real_timing.push(diff);


      //  step2_AO();
          
        
           
        //to do remove event listner or disable
            
    }

}
 function AOnext_pressed(){

    switch (AO_COND_STATE) {
     
     case (1):

         
         AO_COND_STATE = 2;// display counter
         setcounter(display_step_1_AO,1000)
         currStepCondAO++;
     break
     
     case (3.1):

         calc_estimated_press_timeAO();
            console.log("calc_estimated_press_time");

         if(currStepCondAO<numStepsCondAO){

             AO_COND_STATE = 2;// display counter
             currStepCondAO++;
             setcounter(display_step_1_AO,500)
             

         } 
         else {


            AO_COND_STATE = 5;

            subjective_action.set_screen();

             
            // console.log("est:" + data_collector.BA_estimtion +"" + "realt:" + data_collector.BA_real_timing);


         }


     break
     case(5):
     data_collector.AO_action_subjective = subjective_action.get_slider_value();
        
     console.log(data_collector.AO_action_subjective);

     moderator.CondNumber++;

     AO_COND_STATE = 0;

     document.removeEventListener('keydown',AOlogKey);

     document.getElementById('a_next').removeEventListener('click',AOnext_pressed);
     
     

    //console.log(moderator.CondNumber);

     moderator.StartCond();

     break
    
   }
 }
