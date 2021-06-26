import React, { Component } from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

import Icon from '@material-ui/core/Icon';
import Save from '@material-ui/icons/Save';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import CachedIcon from '@material-ui/icons/Cached';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';



class Editor extends Component {
    state = {
        content: "",
        liveReload: false,
        mode:true
    }

    componentDidMount = () => {
        this.setState({ content: this.tempHtml })
    }

    tempHtml = `<html>
    <head>
        <title>Page Title</title>
        <script>
            function myFunction() {
                alert("Hello World")
            }
        </script>
        <style>
            body {
                background-color: purple;
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
        <button onclick="myFunction()">Click</button>
    </body>
</html>`

    onChange = (newValue) => {
        // console.log('change', newValue);
        // console.log(this)
        this.state.liveReload ?
            this.setState({ content: newValue }, () => this.props.setContent(this.state.content))
            :
            this.setState({ content: newValue })
    }
    onClick = () => {
        if(this.state.content=="")
        toast.error('Ooho Empty Text!!!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        this.props.setContent(this.state.content);

    }
    onLiveReload = () => {
        this.setState({ liveReload: !this.state.liveReload },
            ()=>{
                this.state.liveReload?toast.dark("Live Reload Enabled",{autoClose: 2000}):toast.dark("Live Reload Disbled",{autoClose: 2000})


            });


    }
    onSave = () => {
        const fileData = this.state.content;
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'download.txt';
        link.href = url;
        link.click();

    }
    onNight=()=>{
        this.setState({mode:!this.state.mode},()=>this.props.nightMode())
    }

    render() {
        return (
            <div style={{ padding: 1 }} >
                <ToastContainer />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <button style={{ marginLeft:50, borderRadius:4 ,backgroundColor: "green", height: 45, width: 80, fontSize: 17, fontWeight: "bold", color: "white" }} onClick={this.onClick}>Run >></button>
                    <button style={{backgroundColor:"white",borderRadius:4 ,fontSize:17,fontWeight: "bold",marginLeft:10,height:45,width:150}}onClick={this.onLiveReload}>
                        Live Reload
                        {!this.state.liveReload
                            ? ""
                            : <CheckCircleSharpIcon style={{color:"darkgreen",fontSize:19}}/>
                        }
                        

                    </button>

                    <div><Save style={{ fontSize: 41 ,color:this.state.mode?"black":"#e0e0e0" ,marginLeft:10}} onClick={this.onSave} /></div>
                    <div><Brightness6Icon style={{ fontSize: 41 ,color:this.state.mode?"black":"#e0e0e0",marginLeft:10}} onClick={this.onNight}/>
                    {/* <div><CachedIcon style={{ fontSize: 41 ,color:this.state.mode?"black":"#e0e0e0",marginLeft:10}} onClick={()=>this.setState({content:""})}/></div> */}
                    {/* <box-icon type='solid' name='save' style={{ fontSize: 41 ,color:this.state.mode?"black":"#e0e0e0"}} onClick={this.onNight}></box-icon> */}

                    </div>
                </div>
                <AceEditor
                    style={{ borderRadius:5,width: "100%", height:window.screen.width>500?window.screen.height:window.screen.height/2-50}}
                    mode="javascript"
                    theme={this.state.mode?"github":"monokai"}
                    onChange={this.onChange}
                    value={this.state.content}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}
                    setOptions={{
                        enableBasicAutocompletion: true
                    }}
                />
            </div>
        );
    }
}

export default Editor;