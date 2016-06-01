var React = require("react");

module.exports = React.createClass({
    render: function() {
      	setTimeout(() => {
      		$('select').material_select()
      	}, 25)
        return (
			<div className='form-panel col z-depth-1'>
		    	<form className='col s12'>
		    		<h3 className='form-title teal-text col s12'>{this.props.title}</h3>
		    		<div className='command-form-content'>
		    			{this.props.children}
		    		</div>
		        </form>
	        </div>
        );
    }
});