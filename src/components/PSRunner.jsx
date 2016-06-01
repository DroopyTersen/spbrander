var React = require("react");
var Console = require("./Console.jsx");
var utils = require("../utils");

module.exports = React.createClass({
	componentDidMount: function() {
  		$(document).trigger("executing-script");
  		utils.runPowershellBlock(this.props.scriptBlock).then(() => {
  			console.log("SUCCESS!!");
  			$(document).trigger("done-executing-script");
  		});
	},
    render: function() {
        return (
	    	<div className='powershell-runner teal darken-2'>
	          <h2>{this.props.message}</h2>
	          <Console />
	        </div>
        );
    }
});