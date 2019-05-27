import { API } from './API.js';
import { Component } from './Component.js';
import { MatchController } from './MatchController.js'
import { Constant } from './Constants.js'
import { SquadController } from './SquadController.js';

let $ = (selector) => {
    return document.querySelector(selector);
};

let mactches_heading = Component.render({ tag: 'h1', attr: { style: 'margin-left:1em', id: 'mhd' }, child: "Loading..." });
let head_row = Component.render({ attr: { class: 'row' }, child: mactches_heading });

document.getElementById("section").innerHTML = head_row;
let matches, rows = ``;

const api = new API(Constant.BASE_URL, Constant.API_KEY);
let squadController = new SquadController();
api.createEntity('matches');
let matchController;
api.endpoints.matches.getAll()
    .then((res) => {
        matches = res['matches'];
        matchController = new MatchController(matches);
        head_row = head_row.replace("Loading...", "Upcoming Matches");
        rows += head_row
        rows += matchController.getRenderedMatches(matches.slice(0, 3));
        document.getElementById('section').innerHTML = rows
        bindEvents();
    })
    .catch((err) => {
        console.log(err);
        document.getElementById('mhd').innerHTML = "Oops! An Error Occured while fetching data.";
    });
let refresh = true;
let bindEvents = async () => {
    if (refresh) $("#more-btn").onclick = () => { document.getElementById('section').innerHTML = head_row + matchController.getAllRenderedMatches(); refresh = false; bindEvents(); };
    for (let { unique_id } of matches) {
        try {
            document.getElementById('#squad-btn-' + unique_id).onclick = () => {
                getSquad(unique_id).then(res => {
                    let msg = ``;
                    let names1 = ``;
                    for (let { name } of res.squad[0].players) {
                        names1 += "| " + name + " |\n";
                    }
                    msg += `Team 1 :\n` + names1 + "\n";
                    let names2 = ``;
                    for (let { name } of res.squad[1].players) {
                        names2 += "| " + name + " |\n";
                    }
                    msg += `Team 2 :\n` + names2;
                    alert(msg);
                });
            }
        } catch (err) {
        }
    }
}

let getSquad = async (id) => {
    return await squadController.getSquadById(id);
}