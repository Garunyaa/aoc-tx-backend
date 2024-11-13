import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class AdminValidator {
    constructor() {
        this.schemas = {
            login: Joi.object({
                wallet_address: Joi.string().required().error(new Error("Wallet address is required"))
            })
        };
    }

    validateAndNext = (schemaName) => {
        return (req, res, next) => {
            const schema = this.schemas[schemaName];
            const { error } = schema.validate(req.body);
            if (!error) {
                next();
            } else {
                const errorMessage = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return responseHandler.errorResponse(res, {}, errorMessage, 400);
            }
        };
    };

    login = this.validateAndNext('login');
};

export default new AdminValidator();