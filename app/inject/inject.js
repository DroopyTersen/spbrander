var engine = require("../../engine");
var path = require("path");
var tempServer = null;

$("input").on("input", function(e) {
	if (isValid()) {
		$("#start-btn").removeClass("disabled");
	} else {
		$("#start-btn").addClass("disabled");
	}
})

var inputs = {
	$file: $("#file"),
	$url: $("#url"),
	$user: $("#user"),
	$pwd: $("#password")
};
var runningOpts = null;
var isValid = function() {
	return inputs.$file.val()
		&& inputs.$url.val()
		&& inputs.$user.val()
		&& inputs.$pwd.val();
}

var getOpts = function() {
	return {
		file: inputs.$file.val(),
		url: inputs.$url.val(),
		user: inputs.$user.val(),
		pwd: inputs.$pwd.val()
	};
};

$("form").on("submit", function(e) {
	e.preventDefault();

	if (!isValid()) {
		alert("Fill in the values first you silly goose.")
		return false;
	}

	var opts = getOpts();
	var extension = path.extname(opts.file);

	if (extension === ".js") {
		engine.addScriptLink(opts);
	} else if (extension === ".css") {
		engine.addStylesheet(opts);
	} else {
		alert("Currently only CSS and JS file are supported");
		return false;
	}
	runningOpts = opts;
	$("#stop-btn").removeClass("disabled");
	$("#start-btn").addClass("disabled");
});

$("#stop-btn").on("click", function(e) {
	engine.removeScriptLink(runningOpts, () => {
		window.location.reload();
	});
})