var React = require("react");
var BaseInput = require("./BaseInput.jsx");

//id,value,label
module.exports = class TextAreaInput extends BaseInput {
	render() {
        return (
            <div className="input-field col s12">
                <textarea id={this.props.id} 
                	className="materialize-textarea" 
                	value={this.bindValue()} 
                	onChange={this.bindChange()} >
            	</textarea>
                <label for={this.props.id} className='active'>{this.props.label}</label>
            </div>
        );		
	}
}