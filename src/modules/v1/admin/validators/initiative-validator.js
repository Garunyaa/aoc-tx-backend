import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class InitiativeValidator {
    constructor() {
        this.schemas = {
            create: Joi.object({
                initiative: Joi.string().required().error(new Error('Initiative Name is required')),
                start_period: Joi.string().required().error(new Error('Start period is required')),
                end_period: Joi.string().required().error(new Error('End period is required')),
                // start_time: Joi.string().required().error(new Error('Start time is required')),
                // end_time: Joi.string().required().error(new Error('End time is required')),
                identifier: Joi.string().required().error(new Error('Identifier is required')),
                network: Joi.string(),
                wallet_address: Joi.string()
                    .required()
                    // .custom((value, helpers) => {
                    //     if (!Web3.utils.isAddress(value) && !TronWeb.isAddress(value)) {
                    //         return helpers.error('any.invalid');
                    //     }
                    //     return value;
                    // })
                    .messages({
                        'any.required': 'Wallet address is required',
                        // 'any.invalid': 'Enter a valid Ethereum or TRON address',
                    })
            }),

            update: Joi.object({
                initiative: Joi.string().error(new Error('Enter a valid initiative name')),
                start_period: Joi.string().error(new Error('Enter a valid start period')),
                end_period: Joi.string().error(new Error('Enter a valid end period')),
                // start_time: Joi.string().error(new Error('Enter a valid start time')),
                // end_time: Joi.string().error(new Error('Enter a valid end time')),
                identifier: Joi.string().error(new Error('Enter a valid identifier')),
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

export default new InitiativeValidator();