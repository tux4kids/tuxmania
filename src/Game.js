Mania.Game = function(game){
    
    this.x=null;
    this.y=null;
    this.answer=null;
    this.spawnx=1400;
    this.life=3;
    this.score=0;
    this.level=1;
    this.keys=null;
    this.replay=false;
    this.nosprite=false;
    this.count=9;
    this.speed={1:50,2:60,3:70,4:80};
    this.levelChange=false;
    this.finishGame=false;
};

Mania.Game.prototype = {
	create: function(){
        
        a=this.add.sprite(0, 0,'layer1');
    	b=this.add.sprite(0, 0,'layer2');
        c = this.add.sprite(0,20,'layerr');
        c.scale.setTo(0.45,0.5);
    
        tree1 = this.add.sprite(1000,Mania.GAME_HEIGHT-92-320,'tree');
    	tree2 = this.add.sprite(850,Mania.GAME_HEIGHT-92-260,'tree');
    	tree1.scale.setTo(0.65,0.65);
    	tree2.scale.setTo(0.65,0.62);
    
    	platforms = this.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, Mania.GAME_HEIGHT - 100, 'layer4');
        ground.body.immovable = true;
        ground.scale.setTo(1,1.2);
                
        counter1 = this.add.sprite(60, 40,'counter');
        counter1.scale.setTo(0.22,0.35);
        counter2 = this.add.sprite(60+120, 40,'counter');
        counter2.scale.setTo(0.22,0.35);
        counter3 = this.add.sprite(60+120*2, 40,'counter');
        counter3.scale.setTo(0.31,0.35);
        counter4 = this.add.sprite(60+120*3+30, 40,'counter');
        counter4.scale.setTo(0.19,0.35);
        
        heartText = this.add.text(108,50,this.life.toString() , { fontSize: '28px', fill: '#000' });
        heart = this.add.sprite(35,35,'heart');
        heart.scale.setTo(0.35,0.34);   
        enem = this.add.sprite(35+130,30, 'enem');
        enem.scale.setTo(0.118,0.118);
        star = this.add.sprite(35+245, 35,'star');
    	star.scale.setTo(0.32,0.33);
        level_icon = this.add.sprite(35+395, 33,'level_icon')
        level_icon.scale.setTo(0.32,0.33)    
        enemyText = this.add.text(125+105,50,this.count.toString(), {fontSize: '28px', fill: '#000' });
        scrTxt = this.score.toString()
        scoreText = this.add.text(115+230, 50,Array(5-scrTxt.length).join("0")+scrTxt, { fontSize: '28px', fill: '#000' });
        levelText = this.add.text(115+372, 50,this.level.toString() , { fontSize: '28px ', fill: '#000', weigth:'bold' });        
        
        
        player = this.add.sprite(250,Mania.GAME_HEIGHT-220,'player');
    	this.physics.arcade.enable(player);
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = false;
    	player.body.velocity.x=0;
        player.scale.setTo(1.2,1.2);
            
        sprite = this.add.sprite(this.spawnx, Mania.GAME_HEIGHT-150, 'enem');
        sprite.anchor.setTo(0.5,0.5);
        sprite.scale.setTo(0.13,0.13);
        
        this.physics.arcade.enable(sprite);
        sprite.body.gravity.y=300;
        sprite.body.collideWorldBounds=false;
        sprite.animations.add('walk', [0,1,2,3,4,5],12,true);
        
        pause= this.add.button(1366-100, 25,'pause',this.pauseAndPlay,this);
    	pause.scale.setTo(0.5,0.5);
        pause.alpha=0.8;
        pause.events.onInputOver.add(this.over, this);
        pause.events.onInputOut.add(this.out, this);
        
        if (this.game.sound.mute==false)
            unmute= this.add.button(1366-150, 25,'unmute',this.Sfx,this);
        else
            unmute= this.add.button(1366-150, 25,'mute',this.Sfx,this);
        unmute.scale.setTo(0.5,0.5);
        unmute.alpha=0.8;
        unmute.events.onInputOver.add(this.over, this);
        unmute.events.onInputOut.add(this.out, this);
        
        main_menu= this.add.button(1366-210, 25,'main_menu',this.backtoLevels,this);
        main_menu.scale.setTo(0.5,0.5);
        main_menu.alpha=0.8;
        main_menu.events.onInputOver.add(this.over, this);
        main_menu.events.onInputOut.add(this.out, this);
    
        dialog = this.add.sprite(sprite.position.x-20,Mania.GAME_HEIGHT-225,'dialog');
    	dialog.scale.setTo(0.24,0.24);
        quesText = this.add.text(sprite.position.x+10,Mania.GAME_HEIGHT-212 , this.generateQuestion(), { fontSize: '45px', fill: '#000' });
            
        /* We can create our own plugin for user inputs by extednding Phaser.Plugin, that would be more neat.*/
        this.input.keyboard.addCallbacks(this,null, null,this.onKeyUp);
        this.input.onDown.add(this.unpause, this);
        
        this.choice_snd = this.add.audio('sound3');
        this.backSound_ = this.add.audio('sound5');
        sound1 = this.add.audio('sound1');
        //sound1.volume=1.0;
    	this.backSound_.play('',0,1,true);
    	this.backSound_.onLoop.add(this.playSound,this);
        this.backSound_.volume=0.1;
        
	},
    
    Sfx: function() {
        if(this.game.sound.mute==false)
        {
            this.game.sound.mute=true;
            unmute.destroy();
            unmute= this.add.button(1366-150, 25,'mute',this.Sfx,this);
            unmute.scale.setTo(0.5,0.5);
			unmute.alpha=0.8;
			unmute.events.onInputOver.add(this.over, this);
			unmute.events.onInputOut.add(this.out, this);
        }
        
        else {
            this.game.sound.mute=false;
            unmute.destroy();
            unmute= this.add.button(1366-150, 25,'unmute',this.Sfx,this);
            unmute.scale.setTo(0.5,0.5);
			unmute.alpha=0.8;
			unmute.events.onInputOver.add(this.over, this);
			unmute.events.onInputOut.add(this.out, this);
        }
    },
    
    backtoLevels: function() {
        this.choice_snd.play();
        this.shutdown();
        this.state.start('Levels',true,false);
    },
    
    over: function(btn) {
		btn.alpha = 1.0;
	},
	
	out: function(btn) {
		btn.alpha=0.8;
	},
    
    playSound: function() {
        this.backSound_.play('',0,1,true);
        this.backSound_.volume=0.1;
    },
    
    onKeyUp: function(self,event) {
        
        if (this.nosprite==false) {
            switch (event.keyCode) {    
                case Phaser.Keyboard.ONE:
                    if (this.answer==1)
                            this.correctAnswer();
                    else
                            this.decrementScore();
                    break;
                case Phaser.Keyboard.TWO:
                    if (this.answer==2)
                        this.correctAnswer();
                        else
                                this.decrementScore();
                        break;
                case Phaser.Keyboard.THREE:
                    if (this.answer==3)
                        this.correctAnswer();
                        else
                                this.decrementScore();
                        break;
                case Phaser.Keyboard.FOUR:
                    if (this.answer==4)
                        this.correctAnswer();
                        else
                                this.decrementScore();
                        break;
                case Phaser.Keyboard.FIVE:
                    if (this.answer==5)
                        this.correctAnswer();
                        else
                                this.decrementScore();
                        break;
                case Phaser.Keyboard.SIX:
                    if (this.answer==6)
                        this.correctAnswer();
                        else
                                this.decrementScore();
                        break;
                case Phaser.Keyboard.SEVEN:
                    if (this.answer==7)
                        this.correctAnswer();
                        else
                                this.decrementScore();
                        break;
                case Phaser.Keyboard.EIGHT:
                    if (this.answer==8){
                        this.correctAnswer();}
                        else
                                this.decrementScore();
                        break;
                case Phaser.Keyboard.NINE:
                    if (this.answer==9)
                        this.correctAnswer();
                        else
                                this.decrementScore();
                        break;
                    
                    }
            }
    },
    
    generateQuestion: function()
    {
        this.x = Math.floor(Math.random() * 9) + 1;
        this.y = Math.floor(Math.random() * ((9-this.x) + 1));
        this.answer=this.x+this.y;
        return (this.x.toString() + " + " + this.y.toString() + " = ? " );      
    },
    
    update: function(){
        
        this.game.physics.arcade.collide(player,platforms);
        
        if (this.nosprite ==false) {    
        quesText.x=sprite.position.x+10;
        dialog.x=sprite.position.x-20;
        this.game.physics.arcade.collide(sprite,platforms);
        this.game.physics.arcade.overlap(player,sprite,this.enemyHit,null, this);
        
        sprite.animations.play('walk');
        sprite.body.velocity.x=-this.speed[this.level];
    }
                    
},
    
    pauseAndPlay: function() {
        quesText.setText('');
        unmute.visible=false;
        main_menu.visible=false;
        pause.destroy();
        resume = this.add.sprite(Mania.GAME_WIDTH/2, Mania.GAME_HEIGHT/2, 'resume');
        resume.scale.setTo(0.7,0.7);
        resume.anchor.setTo(0.5, 0.5);
        this.game.paused=true;
    },
    
    replayGame: function()
    {
        unmute.visible=false;
        main_menu.visible=false;
        pause.destroy();
        this.replay=true;
        resume = this.add.sprite(Mania.GAME_WIDTH/2, Mania.GAME_HEIGHT/2, 'replay');
        resume.scale.setTo(0.7,0.7);
        resume.anchor.setTo(0.5, 0.5);
        this.game.paused=true;
    
    },
    
    resetAll: function()
    {   
        this.score=0;
        this.life=3;
        this.replay=false;
        this.count=9;
        heartText.setText(this.life.toString());
        enemyText.setText(this.count.toString());
        scrTxt = this.score.toString()
        scoreText.setText(Array(5-scrTxt.length).join("0")+scrTxt);
        this.respawn();
    },

    unpause: function(event) {
        if (this.game.paused) {
            
            var x1 = Mania.GAME_WIDTH/2-141, x2 = Mania.GAME_WIDTH/2+141,
                y1 = Mania.GAME_HEIGHT/2-141, y2 =Mania.GAME_HEIGHT/2+141;
    
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
    
            resume.destroy();
            this.choice_snd.play();
            unmute.visible=true;
            main_menu.visible=true;
    
                
            pause= this.add.button(1366-100, 25,'pause',this.pauseAndPlay,this);
            pause.scale.setTo(0.5,0.5);
            pause.alpha=0.8;
            pause.events.onInputOver.add(this.over, this);
            pause.events.onInputOut.add(this.out, this);
            
            this.game.paused=false;
            
            if (this.replay==true)
                this.resetAll();
            else {
                quesText.setText(this.generateQuestion());
            }
            
    
            }
    
        }
    
    },
    
    
    enemyHit: function()
    {   
        this.reduceLife();
        this.destroySprite();
        this.decrementScore();
    },
    
    
    checkLife: function()
    {
        if (this.life==0)
            return false;
        else 
            return true;
    },
    
    onDestroy: function()
    {
        if (this.checkLife()==false)
        {
            this.replayGame();
            
        }
        
        else if (this.finishGame==true)
        {
            this.gameOver();
        }
        
        else if (this.levelChange==true)
        {
            this.onLevelChange();
        }
        
        else {
             
           this.respawn();
            
        }
        
    },
    
    
    onLevelChange: function()
    {
        changeText = this.add.text(Mania.GAME_WIDTH/2,Mania.GAME_HEIGHT/2 , "Level Complete !", { fontSize: '72px', fill: '#000' });
        changeText.anchor.setTo(0.5,0.5);
        this.game.time.events.add(Phaser.Timer.SECOND * 4, this.levelChangeDestroy, this);
        this.add.tween(changeText).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
        
    },
    
    levelChangeDestroy: function()
    {
        changeText.destroy();
        levelText.setText(this.level.toString());
        this.levelChange=false;
        this.respawn();
    },
    
    gameOver: function()
    {
        finishText = this.add.text(Mania.GAME_WIDTH/2,Mania.GAME_HEIGHT/2 , "Congrats! All levels Completed..", { fontSize: '28px', fill: '#000' });
        finishText.anchor.setTo(0.5,0.5);
        this.game.paused = true;
    },
    
    correctAnswer: function()
    {   this.destroySprite();
        this.incrementScore();
    },
    
    destroySprite: function()
    {
        sprite.destroy();
        sound1.play();
        dialog.destroy();
        this.nosprite=true;
        quesText.destroy();
        this.count-=1;
        enemyText.setText(this.count.toString());
        if (this.count==0)
        {
            this.level+=1;
            this.count=9;
            this.levelChange=true;
            if (this.level==5)
            {this.finishGame=true;}
            
        }
        
        explosion = this.add.sprite(sprite.x, sprite.y, 'blast');
        explosion.scale.setTo(1.2,1.2);
        explosion.anchor.setTo(0.7, 0.5);
        explosion.animations.add('boom');
        explosion.animations.currentAnim.onComplete.add(this.onDestroy,this);
        explosion.play('boom', 15, false, true);
    },
    
    respawn: function()
    {   
        sprite = this.add.sprite(this.spawnx, Mania.GAME_HEIGHT-150, 'enem');
        sprite.anchor.setTo(0.5,0.5);
        sprite.scale.setTo(0.13,0.13);
        dialog = this.add.sprite(sprite.position.x-20,Mania.GAME_HEIGHT-225,'dialog');
    	dialog.scale.setTo(0.24,0.24);
        quesText = this.add.text(sprite.position.x+10,Mania.GAME_HEIGHT-212 , this.generateQuestion(), { fontSize: '45px', fill: '#000' });
        
        this.nosprite=false;
        this.physics.arcade.enable(sprite);
        sprite.body.gravity.y=300;
        sprite.body.collideWorldBounds=false;
        sprite.animations.add('walk', [0,1,2,3,4,5],12,true);
        
    },
    
    reduceLife: function() {
        this.life-=1;
        heartText.setText(this.life.toString());
    },
    
    incrementScore: function() {
        this.score+=10;
        scrTxt = this.score.toString()
        scoreText.setText(Array(5-scrTxt.length).join("0")+scrTxt);
        
    },
    
    decrementScore: function() {
        if (this.score>=5)   {
            this.score-=5;
            scrTxt = this.score.toString()
            scoreText.setText(Array(5-scrTxt.length).join("0")+scrTxt);
        }
    },
    
    shutdown: function() {
        this.backSound_.stop(); 
        this.x=null;
        this.y=null;
        this.answer=null;
        this.spawnx=1400;
        this.life=3;
        this.score=0;
        this.level=1;
        this.keys=null;
        this.replay=false;
        this.nosprite=false;
        this.count=9;
        this.speed={1:50,2:60,3:70,4:80};
        this.levelChange=false;
        this.finishGame=false;
        a=b=c=null;
        tree1=tree2=null;
        ground=null;
        platforms=null;
        counter1=counter2=counter3=counter4=null;
        heart=enem=start=level_icon=pause==null;
        main_menu=null;
        player=null;
        heartText=enemyText=scoreText=levelText=null;
        
             
    }
        
};