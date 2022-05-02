import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import './style.css';
import {Link, Red, Button, P, PageDialog, Input, ModalDialog, Gray, Notify} from "@happysanta/vk-app-ui";
import ResendCountDownTimer from './ResendCountDownTimer';

//const TgLib = require('../tg-lib');
const Errors = require('../constants').errors;

class VTelegramAuthForm extends React.Component {
    phoneInput = React.createRef();
    codeInput = React.createRef();
    passwordInput = React.createRef();

    errorElem = React.createRef();

    resendTimer = React.createRef();

    floodTime = '';

    constructor(props) {
        super(props);
        this.state = {
            popup: false,

            phoneInputDisabled: false,
            sendPhoneButtonDisabled: false,
            sendPhoneButtonShowed: true,
            otherPhoneShowed: false,

            codeBlockShowed: false,
            codeInputDisabled: false,
            sendCodeButtonDisabled: false,
            resendCodeShowed: false,

            passwordBlockShowed: false,
            passwordInputDisabled: false,
            sendPasswordButtonDisabled: false,

            errorShowed: false
        }
    }

    sendPhoneHandle = async event => {
        let phone = this.phoneInput.current.value;
        this.setState({ sendPhoneButtonDisabled: true });
        let error = await this.sendPhone(phone);

        if (error === Errors.NO_ERROR) {
            this.setState({
                phoneInputDisabled: true,
                sendPhoneButtonShowed: true,
                codeBlockShowed: true,
                otherPhoneShowed: true,
                resendCodeShowed: true,
                errorShowed: false
            });

            //this.codeInput.current.focus();
            this.resendTimer.current.startTimer();
        } else {
            this.setState({ sendPhoneButtonDisabled: false });
            this.errorHandler(error);
        }
    }

    sendCodeHandle = async event => {
        let code = this.codeInput.current.value;
        this.setState({ sendCodeButtonDisabled: true });
        let error = await this.sendCode(code);

        if (error === Errors.NO_ERROR) {
            this.resendTimer.current.stopTimer();
            this.setState({
                codeInputDisabled: true,
                sendCodeButtonDisabled: true,
                resendCodeShowed: false,

                passwordBlockShowed: true,
                passwordInputDisabled: false,
                sendPasswordButtonDisabled: false,

                errorShowed: false
            });
            //Emitter.emit('event:auth-completed', {});
        } else {
            this.setState({ sendCodeButtonDisabled: false });
            this.errorHandler(error);
        }
    }

    sendPasswordHandle = async event => {
        let password = this.passwordInput.current.value;
        this.setState({ sendPasswordButtonDisabled: true });
        let error = await this.sendPassword(password);

        if (error === Errors.NO_ERROR) {
            this.resetForm();

            //Emitter.emit('event:auth-completed', {});
        } else {
            this.setState({ sendCodeButtonDisabled: false });
            this.errorHandler(error);
        }
    }

    otherPhoneHandle = async event => {
        this.resetForm();
    }

    timerOverClickHandle = async event => {
        console.log('click timer');
        this.resendTimer.current.startTimer();
    }

    show() {
        this.setState({popup: true });
    }

    hide() {
        this.setState({popup: false });
    }

    resetForm() {
        this.phoneInput.current.value = "";
        this.codeInput.current !== null ? this.codeInput.current.value = "" : null;
        this.passwordInput.current !== null ? this.passwordInput.current.value = "" : null;

        this.setState({
            phoneInputDisabled: false,
            sendPhoneButtonDisabled: false,
            sendPhoneButtonShowed: true,
            otherPhoneShowed: false,

            codeBlockShowed: false,
            codeInputDisabled: false,
            sendCodeButtonDisabled: false,

            passwordBlockShowed: false,
            passwordInputDisabled: false,
            sendPasswordButtonDisabled: false,

            errorShowed: false
        });

    }

    async sendPhone(phone) {
//         if (!(/^(\s*)?(\+)?\d{1,3}[ ]?[- ()]?\d{3}[- ()]?([- ]?\d){6,12}(\s*)?$/.test(phone)))
//             return Errors.PHONE_FORMAT_ERROR;
// 
//         const result = await TgLib.getCodeByPhone(phone)
//         console.log(result)
//         if (result.state === 'err') {
//             if (result.data === Errors.FLOOD_WAIT)
//                 this.gFloodTime = result.time;
//             return result.data;
//         }
//         this.gPhone = phone;
//         this.gPhoneCodeHash = result.data;
        return Errors.NO_ERROR;
    }

    async sendCode(code) {
//         if (!(/^[0-9]+$/.test(code)))
//             return Errors.PHONE_FORMAT_ERROR;
// 
//         const result = await TgLib.authByCode(code, this.gPhone, this.gPhoneCodeHash);
//         if (result.state === 'err')
//             return result.data;

        return Errors.NO_ERROR;
    }

    async sendPassword(password) {
        //const result = await TgLib.authByPass(password)
        //if (result.state === 'err')
        //    return result.data;

        return Errors.NO_ERROR;
    }

    renderError(text) {
        return <Notify type="error">
            { text }
            </Notify>;
    }

    render() {
        return (
            <div>
            {this.state &&  this.state.popup ?
            <PageDialog onClose={ () => this.setState({popup:false})} header="Авторизация ВТелеграм">
                <div className="vtelegram_box">
                    <div className="vtelegram_validation_img" />
                    <div ref={ this.errorElem } ></div>
                    <div className="vtelegram_validation_text">
                        <P>
                            Для доступа к аккаунту Телеграм требуется ввести <b>номер телефона</b>.<br /> Это позволит импортировать переписку. <br />
                            <Red>Слишком частые авторизации могут вызвать блокировку аккаунта на день!</Red>
                        </P>
                    </div>
                    <div className="vtelegram_validation_form">
                        <div className="vtelegram_validation_row">
                            <Input placeholder="Номер телефона" wide={true} disabled={ this.state.phoneInputDisabled } ref={ this.phoneInput }/>
                        </div>

                        { this.state && this.state.sendPhoneButtonShowed ?
                            <div className="vtelegram_validation_submit_row">
                                <Button mode="primary" disabled={ this.state.sendPhoneButtonDisabled } wide={true} bottom={true} onClick={ this.sendPhoneHandle }>Получить код</Button>
                            </div> : null
                        }
                        { this.state && this.state.otherPhoneShowed ?
                            <P>
                                <Link onClick={ this.otherPhoneHandle } component="a" className="vtelegram_validation_other_phone">
                                    Указать другой номер
                                </Link>
                            </P> : null
                        }

                        { this.state && this.state.codeBlockShowed ?
                            <div>
                                <div className="vtelegram_validation_row">
                                    <Input disabled={ this.state.codeInputDisabled } placeholder="Код подтверждения" wide={true} ref={ this.codeInput }  />
                                </div>
                                <div className="vtelegram_validation_submit_row">
                                    <Button disabled={ this.state.sendCodeButtonDisabled } onClick={ this.sendCodeHandle } mode="primary" wide={true} bottom={true}>Отправить код</Button>
                                </div>
                                { this.state && this.state.resendCodeShowed ?
                                    <P>
                                        <ResendCountDownTimer ref={ this.resendTimer } seconds={ 10 } onOver={ this.timerOverClickHandle } />
                                    </P> : null
                                }
                            </div> : null
                        }

                        { this.state && this.state.passwordBlockShowed ?
                            <div>
                                <div className="vtelegram_validation_row">
                                    <Input disabled={ this.state.passwordInputDisabled } placeholder="Пароль 2FA" wide={true} ref={ this.passwordInput }/>
                                </div>
                                <div className="vtelegram_validation_submit_row">
                                    <Button mode="primary" onClick={ this.sendPasswordHandle } disabled={ this.state.sendPasswordButtonDisabled } wide={true} bottom={true}>Отправить пароль</Button>
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
            </PageDialog> : null}
            </div>
        );
    }

    errorHandler(error) {
        switch (error) {
            case Errors.NO_ERROR:
                console.log('VTelegram: все хорошо, жизнь продолжается :)');
                break;

            case Errors.PHONE_FORMAT_ERROR:
                ReactDOM.render(this.renderError(<div><b>Ошибка формата номера телефона</b>.<br />Введите номер <b>в международном формате</b> без лишних символов. Например: +7 921 0000007</div>), this.errorElem.current);
                break;

            case Errors.PHONE_NUMBER_FLOOD:
                ReactDOM.render(this.renderError(<div><b>Превышено количество попыток получения кода</b>.<br />Вы выполняли этот запрос слишком часто. Пожалуйста, попробуйте позже</div>), this.errorElem.current);
                break;

            case Errors.PHONE_PASSWORD_FLOOD:
                ReactDOM.render(this.renderError(<div><b>Превышено количество попыток входа для телефона</b>.<br />Вы выполняли этот запрос слишком часто. Пожалуйста, попробуйте позже</div>), this.errorElem.current);
                break;

            case Errors.PHONE_NUMBER_INVALID:
                ReactDOM.render(this.renderError(<div><b>Ошибка идентификации пользователя по телефону</b>.<br />Возможно, номер введён некорректно или пользователя с таким номером не существует</div>), this.errorElem.current);
                break;

            case Errors.PHONE_NUMBER_UNOCCUPIED:
                ReactDOM.render(this.renderError(<div><b>Пользователя с таким номером не существутет</b>.<br />Проверьте корректность номера телефона, либо зарегистрируйтесь в Telegram</div>), this.errorElem.current);
                break;

            case Errors.PHONE_CODE_FORMAT_ERROR:
                ReactDOM.render(this.renderError(<div><b>Ошибка формата введённого кода</b>.<br />Удостоверьтесь в том, что не содержит каких-либо символов, кроме цифр</div>), this.errorElem.current);
                break;

            //Добавить resendCode???????????
            case Errors.PHONE_CODE_INVALID:
                ReactDOM.render(this.renderError(<div><b>Неправильный код</b>.<br />Проверьте корректность введённого кода или перезагрузите страницу, чтобы получить новый</div>), this.errorElem.current);
                break;

            //Добавить resendCode???????????
            case Errors.PHONE_CODE_EXPIRED:
                ReactDOM.render(this.renderError(<div><b>Истёк срок действия этого кода</b>.<br />Пожалуйста, перезагрузите страницу и введите новый код</div>), this.errorElem.current);
                break;

            case Errors.PASSWORD_HASH_INVALID:
                ReactDOM.render(this.renderError(<div><b>Неправильный пароль</b>.<br />Проверьте корректность введённых вами данных</div>), this.errorElem.current);
                break;

            case Errors.UNEXPECTED_ERROR:
                ReactDOM.render(this.renderError(<div><b>Упс... Что-то пошло не так!</b>.<br />Попробуйте перезагрузить страницу. Если проблема не решится – свяжитесь с разработчиками</div>), this.errorElem.current);
                break;

            case Errors.FLOOD_WAIT:
                ReactDOM.render(this.renderError(<div><b>Лимит запросов исчерпан</b>.<br />Повторите запрос через {this.floodTime}</div>), this.errorElem.current);
                break;

            case Errors.SESSION_PASSWORD_NEEDED:
                this.setState({
                    codeInputDisabled: true,
                    sendCodeButtonDisabled: true,
                    passwordBlockShowed: true
                });
                //this.passwordInput.current.focus();
                ReactDOM.render(this.renderError(<div><b>Ошибка авторизации</b>.<br />Аккаунт защищен двухфакторной авторизацией. Введите пароль.</div>), this.errorElem.current);
                break;

            default:
                throw new Error('No handlers occurred.');
        }
    }
}

export default VTelegramAuthForm;
