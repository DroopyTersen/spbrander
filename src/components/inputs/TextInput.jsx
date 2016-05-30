var React = require("react");
var BaseInput = require("./BaseInput.jsx");

//id,value,label
module.exports = class TextInput extends BaseInput {
	render() {
        return (
            <div className="input-field col s12">
                <input id={this.props.id} type="text" value={this.bindValue()} onChange={this.bindChange()} />
                <label for={this.props.id} className='active'>{this.props.label}</label>
            </div>
        );		
	}
}