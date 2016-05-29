var React = require("react");
var Command = require("./Command.jsx");
var SiteForm = require("../components/SiteForm.jsx");

module.exports = React.createClass({
    render: function() {
    	var siteForm = <SiteForm />
        return (
	    	<div className='tab-container'>
	          <Command 
	          	title='Site' 
	          	form={siteForm} />
	        </div>
        );
    }
});