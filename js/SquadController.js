import { API } from './API.js'
import { Constant } from './Constants.js'
export class SquadController {
    constructor() {
        this.api = new API(Constant.BASE_URL, Constant.API_KEY);
    }
    getSquadById(id) {
        this.api.createEntity('fantasySquad');
        return this.api.endpoints.fantasySquad.getById(id);
    }
}