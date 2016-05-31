Mania.Preloader = function(game){
	Mania.GAME_WIDTH = 1366;
	Mania.GAME_HEIGHT = 768; 
};
Mania.Preloader.prototype = {
	preload: function(){

		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((Mania.GAME_WIDTH-311)/2, (Mania.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
	
        this.load.image('layer1', 'assets/layer1.png');
    	this.load.image('layer2', 'assets/layer2.png');
    	this.load.image('layer4', 'assets/layer4.png');
        this.load.image('layerr', 'assets/layerr.png');
    	this.load.image('tree', 'assets/tree.png');
    	this.load.image('resume' , 'assets/resume.png');
        this.load.image('logo', 'assets/logo.png');
    	this.load.spritesheet("enemy", "assets/penguinn.png",199,211);
    	this.load.audio('sound2', 'sounds/back_music1.ogg');
    	this.load.image('settings','assets/settings.png');
    	this.load.image('info' , 'assets/info.png');
    	this.load.image('menu','assets/menu.png');
    	this.load.image('mute' , 'assets/mute.png');
    	this.load.image('unmute' , 'assets/unmute.png');
    	this.load.image('gems' , 'assets/gems.png');
    	this.load.image('high_score' , 'assets/high_score.png');    
		this.load.image('unlock','assets/unlock.png');
    	this.load.image('right_btn' , 'assets/right_btn.png');
    	this.load.image('unmute' , 'assets/unmute.png');
    	this.load.image('close_btn' , 'assets/close_btn.png');
    	this.load.image('left_btn' , 'assets/left_btn.png');
        this.load.image('level1', 'assets/level_btn.png');
		this.load.image('level2', 'assets/level_btn2.png');
		this.load.image('level3', 'assets/level_btn3.png');
        this.load.image('resume' , 'assets/resume.png');
        this.load.image('lwindow', 'assets/window.png');
        this.load.image('levels','assets/levels.png');
		this.load.image('main_menu','assets/main_menu.png');
        this.load.image('player', 'assets/character.png');
		this.load.spritesheet('wizard','assets/wizard.png',163,185);
		this.load.image('bar-bg', 'assets/bar-bg.png');
		this.load.image('bar', 'assets/bar.png');
		this.load.image('house', 'assets/house.png');
		this.load.spritesheet('player2', 'assets/playernew.png',308,462);
        this.load.image('counter', 'assets/counter.png');
        this.load.image('replay', 'assets/replay.png');
        this.load.image('pause', 'assets/pause.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('level_icon', 'assets/level_icon.png');
        this.load.image('dialog', 'assets/dialog_cloud.png');
		this.load.image('pear','assets/pear.gif');
        this.load.spritesheet('blast','assets/explosion.png',64,64);
        this.load.spritesheet('enem', 'assets/plant.png', 427,496);
		this.load.spritesheet("bird", "assets/bird.png",949, 688);
        this.load.audio('sound1', 'sounds/swoosh.mp3');
		this.load.audio('sound3', 'sounds/choice.mp3');
		this.load.audio('dart', 'sounds/dart.mp3');
		this.load.audio('pickup', 'sounds/pickup.mp3');
		this.load.audio('sound4', 'sounds/disabled.wav');
		this.load.audio('sound5', 'sounds/back_music2.wav');
		this.load.image('inf','assets/inf.png');
		this.load.image('sign','assets/sign.png');
		this.load.audio('dart', 'sounds/dart.mp3');
		this.load.audio('sound1_', 'sounds/one.mp3');
		this.load.audio('sound2_', 'sounds/two.mp3');		
		this.load.audio('sound3_', 'sounds/three.mp3');	
    	this.load.audio('sound4_', 'sounds/four.mp3');
    	this.load.audio('sound5_', 'sounds/five.mp3');    
		this.load.audio('sound6_', 'sounds/six.mp3');
		this.load.audio('sound7_', 'sounds/seven.mp3');
		this.load.audio('intr_snd', 'sounds/intr_snd.mp3');
        
        
	},
	create: function(){
		this.state.start('MainMenu');
	}
};