let nextUnitOfWork = null;
let wipRoot = null;
//


function render(vnode, container) {
    /**
     *  1、将vnode --> dom - node
     *  2、将dom node加到container里
     */
    //  console.log(vnode, container);
    // const node = createNode(vnode);
    
    // container.appendChild(node);
    wipRoot = {
        node: container,
        props: {
            children: [vnode]
        }
    }
    nextUnitOfWork = wipRoot;
}

function createNode(fiber) {
    const {type, props} = fiber;
    let node = null;
    if (type === 'TEXT') {
        node = document.createTextNode('');
    } else if (typeof type === 'string') {
        node = document.createElement(type);
    } else if (typeof type === 'function') {
        const vvnode = type(props);
        node = createNode(vvnode);
    }
    
    updateNode(node, props);
    return node;
}

function updateNode(node, props) {
    Object.keys(props).filter(_key => _key !== 'children').forEach(key => node[key] = props[key]);
}

function reconcileChildren(children, fiber) {
    // children是vdom结构
    let prevFiber = null;
    children.forEach(_child => {
        // 生成node节点
        const newFiber = {
            type: _child.type,
            return: fiber,
            node: null,
            props: _child.props,
            base: null,
            effectTag: 'ADD',
        }
        if (typeof _child === 'string') {
            newFiber.type = 'TEXT';
            newFiber.props =  {
                children: [],
                nodeValue: _child,
            }
        } 
        if (!prevFiber) {
            fiber.child = newFiber;
        } else {
            prevFiber.sibling = newFiber;
        }
        
        prevFiber = newFiber;
    })
}


function updateHostComponent(fiber) {
    const { type } = fiber;
    if (!fiber.node) {
        fiber.node = createNode(fiber);
    }
    
    let children = fiber.props.children;
    if (children && !Array.isArray(children)) {
        children = [children];
    }
    if (children) {
        reconcileChildren(children, fiber);
    }
}



function performUnitOfWork(fiber) {
    console.log('fiber--', fiber);
    // 这里构造一个个
    //  构造当前fiber
    const { type } = fiber;
     if (typeof type === 'function') {
        // return updateFunctionComponent(fiber);
    } else {
        updateHostComponent(fiber)
    }
    // 这里返回一个个fiber结构
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return;
    }
}

function  workLoop(deadline) {
    while(nextUnitOfWork && deadline.timeRemaining() > 1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot(wipRoot.child);
    }
    debugger
    wipRoot = null;
}

function commitRoot(fiber) {
    if (!fiber) return;
    let parentFiber = fiber.return;
    while(!parentFiber.node) {
        parentFiber = parentFiber.return;
    }

    const parentNode = parentFiber.node;
    if (fiber.effectTag === 'ADD' && fiber.node !== null) {
        parentNode.appendChild(fiber.node);
    }

    commitRoot(fiber.child);
    commitRoot(fiber.sibling);
}


requestIdleCallback(workLoop)


export default {render};