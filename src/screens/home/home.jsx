var React 			= require("react");
var ReactDOM 		= require('react-dom');
var Test			= require("../../components/test.jsx");

class HomeScreen extends React.Component {
    render() {
        return (
	    	<div>
	          <h1>Hey there you</h1>
	          <Test />
	        </div>
        );
    }
};

ReactDOM.render(<HomeScreen/>, document.getElementById('root'));