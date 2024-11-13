import { responseHandler } from "../../../../../utils/response-handler";
import { determineBlockchain, verifyTransactionOnBSC, verifyTransactionOnEtherscan, verifyTransactionOnTRON } from "../../../../../utils/get-transaction-helper";

class GetTransactionController {

    /**
      * @description   API to get transaction by transaction hash
      * @param {*} req /api/v1/admin/get-transaction?hash=
      * @param {*} res 
      */

    async get(req, res) {
        try {
            const { hash } = req.query;

            let transaction;
            const blockchain = await determineBlockchain(hash);

            if (blockchain === 'BSC') {
                transaction = await verifyTransactionOnBSC(hash);
            } else if (blockchain === 'TRON') {
                transaction = await verifyTransactionOnTRON(hash);
            } else if (blockchain === 'ETH') {
                transaction = await verifyTransactionOnEtherscan(hash);
            }

            if (!transaction) {
                return responseHandler.errorResponse(res, {}, "Transaction not found", 400);
            }

            const date = new Date(transaction.transactionDate);

            return responseHandler.successResponse(res, { transaction_date: date.toISOString().split('.')[0] }, "Transaction details retrieved successfully", 200);
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
};

export default new GetTransactionController();