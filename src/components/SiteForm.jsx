var React = require("react");

module.exports = React.createClass({
    render: function() {
      	setTimeout(() => {
      		$('select').material_select()
      	}, 25)
        return (
	    	<form className='col s12'>
	    		<h3 className='form-title teal-text'>SharePoint Site</h3>

    			<div className="input-field col s12">
	          			<input id="site-url" type="text"/>
	          			<label for="site-url">Url</label>
    			</div>

     			<div className="input-field col s12">
				    <select id='site-version'>
				      <option value="v16">Office 365</option>
				      <option value="v15">On Premises</option>
				    </select>
	    			<label>Version</label>
  				</div>


  				<div className='col s12 form-actions'>
	  				<button className="btn col s12 waves-effect waves-teal z-depth-0" type='button' >
	  					Check Connection
					</button>
  				</div>

	        </form>
        );
    }
});