var car;
var position,database;

function setup(){
    createCanvas(500,500);
    database=firebase.database();
    car = createSprite(200,200,10,10);
    car.shapeColor = "red";
    var loc =database.ref("Ball/Position");
    loc.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("Ball/Position").set({
        "x":position.x+x,
        "y":position.y+y
    });
}
function readPosition(data){

    position=data.val();
    console.log(position.x);
    car.x=position.x;
    car.y=position.y;
}
function showError(){
        console.log("error in writing database");

}