import { responseHandler } from "../../../../../utils/response-handler";
import { createSession } from "../../../../../utils/encrypt";
import { Admin } from "../../models/admin-model";
import Web3 from "web3";

class LoginController {

    /**
      * @description   api to admin login
      * @param {*} req /api/v1/admin/login
      * @param {*} res 
      */

    async get(req, res) {
        try {
            // convert an upper or lowercase Ethereum address to a checksum address
            const walletAddressAfterCheck = Web3.utils.toChecksumAddress(req.body.wallet_address);

            const admin = await Admin.findOne({ wallet_address: walletAddressAfterCheck });

            if (admin) {
                const session = await createSession(admin);
                return responseHandler.successResponse(res, { admin: admin, session }, "Admin logged in successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "No admin exists with this wallet address", 400);
            }
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
};

export default new LoginController();