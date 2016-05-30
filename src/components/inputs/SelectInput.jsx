var React = require("react");
var BaseInput = require("./BaseInput.jsx");

//id,value,label, options
module.exports = class SelectInput extends BaseInput {
	render() {
        return (
            <div className="input-field col s12">
              <label className='active'>{this.props.label}</label>
              <select id={this.props.id} className="browser-default" value={this.bindValue()} onChange={this.bindChange()}>
              		{this.props.options.map(o => <option value={o.value}>{o.text}</option>)}
              </select>
            </div>
        );		
	}
}