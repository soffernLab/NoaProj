
    function setcounter (myCallback,fullSec,cond){
      
       if(cond==1){
        document.getElementById("pre_screen_title").innerHTML = moderator.LANG.counter_txt_1;
       }
       else{
        document.getElementById("pre_screen_title").innerHTML =moderator.LANG.counter_txt_2;
       }
       

        document.getElementById("main_instructions").innerHTML ='<p style="font-size:200px; color:#00629c;">3</p>';
        moderator.showButtons(false,false);
    
        var count = 2;
        var timer = setInterval(function() { handleTimer(count); }, fullSec);
    
        function endCountdown() {
          //clear_screen(); //Todo
          document.getElementById("main_instructions").innerHTML ='<p></p>'
          document.getElementById("pre_screen_title").innerHTML ="";

          myCallback();      
          
        }
        
        function handleTimer() {
          if(count === 0) {
            clearInterval(timer);
            endCountdown();
          } else {
            document.getElementById("main_instructions").innerHTML ='<p style="font-size:200px; color:#00629c;">' + count.toString(); + '</p>';
            count--;
          }
        }
      }




