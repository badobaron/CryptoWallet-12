let route = require('koa-router')()
let newAccountController = require('../controllers/newAccount')
let transactionController = require('../controllers/transaction')
let accountController = require('../controllers/account')

// 获取创建钱包账户的页面
route.get('/newaccount', newAccountController.newAccountHtml)
// 提交创建钱包账户的表单
route.post('/newaccount', newAccountController.newAccount)

// 获取转账的页面
route.get('/transaction', transactionController.transactionHtml)
// 发送交易
route.post('/sendtransaction', transactionController.sendTransaction)
// 查看交易详情
route.get('/querytransaction', transactionController.queryTransactionHtml)
route.post('/querytransaction', transactionController.queryTransaction)

// 通过私钥解锁账户
route.post('/privateunlock', accountController.unlockAccountWithPrivate)
// 通过配置文件解锁账户
route.post('/keystoreunlock', accountController.unlockAccountWithKeystore)

module.exports = route
