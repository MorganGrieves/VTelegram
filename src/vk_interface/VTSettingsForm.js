import React from 'react';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import {Link, TooltipTag, Button, P, Line, Header, Gray, PromoCard, FormLayout, Input, Textarea, Box, ModalDialog, DropDown, DatePicker } from "@happysanta/vk-app-ui";

class VTSettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { popup: false,
            selected: []
        };
    }

    render() {
        return (
            <div>
            <Button onClick={ () =>  this.setState({popup:!this.state.popup})}>Open page</Button>
            {this.state &&  this.state.popup ?
            <ModalDialog confirmText="Далее" footerLeft={<Button mode="destructive" rel="noopener noreferrer" target="_blank">Выйти из Телеграм</Button>}  onClose={ ()=> this.setState({popup:false})} onConfirm={()=>this.setState({popup:false})} header="Настройки ВТелеграм" style={{padding: 0 }}>
            <div className="vtelegram_box">
                <div id="vtelegram_settings_result" className="vtelegram_settings_result"></div>
                <div className="vtelegram_settings_panel vtelegram_clear_fix" >
                    <div className="vtelegram_settings_line vtelegram_unfolded" id="vtelegram_chgaddr">
                        <Line className="vtelegram_settings_info_block">
                            <Gray id="vtelegram_settings_address_label" className="vtelegram_settings_label">Адрес беседы</Gray>
                            <div id="vtelegram_settings_address_text" className="vtelegram_settings_labeled_text"> 
                                <span id="vtelegram_settings_address_telegram" className="vtelegram_settings_text_grey"></span>Адрес не введен
                                <TooltipTag>Введите ссылку на беседу в Телеграм, куда требуется импортировать сообщения.<br />Если ссылка не будет введена, беседа будет создана автоматически.</TooltipTag>
                            </div>
                            <Link id="vtelegram_settings_change_button" className="vtelegram_settings_right_control" href="#" target="_blank">Изменить</Link>
                        </Line>
{/*<div class="vtelegram_settings_change_block">
                    <div id="vtelegram_settings_error_addr"></div>
                    <div class="vtelegram_settings_row vtelegram_clear_fix">
                        <div class="vtelegram_settings_label">Адрес беседы</div>
                        <a id="vtelegram_settings_cancel_button" class="vtelegram_settings_right_control" tabindex="0" role="link">Отмена</a>
                        <div class="vtelegram_settings_labeled">
                            <div class="vtelegram_prefix_input_wrap" id="vtelegram_settings_addr_wrap">
                                <div class="vtelegram_prefix_input_field">
                                    <input id="vtelegram_settings_addr" type="text" class="vtelegram_prefix_input" maxlength="38" value="" autocomplete="off" placeholder="https://t.me/XXXXXXXXXXXXXXXX" style="padding-left: 9px;">
                                    <div class="prefix_input_border"></div>
                                </div>
                            </div>
                            <div class="vtelegram_settings_row_hint">Если ссылка <b>не будет введена</b>, беседа будет <b>создана автоматически.</b></div>
                            <div class="vtelegram_settings_row_hint">Как&nbsp;взять адрес, читайте <a href="https://rg-gaming.ru/kompjutery/kak-v-telegramme-skopirovat-ssylku-na-chat" target="_blank">здесь</a>.</div>
                        </div>
                    </div>
                    <div class="vtelegram_settings_row_button_wrap">
                        <button id="vtelegram_settings_address_submit" class="vtelegram_flat_button vtelegram_button_disabled">Изменить адрес</button>
                    </div>
                </div>*/}
                
                
                        <div className="vtelegram_settings_change_block">
                            <div id="vtelegram_settings_error_addr"></div>
                            <div className="vtelegram_settings_row vtelegram_clear_fix">
                                <Gray className="vtelegram_settings_label">Адрес беседы</Gray>
                                <Link id="vtelegram_settings_cancel_button" href="#" target="_blank" className="vtelegram_settings_right_control">
                                    Отмена
                                </Link>
                                <div className="vtelegram_settings_labeled">
                                    <div className="vtelegram_prefix_input_wrap" id="vtelegram_settings_addr_wrap">
                                        <div className="vtelegram_prefix_input_field">
                                            <Input id="vtelegram_settings_addr" className="vtelegram_prefix_input" maxlength="38" placeholder="https://t.me/XXXXXXXXXXXXXXXX" style={{ paddingLeft: '9px'}} />
                                        </div>
                                    </div>
                                    <div className="vtelegram_settings_row_hint">Если ссылка <b>не будет введена</b>, беседа будет <b>создана автоматически.</b></div>
                                    <div className="vtelegram_settings_row_hint">Как&nbsp;взять адрес, читайте <a href="#" target="_blank">здесь</a>.</div>
                                </div>
                            </div>
                            <div className="vtelegram_settings_row_button_wrap">
                                <Button id="vtelegram_settings_address_submit">Изменить адрес</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </ModalDialog> : null}
            </div>
        );
    }
}

export default VTSettingsForm;
