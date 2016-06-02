var React = require("react");

module.exports = React.createClass({
	ensureScript() {
		return new Promise((resolve, reject) =>{
			if (window.hljs) resolve();
			else {
				//add CSS link tag and get JS from cdn
				//$.getScript()
			}
		})
	},
    render: function() {
    	//this.ensureScript().then(() => {
		  	// $('pre code').each(function(i, block) {
    	// 		hljs.highlightBlock(block);
		  	// });
    	// })
		setTimeout(() => {
		  $('pre code').each(function(i, block) {
		    hljs.highlightBlock(block);
		  });
		}, 20)

        return (
	    	<div>
	          <pre><code className={this.props.language}>
	          {this.props.code}
	          </code></pre>
	        </div>
        );
    }
});