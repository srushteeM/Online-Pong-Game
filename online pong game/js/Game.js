class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

   paddle1 = createSprite(0,200,10,70);
   
    paddle2 = createSprite(390,200,10,70);
   
    ball = createSprite(200,200,10,10);
   
    paddles = [paddle1,paddle2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
   // player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background("white");
      
      //index of the array
      var index = 0;

      //x and y position of the cars
     
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        
        
        //use data form the database to display the cars in y direction
        y = allPlayers[plr].y;
       
        paddles[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
         
          paddles[index - 1].shapeColor = "red";
         
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y -=10
      player.update();
    }
 if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y +=10
      player.update();
    }
if(keyDown("space")){
  ball.velocityX=3;
  ball.velocityY=3;
}
    if(ball.x >400||ball.x<0){
      gameState = 2;
      
     
    }
   edges = createEdgeSprites();
    if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    //wall_hitSound.play();
  }
  ball.bounceOff(paddle1);
    ball.bounceOff(paddle1);

    drawSprites();
  }

  end(){
    alert("Game Ended");
    
  }
}
