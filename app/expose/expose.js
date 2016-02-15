var engine = require("../../engine");
var tempServer = null;

$("#path").on("input", function(e) {
	var val = $("#path").val();
	if (val) {
		$("#start-btn").removeClass("disabled");
	} else {
		$("#start-btn").addClass("disabled");
	}
})

$("form").on("submit", function(e) {
	e.preventDefault();
	var path = $("#path").val();
	tempServer = engine.exposeFolder({ path });
	$("#stop-btn").removeClass("disabled");
	$("#start-btn").addClass("disabled");
});

$("#stop-btn").on("click", function(e) {
	window.location.reload();
})