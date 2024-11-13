import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class TransactionValidator {
    constructor() {
        this.schemas = {
            verify: Joi.object({
                identifier_code: Joi.string().required().error(new Error('Identifier code is required')),
                contributor_wallet: Joi.string().allow('').error(new Error('Contributor wallet is required')),
                to_wallet: Joi.string().allow('').error(new Error('Contribution receiver wallet is required')),
                transaction_hash: Joi.string().required().error(new Error('Transaction hash is required')),
                amount_in_usdt: Joi.string().required().error(new Error('Amount is required')),
                date_of_transaction: Joi.string().error(new Error('Date of transaction is required')),
                contribution_type: Joi.string(),
                first_name: Joi.string().allow(''),
                family_name: Joi.string().allow(''),
                role: Joi.string().allow(''),
                granting_reason: Joi.string().allow(''),
                member_type: Joi.string().allow(''),
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

    verify = this.validateAndNext('verify');
};

export default new TransactionValidator();