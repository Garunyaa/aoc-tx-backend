import BaseConfig from "./base-config";

/**
 * Router config
 */
export default class RouterConfig extends BaseConfig { 

    constructor() {
        super();
        this.router = this.express.Router();
    }
};