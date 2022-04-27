import React from 'react';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import {Link, TooltipTag, Button, P, Line, Header, Gray, PromoCard, FormLayout, Input, Textarea, Box, ModalDialog, DropDown, DatePicker } from "@happysanta/vk-app-ui";

class VTStartImportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            selected: []
        };
    }

    render() {
        return (
            <div>
            <Button onClick={ () =>  this.setState({popup:!this.state.popup})}>Open page</Button>
            {this.state &&  this.state.popup ?
            <ModalDialog confirmText="Импортировать" cancelText="Назад" footerLeft={<Button id="vtelegram_start_import_exit_telegram_button" mode="destructive" target="_blank">Выйти из Телеграм</Button>}  onClose={ ()=> this.setState({popup:false})} onConfirm={()=>this.setState({popup:false})} header="Импорт ВТелеграм" style={{padding: 0 }}>
                <div className="vtelegram_box" id="vtelegram_import_start_form">
                    <div className="vtelegram_box_body" style={{display: 'block', padding: '30px 25px'}}>
                        <div id="vtelegram_validation_box">
                            <div className="vtelegram_import_start_img"></div>
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
