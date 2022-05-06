import React from 'react';
import ReactDOM from 'react-dom';
import VTelegramAuthForm from './VTelegramAuthForm';
import VTSettingsForm from './VTSettingsForm';
import VTStartImportForm from './VTStartImportForm';

const Emitter = require('./EventEmitter').default;
const Errors = require('./../constants').errors;
// const TgLib = require('./../tg-lib');
// const ExportLib = require('./../export/export-lib');

class Main extends React.Component {
    authRef = React.createRef();
    settingsRef = React.createRef();
    startImportRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            tgChat: null
        };

        const authContainer = document.createElement('div');
        document.body.appendChild(authContainer);
        ReactDOM.render(<VTelegramAuthForm ref={ this.authRef } />, authContainer);

        const settingsContainer = document.createElement('div');
        document.body.appendChild(settingsContainer);
        ReactDOM.render(<VTSettingsForm ref={ this.settingsRef } />, settingsContainer);

        const startImportContainer = document.createElement('div');
        document.body.appendChild(startImportContainer);
        ReactDOM.render(<VTStartImportForm ref={ this.startImportRef } />, startImportContainer);

        Emitter.subscribe('event:auth-completed', data => {
            this.authRef.current.hide();
            this.settingsRef.current.show();
        });

        Emitter.subscribe('event:settings-completed', data => {
            this.settingsRef.current.hide();
            this.startImportRef.current.show();
        });

        Emitter.subscribe('event:start-import', async data => {
            this.startImportRef.current.hide();
            //ExportLib.startExport();
            //!!!!! здесь импорт
            //await TgLib.startImport(Settings.gChat, ExportLib.gImportedData.text);
        });

        Emitter.subscribe('event:start-import-back', data => {
            this.startImportRef.current.hide();
            this.settingsRef.current.show();
        });

        Emitter.subscribe('event:telegram-exit', data => {
//             this.hideBody();
//             this._telegramAuth.clean();
//             this._settings.clean();
//             this._peopleImport.clean();
//             this._startImport.clean();
//             this._telegramAuth.show();
        });
    }

    show() {
        //const result = await TgLib.isAuthorized();
        //console.log(result);

        //if (!result)
            //this.authRef.current.show();
            this.authRef.current.show();
        //else
//            this.setState({ settingsOpen: true });
    }

    close() {

//                 let exportButton = document.getElementById('ui_rmenu_export_vt');
//                 this._telegramAuth.clean();
//                 this._settings.clean();
//                 this._peopleImport.clean();
//                 this._startImport.clean();

    }

    render() {
        return null;
    }
}


export default Main;
