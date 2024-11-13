import { responseHandler } from "../../../../../utils/response-handler";
import { Initiative } from "../../models/initiative-model";

class ListInitiativesController {

    /**
      * @description   API to list all the initiatives
      * @param {*} req /api/v1/admin/list-initiatives
      * @param {*} res 
      */

    async list(req, res) {
        try {
            const { page, limit, search } = req.query;

            let query = {};

            if (search) {
                query = {
                    $or: [
                        { initiative: { $regex: search, $options: 'i' } },
                        { identifier: { $regex: search, $options: 'i' } },
                        { wallet_address: { $regex: search, $options: 'i' } }
                    ]
                };
            }

            // For pagination
            const options = {
                page: page ? page : 1,
                limit: limit ? limit : 10,
                sort: { created_at: -1 }
            };

            const result = await Initiative.paginate(query, options);

            result.docs.forEach(doc => {
                doc.start_period = convertPeriod(doc.start_period);
                doc.end_period = convertPeriod(doc.end_period);
            });

            return responseHandler.successResponse(res, result, "Initiatives listed successfully", 200);
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
};

export default new ListInitiativesController();

// Convert start_period and end_period to GMT+1 Hours
export const convertPeriod = (dateString) => {
    const convertedDate = new Date(dateString);
    convertedDate.setUTCHours(convertedDate.getUTCHours() + 1);
    return convertedDate.toISOString().split('.')[0];
};