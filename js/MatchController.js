import { Component } from './Component.js';
import { LiveScoreController } from './LiveScoreController.js'
import { API } from './API.js'
import { Constant } from './Constants.js'
export class MatchController {
    constructor() {
        this.api = API.getInstance(Constant.BASE_URL, Constant.API_KEY);
        this.api.createEntity('matches');
        this.rows = ``;
        this.liveScoreController = new LiveScoreController();
        this.matches = '';

    }
    async updateScore(id) {
        let score = await this.liveScoreController.getScoreById(id);
        document.getElementById("score-" + id).innerHTML = "Live Score : " + (score.score == undefined ? "Scores are not available yet." : score.score);

    }
    getAllRenderedMatches() {
        return this.getRenderedMatches(true);
    }
    async fetchAllMatches() {
        await this.api.endpoints.matches.getAll()
            .then((res) => {
                this.matches = res['matches'];
            });
    }
    getRenderedMatches(refresh) {
        let _matches;
        if (!refresh) _matches = this.matches.slice(0, 3)
        else _matches = this.matches;
        let cols = ``;
        _matches.forEach(({ unique_id, date, matchStarted, ...teams }) => {
            let scoreholder = ``;
            let vs = Component.render({ tag: 'h1', attr: { id: 'match-' + unique_id }, child: ` ${teams['team-1']} vs ${teams['team-2']}` });
            let jsdate = new Date(date);
            let rdate = Component.render({ tag: 'h4', attr: { id: 'date-' + unique_id }, child: "Scheduled Date : " + jsdate.toLocaleDateString() });
            if (matchStarted) {
                scoreholder = Component.render({ tag: 'p', attr: { id: 'score-' + unique_id, class: "live-score" }, child: "Updating Score... " });
                this.updateScore(unique_id);
            }
            let squad = Component.render({ tag: 'button', attr: { id: 'squad-btn-' + unique_id, class: "squad-btn" }, child: "Playing Squads" });
            let item = Component.render({ attr: { class: 'item' }, child: vs + scoreholder + rdate + squad });
            let col = Component.render({ attr: { class: 'col' }, child: item });
            cols += col;
        });

        let morebtn = Component.render({ tag: 'button', attr: { id: 'more-btn', value: "More" }, child: "More" });
        let row = Component.render({ attr: { class: 'row' }, child: cols + (_matches.length == 3 ? morebtn : '') });
        return row;
    }
}