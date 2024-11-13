import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

/**
 * TransactionSchema
 * @description Transaction model
 */

const TransactionSchema = new Schema({

    identifier_code: {
        type: String
    },
    contributor_wallet: {
        type: String
    },
    to_wallet: {
        type: String
    },
    transaction_hash: {
        type: String,
        required: true
        // unique: true
    },
    amount_in_usdt: {
        type: String
    },
    date_of_transaction: {
        type: String
    },
    contribution_type: {
        type: String
    },
    network: {
        type: String
    },
    first_name: {
        type: String
    },
    family_name: {
        type: String
    },
    role: {
        type: String
    },
    granting_reason: {
        type: String
    },
    member_type: {
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

TransactionSchema.plugin(mongoosePaginate);

export const Transaction = model('Transaction', TransactionSchema);