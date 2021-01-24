
var data_collector = {

    BA_real_timing:[],
    BA_estimtion:[],

    AA_real_timing:[],
    AA_estimtion:[],
    AA_action_subjective:0,

    AO_real_timing:[],
    AO_estimtion:[],
    AO_action_subjective:0,

    BO_real_timing:[],
    BO_estimtion:[],
    BO_action_subjective:0,

    show_results: function(){
      
      //console.log(this.BA_estimtion.length);

     document.getElementById("pre_screen_title").innerHTML =":תוצאות";
     document.getElementById("main_instructions").innerHTML =  `<div class="results"><br>BA: </br> <br> bl_action_realTime:${this.BA_real_timing[0]}bl_action_estTime   ${this.BA_estimtion[0]}</br>bl_action_realTime:${this.BA_real_timing[1]}bl_action_estTime   ${this.BA_estimtion[1]}
     </br>bl_action_realTime:${this.BA_real_timing[2]}bl_action_estTime   ${this.BA_estimtion[2]}</br> <br>AA: </br> <br> A_action_realTime:${this.AA_real_timing[0]}A_action_estTime   ${this.AA_estimtion[0]}</br> <br> A_action_realTime:${this.AA_real_timing[1]}A_action_estTime   ${this.AA_estimtion[1]}</br>
     <br> A_action_realTime:${this.AA_real_timing[2]}A_action_estTime   ${this.AA_estimtion[2]}</br>  <br> AA_action_subjective:   ${this.AA_action_subjective}</br>
     </div>`;   



       moderator.showButtons(false,false);
    },

    get_id: function(){

      document.getElementById("pre_screen_title").innerHTML ="המטלה הסתיימה";
      
      document.getElementById("main_instructions").innerHTML ='<form id="frm1" action="/action_page.php" dir="rtl">יש להקיש ארבע ספרות אחרונות של ת.ז,    <br> בסיום לחץ על הגש:<br>  <input type="number"  max="9999" name="id" value=""/>  <input type="button" onclick="submit_id()" value="הגש"/></form>'
      moderator.showButtons(false,false);


    },

    get_data_arr: function(){

     var Arr = [];



     var rows = moderator.RunConter;
     
     
     // expand to have the correct amount or rows
     for( var i=0; i<rows+4; i++ ) {

      Arr.push([]);
     }

   

     Arr[0].push ("BL_action_realTime");
     Arr[0].push ("BL_action_estTime");
     Arr[0].push ("AG_action_realTime");
     Arr[0].push ("AG_action_estTime");    
     Arr[0].push ("BL_outcome_realTime");
     Arr[0].push ("BL_outcome_estTime");
     Arr[0].push ("AG_outcome_realTime");
     Arr[0].push ("AG_outcome_estTime");

   
     var k =1;

         for (var j =0; j < rows; j++)
         {
          Arr[k].push(this.BA_real_timing[j]);
          Arr[k].push(this.BA_estimtion[j]);
          Arr[k].push(this.AA_real_timing[j]);
          Arr[k].push(this.AA_estimtion[j]);
          Arr[k].push(this.BO_real_timing[j]);
          Arr[k].push(this.BO_estimtion[j]);
          Arr[k].push(this.AO_real_timing[j]);
          Arr[k].push(this.AO_estimtion[j]);

           k++;   
            
         }
        //set subjective values

         
         Arr[k].push("AG_action_subjective:");
         Arr[k].push(this.AA_action_subjective);
         Arr[k+1].push("BL_outcome_subjective:");
         Arr[k+1].push(this.BO_action_subjective);
         Arr[k+2].push("AG_outcome_subjective:");
         Arr[k+2].push(this.AO_action_subjective);
        
       
     return Arr;

    },


}

function submit_id(){
 
  var x = document.getElementById("frm1");

  if (x.elements[0].value.length<5){

    

    // document.getElementById("pre_screen_title").innerHTML = x.elements[0].value ;
    
     var final_data_arr =data_collector.get_data_arr();

     var dataString = JSON.stringify(final_data_arr);

     $.ajax({
      type: "POST",
      dataType: "json",
      url: "datahandler.php",
      data: {myData:dataString},
      
      success: function(data){
          alert('Items added');
      },
      error: function(e){
          console.log(e.message);
      }
    });
     /*
   
     var csvContent = "data:text/csv;charset=utf-8,";
   
   
     
     final_data_arr.forEach(function( rowArray){
    
       let row = rowArray.join(",");
       csvContent += row + "\r\n";
   
       });
   
       var encodedUri = encodeURI(csvContent);
       //	window.open(encodedUri);
       var link = document.createElement("a");
       link.setAttribute("href", encodedUri);
       link.setAttribute("download", `${x.elements[0].value}.csv`);
       document.body.appendChild(link); // Required for FF
       
       link.click(); // This will download the data file named "my_data.csv".
       */
  }
  
  else{

     alert("יש להכניס רק 4 ספרות");


  }


	


}


var subjective_action = {


  //Properties
  maxvalue:9,
  minvalue:1,
  score:null,
  slider:null,
  
  set_screen: function () {


    document.getElementById("pre_screen_title").innerHTML = moderator.LANG.subjective_title;
    document.getElementById("main_instructions").innerHTML =  moderator.LANG.subjective_instr;
    slider = document.getElementById("myRange");
    score =  slider.value;
    slider.oninput = function() {
      score =  this.value;
      console.log(score);
      
    }
  
   // console.log(score);


  },


  get_slider_value: function(){

    var Score =  Math.ceil(slider.value/11.112);

    return Score;

  },

    

}