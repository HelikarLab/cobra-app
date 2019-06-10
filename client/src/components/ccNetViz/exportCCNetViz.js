
import React from 'react'

var __html = require('basic.html.html');
var template = { __html: __html };

React.module.exports = React.createClass({
    render: function() {
        return(
            <div dangerouslySetInnerHTML={template} />
        );
    }
});
