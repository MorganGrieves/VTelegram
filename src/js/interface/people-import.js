const Emitter = require('./event-emitter').default;
const Constants = require('./../constants');
const Errors = Constants.errors;
const Lib = require('./../lib');
const Settings = require('./settings').default;

const peopleImport = new PeopleImport();
export default peopleImport;

class PeopleImport {
    _formInsertionPromise = undefined;
    _convUserData = [];
    _usersLoaded = false;

    constructor() {
        this._formInsertionPromise = fetch(chrome.runtime.getURL('./src/html/people-import-form.html'))
            .then(response => {
                return response.text()
            })
            .then((data) => {
                let formDom = new DOMParser().parseFromString(data, 'text/html');
                formDom.getElementById('vtelegram_import_people_next_button').addEventListener('click',
                    (event) => Emitter.emit('event:people-import-completed', {}));

                formDom.getElementById('vtelegram_people_import_back_button').addEventListener('click',
                    (event) => Emitter.emit('event:people-import-back', {}));
                
                formDom.getElementById('vtelegram_people_import_exit_telegram_button').addEventListener('click', 
                    (event) => {
                        Emitter.emit('event:telegram-exit', {});
                    });
                return formDom;
            })
            .then(formDom => {
                document.getElementsByClassName('vtelegram_popup_box_container')[0].appendChild(formDom.body.firstElementChild);
            });
    }

    show() {
        this._formInsertionPromise
            .then(() => {
                document.getElementById('vtelegram_people_import_form').classList.remove('vtelegram_hidden');

                console.log(Settings.gChat)
                if (!this._usersLoaded) {
                    this.loadConversationMembers();
                    this._usersLoaded = true;
                }
            })
    }

    hide() {
        this._formInsertionPromise
            .then(() => document.getElementById('vtelegram_people_import_form').classList.add('vtelegram_hidden'));
    }

    clean() {
        this.cleanMemberList();
        this._usersLoaded = false;
    }

    userDataHandler = event => {
        //!!!!!!!!!! здесь получаем данные по номеру телефона и @user нику и отправляем
        let idAttr = event.currentTarget.getAttribute('id');
        let userId = idAttr.slice('vtelegram_settings_address_submit'.length, idAttr.length);
        let data = document.getElementById(`vtelegram_flist_acc${userId}`).value;
        let error = this.sendData(data);

        if (error === Errors.NO_ERROR) {
            this.clearPeopleImportErrorHTML(userId);
            document.getElementById(`vtelegram_flist_item_wrap${userId}`).classList.remove('vtelegram_unfolded');
        } else
            this.errorHandler(userId, error);
        event.stopPropagation();
    }

    sendData(data) {
        //!!!!!! отправляем данные
        if (data.length === 0)
            return Errors.EMPTY_VALUE;

        return Errors.NO_ERROR;
    }

    errorHandler(userId, err) {
        switch (err) {
            case Errors.NO_ERROR:
                break;

            case Errors.EMPTY_VALUE:
                this.clearPeopleImportErrorHTML(userId);
                this.peopleImportErrorHTML(userId, '<b>Поле пустое</b>. Введите номер телефона или никнейм.');
                break;

            default:
                throw new Error('No handler occured');
        }
    }

    clearPeopleImportErrorHTML(userId) {
        this._formInsertionPromise
            .then(() => document.getElementById(`vtelegram_flist_error_acc${userId}`).innerHTML = '');
    }

    peopleImportErrorHTML(userId, errorString) {
        this._formInsertionPromise
            .then(() => document.getElementById(`vtelegram_flist_error_acc${userId}`).innerHTML =
                `<div class="vtelegram_msg msg error"><div class="msg_text">${errorString}</div></div>`);
    }

    loadConversationMembers() {
        this._formInsertionPromise
            .then(async () => {
                const urlParams = new URLSearchParams(location.search);
                const selID = urlParams.get(Constants.VK_MSG_ID_PARAM);
                let dialogId;

                if (selID) {
                    dialogId = (selID[0] === 'c') ? dialogId = Constants.CONVERSATION_START_ID + parseInt(selID.slice(1)) : dialogId = selID;
                    const startData = `act=a_start&al=1&block=true&gid=0&history=1&im_v=3` +
                        `&msgid=false&peer=${dialogId}&prevpeer=0`;
                    const result = await Lib.request(Constants.requestURL['start_history'], 'POST', startData);
                    if (result.ok) {
                        const jsonStartData = await result.text()
                            .then(text => {
                                return JSON.parse(text);
                            });

                        this._convUserData = jsonStartData['payload'][1][1];
                        for (let user of this._convUserData) {

                            let userListElem = new DOMParser();
                            userListElem = userListElem.parseFromString(
                                `<div id="vtelegram_flist_item_wrap${user['id']}" class="vtelegram_flist_line">
                            <div class="vtelegram_flist_item_wrap vtelegram_flist_info_block" id="vtelegram_flist_item${user['id']}">
                                <div class="vtelegram_flist_item clear_fix" tabindex="0" role="link" aria-label="${user['name']}">
                                    <div class="vtelegram_flist_item_img">
                                        <img class="vtelegram_flist_item_thumb" src="${user['photo']}" alt="${user['name']}">
                                    </div>
                                    <div class="vtelegram_flist_item_name">${user['name']}</div>
                                </div>
                            </div>
                            <div class="vtelegram_flist_change_block">
                                <div class="vtelegram_clear_fix" tabindex="0" role="link" aria-label="${user['name']}" style="margin-bottom: 14px;">
                                    <div class="vtelegram_flist_item_img">
                                        <img class="vtelegram_flist_item_thumb" src="${user['photo']}" alt="${user['name']}">
                                    </div>
                                    <div class="vtelegram_flist_item_name">${user['name']}</div>
                                </div>
                                <div id="vtelegram_flist_error_acc${user['id']}"></div>
                                <div class="vtelegram_settings_row vtelegram_clear_fix">
                                    <div class="vtelegram_settings_label">Телефон или никнейм</div>
                                    <a id="vtelegram_flist_cancel_button${user['id']}" class="vtelegram_settings_right_control" tabindex="0" role="link">Отмена</a>
                                    <div class="vtelegram_settings_labeled">
                                        <div class="vtelegram_prefix_input_wrap" id="vtelegram_flist_acc_wrap${user['id']}" style="width: 200px;">
                                            <div class="vtelegram_prefix_input_field">
                                                <input id="vtelegram_flist_acc${user['id']}" type="text" class="vtelegram_prefix_input" maxlength="20" value="" autocomplete="off" style="padding-left: 9px;">
                                                <div class="vtelegram_prefix_input_border"></div>
                                            </div>
                                        </div>
                                        <div class="vtelegram_settings_row_hint">Введите <b>номер телефона пользователя или никнейм формата @user</b>.</div>
                                        <div class="vtelegram_settings_row_hint">Если данные не будут введены, пользователь будет импортирован с именем и фамилией во ВКонтате без привязки к аккаунту.</div>
                                    </div>
                                </div>
                                <div class="vtelegram_settings_row_button_wrap">
                                    <button id="vtelegram_settings_address_submit${user['id']}" class="vtelegram_flat_button">Добавить аккаунт</button>
                                </div>
                            </div> 
                        </div>`
                                , 'text/html');

                            userListElem.getElementById(`vtelegram_flist_item_wrap${user['id']}`).addEventListener('click',
                                (event) => {
                                    for (let userDiv of document.getElementsByClassName('vtelegram_flist_line'))
                                        userDiv.classList.remove('vtelegram_unfolded');

                                    event.currentTarget.classList.add('vtelegram_unfolded');
                                }
                            );

                            userListElem.getElementById(`vtelegram_flist_cancel_button${user['id']}`).addEventListener('click',
                                (event) => {
                                    let idAttr = event.currentTarget.getAttribute('id');
                                    let userId = idAttr.slice('vtelegram_flist_cancel_button'.length, idAttr.length);
                                    document.getElementById(`vtelegram_flist_item_wrap${userId}`).classList.remove('vtelegram_unfolded');
                                    event.stopPropagation();
                                }
                            );

                            userListElem.getElementById(`vtelegram_settings_address_submit${user['id']}`).addEventListener('click', this.userDataHandler);

                            document.getElementById('vtelegram_flist_all_list').appendChild(userListElem.body.firstElementChild);
                        }
                    }
                }
            });
    }

    cleanMemberList() {
        for (let user of this._convUserData)
            document.getElementById(`vtelegram_flist_item_wrap${user['id']}`).remove();

        this._convUserData = [];
    }
}; 
