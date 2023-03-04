const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends CustomAPIError {
    constructor(message){
        super(message); // super() --> calls the constructor of the parent class i.e CustomAPIError
        this.statusCode = StatusCodes.NOT_FOUND;
        // 404 --> NOT_FOUND
    }
}

module.exports = NotFoundError;