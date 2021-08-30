module.exports = {
    getError(errors, fields) {
        try {
            return errors.mapped()[fields].msg;
        } catch {
            return '';
        }
    }
}