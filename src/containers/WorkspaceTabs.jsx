var React = require("react");
var Designer = require("./Designer.jsx");
module.exports = React.createClass({

    render: function() {
      	setTimeout(() => $('.workspace-tabs ul.tabs').tabs(), 25)
        return (
        	<div>
		  <div className="row workspace-tabs">
		    <div className="col s4">
		      <ul className="tabs blue-text text-darken-4">
		        <li className="tab col s2">
		        	<a href="#designer-tab-content">Designer</a>
	        	</li>
		        <li className="tab col s2">
		        	<a href="#code-tab-content">Code</a>
	        	</li>
		      </ul>
		    </div>
		    <div id="designer-tab-content" className="col s12">
		    	<Designer />
		    </div>
		    <div id="code-tab-content" className="col s12">Test 2</div>
		  </div>

	    	<button className="btn z-depth-0 waves-effect waves-red red darken-1" type="button" id="execute-btn">
	    		Execute
		  	</button>
		  	</div>
        );
    }
});