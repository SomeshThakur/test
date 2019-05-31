import { API } from "./API.js";
import { Constant } from "./Constants.js";

export class PlayerController {
    constructor() {
        this.api = new API(Constant.BASE_URL, Constant.API_KEY);
        this.api.createEntity('playerStats');
    }
    getPlayerStatById(id) {
        return this.api.endpoints.playerStats.getById(id, uid_name = 'pid');
    }
    getRenderedPlayer(id) {
        return this.getPlayerStatById(id).then(res => {

        });
    }
}