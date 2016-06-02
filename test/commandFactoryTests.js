exports.run = function() {
	describe("Command Factory", function() {
		var  commandFactory = require("../src/stores/siteCommand/commandFactory");
		it("Should expose a create method", function() { 
			commandFactory.should.have.property("create");
			commandFactory.create.should.be.a("function");
		});

		context("create(type, initialValues)", function() {
			it("Should throw an error if no type is passed", function() {
				commandFactory.create.bind(commandFactory, null).should.throw(Error);
			})
			it("Should throw an error if an invalid type is passed", function() {
				commandFactory.create.bind(commandFactory, "INVALID TYPE").should.throw(Error);
			})
			it("Should return a command with base methods", function() {
				var command = commandFactory.create('site');
				command.should.have.property('commands');
				command.commands.should.be.an("object");
				command.should.have.property('children');
				command.should.have.property('isActive');
				command.isActive.should.equal(false);
				command.should.have.property('deactivateAll');
				command.should.have.property('find');
			});

			it("Should return a command with a unique id", function(){
				var command1 = commandFactory.create("site");
				command1.should.have.property("id");
				command1.id.should.have.length.above(0);

				var command2 = commandFactory.create("site");
				command2.should.have.property("id");
				command2.id.should.have.length.above(0);

				command1.id.should.not.equal(command2.id);
			});

			it("Should return a command with command definition properties", function() {
				var command1 = commandFactory.create("site");
				command1.should.have.property("title");
				command1.should.have.property("form");
				command1.should.have.property("params");
				command1.should.have.property("invoke");
			});

			it("Should return a command with initial values", function() {
				var command1 = commandFactory.create("upload", { isActive: true});
				command1.should.have.property("isActive");
				command1.isActive.should.equal(true);
			});

		});

		context("addChild(type, values)", function() {
			it("Should throw an error if no type is passed", function() {
				var site = commandFactory.create("site");
				site.addChild.bind(site, null).should.throw(Error);
			})
			it("Should throw an error if an invalid type is passed", function() {
				var site = commandFactory.create("site");
				site.addChild.bind(site, "INVALID TYPE").should.throw(Error);
			})
			it("Should return the new child command", function() {
				var site = commandFactory.create("site");
				site.children.should.have.lengthOf(0);
				var result = site.addChild('upload');
				result.should.not.equal(site);
				site.children.should.have.lengthOf(1);

				var uploadCommand = site.children[0]
				uploadCommand.should.equal(result);
				uploadCommand.title.should.equal("Upload File");
				uploadCommand.should.have.property("invoke");
				uploadCommand.commands.should.not.equal(site.commands);
			});
			it("Should support adding multiple children", function() {
				var site = commandFactory.create("site");
				site.addChild('upload');
				site.addChild('upload');
				site.children.should.have.length(2);
			})
		});

		context("deactiveAll()", function() {
			it("Should return the parent command", function() {
				var site = commandFactory.create("site");
				site.deactivateAll().should.equal(site);
			})
			it("Should deactivate all commands, even children", function() {
				var site = commandFactory.create("site");
				site.addChild("upload", { isActive: true });
				site.children[0].isActive.should.equal(true);

				site.deactivateAll();
				site.children[0].isActive.should.equal(false);
			});
		});

		context("find(id)", function() {
			it("Should return the parent commmand if the id matches", function() {
				var site = commandFactory.create("site");
				var result = site.find(site.id);
				result.should.equal(site);
			});
			it("Should return a child command if the id matches", function() {
				var site = commandFactory.create("site");
				var child = site.addChild("upload");
				var result = site.find(child.id);
				result.should.equal(child);
			})
		})
	})
}