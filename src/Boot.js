var Mania = {};
Mania.Boot = function(game){};
Mania.Boot.prototype = {
	preload: function(){
		this.load.image('preloaderBar', 'assets/loading-bar.png');
	},
	create: function(){
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		this.state.start('Preloader');
		
	}
};