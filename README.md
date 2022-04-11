# VTelegram
VTelegram is a client-side browser extension, which takes the target as exporting chat from social network VKontakte and importing into Telegram.
App supports Google Chrome, but in a future it's going to be crossed to other browsers.

# Installing
1. Run `npm run build` in project directory.
2. Open `chrome://extensions` and push the button `Load unpacked`.
3. Set the path to `build` directory and reload VKontakte page.

# Future plans
I have a lot of expectations and it would be easier to develop with a plan.
## Step 1: Release 1.0.0
- [ ] **Rewrite user interface using ready components.** First concept of VTelegram's interface was based on pure HTML, CSS, but this is a mistake to be honest. 
Using ready components like React is a good choice to escape unforeseen consequences. 
- [ ] **Prepare message import for the first time**
- [ ] **Try to get user's API_ID and API_HASH without 3rd party websites**
- [ ] **Migrate to Manifest V3**
- [ ] **Telegram has a lot of limitations, so it's good idea to write some test**

## Step 2: Next versions
- [ ] **Support Firefox and Opera addons.**
- [ ] **Add attachments: video, pictures and audio.**
- [ ] **Add the possibility to sign exporting messages by VKontakte chat members' phonenumbers or usernames.**
- [ ] **Add save button to cloud disks like Google Drive,** if someone is gonna to import by hand.

# About authors
The project has been inspired by teachers of my university. The first team of developers had created sort of demo application and passed,
but it still requires a lot of time and concentration. So I decided to continue ~~the journey~~... development by myself.
Here they are. Primary authors:
* __[MorganGrieves (me)](https://github.com/MorganGrieves)__
* __[D4ker](https://github.com/D4ker)__
* __[KostrareVI](https://github.com/KostarevVI)__
