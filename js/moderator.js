var moderator = {
    //State definition consts
    STATE_WELCOME: 0,
    STATE_DEMO:1,
    STATE_EXP_RUN:2,
   
    
  
    //Selectors
   // buttonPreviousElement: document.getElementById('a_previous'),
    buttonNextElement: document.getElementById('a_next'),
    //dot: document.getElementById('dot'),
    
  //Properties
    CondNumber:0,
    RunConter:1,
    experimentOrder:[],
    experiment: null,
    audioContext: null,
    audioGetReadyElements: [],
    audioFeedbackBuffers: [],
    audioFeedbackBuffersData: [],
    audioFeedbackNodes: [],
    state: undefined,
    preScreensIndex: 0,
    phasesIndex: 0,
    trialsIndex: 0,
    postScreensIndex: 0,
    trialCurrentLap: 0,
    clockRadius: 225,
    cor:0,
    first_time:0,
    LANG:null,

  sounds: {
    demo: [
      { file: 'media/250-440Hz_44100Hz_16bit_1000ms.wav' }
    ],
    getReady: [
      { file: 'media/250-440Hz_44100Hz_16bit_1000ms.wav' },
      { file: 'media/500-880Hz_44100Hz_16bit_1000ms.wav' }
    ],
    feedback: [
      { duration: 200 /*in msec*/, pitch: 1000 /*in Hz*/ },
      { duration: 100 /*in msec*/, pitch: 500 /*in Hz*/ }
    ]
  },

  initAudio: function () {
    try {


      this.audioContext = new AudioContext();

    
      this.audioGetReadyElements[0] = document.createElement('audio');
      this.audioGetReadyElements[0].src = this.sounds.demo[0].file;
      this.audioGetReadyElements[0].preload = 'auto';
      this.setAudioListeners(0);
      this.prepareFeedback();

      for (var i = 1; i <  this.sounds.getReady.length; i++) {
        this.audioGetReadyElements[i] = document.createElement('audio');
        this.audioGetReadyElements[i].src = this.sounds.getReady[i].file;
        this.audioGetReadyElements[i].preload = 'auto';
        this.setAudioListeners(i);
      }
    } catch  (e) {
      document.getElementById("main_instructions").innerHTML = '<p><strong>ERROR:</strong> ' + 'Your browser do not support Web Audio API and therefore it will not be possible to play experiment\'s sounds.'
      + '</p><br/><p>' +'Please <a href="http://google.com/chrome">download the latests version of Google Chrome</a> and try again.'+ '</p>';
      this.showButtons(false, false);
    }


  },
  prepareFeedback: function () {
    var SAMPLE_RATE = 48000,
        PI_2 = Math.PI * 2,
        j = 0,
        samples = 0;
    
        var i=0;

    samples = (200 / 1000) * SAMPLE_RATE;

    console.log(samples);

    this.audioFeedbackBuffers[i] = this.audioContext.createBuffer(1, samples, SAMPLE_RATE);

    this.audioFeedbackBuffersData[i] = this.audioFeedbackBuffers[i].getChannelData(0); 
    
    
    for (j = 0; j < samples; j++) {
      this.audioFeedbackBuffersData[i][j] = Math.sin(1000 * PI_2 * j / SAMPLE_RATE);
    }
    this.audioFeedbackNodes[i] = this.audioContext.createBufferSource();
    this.audioFeedbackNodes[i].playbackRate.value = 1.0;
    this.audioFeedbackNodes[i].connect(this.audioContext.destination);
    this.audioFeedbackNodes[i].buffer = this.audioFeedbackBuffers[i];
  },


  playFeedback: function () {

     //this.audioContext = new AudioContext();

    this.audioFeedbackNodes[0].start(this.audioContext.currentTime);
    
  
  },

  stopFeedback: function(){

   // this.audioContext = new AudioContext();

    //this.audioFeedbackNodes[0].stop(this.audioContext.currentTime);

  },
  setButtonsListeners: function () {
    //this.buttonPreviousElement.addEventListener('click', this.clickPrevious.bind(this), false);
    document.getElementById('a_next').addEventListener('click', this.clickNext.bind(this), false);
  },
  
  clickPrevious: function () {
  
  },

  clickNext: function () {

    switch (this.state) {

      case this.STATE_WELCOME:
         
        

        if(this.LANG.lang=="ENGLISH"){
         
          if(this.first_time==0){
            this.first_time=1;
            console.log("fisttime=1");
            this.welcome_stage2english();
        
          }else{
            this.state = this.STATE_DEMO;
            this.clock_demo_stage();

          }
        




        }
       if(this.LANG.lang=="HEBROW"){
        this.state = this.STATE_DEMO;
        this.clock_demo_stage();
        }
       
       
      break;

       case this.STATE_DEMO :

        //document.getElementById("pre_screen_title").innerHTML ='debugg';
          
       

       this.state = this.STATE_EXP_RUN

        
       if(this.CondNumber==0){

        this.create_random_exp_run();

       }
              
       document.getElementById('a_next').removeEventListener('click', this.clickNext);
       
       moderator.showButtons(false,false);

       dotElement = document.getElementById("dot");// createDotElement();

        

        this.StartCond();

       
                  
       break;
         


    }
  }, 

  
  StartCond:function(){ 

      if(this.experimentOrder[this.CondNumber] ==0){//STATE_BASE_LINE_ACTION     
      
       
       experimentBA_start(); 
      }
      if(this.experimentOrder[this.CondNumber] ==1 ){//STATE_AGENCY_ACTION
  
        experimentAA_start(); 
      }
      if(this.experimentOrder[this.CondNumber] == 2  ){//STATE_BASE_LINE_OUTCOME

        experimentBO_start(); 
      }
      if(this.experimentOrder[this.CondNumber] == 3 ){//STATE_AGENCY_OUTCOME

        experimentAO_start(); 

      }
      if(this.experimentOrder[this.CondNumber] == 10 ){//STATE display result for testing

        console.log("end exp");
       if(moderator.LANG.lang =="HEBROW"){

        data_collector.get_id();

       }
       if(moderator.LANG.lang =="ENGLISH"){ 
        console.log("end expstart ques");
        this.english_final_screen();
       }
       
      // data_collector.show_results();

      }

    
  },

   english_final_screen:function(){

     this.showButtons(false,false);
     document.getElementById("pre_screen_title").innerHTML = 'You have completed the task successfully'; //"ברוכים הבאים",
     document.getElementById("main_instructions").innerHTML = '<p>  Now, please continue for some questions. <br>Remember, there are no good or bad responses.<br>'
     + 'We would like to ask you to answer as accurately and sincerely as possible. <br> Your participation in this experiment is anonymous.</p>';
    this.showButtons(false,true);
    document.getElementById('a_next').addEventListener('click', this.questions_start.bind(this), false);
  
  },
  
  questions_start:function(){
  
    startQuestionnaires();


  },


  create_random_exp_run:function(){ 

    for (var a=[],i=0;i<4;++i) a[i]=i;
  
    function shuffle(array) {
      var tmp, current, top = array.length;
      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }
    
    this.experimentOrder = shuffle(a);  // a containe the exp order
    /*this.experimentOrder[0] =1;
    this.experimentOrder[1] =2;
    this.experimentOrder[2] =0;
    this.experimentOrder[3] =3;*/
    console.log(this.experimentOrder);
    this.experimentOrder.push(10);//   [4]=10
    
  },

  clock_demo_stage:function(){   
    this.showButtons(false,false);
    document.getElementById("pre_screen_title").innerHTML =this.LANG.demo_clock_instr;
    document.getElementById("main_instructions").innerHTML = this.LANG.demo_clock;
    this.showButtons(false,true);
    this.setButtonsListeners();
  },

  setAudioListeners: function (i) {
    i = i || 0;
    this.audioGetReadyElements[i].addEventListener('ended', this.audioGetReadyEndHandler, false);
  },
  sanityChecks: function () {
    console.log( "sanityChecks");
    var cssanimations = false,
        audio = false,
        resolution = false,
        errorHTML = '<p><strong>ERROR:</strong> ';

    if (!Modernizr.csstransforms || !Modernizr.cssanimations) {
      cssanimations = true;
      errorHTML += 'Your browser do not support CSS Animations.' +  '</p><br/>';
      errorHTML += '<p>' + 'Please <a href="http://google.com/chrome">download the latests version of Google Chrome</a> and try again.'+ '</p>';
    }
    if (!Modernizr.audio || !Modernizr.audio.wav) {
      audio = true;
      errorHTML += 'Your browser do not support Web Audio API and therefore it will not be possible to play experiment\'s sounds.' + '</p><br/>';
      errorHTML += '<p>' + 'Please <a href="http://google.com/chrome">download the latests version of Google Chrome</a> and try again.' + '</p>';
    }
    if ((document.documentElement.clientWidth < 850) || (document.documentElement.clientHeight < 700)) {
      resolution = true;
      errorHTML += 'Screen resolution is too small.</p><br/><p>Please press F11 to switch to full screen and then F5 to reload.' + '</p>';
    }
    if (cssanimations || audio || resolution) {

      document.getElementById("pre_screen_title").innerHTML = errorHTML;
      console.log( "hh flase");
      this.showButtons(false, false);
      return false;
    }
    console.log( "hh true");
    return true;
  },
  playDemo:function () {   
    this.audioGetReadyElements[0].play();
  },
   
  start:function(){
  
    document.getElementById('dot').style.display = 'none';
   

    if(this.sanityChecks()) {

     try{
      this.init_screen();
     }
     catch(e){
       document.getElementById("pre_screen_title").innerHTML = "!!נכשל אתחול מסך";
     }
    
     try{
       this.initAudio();
     }
     catch(e){
        document.getElementById("pre_screen_title").innerHTML = "!!נכשל אתחול סאונד";
      }
     
    }
    else{
      //document.getElementById("pre_screen_title").innerHTML = "!!נכשל ";
    }
  },
  
  showButtons:function (p, n) {

    if(n){
     document.getElementById("f1").innerHTML =   '<button href="#" class="next" id= "a_next"  >&laquo;'+ this.LANG.Next_txt + '</button>' ;
    }
   else{  
     document.getElementById("f1").innerHTML = '';
   }
   
    
  },

  init_screen:function(){
      this.select_lang_screen();
      
      
  },

  welcome_stage:function(){
    document.getElementById("pre_screen_title").innerHTML = this.LANG.welcome_stage;//"ברוכים הבאים",
    document.getElementById("main_instructions").innerHTML =this.LANG.main_instructions;
 
  this.showButtons(false,true);
 
  },

  select_lang_screen:function(){
    
    document.getElementById("pre_screen_title").innerHTML = "Welcome!<br> This experiment is part of a research by the consciousness and psychopathology lab at the <br>Department of Psychology at Ben-Gurion University of the Negev.<br>Please select your preferred language:"
    + '<br><br> !ברוכים הבאים<br>.ניסוי זה מתבצע מטעם המעבדה לתודעה ופסיכופתולוגיה, במחלקה לפסיכולוגיה של אוניברסיטת בן-גוריון בנגב<br>:בחרו בבקשה את השפה שלכם',
    document.getElementById("main_instructions").innerHTML ='</br></br><button id="startHebrow" onclick="moderator.start_hebrow()" >עברית</button>   <button id="startEnglish" onclick="moderator.start_english()" >English</button>     <br>';
   
  },

  welcome_stage2english:function(){
    this.showButtons(false,false);
    document.getElementById("pre_screen_title").innerHTML = ''; //"ברוכים הבאים",
    document.getElementById("main_instructions").innerHTML = this.LANG.main_instructions2;
    this.showButtons(false,true);
    this.setButtonsListeners();
  },

  
  start_hebrow:function(){
    
    this.LANG = new _text("HEBROW");
    this.state =  this.STATE_WELCOME;
    this.welcome_stage();
    this.setButtonsListeners();
    
  },

  start_english:function(){


    this.LANG = new _text("ENGLISH");
    startQuestionnaires();
   // this.state =  this.STATE_WELCOME;
   //this.welcome_stage();
    //this.setButtonsListeners();
    

    
  }
  
 

} /// end of moderator var 



