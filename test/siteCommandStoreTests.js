exports.run = function() {
	describe("Site Command Store", function() {
		var commandActions = require("../src/actions").commands;
		var store = null;

		it("Should have a 'getValue' method", function() {
			// require store in here to keep it from initializing until these tests run
			store = require("../src/stores/siteCommand");
			store.should.have.property('getValue');
			store.getValue.should.be.a("function");
			store.getValue().children.should.have.length(0);
		})

		it('Should have eventable methods', function() {
			store.should.have.property("trigger");
			store.should.have.property("emit");
			store.should.have.property("on");
			store.should.have.property("off");
			store.should.have.property("subscribe");
			store.should.have.property("unsubscribe");
		}) 

		context("getValue()", function() {
			it("Should initially return a siteCommand object", function() {
				var siteCommand = store.getValue();
				siteCommand.should.have.property("title");
				siteCommand.should.have.property("commands");
				siteCommand.should.have.property("toPowershell");
			});

		})

		context("handlers", function() {
			context("ADD", function() {
				it("Should add a child command and emit an update event", function(done) {
					store.getValue().children.should.have.length(0);
					var storeHandler = () => {
						store.getValue().children.should.have.length(1);
						store.off("update", storeHandler);
						done();
					}
					
					store.on("update", storeHandler);
					commandActions.add.trigger({ type: "upload"})
 
				});
			})

			context("UPDATE", function() {
				it("Should update the command and emit an update event", function(done) {
					store.getValue().children.should.have.length(1);
					var id = store.getValue().children[0].id;
					var folderValue = "New Value";

					var storeHandler = () => {
						store.getValue().children.should.have.length(1);
						store.getValue().children[0].params.folder.should.equal(folderValue);
						store.off("update", storeHandler);
						done();
					}
					
					store.on("update", storeHandler);
					commandActions.update.trigger({id, key: "folder", value: folderValue });					
				})
			})

			context("SELECT", function() {
				it("Should set isActive to true and emit and update event", function(done) {
					store.getValue().isActive.should.equal(false);
					var id = store.getValue().id;
					var storeHandler = () => {
						store.getValue().isActive.should.equal(true);
						store.off("update", storeHandler);
						done();
					};
					store.on("update", storeHandler);
					commandActions.select.trigger({id});
				})
			})

			context("DELETE", function() {
				it("Should remove the child command and emit an update event", function(done) {
					store.getValue().children.should.have.length(1);
					var id = store.getValue().children[0].id;

					var storeHandler = () => {
						store.getValue().children.should.have.length(0);
						store.off("update", storeHandler);
						done();
					}
					
					store.on("update", storeHandler);
					commandActions.delete.trigger({id});					
				})
			})




		})
	})
}