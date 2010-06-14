function VerseAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	
	this.page = 0;
}

VerseAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */

	$$('body')[0].addClassName('tao');

	this.cmdMenuModel = { 
		label: $L('Menu Demo'), 
		items: [
				{label: $L('Back'), icon: 'back', command: 'back'},
				//{label: $L('Favorite'), iconPath: 'images/heart.png', command: 'favorite'},
				{label: $L('Forward'), icon: 'forward', command: 'fwd'}
			]
	};
	this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.cmdMenuModel);
	this.loadPage(VERSE);
};

VerseAssistant.prototype.handleCommand = function(event) {
	if(event.type == Mojo.Event.command) {

		if(event.command == "back"){
			VERSE--;
			this.controller.stageController.swapScene({name: "Verse", transition: Mojo.Transition.crossFade});
			//this.loadPage(VERSE);
		}
		if(event.command == "fwd"){
			VERSE++;
			this.controller.stageController.swapScene({name: "Verse", transition: Mojo.Transition.crossFade});
			//this.loadPage(VERSE);
		}
		
		Mojo.Log.info("Recieved command event: '", event.command, "'.");
	}
}

VerseAssistant.prototype.loadPage = function(index) {
	var data = STAGE.chapters[index];
	
	$('tao-header').update(data.name);
	$('tao-verse').update(data.text);
	
	if(index == 0){
		this.cmdMenuModel.items[0].disabled = true;
	}else{
		this.cmdMenuModel.items[0].disabled = false;
	}
	if(index == STAGE.chapters.length - 1){
		this.cmdMenuModel.items[1].disabled = true;
	}else{
		this.cmdMenuModel.items[1].disabled = false;
	}
	this.controller.modelChanged(this.cmdMenuModel);
}

VerseAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

VerseAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

VerseAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
