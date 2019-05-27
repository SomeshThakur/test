import { Component } from './Component.js';
import { LiveScoreController } from './LiveScoreController.js'
export class MatchController {
    constructor(matches) {
        this.matches = matches;
        this.rows = ``;
        this.liveScoreController = new LiveScoreController();
    }
    getAllRenderedMatches() {
        return this.getRenderedMatches(this.matches, true);
    }
    async updateScore(id) {
        let score = await this.liveScoreController.getScoreById(id);
        document.getElementById("score-" + id).innerHTML = "Live Score : " + score.score;

    }
    getRenderedMatches(_matches = this.matches) {
        let cols = ``;
        //  let unique_id, date, matchStarted, teams;
        for (let { unique_id, date, matchStarted, ...teams } of _matches) {
            let scoreholder = ``;
            let vs = Component.render({ tag: 'h1', attr: { id: 'match-' + unique_id }, child: ` ${teams['team-1']} vs ${teams['team-2']}` });
            let jsdate = new Date(date);
            let rdate = Component.render({ tag: 'h4', attr: { id: 'date-' + unique_id }, child: "Scheduled Date : " + jsdate.toLocaleDateString() });
            if (matchStarted) {
                scoreholder = Component.render({ tag: 'p', attr: { id: 'score-' + unique_id }, child: "Updating Score... " });
                this.updateScore(unique_id);
            }
            let squad = Component.render({ tag: 'button', attr: { id: '#squad-btn-' + unique_id, class: "squad-btn" }, child: "Playing Squads" });
            let item = Component.render({ attr: { class: 'item' }, child: vs + scoreholder + rdate + squad });
            let col = Component.render({ attr: { class: 'col' }, child: item });
            cols += col;
        }
        let morebtn = Component.render({ tag: 'button', attr: { id: 'more-btn', value: "More" }, child: "More" });
        let row = Component.render({ attr: { class: 'row' }, child: cols + (_matches.length == 3 ? morebtn : '') });
        return row;
    }
}