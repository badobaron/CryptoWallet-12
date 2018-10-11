let {success, fail} = require('../utils/myUtils')
let web3 = require('../utils/myUtils').getweb3()

module.exports = {

    queryTransactionHtml: async (ctx) => {
        await ctx.render('querytransaction.html')
    },

    queryTransaction: async (ctx) => {
        let hash = ctx.request.body.hash
        console.log(hash)
        let data = await web3.eth.getTransaction(hash)
        ctx.body = success(data)
    },

    transactionHtml: async (ctx) => {
        await ctx.render('transaction.html')
    },

    sendTransaction: async (ctx) => {
        let {fromaddress, toaddress, number, privatekey} = ctx.request.body

        var Tx = require('ethereumjs-tx')
        var privateKey = new Buffer(privatekey.slice(2), 'hex')

        let nonce = await web3.eth.getTransactionCount(fromaddress)
        let gasPrice = await web3.eth.getGasPrice()
        let balance = web3.utils.toWei(number)

        var rawTx = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: '0x2710',
            to: toaddress,
            value: balance,
            data: '0x00'
        }

        let gas = await web3.eth.estimateGas(rawTx)
        rawTx.gas = gas

        var Tx = new Tx(rawTx)
        tx.sign(privateKey)

        var serializedTx = tx.serialize()

        let responseData
        await web3.eth.sendSignedTransaction('0x' +
            serializedTx.toString('hex'), function (err, data) {
            console.log(err)
            console.log(data)

            if (err) {
                responseData = fail(err)
            }
        })
            .then(function (data) {
                console.log(data)
                if (data) {
                    responseData = success({
                        'blockHash': data.blockHash,
                        'transactionHash': data.transactionHash
                    })
                } else {
                    responseData = fail('交易失败')
                }
            })
        ctx.body = responseData
    }
}