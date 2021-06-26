import React, { Component } from 'react';
class Display extends Component {
    state = {}

    tempHtml = `<html>
<head>
<title>Page Title</title>
<style>
body {
  background-color: blue;
  text-align: center;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<p>Edit the code in the window to the left, and click "Run" to view the result.</p>
<img src="avatar.png" alt="Avatar" style="width:200px">

</body>
</html>`

    // html=()=><div dangerouslySetInnerHTML={{ __html: this.tempHtml }} />
    render() {
        return (
            <div style={{padding:2,paddingTop:window.screen.width>500?45:0}}>
                {/* <iframe title="HTML"  src="<div dangerouslySetInnerHTML={{ __html: this.tempHtml }} />"></iframe>  */}
                {/* <div dangerouslySetInnerHTML={{ __html: this.tempHtml }} />; */}
                {/* <iframe title="HTML"  srcdoc={this.tempHtml}></iframe> */}

                <iframe style={{borderRadius:5, width:"100%",height:window.screen.width>500?window.screen.height:window.screen.height/2,backgroundColor:"white"}}  title="HTML" srcDoc={this.props.content}></iframe>


            </div>
        );
    }
}

export default Display;