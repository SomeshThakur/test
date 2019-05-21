const Component = {
    render: ({ tag, attr, child }) => {
        _tag = tag == undefined ? `div` : `${tag}`;
        // Inner Child of tag
        _child = child == undefined ? `` : `${child}`;
        // Basic attributes of tag
        _attr = ``;
        for (prop in attr) {
            _attr += ` ${prop}='${attr[prop]}' `;
        }
        // Final render of HTML
        return `<${_tag} ${_attr}>${_child}</${_tag}> `;
    }
}
const API_KEY = "Tz932UboR9er74b7svXEKKFNZu72";

let mactches_heading = Component.render({ tag: 'h1', attr: { style: 'margin-left:1em', id: 'mhd' }, child: "Loading..." });
let head_row = Component.render({ attr: { id: 'row' }, child: mactches_heading });

document.getElementById("section").innerHTML = head_row;
let matches, rows = ``;

fetch(`https://cricapi.com/api/matches?apikey=${API_KEY}`)
    .then(res => res.json())
    .then((res) => {
        matches = res['matches'];
        displayMatches(matches.slice(0, 3));
    }).catch(() => {
        document.getElementById('mhd').innerHTML = "Oops! An Error Occured while fetching data.";
    });

let allMatches = () => {
    displayMatches(matches, refresh = true);
}

let displayMatches = (_matches = matches) => {
    let cols = ``;
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

async function fetchPlayer(PID) {
    return await fetch(`http://cricapi.com/api/playerStats?pid=${PID}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then((res) => renderPlayer(res)).catch(() => {
            document.getElementById('mhd').innerHTML = "Oops! An Error Occured while fetching data.";
        });
};
const SACHIN_PID = 35320;
const VIRAT_PID = 253802;
const HPANDYA_PID = 625371;
let sachin = ``, virat = ``, hpandya = ``;
const getAllPlayers = async () => {
    sachin = await fetchPlayer(SACHIN_PID);
    virat = await fetchPlayer(VIRAT_PID);
    hpandya = await fetchPlayer(HPANDYA_PID);
    return sachin + virat + hpandya;
}
let renderPlayer = ({ pid, imageURL, fullName, born, playingRole, profile, country }) => {
    let img = Component.render({ tag: "img", attr: { id: 'imgPlayer', src: imageURL } });
    let name = Component.render({ tag: "h1", attr: { id: "name-" + pid }, child: fullName });
    let info = Component.render({ tag: "p", attr: { id: "info-" + pid }, child: profile });
    let pr = Component.render({ tag: "p", attr: { id: "pr-" + pid }, child: playingRole });
    let bday = Component.render({ tag: "p", attr: { id: "bday-" + pid }, child: born });
    let land = Component.render({ tag: "p", attr: { id: "land-" + pid }, child: country });
    let item = Component.render({ tag: "item", attr: { id: "item" }, child: img + name + pr + bday + land + info });
    return item;
}

let players_heading = Component.render({ tag: 'h1', attr: { style: 'margin-left:1em', id: 'phd' }, child: "Players" });
getAllPlayers().then((all) => {
    rows += Component.render({ attr: { id: 'row' }, child: players_heading })
    rows += Component.render({ attr: { id: "row" }, child: all });
    document.getElementById('section').innerHTML = rows;
});
