import { API } from "./API.js";
import { Constant } from "./Constants.js";

export class LiveScoreController {
    constructor() {
        this.api = new API(Constant.BASE_URL, Constant.API_KEY);
        this.api.createEntity('cricketScore');
    }
    getScoreById(id) {
        return this.api.endpoints.cricketScore.getById(id);
    }
}