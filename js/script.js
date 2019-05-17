const create_tag = (tag, attr, value) => {
    let _tag = document.createElement(tag);
    let _attr = document.createAttribute(attr)
    _attr.value = value;
    _tag.setAttributeNode(_attr);
    return _tag;
}

let row = create_tag("div", "id", "row");

let col = create_tag("div", "id", "column");
let item = create_tag("div", "id", "item");
let p = document.createElement("p");
p.innerHTML = "Helloooooooooooooo";
item.appendChild(p);
col.appendChild(item)
row.appendChild(col)

let col1 = create_tag("div", "id", "column");
let item1 = create_tag("div", "id", "item");
let p1 = document.createElement("p");
p1.innerHTML = "Helloooooooooooooo";
item1.appendChild(p1);
col1.appendChild(item1)
row.appendChild(col1)

let col2 = create_tag("div", "id", "column");
let item2 = create_tag("div", "id", "item");
let p2 = document.createElement("p");
p2.innerHTML = "Helloooooooooooooo";
item2.appendChild(p2);
col2.appendChild(item2)
row.appendChild(col2)

document.getElementById("section").appendChild(row);