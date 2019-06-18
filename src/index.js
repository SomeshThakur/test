import { Component } from './js/Component.js';
import { MatchController } from './js/MatchController.js'
import { SquadController } from './js/SquadController.js';
import { PlayingSquadController } from './js/PlayingSquadController.js'
import { PlayerController } from './js/PlayerController.js';
import './styles/style.scss';

const $ = (selector) => {
    return document.querySelector(selector);
};

let mactches_heading = Component.render({ tag: 'h1', attr: { style: 'margin-left:1em', id: 'mhd' }, child: "Loading..." });
let head_row = Component.render({ attr: { class: 'row' }, child: mactches_heading });

document.getElementById("section").innerHTML = head_row;
let rows = ``;

let matchController = new MatchController();
let squadController = new SquadController();
let playingSquadController = new PlayingSquadController();
let playerController = new PlayerController();

const bindPlayerStatBtnEvent = (players) => {
    players.forEach(({ pid }) => {
        let view_stat_btn = $(`#view-stat-${pid}`);
        if (view_stat_btn !== null) {
            view_stat_btn.addEventListener('click', () => {
                playerController.getRenderedPlayer(pid).then(res => {
                    head_row = head_row.replace("Matches", "Player Full Stats")
                    rows = head_row;
                    rows += res;
                    document.getElementById('section').innerHTML = rows;
                })
            });
        }
    });
}

const bindPlayingSquadBtnEvent = async (matches) => {
    let more_btn = $("#more-btn");
    if (more_btn !== null) {
        more_btn.addEventListener('click', () => {
            document.getElementById('section').innerHTML = head_row + matchController.getAllRenderedMatches();
            bindPlayingSquadBtnEvent(matches);
        });
    }
    matches.forEach(({ unique_id }) => {
        let squad_btn = $(`#squad-btn-${unique_id}`)
        if (squad_btn !== null) {
            squad_btn.addEventListener('click', () => {
                getSquad(unique_id).then(res => {
                    if (res.squad !== undefined) {
                        rows = head_row.replace("Matches", "Loading All Players info");
                        document.getElementById('section').innerHTML = rows;
                        rows = head_row.replace("Loading All Players info", "Playing 11 for 2 Teams ");
                        rows += playingSquadController.getAllRenderedPlayers(res.squad);
                        document.getElementById('section').innerHTML = rows;
                        bindPlayerStatBtnEvent(res.squad[0].players);
                        bindPlayerStatBtnEvent(res.squad[1].players);
                    } else {
                        alert("Squad not available");
                    }
                });
            });
        }
    });
}
const init = async () => {
    await matchController.fetchAllMatches();
    let row = matchController.getRenderedMatches();
    head_row = head_row.replace("Loading...", "Matches");
    rows += head_row
    rows += row;
    document.getElementById('section').innerHTML = rows;
    bindPlayingSquadBtnEvent(matchController.matches);
}

const getSquad = async (id) => {
    return await squadController.getSquadById(id);
}

init();