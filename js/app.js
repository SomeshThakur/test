import { Component } from './Component.js';
import { MatchController } from './MatchController.js'
import { SquadController } from './SquadController.js';

let $ = (selector) => {
    return document.querySelector(selector);
};

let mactches_heading = Component.render({ tag: 'h1', attr: { style: 'margin-left:1em', id: 'mhd' }, child: "Loading..." });
let head_row = Component.render({ attr: { class: 'row' }, child: mactches_heading });

document.getElementById("section").innerHTML = head_row;
let rows = ``;

let matchController = new MatchController();
let squadController = new SquadController();

let bindEvents = async (matches) => {
    let more_btn = $("#more-btn");
    if (more_btn !== null) {
        more_btn.onclick = () => {
            document.getElementById('section').innerHTML = head_row + matchController.getAllRenderedMatches();
            bindEvents(matches);
        }
    }

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
                }).catch(err => {
                    console.log(err)
                    alert("Squad not available")
                });
            }
        } catch (err) {
        }
    }
}

let init = async () => {
    await matchController.fetchAllMatches();
    let row = matchController.getRenderedMatches();
    head_row = head_row.replace("Loading...", "Matches");
    rows += head_row
    rows += row;
    document.getElementById('section').innerHTML = rows;
    bindEvents(matchController.matches);
}

let getSquad = async (id) => {
    return await squadController.getSquadById(id);
}

init();