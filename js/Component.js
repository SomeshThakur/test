export const Component = {
    render: ({ tag, attr, child }) => {
        let _tag = tag == undefined ? `div` : `${tag}`;
        // Inner Child of tag
        let _child = child == undefined ? `` : `${child}`;
        // Basic attributes of tag
        let _attr = ``;
        for (let prop in attr) {
            _attr += ` ${prop}='${attr[prop]}' `;
        }
        // Final render of HTML
        return `<${_tag} ${_attr}>${_child}</${_tag}> `;
    }
}