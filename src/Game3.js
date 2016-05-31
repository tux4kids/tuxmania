Mania.Game3 = function(game){
    this.ground=[];
    this.c=[];
    this.answer=0;
    this.playDartSound=false;
    this.playerInfo=false;
    this.playerLock=false;
    this.moveRight=true;
    this.wizardRight=false;
    this.interactOver=false;
    this.turn=0;
    this.rturn=0;
    this.decision=null;
    this.wizardDialog=['Hey! Young\nMan, Wait!','The Wizard zone\nstarts from here','To move ahead\nyou would have to','answer a\nsimple question','What\'s \n4+5'];
    this.endDialog = ['You are right!\nYou can go ahead.','No it\'s wrong\nTry again.'];
    this.playerDialog = ['The answer is \n'];
    this.userInputTake=false;
    this.follow=false;
    
};

Mania.Game3.prototype = {
	create: function(){
    
        this.game.world.setBounds(0, 0, 3500, this.game.height);
    
        for (i=0;i<3;i++) {
        this.add.sprite(i* Mania.GAME_WIDTH, 0,'layer1');
        this.add.sprite(i* Mania.GAME_WIDTH, 0,'layer2');
        this.c[i] = this.add.sprite(i* Mania.GAME_WIDTH,20,'layerr');
        this.c[i].scale.setTo(0.45,0.5);
        }
    
        tree1 = this.add.sprite(2100,Mania.GAME_HEIGHT-92-320,'tree');
    	tree2 = this.add.sprite(1950,Mania.GAME_HEIGHT-92-260,'tree');
    	tree1.scale.setTo(0.65,0.65);
    	tree2.scale.setTo(0.65,0.62);
        
        sign = this.add.sprite(1400,Mania.GAME_HEIGHT-92-190,'sign');
    	sign.scale.setTo(0.68,0.63);
        signText = this.add.text(1400+8 ,Mania.GAME_HEIGHT-92-170,"Wizard Zone", { fontSize: '45px', fill: '#000' });
    
    	platforms = this.add.group();
        platforms.enableBody = true;
        for (i=0;i<3;i++) {
        this.ground[i] = platforms.create(i* Mania.GAME_WIDTH, Mania.GAME_HEIGHT - 100, 'layer4');
        this.ground[i].body.immovable = true;
        this.ground[i].scale.setTo(1,1.2);  
        }   
        
        house1 = this.add.sprite(Mania.GAME_WIDTH-500,Mania.GAME_HEIGHT-395,'house');
        house1.scale.setTo(0.55,0.55);
        house2 = this.add.sprite(Mania.GAME_WIDTH+1300,Mania.GAME_HEIGHT-395,'house');
        house2.scale.setTo(0.55,0.55);
        
        player1 = this.add.sprite(1170,Mania.GAME_HEIGHT-250,'wizard');
    	this.physics.arcade.enable(player1);
        player1.body.gravity.y = 300;
        player1.body.collideWorldBounds = false;
    	player1.body.velocity.x=0;
        player1.scale.setTo(0.65,0.65);
        player1.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],8,true);
        player1.scale.x*=-1;
        player1.body.velocity.x=0;
        
        player = this.add.sprite(250,Mania.GAME_HEIGHT-200,'player2');
    	this.physics.arcade.enable(player);
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
    	player.body.velocity.x=0;
        player.scale.setTo(0.22,0.22);
        player.animations.add('idle',[0,1],8,true);
        player.animations.add('run', [2,3,4,5,6],8,true);
        
        sound1 = this.add.audio('sound1_');
        sound2 = this.add.audio('sound2_');
        sound3 = this.add.audio('sound3_');
        sound4 = this.add.audio('sound4_');
        sound5 = this.add.audio('sound5_');
        sound6 = this.add.audio('sound6_');
        sound7 = this.add.audio('sound7_');
        intr_snd = this.add.audio('intr_snd');
        
        main_menu= this.add.button(this.game.camera.width-100, 25,'main_menu',this.backtoLevels,this);
        main_menu.scale.setTo(0.5,0.5);
        main_menu.alpha=0.8;
        main_menu.events.onInputOver.add(this.over, this);
        main_menu.events.onInputOut.add(this.out, this);
        main_menu.fixedToCamera=true;
        
        cursors = this.input.keyboard.createCursorKeys();
        this.game.camera.follow(player);
        
        this.dart_snd = this.add.audio('dart');
        this.input.keyboard.addCallbacks(this,null, null,this.onKeyUp);

        
        },
        
        update: function(){
            
            this.game.physics.arcade.collide(player,platforms);
            this.game.physics.arcade.collide(player1,platforms);
            
            player1.animations.play('idle');
            player.body.velocity.x = 0;
            player1.body.velocity.x = 0;
        
            if (cursors.left.isDown && this.playerLock==false)
            {
                player.body.velocity.x = -150;
                player.animations.play('run');
                if(this.playDartSound==false)
                    {
                        if (this.moveRight==true)
                        {   player.scale.x*=-1;
                            this.moveRight=false;
                        }
                        
                    this.dart_snd.play('',0,1,true);
                    this.dart_snd.onLoop.add(this.playSound,this);
                    
                    }
                    
                this.playDartSound=true;
                
                if (this.follow==true && player.position.x+140<player1.position.x)
                {
                    player1.body.velocity.x=-150;
                    
                    if (this.wizardRight==true)
                    {
                        player1.scale.x*=-1;
                        this.wizardRight=false;
                    }
                }
            }
                
        
            else if (cursors.right.isDown && this.playerLock==false)
            {
                player.body.velocity.x = 150;
                player.animations.play('run');
                if(this.playDartSound==false)
                    {
                    
                    if (this.moveRight==false)
                    {   player.scale.x*=-1;
                        this.moveRight=true;
                    }
                        
                    this.dart_snd.play('',0,1,true);
                    this.dart_snd.onLoop.add(this.playSound,this);
                    }
                this.playDartSound=true;
                
                if (this.follow==true && player.position.x-140>player1.position.x)
                {
                    player1.body.velocity.x=+150;
                    
                    if (this.wizardRight==false)
                    {
                        player1.scale.x*=-1;
                        this.wizardRight=true;
                    }
                }
            }
        
            else
            {
                player.animations.play('idle');
                this.dart_snd.stop();
                this.playDartSound=false;
        }
        
        if (this.interactOver==false)
        this.wizardInteraction();
    },
    
    
    backtoLevels: function() {
        this.shutdown();
        this.state.start('Levels',true,false);
    },
    
    over: function(btn) {
        btn.alpha = 1.0;
    },
    
    out: function(btn) {
        btn.alpha=0.8;
    },
    
    
        onKeyUp: function(self,event) {
            if (this.playerInfo==true &&  this.interactOver==false) {
                console.log(event.keyCode);
                console.log(this.userInputTake);
            switch (event.keyCode) {
                    case 105:
                        if(this.playerLock==false) { 
                        this.playerLock=true;
                        info.destroy();
                        playerText.destroy();
                        if(this.moveRight==false)
                        {
                            player.scale.x*=-1;
                            this.moveRight=true;
                        }
                        this.startInteraction();
                    }
                    break;
                        
                    case Phaser.Keyboard.ZERO:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 0  <-";        
                        inputText.setText(txt1);
                        this.answer=0;
                    }
                    break;
                    
                    case Phaser.Keyboard.ONE:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 1  <-";        
                        inputText.setText(txt1);
                        this.answer=1;
                    }
                    break;
                    
                    case Phaser.Keyboard.TWO:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 2  <-";        
                        inputText.setText(txt1);
                        this.answer=2;
                    }
                    break;
                    
                    case Phaser.Keyboard.THREE:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 3  <-";        
                        inputText.setText(txt1);
                        this.answer=3;
                    }
                    break;
                    
                    case Phaser.Keyboard.FOUR:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 4  <-";        
                        inputText.setText(txt1);
                        this.answer=4;
                    }
                    break;
                    
                    case Phaser.Keyboard.FIVE:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 5  <-";        
                        inputText.setText(txt1);
                        this.answer=5;
                    }
                    break;
                    
                    case Phaser.Keyboard.SIX:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 6  <-";        
                        inputText.setText(txt1);
                        this.answer=6;
                    }
                    break;
                    
                    case Phaser.Keyboard.SEVEN:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 7  <-";        
                        inputText.setText(txt1);
                        this.answer=7;
                    }
                    break;
                    
                    case Phaser.Keyboard.EIGHT:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 8  <-";        
                        inputText.setText(txt1);
                        this.answer=8;
                    }
                    break;
                    
                    case Phaser.Keyboard.NINE:
                    if (this.userInputTake==true) {
                        txt1 = "Your Entered: 9  <-";        
                        inputText.setText(txt1);
                        this.answer=9;
                    }
                    break;
                    
                    case 13:
                    if (this.userInputTake==true) {
                    this.userInputTake=false;
                    inputText.destroy();
                    actionText.destroy();
                    if (this.answer==9)
                    {
                        this.interactCorrectAnswer();
                    }
                    else {
                        this.interactWrongAnswer();
                    }
                    
                        }
                    
                    }
                    }
                    
                
        },      
        
        interactCorrectAnswer: function() {
            if(this.rturn==0) {
                txt = this.playerDialog[0]+this.answer.toString();
                responsiveVoice.speak(txt, "UK English Male", {pitch: 2});
                playerDialog = this.add.sprite(player.position.x,player.position.y-105,'dialog');
                playerDialog.scale.setTo(0.32,0.38);
                playerText = this.add.text(player.position.x+22,player.position.y-95,txt, { fontSize: '45px', fill: '#000' });
                this.game.time.events.add(Phaser.Timer.SECOND * 3,this.correctInteractionChange , this);
                this.add.tween(playerDialog).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
                this.add.tween(playerText).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);  
                
                 
                
            }
            
            else if (this.rturn==1){
                playerDialog = this.add.sprite(player1.position.x-50,player1.position.y-95,'dialog');
                txt = this.endDialog[0]
                playerText = this.add.text(player1.position.x-25,player1.position.y-85,txt, { fontSize: '45px', fill: '#000' });
                this.add.tween(playerDialog).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                this.add.tween(playerText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);         
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.endInteraction, this);
                playerDialog.scale.setTo(0.41,0.38);
                this.rturn=0;
                sound6.play(); 
                
            }
        },
        
        interactWrongAnswer: function() {
            if(this.rturn==0) {
                txt = this.playerDialog[0]+this.answer.toString();
                responsiveVoice.speak(txt, "UK English Male", {pitch: 2});
                playerDialog = this.add.sprite(player.position.x,player.position.y-105,'dialog');
                playerDialog.scale.setTo(0.32,0.38);
                playerText = this.add.text(player.position.x+22,player.position.y-95,txt, { fontSize: '45px', fill: '#000' });
                this.game.time.events.add(Phaser.Timer.SECOND * 3,this.wrongInteractionChange , this);
                this.add.tween(playerDialog).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
                this.add.tween(playerText).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);  
                
                 
                
            }
            
            else if (this.rturn==1){
                playerDialog = this.add.sprite(player1.position.x-50,player1.position.y-95,'dialog');
                txt = this.endDialog[1]
                playerText = this.add.text(player1.position.x-25,player1.position.y-85,txt, { fontSize: '45px', fill: '#000' });
                this.add.tween(playerDialog).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                this.add.tween(playerText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);         
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.userInputWait, this);
                playerDialog.scale.setTo(0.31,0.38);
                this.rturn=0;
                sound7.play(); 
                
            }
            
        },
        
        
        wrongInteractionChange: function() {
            this.rturn=1;
            playerDialog.destroy();
            playerText.destroy();
            this.interactWrongAnswer();
        },
        
        correctInteractionChange: function() {
            this.rturn=1;
            playerDialog.destroy();
            playerText.destroy();
            this.interactCorrectAnswer();
        },
        
        
        endInteraction: function() {
                
            playerDialog.destroy();
            playerText.destroy();
            this.playerLock=false;
            this.interactOver=true;
                            
            },
            
        startInteraction: function() {
            playerDialog = this.add.sprite(player1.position.x-50,player1.position.y-95,'dialog');
            txt = this.wizardDialog[this.turn];
            playerText = this.add.text(player1.position.x-25,player1.position.y-85,txt, { fontSize: '45px', fill: '#000' });
            this.add.tween(playerDialog).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            this.add.tween(playerText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);         
            
            if(this.turn==0) {
            sound1.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.interactionChange, this);
            playerDialog.scale.setTo(0.31,0.38); 
                }
            else if(this.turn==1) {
            sound2.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.interactionChange, this);
            playerDialog.scale.setTo(0.38,0.38); 
            }
            
            else if(this.turn==2) {
            sound3.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.interactionChange, this);
            playerDialog.scale.setTo(0.41,0.38); 
            }
            
            else if(this.turn==3) {
            sound4.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.interactionChange, this);
            playerDialog.scale.setTo(0.37,0.38); 
            }
            
            else if(this.turn==4) {
            sound5.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.userInputWait, this);
            playerDialog.scale.setTo(0.2,0.38); 
            }
            
        },
        

        interactionChange: function() {
            this.turn+=1;
            playerDialog.destroy();
            playerText.destroy();
            this.startInteraction();
        },
        
        userInputWait: function() {
            playerDialog.destroy();
            playerText.destroy();
            this.userInputTake=true;
            //sound6.play();
            txt = "Answer ' 4+5 = ? ' to move ahead !";
            actionText = this.add.text(this.game.camera.width/2,this.game.camera.height/2-300,txt, { fontSize: '45px', fill: '#000' });
            actionText.anchor.setTo(0.5,0.5);
            actionText.fixedToCamera=true;
            
            txt1 = "Your Entered:  ?  <-"
            inputText = this.add.text(this.game.camera.width/2,this.game.camera.height/2-250,txt1, { fontSize: '45px', fill: '#ff1919' });
            inputText.anchor.setTo(0.5,0.5);
            inputText.fixedToCamera=true;
        },
        
    
        
        wizardInteraction: function() {
            if (player.position.x>player1.position.x-200 && player.position.x<player1.position.x-160)
            {   if(this.playerInfo==false) {
                intr_snd.play();
                info = this.add.sprite(player1.position.x-90,player1.position.y-60,'inf');
                info.scale.setTo(0.52,0.52);
                txt = "Press 'I' to interact";
                playerText = this.add.text(this.game.camera.width/2,this.game.camera.height/2-300,txt, { fontSize: '45px', fill: '#000' });
                playerText.anchor.setTo(0.5,0.5);
                playerText.fixedToCamera=true;
                this.playerInfo=true;
                }
                
            }
            
            else if (this.playerInfo==true){
                if(this.playerInfo==true)
                info.destroy();
                playerText.destroy();
                this.playerInfo=false;
                intr_snd.stop();
            }
        },
    
        
        playSound: function() {
            this.dart_snd.play('',0,1,true);
            
        },
        
        shutdown: function() {
            this.ground=[];
            this.c=[];
            this.answer=0;
            this.playDartSound=false;
            this.playerInfo=false;
            this.playerLock=false;
            this.moveRight=true;
            this.wizardRight=false;
            this.interactOver=false;
            this.turn=0;
            this.rturn=0;
            this.decision=null;
            this.wizardDialog=['Hey! Young\nMan, Wait!','The Wizard zone\nstarts from here','To move ahead\nyou would have to','answer a\nsimple question','What\'s \n4+5'];
            this.endDialog = ['You are right!\nYou can go ahead.','No it\'s wrong\nTry again.'];
            this.playerDialog = ['The answer is \n'];
            this.userInputTake=false;
            this.follow=false;
            
        }
        
        
    };