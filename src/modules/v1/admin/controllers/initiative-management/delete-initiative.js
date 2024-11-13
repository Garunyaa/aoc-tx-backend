import { responseHandler } from "../../../../../utils/response-handler";
import { Initiative } from "../../models/initiative-model";
import { Transaction } from "../../../user/models/transaction-model";

class DeleteInitiativeController {

    /**
      * @description   API to delete initiative
      * @param {*} req /api/v1/admin/delete-initiative/:id
      * @param {*} res 
      */

    async delete(req, res) {
        try {
            const result = await Initiative.findByIdAndDelete(req.params.id);

            if (result) {
                await Transaction.deleteMany({ identifier_code: result.identifier, to_wallet: result.wallet_address });

                return responseHandler.successResponse(res, {}, "Initiative and related transactions deleted successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Initiative not found", 400);
            }
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
};

export default new DeleteInitiativeController();