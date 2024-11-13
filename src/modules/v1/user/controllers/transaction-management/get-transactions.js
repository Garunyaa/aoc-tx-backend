import { getBscTransactions, getEthTransactions, getTronTransactions } from "../../../../../utils/get-transaction-helper";
import { responseHandler } from "../../../../../utils/response-handler";

class GetTransactionController {

    /**
     * @description   API to get transaction details
     * @param {*} req /api/v1/user/get-tx-details?wallet_address=&language=&network=
     * @param {*} res 
     */

    async get(req, res) {
        try {
            const { wallet_address, language, network, page, limit } = req.query;

            let transactionDetails;

            if (network === 'bsc') {
                // Get transactions with BSCScan
                transactionDetails = await getBscTransactions(wallet_address);
            } else if (network === 'tron') {
                // Get transactions with TRONScan
                transactionDetails = await getTronTransactions(wallet_address);
            } else if (network === 'eth') {
                // Get transactions with Etherscan
                transactionDetails = await getEthTransactions(wallet_address);
            } else {
                return responseHandler.errorResponse(res, {}, language === 'fr' ? "Réseau non pris en charge" : "Unsupported network", 400);
            }

            if (!transactionDetails || transactionDetails.length === 0) {
                return responseHandler.errorResponse(res, {}, language === 'fr' ? "Transaction non trouvée ou invalide" : "Transaction not found or invalid", 400);
            }
            
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedResults = transactionDetails.slice(startIndex, endIndex);        

            // For pagination
            const totalDocs = transactionDetails.length;
            const totalPages = Math.ceil(totalDocs / limit);
            const hasNextPage = page < totalPages;
            const hasPrevPage = page > 1;

            const responseData = {
                docs: paginatedResults,
                totalDocs,
                limit: parseInt(limit),
                totalPages,
                page: parseInt(page),
                pagingCounter: startIndex + 1,
                hasPrevPage,
                hasNextPage,
                prevPage: hasPrevPage ? parseInt(page) - 1 : null,
                nextPage: hasNextPage ? parseInt(page) + 1 : null,
            }

            return responseHandler.successResponse(res, responseData, language === 'fr' ? "Transactions récupérées avec succès" : "Transactions fetched successfully", 200);

        } catch (err) {
            console.error('Error retrieving transaction details: ', err);
            return responseHandler.errorResponse(res, err);
        }
    }
};

export default new GetTransactionController();