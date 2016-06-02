var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
            <div className='col s12 form-actions'>
                <button onClick={this.props.onClick || function() {}} className="btn col s12 waves-effect waves-teal z-depth-0" type='button' >
                  {this.props.text}
                </button>
            </div>
        );
    }
});