//SoundTracks
SoundIntro = document.getElementById("intro");
SoundError = document.getElementById("error");
SoundUp = document.getElementById("up");
SoundLose = document.getElementById("lose");

SoundIntro.volume=0.2

for(var i=1;i<=7;i++){
	SoundBackground = document.getElementById("background"+i);
	SoundBackground.volume=0.6
}

//Game variables
var canvas, ButtonStart, ButtonStop, context, WIDTH, HEIGHT, img, GameStatus = 0, record, GRAVITY = 2, life = 3, score = 0, aux=0, sound = false, frames = 0,

quiz = {
    name: " ",
    id: null
},

Status = {
    start: 0,
    playing: 1,
},

//Dropping elements
elements = {
    _obs: [],
    elementDelay: 0,
    baseLevel: 100,

    insere: function(){
	    if(aux == 0 && (this._obs.length > Math.floor(3 * Math.random()))){
		    this._obs.push({
			    width: 150,
				height: 150,
				gravity: GRAVITY,
				velocity: -150,
				x: 300 + Math.floor(571 * Math.random()),
				y: -150,
				name: quiz.name,
				id: quiz.id
			});    
			aux = 1;    	
		}else{
	    	this._obs.push({
	            width: 150,
	            height: 150,
	            gravity: GRAVITY,
	            velocity: -150,
	            x: 300 + Math.floor(571 * Math.random()),
	            y: -150,
	            name: Quizzes[Math.floor(Quizzes.length * Math.random())].name,
	            id: Quizzes[Math.floor(Quizzes.length * Math.random())].id
	        });   
        } 	       
        this.elementDelay = this.baseLevel +  Math.floor(51 * Math.random());
    },

    update: function(){
        if(this.elementDelay == 0) {   	
            this.insere();
            if(this.baseLevel >= 30)
                this.baseLevel--;
        }else
            this.elementDelay--;      

        for(var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            obs.velocity += obs.gravity;
            obs.y = obs.velocity;
            limit = 600;

            if(obs.y >= limit) {
                this._obs.splice(i, 1);
                tam--;
                i--;
                var error=false
                if(life > 0 && obs.id == quiz.id){
                    if(localStorage.getItem("quiz")=="English"){
                        showSnackbar(setCharAt(quiz.name,quiz.name.indexOf("_"),quiz.id))
                    }
                    else{
                        showSnackbar(quiz.name + " = " + quiz.id)
                    }
                    elements._obs = [];
                    elementSort();
                    life--;
                    SoundError.play();
                    aux = 0;
                    error = true
                }
                if(life == 0){
                    SoundLose.play();
                    updateRecord()
                }
            }

            if(error)break
        }
    },

    draw: function(){
        for(var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            element.print(obs.x, obs.y);

            context.fillStyle = "#890305";
            context.textAlign = "center";
            context.font = "25px Passion One, Arial";
            context.fillText(obs.id, (obs.x+obs.width/2)-10, (obs.y+obs.height/2)-5);
        }
    },

    click: function(event){
        var pos = {
            x: event.clientX - canvas.getBoundingClientRect().left,
            y: event.clientY - canvas.getBoundingClientRect().top
        }
        for(var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            if(obs!=undefined){
            	if ((pos.x >= obs.x) && (pos.x <= (obs.x + obs.width)) && (pos.y >= obs.y) && (pos.y <= (obs.y + obs.height))) {
	                this._obs.splice(i, 1);
	                tam--;
	                i--;
	                if(life > 0 && obs.id == quiz.id){
	                    score++;
	                    elements._obs = [];
	                    GRAVITY += 0.1;
	                    elementSort();
	                    SoundUp.play();
	                    aux = 0;
	                }else{
	                    if(life > 0)
	                        life--;
	                    SoundError.play();
                        if(localStorage.getItem("quiz")=="English"){
                            showSnackbar(setCharAt(quiz.name,quiz.name.indexOf("_"),quiz.id))
                        }
                        else{
                            showSnackbar(quiz.name + " = " + quiz.id)
                        }
                        elements._obs = [];
                        elementSort();
	                }
	                if(life == 0){
	                    SoundLose.play();
	                    updateRecord()
	                }
	            }
            }
        }
    }
},

//Display Functions
panel = {
    QuizElement: function(){
        context.fillStyle = "#fff";
        context.textAlign = "center";
        context.font = "25px Passion One, Arial";
        context.fillText(quiz.name, 143, 300);
    },
    PointsBoard: function(){
        pointBoard.print(41, 0);
        context.fillStyle = "#fff";
        context.textAlign = "center";
        context.font = "18px Arial";
        context.fillText("Highest: "+record, 155, 67);
        context.font = "40px Arial";
        context.fillText(score, 153, 115);
        lifeHeart[life].print(103, 130);
    },
    SplashScreen: function(){
        playButton.print(56, -50);
    },
    MusicOff: function(){
        muteDash.print(60, 495);
        muteMusic()
    },
    MusicOn: function(){
    	unmuteMusic()
    },
    SoundOff: function(){
        muteDash.print(60, 540);
        muteSound()
    },
    SoundOn: function(){
        unmuteSound()
    },
    EnglishButton: function(){
    },
    MathButton: function(){
    	mathButton.print(144, 382);
    },
    MathAddButton: function(){
    	mathAddButton.print(144, 430);
    },
    MathSubtractButton: function(){
    	mathSubtractButton.print(144, 430);
    },
    MathMultiplyButton: function(){
    	mathMultiplyButton.print(144, 430);
    },
    MathDivideButton: function(){
    	mathDivideButton.print(144, 430);
    },
    MathAllButton: function(){
    	mathAllButton.print(144, 430);
    },
    EnglishFruitButton: function(){
    	englishFruitButton.print(144, 430);
    },
    EnglishAnimalButton: function(){
    	englishAnimalButton.print(144, 430);
    },
    draw: function(){
        this.QuizElement();
        this.PointsBoard();
    }
};

function muteMusic(){
	SoundBackground.muted=true
    SoundIntro.muted=true
}

function unmuteMusic(){
	SoundBackground.muted=false
    SoundIntro.muted=false
}

function muteSound(){
	SoundError.muted=true
    SoundUp.muted=true
    SoundLose.muted=true
}

function unmuteSound(){
	SoundError.muted=false
    SoundUp.muted=false
    SoundLose.muted=false
}

function elementSort(){
    var rand = Math.floor(Quizzes.length * Math.random());
    quiz.name = Quizzes[rand].name;
    quiz.id = Quizzes[rand].id;
}

//Score function
function updateRecord(){
	if(quizType=="Math"){
		if(mathTypeQuiz=="add"){
			if(score > record)
	            localStorage.setItem("mathAddRecord", score);
		}else if(mathTypeQuiz=="subtract"){
			if(score > record)
	            localStorage.setItem("mathSubtractRecord", score);
		}else if(mathTypeQuiz=="multiply"){
			if(score > record)
	            localStorage.setItem("mathMultiplyRecord", score);
		}else if(mathTypeQuiz=="divide"){
			if(score > record)
	            localStorage.setItem("mathDivideRecord", score);
		}else if(mathTypeQuiz=="all"){
			if(score > record)
	            localStorage.setItem("mathAllRecord", score);
		}
		
    }else if(quizType=="English"){
    	if(englishTypeQuiz=="fruit"){
			if(score > record)
	            localStorage.setItem("englishFruitRecord", score);
		}else if(englishTypeQuiz=="animal"){
			if(score > record)
	            localStorage.setItem("englishAnimalRecord", score);
	    }
    }
}

//Function to get the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

//Areas of buttons
var playButtonArea = {
    x:47,
    y:390,
    width:90,
    height:30
};
var resetButtonArea = {
    x:47,
    y:440,
    width:90,
    height:30
};
var musicButtonArea = {
    x:47,
    y:485,
    width:90,
    height:30
};
var soundButtonArea = {
    x:47,
    y:532,
    width:90,
    height:30
};
var quizTypeButtonArea = {
    x:150,
    y:390,
    width:125,
    height:30
};
var quizGroupButtonArea = {
    x:150,
    y:438,
    width:125,
    height:30
};

//Error Message
function showSnackbar(text) {
  var x = document.getElementById("snackbar");
  x.innerHTML = text;
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

//Gameplay function
function play(){
    frames++;
    background.print(0, 0);
    panel.draw();

    musicOn = localStorage.getItem("music");
    if(musicOn == null)
        musicOn = "true";

    if(musicOn=="false")
        panel.MusicOff()
    else
        panel.MusicOn()

    soundOn = localStorage.getItem("sound");
    if(soundOn == null)
        soundOn = "true";

    if(soundOn=="false")
        panel.SoundOff()
    else
        panel.SoundOn()

    quizType = localStorage.getItem("quiz");
    if(quizType==null)
        quizType="Math"

    if(quizType=="Math"){
        panel.MathButton()

        mathTypeQuiz = localStorage.getItem("mathQuiz");
        if(mathTypeQuiz == null)
            mathTypeQuiz = "add";

        if(mathTypeQuiz=="add"){
            panel.MathAddButton()
            MathQuiz = MathAddQuiz
            SoundBackground = document.getElementById("background1");
            record = localStorage.getItem("mathAddRecord");
            if(record==null)
                localStorage.setItem("mathAddRecord",0)
        }
        else if(mathTypeQuiz=="subtract"){
            panel.MathSubtractButton()
            MathQuiz = MathSubtractQuiz
            SoundBackground = document.getElementById("background2");
            record = localStorage.getItem("mathSubtractRecord");
            if(record==null)
                localStorage.setItem("mathSubtractRecord",0)
        }
        else if(mathTypeQuiz=="multiply"){
            panel.MathMultiplyButton()
            MathQuiz = MathMultiplyQuiz
            SoundBackground = document.getElementById("background3");
            record = localStorage.getItem("mathMultiplyRecord");
            if(record==null)
                localStorage.setItem("mathMultiplyRecord",0)
        }
        else if(mathTypeQuiz=="divide"){
            panel.MathDivideButton()
            MathQuiz = MathDivideQuiz
            SoundBackground = document.getElementById("background4");
            record = localStorage.getItem("mathDivideRecord");
            if(record==null)
                localStorage.setItem("mathDivideRecord",0)
        }
        else if(mathTypeQuiz=="all"){
            panel.MathAllButton()
            MathQuiz = MathAddQuiz.concat(MathSubtractQuiz.concat(MathMultiplyQuiz.concat(MathDivideQuiz)))
            SoundBackground = document.getElementById("background5");
            record = localStorage.getItem("mathAllRecord");
            if(record==null)
                localStorage.setItem("mathAllRecord",0)
        }

        Quizzes = MathQuiz
        
    }
    else if(quizType=="English"){
        panel.EnglishButton()

        englishTypeQuiz = localStorage.getItem("englishQuiz");
        if(englishTypeQuiz == null)
            englishTypeQuiz = "fruit";

        if(englishTypeQuiz=="fruit"){
            panel.EnglishFruitButton()
            EnglishQuiz = EnglishFruitQuiz
            SoundBackground = document.getElementById("background6");
            record = localStorage.getItem("englishFruitRecord");
            if(record==null)
                localStorage.setItem("englishFruitRecord",0)
        }
        else if(englishTypeQuiz=="animal"){
            panel.EnglishAnimalButton()
            EnglishQuiz = EnglishAnimalQuiz
            SoundBackground = document.getElementById("background7");
            record = localStorage.getItem("englishAnimalRecord");
            if(record==null)
                localStorage.setItem("englishAnimalRecord",0)
        }

        Quizzes = EnglishQuiz
    }

    if(life == 0) {
        GameStatus = Status.start;
    }

    if(GameStatus == Status.start) {
        panel.SplashScreen();
        quiz.name = "";
        SoundBackground.pause();
        SoundBackground.currentTime = 0;
        SoundIntro.play();
    }else if(GameStatus == Status.playing){
        elements.draw();
        elements.update();
        SoundIntro.pause();
        SoundBackground.play();
        canvas.onclick = function(event){
            elements.click(event);
        }
    }

    window.requestAnimationFrame(play);
}

//Main function
function main(){
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 600;

    context = canvas.getContext("2d");

    document.body.appendChild(canvas);

    var snackbar = document.createElement('div')
    snackbar.id = "snackbar"

    document.body.appendChild(snackbar);

    img = new Image();
    img.src = "images/sprites.png";

    GameStatus = Status.start;
    play();
}

//Start the game
main();

//Binding the click event on the canvas
canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (isInside(mousePos,playButtonArea)) {
        if(GameStatus == Status.start) {
            score = 0;
            life = 3;
            elements._obs = [];
            aux = 0;
            GRAVITY = 2;
            elementSort();
            GameStatus = Status.playing;
        }
        else{
            elements._obs = [];
            GameStatus = Status.start;
            updateRecord()
        }
    }else if (isInside(mousePos,resetButtonArea)){
        GameStatus = Status.start;
        score = 0
        life = 3;
        elementSort();
        if(quizType=="Math"){
            if(mathTypeQuiz=="add")
                localStorage.setItem("mathAddRecord",0)
            else if(mathTypeQuiz=="subtract")
                localStorage.setItem("mathSubtractRecord",0)
            else if(mathTypeQuiz=="multiply")
                localStorage.setItem("mathMultiplyRecord",0)
            else if(mathTypeQuiz=="divide")
                localStorage.setItem("mathDivideRecord",0)
            else if(mathTypeQuiz=="all")
                localStorage.setItem("mathAllRecord",0)
        }else if(quizType=="English"){
            if(englishTypeQuiz=="fruit")
                localStorage.setItem("englishFruitRecord",0) 
            else if(englishTypeQuiz=="animal")
                localStorage.setItem("englishAnimalRecord",0) 
        }
    }else if (isInside(mousePos,musicButtonArea)){
        if(musicOn == "true")
            localStorage.setItem("music", "false");
        else
            localStorage.setItem("music", "true");
    }else if (isInside(mousePos,soundButtonArea)){
        if(soundOn == "true")
            localStorage.setItem("sound", "false");
        else
            localStorage.setItem("sound", "true");
    }else if (isInside(mousePos,quizTypeButtonArea)){
        if(GameStatus == Status.start){
            if(quizType=="Math")
                localStorage.setItem("quiz","English")
            else if(quizType=="English")
                localStorage.setItem("quiz","Math")
        }
    }else if (isInside(mousePos,quizGroupButtonArea)){
        if(GameStatus==Status.start && quizType=="Math"){
            if(mathTypeQuiz=="add")
                localStorage.setItem("mathQuiz","subtract")
            else if(mathTypeQuiz=="subtract")
                localStorage.setItem("mathQuiz","multiply")
            else if(mathTypeQuiz=="multiply")
                localStorage.setItem("mathQuiz","divide")
            else if(mathTypeQuiz=="divide")
                localStorage.setItem("mathQuiz","all")
            else if(mathTypeQuiz=="all")
                localStorage.setItem("mathQuiz","add")
        }else if(GameStatus==Status.start && quizType=="English"){
            if(englishTypeQuiz=="fruit")
                localStorage.setItem("englishQuiz","animal")
            else if(englishTypeQuiz=="animal")
                localStorage.setItem("englishQuiz","fruit")
        }
    }
}, false);