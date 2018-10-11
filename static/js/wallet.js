function saveKeystoreNext() {
    alert('i love you')
    $('#save-keystore').hide()
    $('#save-privatekey').show()
}

function configAccountInfo(data) {
    $('#account-address').text(data.address)
    $('#account-balance').text(data.balance + 'ETH')

    $('#transaction-first').hide()
    $('#transaction-second').show()

    $('input[name=fromadress]').val(data.address)
    $('input[name=privatekey]').val(data.privatekey)
}

function unlockAccountWithPrivatekey() {
    let privatekey = $('#input-privatekey').val()
    console.log(privatekey)
    $.post('/privateunlock', `privatekey=${privatekey}`, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            configAccountInfo(res.data)
        }
    })
}

function queryTransaction() {
    let hash = $('#transaction-info-hash').val()
    $.post('/querytransaction', 'hash=' + hash, function (data, status) {
        console.log(status + JSON.stringify(data))
        if (data.code == 0) {
            $('#transaction-info').text(JSON.stringify(data.data, null, 4))
        }
    })
}

function unlockAccountWithKeystore() {
    var filedata = $('#unlock-account-file').val()
    if (filedata.length <= 0) {
        alert('请选择文件!')
        return
    }

    var data = new FormData()
    data.append('file', $('#unlock-account-file')[0].files[0])
    data.append('password', $('#unlock-account-password').val())
    alert(data)
    var urlStr = '/keystoreunlock'
    
}