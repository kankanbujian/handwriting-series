function render(vnode, container) {
    /**
     *  1、将vnode --> dom - node
     *  2、将dom node加到container里
     */
     console.log(vnode, container);
    const node = createNode(vnode);
    
    container.appendChild(node);
}

function createNode(vnode) {
    const {type, props} = vnode;
    let node = null;
    if (type === 'TEXT') {
        node = document.createTextNode('');
    } else if (typeof type === 'string') {
        node = document.createElement(type);
    } else if (typeof type === 'function') {
        const vvnode = type(props);
        node = createNode(vvnode);
    }
    let children = props.children;
    if (!Array.isArray(children)) {
        children = [children];
    }
    reconcileChildren(children, node);
    updateNode(node, props);
    return node;
}

function updateNode(node, props) {
    Object.keys(props).filter(_key => _key !== 'children').forEach(key => node[key] = props[key]);
}

function reconcileChildren(children, container) {
    children.forEach(_child => {
        // 生成node节电
        debugger
        if (typeof _child === 'string') {
            render({
                type: 'TEXT',
                props: {
                    children: [],
                    nodeValue: _child,
                }
            }, container);
        } else {
            render(_child, container)
        }
    })
}

export default {render};