import Web3 from 'web3';
import { responseHandler } from "../../../../../utils/response-handler";
import { Initiative } from "../../models/initiative-model";
import { isEthereumAddress, isTronAddress } from "./create-initiative";

class UpdateInitiativeController {

    /**
      * @description   API to update initiative
      * @param {*} req /api/v1/admin/update-initiative/:id?network=
      * @param {*} res 
      */

    async update(req, res) {
        try {
            const { wallet_address, start_period, end_period } = req.body;
            const { network } = req.query;

            let checksumWalletAddress;
            const walletAddress = wallet_address.trim();

            // Validate wallet address based on the chain (TRON/BSC/Ethereum)
            if (network === 'tron') {
                if (isTronAddress(walletAddress)) {
                    checksumWalletAddress = walletAddress;
                } else {
                    return responseHandler.errorResponse(res, {}, "Enter a valid TRON wallet address", 400);
                }
            } else if (network === 'bsc') {
                if (isEthereumAddress(walletAddress)) {
                    checksumWalletAddress = Web3.utils.toChecksumAddress(walletAddress);
                } else {
                    return responseHandler.errorResponse(res, {}, "Enter a valid BSC wallet address", 400);
                }
            } else if (network === 'eth') {
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

            const result = await Initiative.findByIdAndUpdate(req.params.id, {
                ...req.body,
                network,
                start_period: startPeriod.toISOString().split('.')[0],
                end_period: endPeriod.toISOString().split('.')[0],
                wallet_address: checksumWalletAddress
            }, { new: true });

            if (result) {
                return responseHandler.successResponse(res, result, "Initiative updated successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Initiative not found", 400);
            }
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
};

export default new UpdateInitiativeController();