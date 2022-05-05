import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import {Link, TooltipTag, Button, P, Line, Gray, Input, ModalDialog, Notify } from "@happysanta/vk-app-ui";

const Constants = require('../constants');
const Errors = Constants.errors;

class VTSettingsForm extends React.Component {
    addressBlock = React.createRef();
    addressSpan = React.createRef();
    tgChatCodeSpan = React.createRef();

    errorAddrElem = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            popup: false,

            addrErrorShowed: false,
            changeButtonLoading: false,
            addrInputValue: '',
            currentCode: 'Адрес не введен'
        };
    }

    changeButtonClickHandle = async (event) => {
        this.setState({ changeButtonLoading: true });
        let convCode = this.state.addrInputValue.slice(Constants.TELEGRAM_CNV_PATH.length, this.state.addrInputValue.length);
        console.log(convCode);
        let err = await this.sendConvAddress(this.state.addrInputValue);

        this.setState({ changeButtonLoading: false });
        if (err === Errors.NO_ERROR) {
            this.errorAddrElem.current.style.display = 'none';
            this.addressSpan.current.innerText = Constants.TELEGRAM_CNV_PATH;
            //this.tgChatCodeSpan.current.textContent = this.state.currentCode;
            this.setState({ currentCode: convCode });
            this.addressBlock.current.classList.remove('vtelegram_unfolded');
            //parent click handle
        } else {
            this.errorAddrHandle(err);
        }
    }

    cancelAddrButtonHandle = (event) => {
//         if (this.state.currentCode.length === 0) {
//             this.addressSpan.current.innerText = '';
//             this.tgChatCodeSpan.current.textContent = 'Адрес не введен';
//             this.setState({ addrInputValue: '' });
//         } else {
//             this.addressSpan.current.innerText = Constants.TELEGRAM_CNV_PATH;
//             this.tgChatCodeSpan.current.textContent = this.state.currentCode;
//         }

        this.addressBlock.current.classList.remove('vtelegram_unfolded');
    }

    exitTelegramClickHandle = async (event) => {
//         await TgLib.logOut()
//         Emitter.emit('event:telegram-exit', {});
    }

    changeLinkClickHandle = async (event) => {
        this.setState( { currentCode: this.state.addrInputValue.slice(Constants.TELEGRAM_CNV_PATH.length, this.state.addrInputValue.length) });
        this.addressBlock.current.classList.add('vtelegram_unfolded');
    }

    addrInputValueChangeHandle = (event) => {
        const val = event.target.value;
        this.setState({
            addrInputValue: val
        });
    }

    async sendConvAddress(link) {
        if (link.length === 0)
            return Errors.EMPTY_VALUE;

//         const result = await TgLib.getChatByInvitationLink(link)
//         if (result.state === 'err') {
//             return result.data;
//         }
//         this.gChat = result.data;
        return Errors.NO_ERROR;
    }

    show() {
        this.setState({popup: true });
    }

    hide() {
        this.setState({popup: false });
    }

    resetForm() {

    }

    render() {
        return (
            <div>
            {this.state &&  this.state.popup ?
            <ModalDialog confirmText="Далее" padding={false} footerLeft={<Button onClick={ this.exitTelegramClickHandle } mode="destructive" rel="noopener noreferrer" target="_blank">Выйти из Телеграм</Button>}  onClose={ () => this.setState({popup:false})} onConfirm={()=>this.setState({popup:false})} header="Настройки ВТелеграм" style={{padding: 0 }}>
            <div className="vtelegram_box">
                <div className="vtelegram_settings_result"></div>
                <div className="vtelegram_settings_panel vtelegram_clear_fix" >
                    <div ref={ this.addressBlock } className="vtelegram_settings_line">
                        <Line className="vtelegram_settings_info_block">
                            <Gray className="vtelegram_settings_label">Адрес беседы</Gray>
                            <div className="vtelegram_settings_labeled_text"> 
                                <span ref={ this.addressSpan } className="vtelegram_settings_text_grey"></span><span ref={ this.tgChatCodeSpan }>{ this.state.currentCode }</span>
                                <TooltipTag>Введите ссылку на беседу в Телеграм, куда требуется импортировать сообщения.<br />Если ссылка не будет введена, беседа будет создана автоматически.</TooltipTag>
                            </div>
                            <Link onClick={ this.changeLinkClickHandle } className="vtelegram_settings_right_control">Изменить</Link>
                        </Line>
                        <div className="vtelegram_settings_change_block">
                            <div ref={ this.errorAddrElem }></div>
                            <div className="vtelegram_settings_row vtelegram_clear_fix">
                                <Gray className="vtelegram_settings_label">Адрес беседы</Gray>
                                <Link onClick={ this.cancelAddrButtonHandle } className="vtelegram_settings_right_control">
                                    Отмена
                                </Link>
                                <div className="vtelegram_settings_labeled">
                                    <div className="vtelegram_prefix_input_wrap">
                                        <div className="vtelegram_prefix_input_field">
                                            <Input value={ this.state.addrInputValue } onChange={ this.addrInputValueChangeHandle } className="vtelegram_prefix_input" maxlength="38" placeholder="https://t.me/XXXXXXXXXXXXXXXX" style={{ paddingLeft: '9px'}} />
                                        </div>
                                    </div>
                                    <div className="vtelegram_settings_row_hint">Если ссылка <b>не будет введена</b>, беседа будет <b>создана автоматически.</b></div>
                                    <div className="vtelegram_settings_row_hint">Как&nbsp;взять адрес, читайте <a href="#" target="_blank">здесь</a>.</div>
                                </div>
                            </div>
                            <div className="vtelegram_settings_row_button_wrap">
                                <Button loading={ this.state.changeButtonLoading } onClick={ this.changeButtonClickHandle }>Изменить адрес</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </ModalDialog> : null}
            </div>
        );
    }

    renderError(text) {
        return <Notify type="error" className='vtelegram_settings_address_error'>
            { text }
            </Notify>;
    }

    errorAddrHandle(err) {
        switch (err) {
            case Errors.EMPTY_VALUE:
                ReactDOM.render(this.renderError(<React.Fragment><b>Поле пустое.</b> Введите код беседы или нажмите Отмена.</React.Fragment>), this.errorAddrElem.current);
                break;

            case Errors.INVITE_HASH_INVALID:
                ReactDOM.render(this.renderError(<React.Fragment><b>Ошибка инвайт-линка.</b> Чат не существует, либо ссылка не верна.</React.Fragment>), this.errorAddrElem.current);
                break;

            case Errors.INVITE_HASH_EXPIRED:
                ReactDOM.render(this.renderError(<React.Fragment><b>Ссылка истекла.</b> Введите новую ссылку.</React.Fragment>), this.errorAddrElem.current);
                break;

            case Errors.INVITE_HASH_EMPTY:
                ReactDOM.render(this.renderError(<React.Fragment><b>Ошибка формата.</b> Ссылка должна содержать в себе tg.me/.</React.Fragment>), this.errorAddrElem.current);
                break;

            case Errors.UNEXPECTED_ERROR:
                ReactDOM.render(this.renderError(<React.Fragment><b>Упс... Что-то пошло не так!</b> Неизвестная ошибка.</React.Fragment>), this.errorAddrElem.current);
                break;

            case Errors.NO_ERROR:
                console.log("Все хорошо, жизнь продолжается :)");
                return;

            default:
                throw new Error('No handler occured');
        }

        this.errorAddrElem.current.style.display = 'block';
    }
}

export default VTSettingsForm;
