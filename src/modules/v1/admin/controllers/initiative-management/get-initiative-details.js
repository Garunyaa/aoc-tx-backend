import { responseHandler } from "../../../../../utils/response-handler";
import { Initiative } from "../../models/initiative-model";

class GetInitiativeByIdController {

    /**
      * @description   API to retrieve initiative by ID
      * @param {*} req /api/v1/admin/initiative-details/:id
      * @param {*} res 
      */

    async get(req, res) {
        try {
            const result = await Initiative.findById(req.params.id);

            if (result) {
                return responseHandler.successResponse(res, result, "Initiative details retrieved successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Internal transaction not found", 400);
            }
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
};

export default new GetInitiativeByIdController();