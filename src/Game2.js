Mania.Game2 = function(game){
    
    this.x=null;
    this.y=null;
    this.answer=null;
    this.spawnx=1500;
    this.hunger=1;
    this.keys=null;
    this.replay=false;
    this.isFruitThere=true;
    this.isQuesThere=true;
    this.initialScale=null;
    this.movingRight=true;
    this.fruitLeft=10;
    this.speed=70;
    this.birdOutsideBounds=false;
    this.register=true;
    this.playerState='idle'
};

Mania.Game2.prototype = {
	create: function(){
        //this.game.physics.startSystem(Phaser.Physics.NINJA);
        
        layer1=this.add.sprite(0, 0,'layer1');
    	layer2=this.add.sprite(0, 0,'layer2');
        layer3=this.add.sprite(0,20,'layerr');
        layer3.scale.setTo(0.45,0.5);
    
        tree1 = this.add.sprite(1000,Mania.GAME_HEIGHT-92-320,'tree');
    	tree2 = this.add.sprite(850,Mania.GAME_HEIGHT-92-260,'tree');
    	tree1.scale.setTo(0.65,0.65);
    	tree2.scale.setTo(0.65,0.62);
    
    	platforms = this.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, Mania.GAME_HEIGHT - 100, 'layer4');
        //  this.game.physics.ninja.enable(ground);
        ground.body.immovable = true;
        ground.scale.setTo(1,1.2);
                
        counter1 = this.add.sprite(60, 40,'counter');
        counter1.scale.setTo(0.26,0.35);
        
        barBG = this.add.sprite(100+counter1.width, 46,'bar-bg');
        barBG.scale.setTo(0.8,1.07);
        bar = this.add.sprite(100+counter1.width, 57,'bar');
        bar.scale.setTo(0.83,1);
        this.initialScale=bar.scale.x;
        
        
        pear = this.add.sprite(90,30, 'pear');
        pear.scale.setTo(-0.305,0.305);
        
        level_icon = this.add.sprite(80+counter1.width,33,'level_icon')
        level_icon.scale.setTo(0.32,0.33) 
        txt = this.fruitLeft.toString();   
        fruitText = this.add.text(108,50,Array(3-txt.length).join("0")+txt, {fontSize: '28px', fill: '#000' });
        
        
        player = this.add.sprite(250,Mania.GAME_HEIGHT-220,'player2');
        this.physics.arcade.enable(player);
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = false;
        player.body.velocity.x=0;
        player.scale.setTo(0.22,0.22);
        player.animations.add('idle', [0,1],8,true);
        player.animations.add('walk', [2,3,4,5,6],8,true);
            
        sprite = this.add.sprite(this.spawnx, Mania.GAME_HEIGHT-510, 'bird');
        sprite.anchor.setTo(0.5,0.5);
        sprite.scale.setTo(0.12,0.12);
        sprite.scale.x*=-1;
        
        
        this.physics.arcade.enable(sprite);
        sprite.body.gravity.y=0;
        sprite.body.collideWorldBounds=false;
        sprite.animations.add('fly', [0,1,2,3],8,true);
        
        
        pear = this.add.sprite(sprite.position.x-63,Mania.GAME_HEIGHT-500,'pear');
        pear.scale.setTo(0.29,0.31);
        this.physics.arcade.enable(pear);
        pear.body.gravity.y=0;
        pear.body.collideWorldBounds=false;
        pear.body.velocity.x=-this.speed
        
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
    
        dialog = this.add.sprite(sprite.position.x-60,Mania.GAME_HEIGHT-595-10,'dialog');
    	dialog.scale.setTo(0.32,0.24);
        quesText = this.add.text(sprite.position.x-30,Mania.GAME_HEIGHT-583-10, this.generateQuestion(), { fontSize: '45px', fill: '#000' });
        
    
            
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
        
        if (this.register==true) {
            switch (event.keyCode) {    
                case Phaser.Keyboard.ONE:
                    if (this.answer==1)
                        this.correctAnswer();
                    else
                        this.wrongAnswer();
                    break;
                case Phaser.Keyboard.TWO:
                    if (this.answer==2)
                        this.correctAnswer();
                        else
                            this.wrongAnswer();
                        break;
                case Phaser.Keyboard.THREE:
                    if (this.answer==3)
                        this.correctAnswer();
                        else
                            this.wrongAnswer();
                        break;
                case Phaser.Keyboard.FOUR:
                    if (this.answer==4)
                        this.correctAnswer();
                        else
                            this.wrongAnswer();
                        break;
                case Phaser.Keyboard.FIVE:
                    if (this.answer==5)
                        this.correctAnswer();
                        else
                            this.wrongAnswer();
                        break;
                case Phaser.Keyboard.SIX:
                    if (this.answer==6)
                        this.correctAnswer();
                        else
                            this.wrongAnswer();
                        break;
                case Phaser.Keyboard.SEVEN:
                    if (this.answer==7)
                        this.correctAnswer();
                        else
                            this.wrongAnswer();
                        break;
                case Phaser.Keyboard.EIGHT:
                    if (this.answer==8){
                        this.correctAnswer();}
                        else
                            this.wrongAnswer();
                        break;
                case Phaser.Keyboard.NINE:
                    if (this.answer==9)
                        this.correctAnswer();
                        else
                            this.wrongAnswer();
                        break;
                    
                    }
            }
    },
    
    generateQuestion: function()
    {
        this.x = Math.floor(Math.random() * 9) + 1;
        this.y = Math.floor(Math.random() * ((9-this.x) + 1));
        this.answer=this.x+this.y;
        return (this.x.toString() + this.y.toString() + " x 11 = " + this.x.toString() + "?" + this.y.toString());       
        //return (this.x.toString() + " + " + this.y.toString() + " = ? " );      
    },
    
    update: function(){
        
        this.game.physics.arcade.collide(player,platforms);
        if (this.playerState=='idle')
        player.animations.play('idle');
        else 
        player.animations.play('walk');    
        
           
        
        sprite.animations.play('fly');
        sprite.body.velocity.x=-this.speed;
        if (sprite.position.x<-100)
            this.birdOutsideBounds=true;
        
            
        
        
        if (this.isFruitThere==true) {
            this.game.physics.arcade.collide(pear,platforms,this.onDropCollect,null, this);
            this.game.physics.arcade.collide(pear,player,this.onCollect,null, this);
            //this.game.physics.arcade.overlap(pear,platforms,this.onDropCollect,null, this);
            
        }
        
        if (this.isQuesThere==true) {
            quesText.x=sprite.position.x-30;
            dialog.x=sprite.position.x-60;
        }
                    
    },
    
    wrongAnswer: function() {
        this.increaseHunger();
    },
    
    increaseHunger: function() {
        this.hunger+=0.1;
        if (this.hunger>0.1)
        this.hunger=1.0;
        bar.scale.x=this.initialScale-this.initialScale*(1-this.hunger);
    },

    correctAnswer: function() {
        this.register=false;
        this.dropFruit();
        this.destroyQuestion();    
    },
    
    dropFruit: function() {
        pear.body.gravity.y=150;
        pear.body.velocity.x=0;
    },
    
    destroyQuestion: function() {
        quesText.destroy();
        dialog.destroy();
        this.isQuesThere=false;
        
    },

    onDropCollect: function() {
    if (pear.position.x>=player.position.x) {
        if (this.movingRight==false)
        player.scale.x*=-1;
        player.body.velocity.x=+120;
        this.playerState='walk';
        this.movingRight=true;
            
        }
        
    else {
        if (this.movingRight==true)
        player.scale.x*=-1;
        player.body.velocity.x=-120;
        this.playerState='walk';
        this.movingRight=false;
        
        
        }
    },  
    
    onCollect: function() {
        pear.destroy();
        this.isFruitThere=false;
        player.body.velocity.x=0;
        this.playerState='idle';
        opt1 = this.reduceHunger();
        opt2 = this.setFruitLeft();
        if (opt2==false)
            this.replayGame();
        else if (opt1==true)
            this.respawn();
        else 
            this.wrapGameUp();
            
    },
    
    wrapGameUp: function() {
        if (this.movingRight==true)
        xpos=0;
        else 
        xpos=55;
        dialogNew = this.add.sprite(player.position.x-xpos,player.position.y-105,'dialog');
        dialogNew.scale.setTo(0.35,0.38);
        txt = "My stomach is\nfull now!"
        thoughtText = this.add.text(player.position.x+30-xpos,player.position.y-95,txt, { fontSize: '45px', fill: '#000' });
        this.game.time.events.add(Phaser.Timer.SECOND * 6, this.endGame, this);
        this.add.tween(dialogNew).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
        this.add.tween(thoughtText).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    },
    
    endGame: function() {
        this.shutdown();
        this.state.start('Levels');
    },
    
    setFruitLeft: function() {
        this.fruitLeft-=1;
        txt = this.fruitLeft.toString();   
        fruitText.setText(Array(3-txt.length).join("0")+txt);
        if (this.fruitLeft==9)
        return false;
        else 
        return true;
    },
    
    reduceHunger: function() {
        this.hunger-=0.1;
        bar.scale.x=this.initialScale-this.initialScale*(1-this.hunger);
        if (this.hunger<=0)
        return false;
        return true;
    },
    
    respawn: function()
    {
        if(this.birdOutsideBounds==true)
        {
            sprite.position.x=this.spawnx;    
            pear = this.add.sprite(sprite.position.x-63,Mania.GAME_HEIGHT-500,'pear');
            pear.scale.setTo(0.29,0.31);
            this.physics.arcade.enable(pear);
            pear.body.gravity.y=0;
            pear.body.collideWorldBounds=false;
            pear.body.velocity.x=-this.speed
            dialog = this.add.sprite(sprite.position.x-60,Mania.GAME_HEIGHT-595-10,'dialog');
            dialog.scale.setTo(0.32,0.24);
            quesText = this.add.text(sprite.position.x-30,Mania.GAME_HEIGHT-583-10, this.generateQuestion(), { fontSize: '45px', fill: '#000' });
            this.isFruitThere=true;
            this.isQuesThere=true;
            this.register=true;
            this.birdOutsideBounds=false;
        }
        
        else {
            this.game.time.events.add(Phaser.Timer.SECOND * 4, this.respawn, this);
        }
    },
    
    pauseAndPlay: function() {
        quesText.setText('');
        pause.destroy();
        unmute.visible=false;
        main_menu.visible=false;
        pause.visible=false;
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


    unpause: function(event) {
        if (this.game.paused) {
            
            var x1 = Mania.GAME_WIDTH/2-141, x2 = Mania.GAME_WIDTH/2+141,
                y1 = Mania.GAME_HEIGHT/2-141, y2 =Mania.GAME_HEIGHT/2+141;
    
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
    
            resume.destroy();
            this.choice_snd.play();
            unmute.visible=true;
            main_menu.visible=true;
            //pause.visible=true;
            //pause.alpha=0.8;
                
            pause= this.add.button(1366-100, 25,'pause',this.pauseAndPlay,this);
            pause.scale.setTo(0.5,0.5);
            pause.alpha=0.8;
            pause.events.onInputOver.add(this.over, this);
            pause.events.onInputOut.add(this.out, this);
            
            this.game.paused=false;
            
            if (this.replay==true) {
                this.shutdown();
                this.state.start('Game2');
            }
            else {
                quesText.setText(this.generateQuestion());
            }
            
    
            }
    
        }
    
    },

    
    shutdown: function() {
        this.backSound_.stop(); 
        this.x=null;
        this.y=null;
        this.answer=null;
        this.spawnx=1500;
        this.hunger=1;
        this.keys=null;
        this.replay=false;
        this.initialScale=null;
        this.movingRight=true;
        this.fruitLeft=10;
        this.speed=70;
        this.birdOutsideBounds=false;
        this.register=true;
        this.playerState='idle';
        layer1=layer2=layer3=null;
        tree1=tree2=null;
        ground=null;
        platforms=null;
        player=null;
        counter1=barBG=bar=null;
        level_icon=fruitText=null;
        pause=unmute=main_menu=null;
        if(this.isFruitThere)
        pear.destroy();
        sprite.destroy();
        if(this.isQuesThere)
        dialog.destroy();
        quesText.destroy();
        this.isFruitThere=true;
        this.isQuesThere=true;
        
        
             
    }
        
};