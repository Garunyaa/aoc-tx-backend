import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class InternalTransactionValidator {
    constructor() {
        this.schemas = {
            create: Joi.object({
                identifier_code: Joi.string().required().error(new Error('Identifier Code is required')),
                internal_transaction_id: Joi.string().required().error(new Error('Internal Transaction ID is required')),
                date: Joi.string().required().error(new Error('Date is required')),
                amount: Joi.string().required().error(new Error('Amount is required')),
                wallet_address: Joi.string().required().error(new Error('Receiving public key is required')),
                network: Joi.string()
            }),

            update: Joi.object({
                identifier_code: Joi.string().error(new Error('Enter a valid identifier code')),
                internal_transaction_id: Joi.string().error(new Error('Enter a valid internal transaction ID')),
                date: Joi.string().error(new Error('Enter a valid date')),
                amount: Joi.string().error(new Error('Enter a valid amount')),
                wallet_address: Joi.string().error(new Error('Enter a valid Ethereum or TRON address')),
                network: Joi.string()
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

    create = this.validateAndNext('create');
    update = this.validateAndNext('update');
};

export default new InternalTransactionValidator();