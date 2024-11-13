import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class ExceptionalTransactionValidator {
    constructor() {
        this.schemas = {
            create: Joi.object({
                identifier_code: Joi.string().required().error(new Error('Identifier Code is required')),
                family_name: Joi.string().required().error(new Error('Family name is required')),
                first_name: Joi.string().required().error(new Error('First name is required')),
                amount_contributed: Joi.string().required().error(new Error('Amount contributed is required')),
                date_of_contribution: Joi.string().required().error(new Error('Date of contribution is required')),
                transaction_code: Joi.string().required().error(new Error('Transaction code is required')),
                contributor_wallet: Joi.string().required().error(new Error('Contributor wallet is required')),
                role: Joi.string(),
                granting_reason: Joi.string(),
                member_type: Joi.string()
            }),

            update: Joi.object({
                identifier_code: Joi.string().error(new Error('Enter a valid identifier code')),
                family_name: Joi.string().error(new Error('Enter a valid family name')),
                first_name: Joi.string().error(new Error('Enter a valid first name')),
                amount_contributed: Joi.string().error(new Error('Enter a valid amount')),
                date_of_contribution: Joi.string().error(new Error('Enter a valid date of contribution')),
                transaction_code: Joi.string().error(new Error('Enter a valid transaction code')),
                contributor_wallet: Joi.string().error(new Error('Enter a valid Ethereum or TRON address')),
                role: Joi.string(),
                granting_reason: Joi.string(),
                member_type: Joi.string()
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

export default new ExceptionalTransactionValidator();