var React 			= require("react");
var ReactDOM 		= require('react-dom');
var WorkspaceTabs	= require("../../containers/WorkspaceTabs.jsx");

var WorkspaceScreen = React.createClass({
    render: function() {
        return (
	    	<div>
	          <WorkspaceTabs />
	        </div>
        );
    }
});

ReactDOM.render(<WorkspaceScreen />, document.getElementById('root'));

