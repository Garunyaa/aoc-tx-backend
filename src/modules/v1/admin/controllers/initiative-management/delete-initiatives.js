import mongoose from "mongoose";
import { responseHandler } from "../../../../../utils/response-handler";
import { Initiative } from "../../models/initiative-model";
import { Transaction } from "../../../user/models/transaction-model";

class DeleteInitiativesController {

    /**
     * @description   API to delete multiple initiatives
     * @param {*} req /api/v1/admin/delete-initiatives
     * @param {*} res
     */

    async delete(req, res) {
        try {
            const idsToDelete = req.body.ids.map(id => new mongoose.Types.ObjectId(id));

            const initiativesToDelete = await Initiative.find({ _id: { $in: idsToDelete } });

            const identifiers = initiativesToDelete.map(initiative => initiative.identifier);
            const walletAddresses = initiativesToDelete.map(initiative => initiative.wallet_address);

            const result = await Initiative.deleteMany({ _id: { $in: idsToDelete } });

            if (result.deletedCount > 0) {
                await Transaction.deleteMany({ identifier_code: { $in: identifiers }, to_wallet: { $in: walletAddresses } });

                return responseHandler.successResponse(res, {}, "Initiatives and related transactions deleted successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "No initiatives found", 400);
            }
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new DeleteInitiativesController();