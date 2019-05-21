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