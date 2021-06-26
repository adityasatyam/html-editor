import React, { Component } from 'react';
import Display from './Display';
import Editor from './Editor';
class Home extends Component {
    state = {
        content:"",
        mode:true
    }
    editorContentSetter=(content)=>{
        this.setState({content:content})
        console.log(window.screen.width)
    }
    onModeSwitch=()=>{
        this.setState({mode:!this.state.mode})
    }

    
    render() {
        return (
            <div 
                className="row"
                style={{
                    
                    backgroundColor:this.state.mode?"#e6e8e7":"#241616"

                }}>
                <div className="col-sm-6">
                <Editor                 
                setContent={this.editorContentSetter}
                nightMode={this.onModeSwitch}
                />
                </div>
                <div className="col-sm-6">
                <Display style={{backgroundColor:"#2e2e2e"}} 
                content={this.state.content}
                night={this.state.mod}
                />
                </div>
            </div>);
    }
}

export default Home;