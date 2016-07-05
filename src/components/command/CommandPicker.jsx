var React = require("react");
var actions = require("../../actions");

module.exports = React.createClass({
    chooseCommandType: function(e) {
        var type = e.currentTarget.value;
        e.preventDefault();

        if (type){
            actions.commands.add({ type, initialValues: { isActive: true } });
        }
        e.currentTarget.value = "";
        setTimeout(() => window.scrollTo(0,document.body.scrollHeight), 15)
    },
    //add active class to keep it from slide hiding when dropdown is open
    handleFocus(e) {
        this.refs.picker.className += " active";
    },
    handleBlur(e) {
        this.refs.picker.className = this.refs.picker.className.replace(/active/g, "");
    },
    render: function() {
        var options = this.props.command.childOptions.map(c => <option value={c.type}>{c.title}</option> )
        return (
            <div ref='picker' className='command-picker col s8'>
                    <button type='button' className="new-command-btn btn-floating btn-flat waves-effect waves-light green">
                        <i className="material-icons">add</i>
                    </button>
                <div className='col s9 dropdown'>
                    <select 
                        onFocus={this.handleFocus} 
                        onBlur={this.handleBlur} 
                        className='browser-default' 
                        onChange={this.chooseCommandType}>
                        <option value=''>Choose an action...</option>
                        {options}
                    </select>
                </div>
            </div>

        );
    }
});