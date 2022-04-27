import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import VTelegramAuthForm from './VTelegramAuthForm';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import {Button} from "@happysanta/vk-app-ui";

class ExportButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        };
        console.log('button initialized');
    }

    render() {
        return (<Button wide={true} onClick={ this.exportButtonHandle() } top={true} id="ui_rmenu_export_vt_button">Экспортировать в Телеграм</Button>);
    }

    exportButtonHandle() {
//         const app = document.createElement('div');
//         document.body.appendChild(app);
//         ReactDOM.render(<VTelegramAuthForm />, app);
    }
}

export default ExportButton;
