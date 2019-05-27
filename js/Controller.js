import { Component } from './Component.js';
export class MatchController {
    constructor(matches) {
        this.matches = matches;
        this.rows = ``;
    }
    getAllRenderedMatches() {
        return this.getRenderedMatches(this.matches, true);
    }
    getRenderedMatches(_matches = this.matches) {
        let cols = ``;

        //  let unique_id, date, matchStarted, teams;
        for (let { unique_id, date, matchStarted, ...teams } of _matches) {

            let vs = Component.render({ tag: 'p', attr: { id: 'match-' + unique_id }, child: `Teams : ${teams['team-1']} vs ${teams['team-2']}` });
            let jsdate = new Date(date);
            let rdate = Component.render({ tag: 'p', attr: { id: 'date-' + unique_id }, child: "Scheduled Date : " + jsdate.toLocaleDateString() });
            let started = Component.render({ tag: 'p', attr: { id: (matchStarted ? "strd" : "nstrd") }, child: (matchStarted ? "Started" : "Not Started") });
            let item = Component.render({ attr: { class: 'item' }, child: vs + rdate + started });
            let col = Component.render({ attr: { class: 'col' }, child: item });
            cols += col;
        }
        let morebtn = Component.render({ tag: 'button', attr: { id: 'more-btn', value: "More" }, child: "More" });
        let row = Component.render({ attr: { class: 'row' }, child: cols + (_matches.length == 3 ? morebtn : '') });

        return row;
    }
}