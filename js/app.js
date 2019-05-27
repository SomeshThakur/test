import { API } from './API.js';
import { Component } from './Component.js';
import { MatchController } from './Controller.js'
import { Constant } from './Constants.js'

var $ = function (selector) {
    return document.querySelector(selector);
};

let mactches_heading = Component.render({ tag: 'h1', attr: { style: 'margin-left:1em', id: 'mhd' }, child: "Loading..." });
let head_row = Component.render({ attr: { class: 'row' }, child: mactches_heading });

document.getElementById("section").innerHTML = head_row;
let rows = ``;

const api = new API(Constant.BASE_URL, Constant.API_KEY);
api.createEntity('matches');
api.endpoints.matches.getAll()
    .then((res) => {
        let matches = res['matches'];
        const matchController = new MatchController(matches);
        head_row = head_row.replace("Loading...", "Upcoming Matches");
        rows += head_row
        rows += matchController.getRenderedMatches(matches.slice(0, 3));
        document.getElementById('section').innerHTML = rows
        $("#more-btn").onclick = () => document.getElementById('section').innerHTML = head_row + matchController.getAllRenderedMatches();

    })
    .catch((err) => {
        console.log(err);
        document.getElementById('mhd').innerHTML = "Oops! An Error Occured while fetching data.";
    });
