import { responseHandler } from "../../../../../utils/response-handler";
import { logoutSession } from "../../../../../utils/encrypt";

class LogoutController {

    /**
      * @description   API to logout admin
      * @param {*} req /api/v1/admin/logout
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const token = req.headers.authorization.split(" ")[1];
            const user = await logoutSession(token);
            if (user) {
                return responseHandler.successResponse(res, {}, "Admin logged out successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Invalid session", 400);
            }
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
};

export default new LogoutController();