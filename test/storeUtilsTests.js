exports.run = function() {
	describe("Store Utils", function() {
		var storeUtils = require("../src/stores/storeUtils");
		it("Should expose 'createStore' and 'createActionHandler' methods", function() {
			storeUtils.should.have.property("createStore");
		});
 
		context("createStore()", function() {
			it('Should return an object with eventable methods', function() {
				var store = storeUtils.createStore();
				store.should.have.property("trigger");
				store.should.have.property("emit");
				store.should.have.property("on");
				store.should.have.property("off");
				store.should.have.property("subscribe");
				store.should.have.property("unsubscribe");
			})

			it('Should allow triggering and listening', function(done) {
				var store = storeUtils.createStore();
				var handler = () => done();

				store.on('update', handler);
				store.trigger('update');
			})

			it('Should support alternate eventing syntax', function(done) {
				var store = storeUtils.createStore();
				var handler = () => done();

				store.subscribe('update', handler);
				store.emit('update');
			})

			it('Should return a createActionHandler method', function() {
				var store = storeUtils.createStore();
				store.should.have.property("createActionHandler");
				store.createActionHandler.should.be.a("function");
			})
		})

		context("createActionHandler(action, handler, expectedPayload, eventKey='update')", function() {
			var actionUtils = require("../src/actions/actionUtils");


			it("Should fire the handler with the action is triggered", function(done) {
				var action = actionUtils.init()._create("test-action");
				var handler = () => done()
				var store = storeUtils.createStore();

				store.createActionHandler(action, handler);
				action();
			});
			it("Should trigger an {eventKey} event on the store", function(done) {
				var action = actionUtils.init()._create("test-action");
				var storeHandler = () => done()
				var handler = () => "doesn't matter"

				var store = storeUtils.createStore();
				store.on('update', storeHandler);
				store.createActionHandler(action, handler);
				action();
			})

			it("Should pass the payload to the handler", function(done) {
				var action = actionUtils.init()._create("test-action");
				var actionPayload = { id: 123 }
				var handler = (payload) => {
					payload.should.have.property("id");
					payload.id.should.equal(actionPayload.id);
					done();
				};

				var store = storeUtils.createStore();
				store.createActionHandler(action, handler);
				action.trigger(actionPayload);
			})

			it("Should trigger action error and not invoke handler or trigger store event if invalid payload", function(done) {
				var actions = actionUtils.init()
				var actionKey = "test-action";
				var action = actions._create(actionKey);
				var storeHandler = () => false.should.equal(true)
				var handler = () => false.should.equal(true)
				var errHandler = (err) => {
					if (err.key === actionKey) done();
				}

				var store = storeUtils.createStore();
				store.on('update', storeHandler);
				actions.on("error", errHandler);
				store.createActionHandler(action, handler, ["id"]);
				action();					
			})

		})
	})
}