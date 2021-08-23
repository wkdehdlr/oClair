const fs = require('fs')
const { exec } = require('child_process')
const { AutoComplete } = require('enquirer');

const serverListFile = fs.readFileSync('.devServerList', 'utf8')
const serverList = serverListFile.split('\n')
serverList.splice(-1,1)

let account = 'irteam';

class oClair extends AutoComplete {
    constructor(options = {}) {
        super(options);
    }
    append(ch) {
        if ( ch === '/') {
            account = account === 'irteam' ? 'irteamsu' : 'irteam';
            super.render();
            return;
        }
        super.append(ch);
    }
    message() {
        return `select server[::${account}::]`;
    }
}

const oclair = new oClair({
    account: account,
    initial: 0,
    choices: serverList
});

oclair.run()
    .then(server => exec(`rlogin -l ${account} ${server}`))
    .catch(console.error);
