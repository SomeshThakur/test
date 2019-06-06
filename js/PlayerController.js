import { API } from "./API.js";
import { Constant } from "./Constants.js";
import { Component } from './Component.js'
export class PlayerController {
    constructor() {
        this.api = API.getInstance(Constant.BASE_URL, Constant.API_KEY);
        this.api.createEntity('playerStats');
    }
    async getPlayerStatById(id) {
        return await this.api.endpoints.playerStats.getById(id, 'pid');
    }
    async getRenderedPlayer(id) {
        return await this.getPlayerStatById(id).then(res => {
            let { imageURL, fullName, pid, profile, data, country } = res;
            let img = Component.render({ tag: "img", attr: { src: `${imageURL === null ? '' : imageURL}`, alt: `${fullName} pic`, id: `player-img-${id}`, class: 'player-img' } });
            let fullname = Component.render({ tag: 'h1', attr: { class: `player-name`, id: `player-name-${id}` }, child: `${fullName}` });
            let pcountry = Component.render({ tag: 'h3', attr: { class: `player-name`, id: `player-name-${id}` }, child: `${country}` });

            let player_profile = Component.render({ tag: 'p', attr: { id: `profile-${pid}`, class: 'player-profile' }, child: profile })
            let item = Component.render({ attr: { class: 'item' }, child: img + fullname + pcountry + player_profile })
            let col = Component.render({ attr: { class: 'col' }, child: item });

            let bowling_table = this.generateTable(data.bowling);
            let bowling_heading = Component.render({ tag: 'h1', child: 'Bowling' })
            let batting_table = this.generateTable(data.batting);
            let batting_heading = Component.render({ tag: 'h1', child: 'Batting' })

            let stat_item = Component.render({ attr: { class: 'item' }, child: bowling_heading + bowling_table + batting_heading + batting_table })
            let stats = Component.render({ attr: { class: 'col' }, child: stat_item });
            let row = Component.render({ tag: 'row', attr: { class: 'row' }, child: col + stats })
            return row;
        });
    }


    generateTable(data) {
        let trs = ``;
        let ths = Component.render({ tag: 'th' });
        for (let key in data) {
            for (let value in data[key]) {
                let th = Component.render({ tag: 'th', attr: { class: 'table-head' }, child: value });
                ths += th;
            }
            break;
        }
        for (let key in data) {
            let _ths = Component.render({ tag: 'th', attr: { class: 'table-head' }, child: key });
            for (let value in data[key]) {
                let val = data[key][value];
                let th = Component.render({ tag: 'th', attr: { class: 'table-head' }, child: val ? val : '-' });
                _ths += th;
            }
            let tr = Component.render({ tag: 'tr', attr: { class: 'table-row' }, child: _ths });
            trs += tr;
        }
        let headings = Component.render({ tag: 'tr', child: ths });
        let table = Component.render({ tag: 'table', attr: { class: 'table' }, child: headings + trs });
        return table;
    }
}
