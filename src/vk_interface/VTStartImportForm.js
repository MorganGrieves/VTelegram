import React from 'react';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import {Button, P, ModalDialog } from "@happysanta/vk-app-ui";

const Emitter = require('./EventEmitter').default;

class VTStartImportForm extends React.Component {
    chanGif = chrome.extension.getURL('images/chan.gif');

    constructor(props) {
        super(props);
        this.state = {
            popup: false
        };
    }

    importButtonClickHandle = (event) => {
        Emitter.emit('event:start-import', {});
    }

    backButtonClickHandle = (event) => {
        Emitter.emit('event:start-import-back', {});
    }

    telegramExitButtonClickHandle = (event) => {
        Emitter.emit('event:telegram-exit', {});
    }

    show() {
        this.setState({popup: true });
    }

    hide() {
        this.setState({popup: false });
    }

    render() {
        return (
            <div>
            {this.state &&  this.state.popup ?
            <ModalDialog footer={ <div className="vtelegram_dialog_footer">
            <div><Button mode="destructive" target="_blank" onClick={ this.telegramExitButtonClickHandle }>Выйти из Телеграм</Button></div>
            <div>
                <Button mode="secondary" target="_blank" onClick={ this.backButtonClickHandle } style={{ margineRight: '8px' }}>Назад</Button>
                <Button mode="primary" target="_blank" onClick={ this.importButtonClickHandle } >Импортировать</Button>
            </div>
        </div> } onClose={ () => this.setState({popup: false }) } header="Импорт ВТелеграм" style={{padding: 0 }}>
                <div className="vtelegram_box">
                    <div className="vtelegram_box_body" style={{display: 'block', padding: '30px 25px'}}>
                        <div>
                            <img src={ this.chanGif } className="vtelegram_import_start_img" />
                            <P className="vtelegram_validation_text">Для импортирования диалога в Телеграм все подготовлено.<br /> <b>Не закрывайте браузер после начала импорта!</b></P>
                        </div>
                    </div>
                </div>
            </ModalDialog> : null}
            </div>
        );
    }
}
export default VTStartImportForm;
