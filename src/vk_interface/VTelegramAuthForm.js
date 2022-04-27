import React, { useState } from 'react';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import './style.css';
import {Link, Red, Button, P, PageDialog, Input, ModalDialog, Gray} from "@happysanta/vk-app-ui";

class VTelegramAuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            selected: []
        }
    }

    render() {
        return (
            <div>
{/*            <Button onClick={ () =>  this.setState({popup:!this.state.popup})}>Open page</Button>*/}
            {this.state &&  this.state.popup ?
            <PageDialog onClose={ () => this.setState({popup:false})} header="Авторизация ВТелеграм">
                <div className="vtelegram_box">
                    <div className="vtelegram_validation_img" />
                    <div className="vtelegram_validation_text">
                        <P>
                            Для доступа к аккаунту Телеграм требуется ввести <b>номер телефона</b>.<br /> Это позволит импортировать переписку. <br />
                            <Red>Слишком частые авторизации могут вызвать блокировку аккаунта на день!</Red>
                        </P>
                    </div>
                    <div className="vtelegram_validation_form">
                        <div id="vtelegram_validation_phone_row" className="vtelegram_validation_row">
                            <div id="vtelegram_validation_phone_wrap">
                                <Input placeholder="Номер телефона" wide={true} id="vtelegram_validation_phone"/>
                            </div>
                        </div>
                        <div id="vtelegram_validation_phone_submit" className="vtelegram_validation_submit_row">
                            <Button mode="primary" wide={true} bottom={true} id="vtelegram_validation_send_phone">Получить код</Button>
                        </div>
                        <P>
                            <Link id="vtelegram_validation_other_phone" href="https://vk.com" className="vtelegram_validation_other_phone" target="_blank">
                                Указать другой номер
                            </Link>
                        </P>

                        <div id="vtelegram_validation_code_row" className="vtelegram_validation_row" /*style="display: none"*/>
                            <div id="vtelegram_validation_code_wrap">
                                <Input placeholder="Код подтверждения" wide={true} id="vtelegram_validation_phone"/>
                            </div>
                        </div>
                        <div id="vtelegram_validation_code_submit" className="vtelegram_validation_submit_row">
                            <Button mode="primary" wide={true} bottom={true} id="vtelegram_validation_send_code">Отправить код</Button>
                        </div>
                        <P>
                            <Gray id="vtelegram_validation_resend" className="vtelegram_validation_no_code">
                                Отправить код через 10
                            </Gray>
                        </P>

                        <div id="vtelegram_validation_password_row" className="vtelegram_validation_row" /*style="display: none"*/>
                            <div id="vtelegram_validation_password_wrap">
                                <Input placeholder="Пароль 2FA" wide={true} id="vtelegram_validation_password"/>
                            </div>
                        </div>
                        <div id="vtelegram_validation_password_submit" className="vtelegram_validation_submit_row" /*style="display: none"*/>
                            <Button mode="primary" wide={true} bottom={true} id="vtelegram_validation_send_password">Отправить пароль</Button>
                        </div>
                    </div>
                </div>
            </PageDialog> : null}
            </div>
        );
    }
}

export default VTelegramAuthForm;
