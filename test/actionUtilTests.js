exports.run = function() {

	var actionUtils = require("../src/actions/actionUtils");
	describe("Action Utils", function() {
		var actions = actionUtils.init();
		context("actionUtils.init()", function() {
			it("Should return an Eventable object with a _create method", function() {
				actions.should.have.property("on");
				actions.should.have.property("trigger");
				actions.should.have.property("off");
				actions.should.have.property("_create");
				actions._create.should.be.a("function");
			})
		});
		context("actions._create(key)", function() {
			it("Should return an object with event methods", function() {
				var action = actions._create("test");
				action.should.have.property("trigger");
				action.should.have.property("subscribe");
				action.should.have.property("unsubscribe");
				action.should.have.property("error");
			});
			it("Should allow you to subscribe and trigger", function(done) {
				var action = actions._create("test2");
				var actionHandler = () => { 
					done();
				};
				action.subscribe(actionHandler);
				action.trigger();
			});
			it("Should allow you to pass a payload", function(done) {
				var action = actions._create("test3");
				var actionPayload = {
					title: "test"
				};
				var actionHandler = (payload) => {
					payload.should.have.property("title");
					payload.title.should.equal(actionPayload.title);
					done();
				};
				action.subscribe(actionHandler);
				action.trigger(actionPayload);
			});

			it("Should allow you to trigger an error event", function(done){
				var actionKey = "testError";
				var errorHandler = (err) => {
					err.should.have.property("key");
					err.key.should.equal(actionKey);
					done();
				}
				actions.on("error", errorHandler);
				var action = actions._create(actionKey);
				action.error("Uh Oh");
			});

			it("Should throw an exception if the action key already exists", function() {
				actions._create.bind(actions, "test4").should.not.throw(Error);
				actions._create.bind(actions, "test4").should.throw("Action key already exists");
			});
		})
	})
}