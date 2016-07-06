var React = require("react");
var inputs = require("../inputs");
var FormButton = require("../buttons/FormButton.jsx")
var utils = require("../../utils");
var actions = require("../../actions");
var UploadForm = require("./UploadForm.jsx");

module.exports = React.createClass({
    getInitialState() {
        return {
            isUrl: true  
        };
    },
    checkUrl: function() {
        utils.openExternalLink(this.props.command.params.url);
    },

    handleTypeChange: function(type, e) {
        var payload = {
            id: this.props.command.id,
            key: "type",
            value: type
        };
        actions.commands.update(payload);
    },
    render: function() {
        var params = this.props.command.params;
        var subForm = ""
        if (params.type === "url") {
            subForm = (
                <div>
                    <inputs.TextAreaInput id='url' label='Stylesheet Url' command={this.props.command} />
                    <FormButton text='Check Url' onClick={this.checkUrl} />
                </div>
            );
        }

        if (params.type === "file") {
            subForm = <UploadForm command={this.props.command} />
        }
        return (
          <div>
            <inputs.TextInput id='name' label='Name' command={this.props.command} />
            <inputs.SelectInput 
                id='scope'  
                command={this.props.command}
                label="Scope"
                options={[{ value:"Web", text:"Web" }, { value: "Site", text: "Site Collection" }]} 
            />
            <div>
                <span className='col s3'>
                    <input 
                        className="with-gap" 
                        name="filetype" 
                        type="radio" 
                        id="filetype-url"
                        checked={params.type === "url"} />
                    <label onClick={this.handleTypeChange.bind(this, "url")} for="filetype-url">Url</label>
                </span>

                <span className='col s4'>
                    <input 
                        className="with-gap" 
                        name="filetype" 
                        type="radio" 
                        id="filetype-file"
                        checked={params.type === "file"} />
                    <label onClick={this.handleTypeChange.bind(this, "file")} for="filetype-file">Local File</label>
                </span>
            </div>
            {subForm}

          </div>    
        )
    }
});