//Create variables here
var dogIMG, happyDogIMG, foodS, foodStock, database, dog;
function preload()
{
	//load images here
  dogIMG = loadImage("images/dogImg.png");
  happyDogIMG = loadImage("images/dogImg1.png");
  
}

function setup() {
	createCanvas(500, 500);
  database= firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  dog = createSprite(250,250);
  dog.addImage("Doggo", dogIMG);
  dog.addImage("HappyDoggo", happyDogIMG);
}


function draw() {  
  background(46,139,87);

  //Feeding the dog milk
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeImage("HappyDoggo" , happyDogIMG);
  }
  
  dog.scale=0.3;

  drawSprites();

  //Text
  fill("white");
  stroke(10);
  text("Note: Press the up arrow to feed Drago a bottle of milk", 100, 100);
  text("Food: " + foodS, 200, 150);
}


function readStock(data){
    foodS=data.val();
}

function writeStock(x){

    if(x<=0){
      x=0;
    }else{
      x=x-1;
    }
    
    database.ref("/").update({
        Food:x,

    

    })
  }



