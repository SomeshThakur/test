import { API } from "./API.js";
import { Constant } from "./Constants.js";

export class LiveScoreController {
    constructor() {
        this.api = new API(Constant.BASE_URL, Constant.API_KEY);
    }
    getScoreById(id) {
        this.api.createEntity('cricketScore');
        return this.api.endpoints.cricketScore.getById(id);
    }
}