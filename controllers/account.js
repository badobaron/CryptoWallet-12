let {success, fail} = require('../utils/myUtils')
let web3 = require('../utils/myUtils').getweb3()
let fs = require('fs')

async function getAccountBalance(address) {
    let balance = await web3.eth.getBalance(address)
    return web3.utils.fromWei(balance, 'ether')
}

module.exports = {
    unlockAccountWithPrivate: async (ctx) => {
        let privatekey = ctx.request.body.privatekey
        console.log(privatekey)
        let account = web3.eth.accounts.privateKeyToAccount(privatekey)
        console.log(account)
        let balance = await getAccountBalance(account.address)
        console.log(balance)
        ctx.body = success({
            balance: balance,
            address: account.address,
            privatekey: account.privateKey
        })
    },

    unlockAccountWithKeystore: async (ctx) => {
        // 获取前端传递的数据，包括keystore、密码
        let password = ctx.request.body.password
        console.log(password)
        let keystore = ctx.request.files.file
        console.log(keystore)
        // 读取缓存文件中的keystore数据
        let keystoreData = fs.readFileSync(keystore.path, 'utf8')
        console.log(keystoreData)
        // 通过keystore和密码解锁账户
        let account = web3.eth.accounts.decrypt(JSON.parse(keystoreData), password)
        console.log(account)
        // 获取账户余额
        let balance = await getAccountBalance(account.address)
        console.log(balance)
        // 返回相应数据给前端
        ctx.body = success({
            balance: balance,
            address: account.address,
            privatekey: account.privateKey
        })
    }
}