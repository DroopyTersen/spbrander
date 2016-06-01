var React = require("react");

module.exports = React.createClass({
    render: function() {
		setTimeout(() => {
		  $('pre code').each(function(i, block) {
		    hljs.highlightBlock(block);
		  });
		}, 20)

        return (
	    	<div>
	          <pre><code class='powershell'>
	          {this.props.code}
	          </code></pre>
	        </div>
        );
    }
});