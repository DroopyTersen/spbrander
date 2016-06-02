exports.run = function() {
	describe("Actions", function() {
		var actions = require("../src/actions");
		it("Should return command actions", function() {
			actions.should.have.property("commands");
			actions.commands.should.have.property("add")
			actions.commands.should.have.property("delete")
			actions.commands.should.have.property("update")
			actions.commands.should.have.property("select")
			actions.commands.should.have.property("execute")
		});
		it("Should return actions with eventable methods", function() {
			actions.should.have.property("commands");
			actions.commands.should.have.property("add");
			actions.commands.add.should.have.property("subscribe");
			actions.commands.add.should.have.property("trigger");
		});
		it("Should return subscribable and triggerable actions", function(done) {
			var actionHandler = () => {
				actions.commands.add.unsubscribe(actionHandler);
				done()
			}
			actions.should.have.property("commands");
			actions.commands.should.have.property("add");
			actions.commands.add.subscribe(actionHandler);
			actions.commands.add.trigger();
		});

		it("Should allow you to pass an arbitrary payload", function(done) {
			var addPayload = { type: "upload" };
			var actionHandler = (payload) => {
				payload.should.have.property("type");
				payload.type.should.equal(addPayload.type);
				actions.commands.add.unsubscribe(actionHandler);
				done()
			};

			actions.should.have.property("commands");
			actions.commands.should.have.property("add");
			actions.commands.add.subscribe(actionHandler);
			actions.commands.add.trigger(addPayload);
		});
	})
};