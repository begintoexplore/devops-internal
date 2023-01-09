class CustomErrorHandler extends Error {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    static alreadyExist(message) {
        return new CustomErrorHandler(409, message)
    }

    static wrongCredentials(message = 'Username or password wrong') {
        return new CustomErrorHandler(401, message)
    }
}

export default CustomErrorHandler;