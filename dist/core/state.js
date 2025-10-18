let currentComponent = null;
let hookIndex = 0;
export function startComponent(component, rootSelector) {
    const root = document.querySelector(rootSelector);
    if (!root)
        throw new Error(`Root element ${rootSelector} not found`);
    const instance = { hooks: [], root, component };
    currentComponent = instance;
    hookIndex = 0;
    const element = component({});
    root.innerHTML = "";
    root.appendChild(element);
}
export function useState(initialValue) {
    const hooks = currentComponent.hooks;
    if (hooks[hookIndex] === undefined) {
        hooks[hookIndex] = initialValue;
    }
    const currentIndex = hookIndex;
    const setState = (newValue) => {
        hooks[currentIndex] = newValue;
        rerender();
    };
    const value = hooks[hookIndex];
    hookIndex++;
    return [value, setState];
}
function rerender() {
    if (!currentComponent)
        return;
    const { component, root } = currentComponent;
    hookIndex = 0;
    const newTree = component();
    root.innerHTML = "";
    root.appendChild(newTree);
}
//# sourceMappingURL=state.js.map