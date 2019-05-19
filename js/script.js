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
        //Final render of HTML
        return `<${_tag} ${_attr}>${_child}</${_tag}> `
    }
}

let all_news = ["India and England my joint second-favourites for World Cup: Gautam Gambhir", "Retired Dwayne Bravo Included In Windies Reserves For World Cup 2019", "Ravichandran Ashwin Set To Play For Nottinghamshire"]

let news1 = Component.render({ tag: `p`, attr: { id: `msg` }, child: all_news[0] });
let news2 = Component.render({ tag: 'p', attr: { id: `msg` }, child: all_news[1] });
let news3 = Component.render({ tag: 'p', attr: { id: `msg` }, child: all_news[2] });

let img1 = Component.render({ tag: 'img', attr: { src: './assets/news-1.jpg' } })
let img2 = Component.render({ tag: 'img', attr: { src: './assets/news-2.jpg' } })
let img3 = Component.render({ tag: 'img', attr: { src: './assets/news-3.jpg' } })

let button = Component.render({ tag: 'button', attr: { onClick: `alert("To Be added soon");` }, child: 'Read More' })

let option1 = Component.render({ tag: 'option', attr: { value: 'Kholi' }, child: 'Kholi' });
let option2 = Component.render({ tag: 'option', attr: { value: 'Dhoni' }, child: 'Dhoni' });
let option3 = Component.render({ tag: 'option', attr: { value: 'Jadeja' }, child: 'Jadeja' });
let option4 = Component.render({ tag: 'option', attr: { value: 'Dhawan' }, child: 'Dhawan' });
let select = Component.render({ tag: 'select', attr: { name: 'team' }, child: option1 + option2 + option3 + option4 });

let item1 = Component.render({ attr: { id: 'item' }, child: img1 + news1 + select + button })
let item2 = Component.render({ attr: { id: 'item' }, child: img2 + news2 + button })
let item3 = Component.render({ attr: { id: 'item' }, child: img3 + news3 + button })

let col1 = Component.render({ attr: { id: 'col' }, child: item1 })
let col2 = Component.render({ attr: { id: 'col' }, child: item2 })
let col3 = Component.render({ attr: { id: 'col' }, child: item3 })

let row = Component.render({ attr: { id: 'row' }, child: col1 + col2 + col3 })

document.getElementById("section").innerHTML = row;