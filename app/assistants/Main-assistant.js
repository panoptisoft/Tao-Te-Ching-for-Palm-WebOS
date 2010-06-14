function MainAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

MainAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
	
	$$('body')[0].addClassName('tao');
	
	//$('tao-toc')

	Mojo.Log.info("Hello");
	
	var request = new Ajax.Request("Database.txt", {
		method: 'get',
		evalJSON: 'force',
		onSuccess: this.parseDatabase.bind(this),
		onFailure: (function(results){
			Mojo.Log.error("ERROR", results);
		}).bind(this)
	});

	this.controller.setupWidget('tao-toc', {
        itemTemplate: 'Main/listItem',
        listTemplate: 'Main/list',
        swipeToDelete: false,
        reorderable: false
    }, this.listModel = {
    	items: []
    });

	this.controller.listen(this.controller.get("tao-toc"), Mojo.Event.listTap, this.handleListTap.bind(this));
	
	Mojo.Log.info(request);
};

MainAssistant.prototype.parseDatabase = function(results){
	var chapters = results.responseText.split("##");
	
	for(var i=0; i<chapters.length; i++){
		var lines = chapters[i].split("\n");
		var text = "";

		for(var j=1; j<lines.length; j++){
			text += lines[j] + "<br />";
		}

		if(lines[0].trim() != ""){
			var parts = lines[0].split(/\. /);
			this.listModel.items.push({name: lines[0], value: parts[0], text: text});
		}
	}

	STAGE.chapters = this.listModel.items;
	
	this.controller.modelChanged(this.listModel);
};

/* Again, this global variable seems like cheating */
VERSE = 0;

MainAssistant.prototype.handleListTap = function(event) {
	Mojo.Log.info("List tapped!", event.item.text, "*****", STAGE.chapters[event.index]);
	VERSE = event.index;
	this.controller.stageController.pushScene("Verse");
}

MainAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

MainAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

MainAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
