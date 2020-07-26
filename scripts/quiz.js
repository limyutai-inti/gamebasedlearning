//Math Quiz Initialization
var MathAddQuiz = [], MathSubtractQuiz = [], MathMultiplyQuiz = [], MathDivideQuiz = [];

for(var i=1;i<=9;i++){
	for(var j=1;j<=9;j++){
		MathAddQuiz.push({name: i+" + "+j, id: (i+j).toString()})
		MathSubtractQuiz.push({name: (i+j)+" - "+j, id: i.toString()})
		MathMultiplyQuiz.push({name: i+" × "+j, id: (i*j).toString()})
		MathDivideQuiz.push({name: (i*j)+" ÷ "+j, id: (i).toString()})
	}
}

var MathQuiz = MathAddQuiz;

//English Quiz Initialization
var FruitQuiz = ["APPLE","ORANGE","WATERMELON","PEAR","CHERRY","STRAWBERRY","NECTARINE","GRAPE","MANGO","BLUEBERRY","POMEGRANATE","STARFRUIT","PLUM",
"BANANA","RASPBERRY","MANDARIN","JACKFRUIT","PAPAYA","KIWI","PINEAPPLE","LIME","LEMON","APRICOT","GRAPEFRUIT","MELON","COCONUT","AVOCADO","PEACH"]

var AnimalQuiz = ["DOG","RABBIT","DUCK","CHICKEN","TIGER","LION","TURTLE","PARROT","PUPPY","KITTEN","GOLDFISH","MOUSE","HAMSTER","COW","SHRIMP",
"PIG","GOAT","CRAB","DEER","BEE","SHEEP","FISH","TURKEY","DOVE","HORSE","EAGLE","CROW","SQUIRREL","CHIMPANZEE","PANDA","KANGAROO","MONKEY","ELEPHANT",
"FOX","GIRAFFE","WHALE","SNAKE","GORILLA","FROG","LIZARD","CROCODILE","REINDEER","DOLPHIN","PENGUIN","BUTTERFLY","SPIDER","DRAGONFLY"]

var EnglishFruitQuiz=[], EnglishAnimalQuiz=[];

function pushEnglishQuiz(quiz, array){
	for(index in quiz){
		for(key in quiz[index]){
			var text=""
			for(num in quiz[index]){
				if(num==key)
					text+="_"
				else
					text+=quiz[index][num]
			}
			array.push({name: text, id: quiz[index][key]})
		}
	}
}

pushEnglishQuiz(FruitQuiz, EnglishFruitQuiz)
pushEnglishQuiz(AnimalQuiz, EnglishAnimalQuiz)

var EnglishQuiz = EnglishFruitQuiz

var Quizzes = MathQuiz