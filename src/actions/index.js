var actionUtils = require("./actionUtils");

var actions = actionUtils.init();

var keys = [ "add", "select", "delete", "update" ];
actions.commands = {};
keys.forEach(key => actions.commands[key] = actions._create("command-" + key));


actions.commands.execute = actions._create("commands-execute");

module.exports = actions;