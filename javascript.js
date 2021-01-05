var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function () {
    
    //if we are playing
    if(playing==true){
        location.reload ();//reload the page
    } 
    else {//if we are not playing
        playing=true;
        
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML= score;
        
        //show countdown box
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //hide gameover bow
        hide("gameover");
        
        //change button to reset
        document.getElementById("startreset").innerHTML="Reset Game";
        
        //change the instructions
        document.getElementById("instruction").innerHTML="Click on the correct answer";
        
        //start countdown
        startCountdown();
        
        //generate a new Q&A
        generateQA();
    }
}

//clicking on answer box
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check if we are playing
    if(playing==true){
        //yes
        if(this.innerHTML==correctAnswer){
            //correct answer
            score++;
            document.getElementById("scorevalue").innerHTML=score;
            //show correct, hide wrong
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct")
            }, 1000);
            
            //generate new Q&A
            generateQA();
        } else{
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong")
            }, 1000);
        }
       
       }
}
}
//if we click on answer box
    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1sec
                //generate new q&a
            //no
                //show try again box for 1sec

//functions

//start counter
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining==0){
            //game over
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>game over!</p><p>your score is " +score+ "</p>";
            hide("timeremaining")
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML="Start Game";
        }
    }, 1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide an element
function hide(id){
    document.getElementById(id).style.display = "none";
}

//show an element
function show(id){
    document.getElementById(id).style.display = "block";
}

//generate Q and multiple answers
function generateQA(){
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML= x+ "x" +y;
    var correctPosition = 1+Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML= correctAnswer;//fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do {
                wrongAnswer = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));//wrong answer
             }while(answers.indexOf(wrongAnswer)>-1)
                 document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
    }
}
}