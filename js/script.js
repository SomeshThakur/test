import { API } from './API.js';

let mactches_heading = Component.render({ tag: 'h1', attr: { style: 'margin-left:1em', id: 'mhd' }, child: "Loading..." });
let head_row = Component.render({ attr: { id: 'row' }, child: mactches_heading });

document.getElementById("section").innerHTML = head_row;
let matches, rows = ``;

const api = new API(BASE_URL, API_KEY);

api.createEntity('matches');
api.endpoints.matches.getAll()
    .then((res) => {
        matches = res['matches'];
        displayMatches(matches.slice(0, 3));
    }).catch((err) => {
        console.log(err);
        document.getElementById('mhd').innerHTML = "Oops! An Error Occured while fetching data.";
    });

let allMatches = () => {
    displayMatches(matches, true);
}
let displayMatches = (_matches = matches, refresh = false) => {
    let cols = ``;
    //  let unique_id, date, matchStarted, teams;
    for ({ unique_id, date, matchStarted, ...teams } of _matches) {
        let vs = Component.render({ tag: 'p', attr: { id: 'match-' + unique_id }, child: `Teams : ${teams['team-1']} vs ${teams['team-2']}` });
        let jsdate = new Date(date);
        let rdate = Component.render({ tag: 'p', attr: { id: 'date-' + unique_id }, child: "Scheduled Date : " + jsdate.toLocaleDateString() });
        let started = Component.render({ tag: 'p', attr: { id: (matchStarted ? "strd" : "nstrd") }, child: (matchStarted ? "Started" : "Not Started") });

        let item = Component.render({ attr: { id: 'item' }, child: vs + rdate + started });
        let col = Component.render({ attr: { id: 'col' }, child: item });
        cols += col;
    }
    let morebtn = Component.render({ tag: 'button', attr: { id: 'more-btn', onclick: "allMatches()", value: "More" }, child: "More" });
    let row = Component.render({ attr: { id: 'row' }, child: cols + (_matches.length == 3 ? morebtn : '') });
    head_row = head_row.replace("Loading...", "Upcoming Matches");
    rows += head_row + row;
    document.getElementById('section').innerHTML = refresh ? head_row + row : rows;
}
