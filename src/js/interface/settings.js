import {getChatByInvitationLink} from "../tg-lib";

const Emitter = require('./event-emitter').default;
const Constants = require('./../constants');
const TgLib = require('./../tg-lib');
const Errors = Constants.errors;

const settings = new Settings();
export default settings;

class Settings {
    _formInsertionPromise = undefined;
    _isCursorInsideIdd = false;
    gChat = null;

    videoImportType = Constants.EXPORT_MEDIA_NONE;
    imageImportType = Constants.EXPORT_MEDIA_NONE;
    docImportType = Constants.EXPORT_MEDIA_NONE;
   
    
    constructor() {
        this._formInsertionPromise = fetch(chrome.runtime.getURL('./src/html/settings-form.html'))
            .then(response => {
                return response.text()
            })
            .then(data => {
                let formDom = new DOMParser().parseFromString(data, 'text/html');

                //адрес беседы
                let currentCode = '';
                formDom.getElementById('vtelegram_settings_change_button').addEventListener('click',
                    (event) => {
                        let currentLink = document.getElementById('vtelegram_settings_addr').value;
                        currentCode = currentLink.slice(Constants.TELEGRAM_CNV_PATH.length, currentLink.length);
                        document.getElementById('vtelegram_chgaddr').classList.add('vtelegram_unfolded');
                    });

                formDom.getElementById('vtelegram_settings_addr').addEventListener('input',
                    (event) => {
                        if (event.target.value.length === 0)
                            document.getElementById('vtelegram_settings_address_submit').classList.add('vtelegram_button_disabled');
                        else
                            document.getElementById('vtelegram_settings_address_submit').classList.remove('vtelegram_button_disabled');
                    });
                
                formDom.getElementById('vtelegram_settings_cancel_button').addEventListener('click',
                    (event) => {
                        if (currentCode.length === 0) {
                            document.getElementById('vtelegram_settings_address_telegram').innerText = '';
                            document.getElementById('vtelegram_settings_address_telegram').nextSibling.textContent = 'Адрес не введен';
                            document.getElementById('vtelegram_settings_addr').value = '';
                        } else {
                            document.getElementById('vtelegram_settings_address_telegram').innerText = Constants.TELEGRAM_CNV_PATH;
                            document.getElementById('vtelegram_settings_address_telegram').nextSibling.textContent = currentCode;
                        }

                        document.getElementById('vtelegram_chgaddr').classList.remove('vtelegram_unfolded');
                    });

                formDom.getElementById('vtelegram_settings_address_submit').addEventListener('click', this.settingsAddressHandler);
                
                //чекбоксы с материалами
                formDom.getElementById('vtelegram_settings_check_video_label').addEventListener('click',
                    (event) => this.changeCheckboxSelection(document.getElementById('vtelegram_settings_check_video')));

                formDom.getElementById('vtelegram_settings_check_image_label').addEventListener('click',
                    (event) => this.changeCheckboxSelection(document.getElementById('vtelegram_settings_check_image')));

                formDom.getElementById('vtelegram_settings_check_doc_label').addEventListener('click',
                    (event) => this.changeCheckboxSelection(document.getElementById('vtelegram_settings_check_doc')));

                document.addEventListener('click', 
                    (event) => {
                        const iddPopups = document.getElementsByClassName("vtelegram_idd_popup");
                        for (let popup of iddPopups) {
                            let isClickInside = popup.contains(event.target);
                            if (!isClickInside)
                                popup.style.display = 'none';
                        }
                    }, true);
                
                formDom.getElementById('vtelegram_settings_next_button').addEventListener('click',
                    (event) => {
                        Emitter.emit('event:settings-completed', {});
                    });
                
                formDom.getElementById('vtelegram_settings_exit_telegram_button').addEventListener('click',
                    async (event) => {
                        await TgLib.logOut()
                        Emitter.emit('event:telegram-exit', {});
                    });
                
                document.getElementsByClassName('vtelegram_popup_box_container')[0].appendChild(formDom.body.firstElementChild);

                for (let item of document.querySelectorAll('.vtelegram_box .vtelegram_settings_narrow_row'))
                    this.setDropDownToElement(item);
            })
    }

    show() {
        this._formInsertionPromise
            .then(() => document.getElementById('vtelegram_settings_form').classList.remove('vtelegram_hidden'));
    }

    hide() {
        this._formInsertionPromise
            .then(() => document.getElementById('vtelegram_settings_form').classList.add('vtelegram_hidden'));
    }

    clean() {
        this._formInsertionPromise
            .then(() => {
                this.clearConvAddressErrorHTML();
                this.gChat = null;

                document.getElementById('vtelegram_settings_address_telegram').innerText = '';
                document.getElementById('vtelegram_settings_address_telegram').nextSibling.textContent = 'Адрес не введен';
                document.getElementById('vtelegram_settings_addr').value = '';
                document.getElementById('vtelegram_chgaddr').classList.remove('vtelegram_unfolded');

                for (let input of document.getElementsByClassName('vtelegram_blind_label'))
                    input.checked = 0;

                for (let elem of document.querySelectorAll('.vtelegram_box .vtelegram_settings_narrow_row')) {
                    elem.getElementsByClassName('vtelegram_idd_popup')[0].style.display = 'none';
                    elem.getElementsByClassName('vtelegram_idd_selected_value')[0].innerText = 'Прямой импорт';
                    elem.getElementsByClassName('vtelegram_idd_hl')[0].classList.remove('vtelegram_idd_hl');
                    elem.getElementsByClassName('default')[0].classList.add('vtelegram_idd_hl');
                    elem.getElementsByClassName('vtelegram_idd_header')[0].innerText = 'Прямой импорт';
                    elem.getElementsByClassName('vtelegram_idd_wrap')[0].classList.add('vtelegram_disabled');
                }
                
                this.videoImportType = Constants.EXPORT_MEDIA_NONE;
                this.imageImportType = Constants.EXPORT_MEDIA_NONE;
                this.docImportType = Constants.EXPORT_MEDIA_NONE;
            });
    }
    
    settingsAddressHandler = async (event) => {
        //!!!!! обработка ссылки на беседу телеграм
        let convLink = document.getElementById('vtelegram_settings_addr').value;
        let err = await this.sendConvAddress(convLink);

        if (err === Errors.NO_ERROR) {
            this.clearConvAddressErrorHTML();

            document.getElementById('vtelegram_settings_address_telegram').innerText = Constants.TELEGRAM_CNV_PATH;
            document.getElementById('vtelegram_settings_address_telegram').nextSibling.textContent = convCode;
            document.getElementById('vtelegram_chgaddr').classList.remove('vtelegram_unfolded');
        } else
            this.errorHandler(err);
    }

    setDropDownToElement(elem) {
        let selectedValue = elem.getElementsByClassName('vtelegram_idd_selected_value')[0];

        selectedValue.addEventListener('click',
            (event) => {
                let header = elem.getElementsByClassName('vtelegram_idd_header')[0];
                header.innerText = event.target.innerText;
                elem.getElementsByClassName('vtelegram_idd_popup')[0].style.display = 'block';
            });

        elem.getElementsByClassName('vtelegram_idd_header')[0].addEventListener('click',
            (event) => {
                elem.getElementsByClassName('vtelegram_idd_popup')[0].style.display = 'none';
            });

        for (let iddItem of elem.querySelectorAll('.vtelegram_idd_items_wrap .vtelegram_idd_item')) {
            iddItem.addEventListener('mouseenter',
                (event) => {
                    this._isCursorInsideIdd = true;
                    event.target.classList.add('vtelegram_idd_hover');
                });

            iddItem.addEventListener('mouseleave',
                (event) => {
                    this._isCursorInsideIdd = false;
                    event.target.classList.remove('vtelegram_idd_hover');
                });

            iddItem.addEventListener('click',
                (event) => {
                    for (let item of elem.getElementsByClassName('vtelegram_idd_popup'))
                        item.style.display = 'none';

                    let textValue = iddItem.getElementsByClassName('vtelegram_idd_item_name')[0].innerText;
                    
                    elem.getElementsByClassName('vtelegram_idd_selected_value')[0].innerText = textValue;
                    elem.getElementsByClassName('vtelegram_idd_popup')[0].style.display = 'none';
                    elem.getElementsByClassName('vtelegram_idd_hl')[0].classList.remove('vtelegram_idd_hl');
                    iddItem.classList.add('vtelegram_idd_hl');
                    
                    this.changeTypeImport(event.currentTarget);
                });
        }
    }

    convAddressErrorHTML(errorString) {
        document.getElementById('vtelegram_settings_error_addr').innerHTML = `<div class="msg error"><div class="msg_text">${errorString}</div></div>`;
    }

    clearConvAddressErrorHTML() {
        document.getElementById('vtelegram_settings_error_addr').innerHTML = '';
    }

    async sendConvAddress(link) {
        //!!!!!!!! здесь все отправляем и возвращаем ошибку
        if (link.length === 0)
            return Errors.EMPTY_VALUE;
        const result = await TgLib.getChatByInvitationLink(link)
        if (result.state === 'err') {
            return result.data;
        }
        this.gChat = result.data;

        return Errors.NO_ERROR;
    }

    changeCheckboxSelection(elem) {
        
        if (elem.checked) {
            let comboBox = document.querySelector('#' + elem.id + '~.vtelegram_idd_wrap');
            comboBox.getElementsByClassName('vtelegram_idd_popup')[0].style.display = 'none';
            comboBox.classList.add('vtelegram_disabled');
            
            let type = elem.id.slice(elem.id.lastIndexOf('_') + 1);
            this.setImportToNone(type);
            
            elem.checked = 0;
        } else {
            let comboBox = document.querySelector('#' + elem.id + '~.vtelegram_idd_wrap');
            comboBox.classList.remove('vtelegram_disabled');
            
            let selectedElem = comboBox.getElementsByClassName('vtelegram_idd_hl')[0];
            this.changeTypeImport(selectedElem);
            
            elem.checked = 1;
        }
    }
    
    setImportToNone(type) {
        switch (type) {
            case 'video':
                this.videoImportType = Constants.EXPORT_MEDIA_NONE;
                break;
            
            case 'image':
                this.imageImportType = Constants.EXPORT_MEDIA_NONE;
                break;
                
            case 'doc':
                this.docImportType = Constants.EXPORT_MEDIA_NONE;
                break;
                
            default:
                throw new Error('VTelegram error: setImportToNone: No handler occured for type: ' + type);
                
        }
    }
    
    changeTypeImport(elem) {
        
        let erasedElem = elem.id.substr(elem.id.indexOf('_') + 1, elem.id.length);
        let fileType = erasedElem.substr(0, erasedElem.indexOf('_'));
        let importType = erasedElem.substr(erasedElem.indexOf('_') + 1, erasedElem.length);

        switch (fileType) {
            case 'video':
                this.videoImportType = this.strToImportType(importType);
                break;
            
            case 'image':
                this.imageImportType = this.strToImportType(importType);
                break;
                
            case 'doc':
                this.docImportType = this.strToImportType(importType);
                break;
                
            default:
                throw new Error('VTelegram error: changeTypeImport: No handler occured for file type: ' + fileType);
                
        }
    }

    strToImportType(str) {
        switch (str) {
            case 'idd_item_drive_links':
                return Constants.EXPORT_MEDIA_CLOUD_MODE;

            case 'idd_item_direct':
                return Constants.EXPORT_MEDIA_BOT_MODE;

            case 'idd_item_vk_links':
                return Constants.EXPORT_MEDIA_URL_MODE;

            default:
                throw new Error('VTelegram error: strToImportType: No handler occured for import type: ' + str);
        }
    }
    
    errorHandler(err) {
        switch (err) {
            case Errors.EMPTY_VALUE:
                this.clearConvAddressErrorHTML();
                this.convAddressErrorHTML('<b>Поле пустое.</b> Введите код беседы или нажмите Отмена.');
                break;

            case Errors.INVITE_HASH_INVALID:
                this.convAddressErrorHTML('<b>Ошибка инвайт-линка.</b> Чат не существует, либо ссылка не верна.');
                break;

            case Errors.INVITE_HASH_EXPIRED:
                this.convAddressErrorHTML('<b>Ссылка истекла.</b> Введите новую ссылку.');
                break;

            case Errors.INVITE_HASH_EMPTY:
                this.convAddressErrorHTML('<b>Ошибка формата.</b> Ссылка должна содержать в себе tg.me/.');
                break;

            case Errors.UNEXPECTED_ERROR:
                this.convAddressErrorHTML('<b>Упс... Что-то пошло не так!</b> Неизвестная ошибка.');
                break;

            case Errors.NO_ERROR:
                break;

            default:
                throw new Error('No handler occured');
        }
    }
}; 
