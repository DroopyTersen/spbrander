var React = require("react");
var Command = require("../components/command/Command.jsx");
var SiteCommandAdder = require("../components/SiteCommandAdder.jsx");

module.exports = React.createClass({
    render: function() {
        return (
	    	<div className='col s7' style={{marginTop:"15px", position:"relative"}}>
	          	<Command command={this.props.siteCommand} />

          		<SiteCommandAdder />
	        </div>
        );
    }
});