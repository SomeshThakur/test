import { API } from './API.js'
import { Constant } from './Constants.js'
export class SquadController {
    constructor() {
        this.api = API.getInstance(Constant.BASE_URL, Constant.API_KEY);
        this.api.createEntity('fantasySquad');
    }
    getSquadById(id) {
        return this.api.endpoints.fantasySquad.getById(id);
    }
}