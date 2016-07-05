var React = require("react");
var inputs = require("../inputs");
var FormButton = require("../buttons/FormButton.jsx")
var actions = require("../../actions");

module.exports = React.createClass({
  checkConnection: function() {
    console.log("HERE");
    actions.checkConnection();
  },
  render: function() {
      var params = this.props.command.params;
      return (
        <div>
          <inputs.TextInput id='url' label='Url' command={this.props.command} />
          
          <inputs.SelectInput 
            id='version'  
            command={this.props.command}
            label="Version"
            options={[{ value:"v16", text:"Office 365" }, { value: "v15", text: "On Premises" }]} 
          />

          <FormButton text='Check Connection' onClick={this.checkConnection} />
        </div>
      )
  }
});