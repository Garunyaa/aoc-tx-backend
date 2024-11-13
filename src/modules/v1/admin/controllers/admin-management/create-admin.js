import { Admin } from "../../models/admin-model";
import Web3 from "web3";

class CreateAdmin {

    async create() {
        try {
            // convert an upper or lowercase Ethereum address to a checksum address
            const walletAddressAfterCheck = Web3.utils.toChecksumAddress(process.env.ADMIN_WALLET_ADDRESS);

            const admin = await Admin.findOne({ wallet_address: walletAddressAfterCheck });
            if (admin) {
                console.log("Admin already exists");
            } else {
                const admin = await Admin.create({ wallet_address: walletAddressAfterCheck, is_primary: true });
                console.log("Admin registered: ", admin);
            }
        } catch (err) {
            console.error(err);
        }
    }
};

export default new CreateAdmin();