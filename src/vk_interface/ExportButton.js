import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';

import '@happysanta/vk-app-ui/dist/vkappui.css';
import {Button} from "@happysanta/vk-app-ui";

class ExportButton extends React.Component{
    mainRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        };

        console.log('button initialized');
    }

    render() {
        return (<div>
        <Main ref={ this.mainRef }  /><Button wide={true} onClick={ () => this.mainRef.current.show() } top={true} id="ui_rmenu_export_vt_button">Экспортировать в Телеграм</Button></div>);
    }
}

export default ExportButton;
