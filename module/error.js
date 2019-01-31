async function errorsHandling(code=0, msg='', err='', result, res) {
    if (msg == '') {
        console.log(err);
        result.msg = err.message
    }else{
        result.msg = msg
    }
    res.status(code).json(result)
} module.exports.errorsHandling = errorsHandling;