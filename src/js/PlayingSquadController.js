import { Component } from './Component.js'
export class PlayingSquadController {
    getAllRenderedPlayers(squad) {
        let cols = ``;
        let team1 = Component.render({ tag: 'h1', attr: { style: 'margin-left:1em', id: 'team-1-name' }, child: `${squad[0].name}` });
        let head_row1 = Component.render({ attr: { class: 'row' }, child: team1 });
        cols = this.getRenderedPlayers(squad[0].players);
        let row1 = Component.render({ attr: { class: 'row' }, child: cols });
        let team2 = Component.render({ tag: 'h1', attr: { style: 'margin-left:1em', id: 'team-2-name' }, child: `${squad[1].name}` });
        let head_row2 = Component.render({ attr: { class: 'row' }, child: team2 });
        cols = this.getRenderedPlayers(squad[1].players);
        let row2 = Component.render({ attr: { class: 'row' }, child: cols });
        return head_row1 + row1 + head_row2 + row2;
    }

    getRenderedPlayers(players) {
        let cols = ``;
        players.forEach(({ name, pid }) => {
            let fullname = Component.render({ tag: 'h3', attr: { class: `player-name`, id: `player-name-${pid}` }, child: `${name}` });
            let view_stat = Component.render({ tag: 'button', attr: { id: `view-stat-${pid}`, class: 'player-stat-btn', value: 'View Stats' }, child: 'View Stats' })
            let item = Component.render({ attr: { class: 'item' }, child: fullname + view_stat })
            let col = Component.render({ attr: { class: 'col' }, child: item });
            cols += col;
        });
        return cols
    }
}
