

exports.ErrorResponse = (message, statusCode) => {
    return res.status(statusCode).send({ error: message });
}

  //exports.isSeller = async (req, res, next) => {