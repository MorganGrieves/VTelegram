import React from 'react';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import {Button, P, ModalDialog } from "@happysanta/vk-app-ui";

class VTStartImportForm extends React.Component {
    chanGif = chrome.extension.getURL('images/chan.gif');

    constructor(props) {
        super(props);
        this.state = {
            popup: false
        };
    }

    importButtonClickHandle = (event) => {

    }

    cancelButtonClickHandle = (event) => {

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
            <ModalDialog confirmText="Импортировать" cancelText="Назад" footerLeft={<Button mode="destructive" target="_blank">Выйти из Телеграм</Button>}  onClose={ () => this.setState({popup: false }) } onConfirm={ this.importButtonClickHandle } header="Импорт ВТелеграм" style={{padding: 0 }}>
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
