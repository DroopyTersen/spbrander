var React = require("react");
var utils = require("../utils");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			console: []
		}
	},
	componentWillMount: function() {
      	utils.consoleOverride(this);
	},
    render: function() {
		setTimeout(() => {
    		window.scrollTo(0,document.body.scrollHeight);
    	}, 20);
    	
    	var content = ">> " + this.state.console.join("\n>> ");
        return (
	    	<div className='console'>
	          <pre>{content}</pre>
	        </div>
        );
    }
});