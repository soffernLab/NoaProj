class _text {


    
    

    constructor(lng) {

      //   var heb = "HEBROW";
         this.lang=lng;
        switch (lng) {
            case "ENGLISH":
             this.Next_txt= "Next";
            this.welcome_stage ="We would like to thank you for taking part in this experiment";
            this.main_instructions='The experiment is conducted by the Consciousness and Psychopathology Laboratory of the Department of <br>Psychology in Ben-Gurion University of the Negev.<br>'
            +'<p> In this task and the questionnaires following it, there are no good or bad responses. What we<br>'
             + 'are investigating are psychological processes that occur in all individuals. You do not need to tell us your name,<br>'
             + 'and the responses that you will give through the experiment will be added to those of the other participants and analyzed statistically.<br>'
             + ' Your participation in this experiment is anonymous.    </p>'
            + '<br>If you agree to participate, press “Next”. ';
           
            this.main_instructions2= 'You are about to start a task. After completing the task, you will be asked to answer some questionnaires. <br>Please continue to the questionnaires immediately after completing the task.<br>'
            +'<p> At the beginning of each trial of the task, an analog clock face will be shown at the screen. A message will<br>'
            +'advise that in a few second the clock will start running. During the task, instructions will be shown on the<br>'
             +'screen, please follow them. Also, sometimes sounds will be played. Before you start, please check if the audio<br>' 
             +'is activated. Please click on the “Play” icon.   </p>'
             +'</br></br><button id="demosound" onclick="moderator.playDemo()" >Play</button><br>'
            + '<br>In the following screen a clock in demo mode will be shown to get used to it';
          
            this.demo_clock_instr ="This is a clock in a demo mode";
            this.demo_clock = '<p id = "exampleText" > Press “Next” once you understand how it works.</p><div id="demo_clock"><div id="demo_marks"><img src="img/dot450.png"  id="demo_dot"/></div></div> ';;
            
            this.BOdisplay_instr_header='';
            this.BOdisplay_instr='<p>At the beginning of each trial of the task, an analog clock face will be shown at the screen. <br>' 
            +'A message will advise that in a few second the clock will start running. <br>' 
            +'There is no need to do anything. Just watch the clock running. <br>' 
            +'Please press “Next” to start. </p>';
            this.step2_BO=  "In which moment did you hear the sound?<br> Please select the moment by clicking into the clock's face and press OK.";
           
            
          
            this.BAdisplay_instr_header='';
            this.BAdisplay_instr='<p>At the beginning of each trial of the task, an analog clock face will be shown at the screen.<br>' 
            +'A message will advise that in a few second the clock will start running.<br>'
            +'Your task is to press the SPACEBAR in any moment of your choice.<br>'
            +'Please press “Next” to start.</p>';
            
            
            this.AAdisplay_instr_header='';
            this.AAdisplay_instr='<p>At the beginning of each trial of the task, an analog clock face will be shown at the screen. <br>' 
            +'A message will advise that in a few second the clock will start running. <br>' 
            +'Your task is to press the SPACEBAR in any moment of your choice. <br>' 
            +'Please press “Next” to start. <p>';
            this.step2_AA= "In which moment did you press the spacebar? <br> Please select the moment by clicking into the clock's face and press OK.";
            

            this.AOdisplay_instr_header='';
            this.AOdisplay_instr='<p>   At the beginning of each trial of the task, an analog clock face will be shown at the screen. <br>' 
            + 'A message will advise that in a few second the clock will start running. <br>' 
            +'Your task is to press the SPACEBAR in any moment of your choice. <br>' 
            +'Please press “Next” to start. </p>';
            

            this.counter_txt_2="Get ready. Remember, your task is to press SPACEBAR in a moment of your choice.";
            this.counter_txt_1="Get ready. Remember, you do not have to do anything, just watch the clock.";
            
            
            this.subjective_title=" To what extent did you feel that you were the one who generated the tones? <br>Please rate from “not at all” to “very much”: </br>";
            this.subjective_instr='<div class="slidecontainer">' +'very much' + ' <input type="range" min="1" max="100" value="50" class="slider" id="myRange">' + 'not at all' + '<p></p></div>';
            break;
            case"HEBROW":

               this.Next_txt= "הבא";
               this.welcome_stage = "ברוכים הבאים";
              this.main_instructions =   '.במטלה זו יוצג על המסך שעון אנלוגי, שבו נקודה תשמש במקום מחוג<br>.במהלך המטלה יופיעו על המסך הנחיות שונות. יש לעקוב אחר ההנחיות ולבצען<br>'
              +'.לעתים יישמעו צלילים. לכן, בטרם תתחיל המטלה, יש לוודא שהרמקולים של המחשב עובדים<br>יש ללחוץ על המקש כדי לשמוע צליל לדוגמא ולוודא שעוצמת הווליום תקינה '
              + ' </br></br><button id="demosound" onclick="moderator.playDemo()" >הפעל צליל</button><br>'; 
              this.main_instructions2="";
            this.demo_clock_instr ="במהלך הניסוי יופיע שעון ועליו נקודה שמסתובבת סביב היקפו";
            this.demo_clock='<p id = "exampleText" >:דוגמה </p><div id="demo_clock"><div id="demo_marks"><img src="img/dot450.png"  id="demo_dot"/></div></div>';
         
            this.BOdisplay_instr_header=" הסבר המטלה";
            this.BOdisplay_instr='<p>.במטלה זו יוצג על המסך שעון אנלוגי, שבו נקודה תשמש במקום מחוג<br>.תוך זמן קצר, השעון יתחיל לרוץ<br>.אין צורך לבצע כל פעולה<br>.יש ללחוץ על "הבא" כדי להתחיל <br/></br></br></p>'
            this.step2_BO= "?באיזה רגע נשמע הצליל<br> .יש לסמן את הרגע באמצעות לחיצה על המקום המתאים בשעון, ואז לחיצה על הבא";
            
            this.BAdisplay_instr_header=" הסבר המטלה";
            this.BAdisplay_instr='<p>.במטלה זו יוצג על המסך שעון אנלוגי, שבו נקודה תשמש במקום מחוג<br>.תוך זמן קצר, השעון יתחיל לרוץ<br>.המשימה שלך היא ללחוץ על מקש הרווח בתזמון לבחירתך<br>.יש ללחוץ על "הבא" כדי להתחיל <br/></br></br></p>';

            this.AAdisplay_instr_header=" הסבר המטלה";
            this.AAdisplay_instr='<p>.במטלה זו יוצג על המסך שעון אנלוגי, שבו נקודה תשמש במקום מחוג<br>.תוך זמן קצר, השעון יתחיל לרוץ<br>.המשימה שלך היא ללחוץ על מקש הרווח בתזמון לבחירתך<br>.יש ללחוץ על "הבא" כדי להתחיל <br/></br></br></p>'
            this.step2_AA= "?באיזה רגע לחצת על מקש הרווח<br> .יש לסמן את הרגע באמצעות לחיצה על המקום המתאים בשעון, ואז לחיצה על הבא";


            this.AOdisplay_instr_header=" הסבר המטלה";
            this.AOdisplay_instr='<p>.במטלה זו יוצג על המסך שעון אנלוגי, שבו נקודה תשמש במקום מחוג<br>.תוך זמן קצר, השעון יתחיל לרוץ<br>.המשימה שלך היא ללחוץ על מקש הרווח בתזמון לבחירתך<br>.יש ללחוץ על "הבא" כדי להתחיל <br/></br></br></p>'

            this.subjective_title="  ?באיזו מידה הרגשת שאת/ה הפקת את הצליל <br> '\יש למקם באמצעות העכבר את תחושתך על הרצף שבין \'כלל לא\' לבין \'במידה רבה מאוד </br>";
            this.subjective_instr='<div class="slidecontainer">' +'במידה רבה מאוד' + ' <input type="range" min="1" max="100" value="50" class="slider" id="myRange">' + 'כלל לא' + '<p></p></div>';

            this.counter_txt_1='.השעון יתחיל מיד לרוץ. אין צורך לבצע כל פעולה';
            this.counter_txt_2='התכוננו. זכרו, יש ללחוץ על מקש הרווח בזמן לבחירתכם';
            break;


        }
      
    }

    
   
}