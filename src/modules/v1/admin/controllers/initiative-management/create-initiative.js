import Web3 from 'web3';
import { responseHandler } from "../../../../../utils/response-handler";
import { Initiative } from "../../models/initiative-model";

class CreateInitiativeController {

    /**
      * @description   API to create initiative
      * @param {*} req /api/v1/admin/create-initiative
      * @param {*} res 
      */
    async create(req, res) {
        try {
            const { wallet_address, start_period, end_period } = req.body;
            const { to_wallet } = req.query;

            let checksumWalletAddress;
            const walletAddress = wallet_address.trim();

            if (to_wallet === 'tron') {
                if (isTronAddress(walletAddress)) {
                    checksumWalletAddress = walletAddress;
                } else {
                    return responseHandler.errorResponse(res, {}, "Enter a valid TRON wallet address", 400);
                }
            } else if (to_wallet === 'bsc') {
                if (isEthereumAddress(walletAddress)) {
                    checksumWalletAddress = Web3.utils.toChecksumAddress(walletAddress);
                } else {
                    return responseHandler.errorResponse(res, {}, "Enter a valid BSC wallet address", 400);
                }
            } else if (to_wallet === 'eth') {
                if (isEthereumAddress(walletAddress)) {
                    checksumWalletAddress = Web3.utils.toChecksumAddress(walletAddress);
                } else {
                    return responseHandler.errorResponse(res, {}, "Enter a valid Ethereum wallet address", 400);
                }
            }

            const [startHours, startMinutes, startSeconds] = start_period.split('T')[1].split(':').map(Number);
            const [endHours, endMinutes, endSeconds] = end_period.split('T')[1].split(':').map(Number);
            const startPeriod = new Date(start_period);
            const endPeriod = new Date(end_period);
            startPeriod.setUTCHours(startHours, startMinutes, startSeconds);
            endPeriod.setUTCHours(endHours, endMinutes, endSeconds);

            const result = await Initiative.create({
                ...req.body,
                wallet_address: checksumWalletAddress,
                network: to_wallet,
                start_period: startPeriod.toISOString().split('.')[0],
                end_period: endPeriod.toISOString().split('.')[0]
            });

            if (result) {
                return responseHandler.successResponse(res, result, "Initiative created successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Initiative creation failed", 400);
            }
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
};

export default new CreateInitiativeController();

// Validate Ethereum address
export const isEthereumAddress = (address) => {
    return Web3.utils.isAddress(address);
};

// Validate TRON address
export const isTronAddress = (address) => {
    return address.length === 34 && address.startsWith('T');
};