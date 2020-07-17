var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var y = 0;
var database;

var form, player, game;

var paddle1,paddle2,paddles,edges;

var ball;


function setup(){
  canvas = createCanvas(400, 400);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
