STAGE = null;

function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}

StageAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the stage is first created */
	this.chapters = [3];

	this.controller.pushScene("Main");
	
	/* This seems like cheating. There must be a better way to get at the stage from the individual scenes. */
	STAGE = this;
};
