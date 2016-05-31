Mania.MainMenu = function(game){
};
Mania.MainMenu.prototype = {
	create: function(){
        
        a=this.add.sprite(0, 0,'layer1');
    	b=this.add.sprite(0, 0,'layer2');
        c = this.add.sprite(0,20,'layerr');
        c.scale.setTo(0.45,0.5);
        
    	start= this.add.button(Mania.GAME_WIDTH/2, Mania.GAME_HEIGHT/2+100-80,'resume',this.selectLevel,this);
        start.anchor.setTo(0.5,0.5)
		start.alpha=0.8;
		start.events.onInputOver.add(this.over, this);
		start.events.onInputOut.add(this.out, this);
    	
    	var platforms = this.add.group();
        platforms.enableBody = true;
        ground = platforms.create(0, Mania.GAME_HEIGHT- 92, 'layer4');
        ground.body.immovable = true;
        
        logo = this.add.sprite(Mania.GAME_WIDTH/2-20, Mania.GAME_HEIGHT/2-100-80,'logo');
        logo.anchor.setTo(0.5,0.5);
    	
    	enemy1 = this.add.sprite(Mania.GAME_WIDTH/2+logo.width/2+40, Mania.GAME_HEIGHT/2-100-80, 'enemy');
        this.physics.arcade.enable(enemy1);
        enemy1.body.gravity.y = 0;
        enemy1.body.collideWorldBounds = false;
    
        enemy1.animations.add('right',[2,3,4,5,6,7,8,9],8,true);
        enemy1.anchor.setTo(0.5,0.5);
    	enemy1.animations.play('right');	
    	enemy1.scale.setTo(0.7,0.7);
    		
    	menu1 = this.add.sprite(193,Mania.GAME_HEIGHT-200,'menu');
    	menu1.scale.setTo(0.57,0.57);
    	menu1.anchor.setTo(0.6,0.6)
    	
    	menu2 = this.add.sprite(Mania.GAME_WIDTH-168,Mania.GAME_HEIGHT-200,'menu');
    	menu2.scale.setTo(0.54,0.4);
    	menu2.anchor.setTo(0.5,0.5)
    	
    	settings = this.add.sprite(Mania.GAME_WIDTH-252,Mania.GAME_HEIGHT-200,'settings');
    	settings.scale.setTo(0.6,0.6);
    	
    	info = this.add.sprite(100,Mania.GAME_HEIGHT-200,'info');
    	info.scale.setTo(0.6,0.6);
    	
		if (this.game.sound.mute==false)
    		unmute  = this.add.button(Mania.GAME_WIDTH-168,Mania.GAME_HEIGHT-215,'unmute',this.Sfx,this);
		else 
			unmute  = this.add.button(Mania.GAME_WIDTH-168,Mania.GAME_HEIGHT-215,'mute',this.Sfx,this);
		
    	unmute.scale.setTo(0.55,0.55);
    	unmute.anchor.setTo(0.5,0.5);
		unmute.alpha=0.8;
		unmute.events.onInputOver.add(this.over, this);
		unmute.events.onInputOut.add(this.out, this);
		
    	stars = this.add.button(135,Mania.GAME_HEIGHT-340,'gems',this.clickDisabled,this);
    	stars.scale.setTo(0.6,0.6);
		stars.alpha=0.8;
		stars.events.onInputOver.add(this.over, this);
		stars.events.onInputOut.add(this.out, this);
    	
    	high_score = this.add.button(125,Mania.GAME_HEIGHT-270,'high_score',this.clickDisabled,this);
    	high_score.scale.setTo(0.7,0.7);
		high_score.alpha=0.8;
		high_score.events.onInputOver.add(this.over, this);
		high_score.events.onInputOut.add(this.out, this);
    	
		this.sound_ = this.add.audio('sound2');
    	this.sound_.play('',0,1,true);
    	this.sound_.onLoop.add(this.playSound,this);	
		this.choice_snd = this.add.audio('sound3');
		this.disabled_snd = this.add.audio('sound4');	
    
	},
	
	over: function(btn) {
		btn.alpha = 1.0;
	},
	
	out: function(btn) {
		btn.alpha=0.8;
	},
	
	clickDisabled: function() {
		this.disabled_snd.play();
	},
	
	selectLevel: function() {
		this.choice_snd.play();
		this.shutdown();
		this.state.start('Levels',true,false);
	},
    
    Sfx: function() {
        if(this.game.sound.mute==false)
        {
            this.game.sound.mute=true;
            unmute.destroy();
            unmute  = this.add.button(Mania.GAME_WIDTH-168,Mania.GAME_HEIGHT-215,'mute',this.Sfx,this);
            unmute.scale.setTo(0.55,0.55);
            unmute.anchor.setTo(0.5,0.5);
			unmute.alpha=0.8;
			unmute.events.onInputOver.add(this.over, this);
			unmute.events.onInputOut.add(this.out, this);    
        }
        
        else {
            this.game.sound.mute=false;
            unmute.destroy();
            unmute  = this.add.button(Mania.GAME_WIDTH-168,Mania.GAME_HEIGHT-215,'unmute',this.Sfx,this);
            unmute.scale.setTo(0.55,0.55);
            unmute.anchor.setTo(0.5,0.5);
			unmute.alpha=0.8;
			unmute.events.onInputOver.add(this.over, this);
			unmute.events.onInputOut.add(this.out, this);
        }
    },
    
    playSound: function() {
        this.sound_.play('',0,1,true);
    },
	
	shutdown: function()
	{	this.sound_.stop();
		start=null;
		unmute=null;
		high_score=null;
		stars=null;
		info=null;
		settings=null;
		menu=null;
		menu2=null;
		enemy=null;
		ground=null;
		platforms=null;
		logo=null;
		a=b=c=null;	
	}
};