import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

/**
 * InternalTransactionSchema
 * @description InternalTransaction model
 */

const InternalTransactionSchema = new Schema({

    identifier_code: {
        type: String,
        required: true
    },
    internal_transaction_id: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    wallet_address: {
        type: String,
        required: true
    },
    network: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false });

InternalTransactionSchema.plugin(mongoosePaginate);

export const InternalTransaction = model('InternalTransaction', InternalTransactionSchema);