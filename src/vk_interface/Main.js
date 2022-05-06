import React from 'react';
import ReactDOM from 'react-dom';
import VTelegramAuthForm from './VTelegramAuthForm';
import VTSettingsForm from './VTSettingsForm';
import VTStartImportForm from './VTStartImportForm';

//const Emitter = require('./event-emitter').default;
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

//         this._formInsertionPromise = fetch(chrome.runtime.getURL('./html/main-form.html'))
//             .then(response => {
//                 return response.text()
//             })
//             .then(() => {
//                 this._telegramAuth = require('./telegram-auth').default;
//
//                 Emitter.subscribe('event:auth-completed', data => {
//                     this.hideBody();
//                     this._settings.show();
//                 });
//


//                 this._settings = require('./settings').default;
//                 Emitter.subscribe('event:settings-completed', data => {
//                     this.hideBody();
//                     this._peopleImport.show();
//                 });
// 
//                 this._peopleImport = require('./people-import').default;
//                 Emitter.subscribe('event:people-import-completed', data => {
//                     this.hideBody();
//                     this._startImport.show();
//                 });
//                 Emitter.subscribe('event:people-import-back', data => {
//                     this.hideBody();
//                     this._settings.show();
//                 });
// 
//                 //Начинаем экспорт, а затем импорт
//                 this._startImport = require('./start-import').default;
//                 Emitter.subscribe('event:start-import', async data => {
//                     this.close();
//                     ExportLib.startExport();
//                     //!!!!! здесь импорт
//                     await TgLib.startImport(Settings.gChat, ExportLib.gImportedData.text);
//                 });
//                 Emitter.subscribe('event:start-import-back', data => {
//                     this.hideBody();
//                     this._peopleImport.show();
//                 });
// 
//                 Emitter.subscribe('event:telegram-exit', data => {
//                     this.hideBody();
//                     this._telegramAuth.clean();
//                     this._settings.clean();
//                     this._peopleImport.clean();
//                     this._startImport.clean();
//                     this._telegramAuth.show();
//                 });
//            });
    }

    show() {
        //const result = await TgLib.isAuthorized();
        //console.log(result);

        //if (!result)
            //this.authRef.current.show();
            console.log('show');
            this.startImportRef.current.show();
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
