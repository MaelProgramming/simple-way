function createButton(id, functionToExecute, content) {
    const btn = document.createElement("button");
    btn.id = id;
    btn.textContent = content;
    btn.addEventListener("click", functionToExecute);
    return btn;
}
function createView(id) {
    const div = document.createElement("div");
    div.id = id;
    return div;
}
function createParaph(id, content) {
    const paraph = document.createElement("p");
    paraph.id = id;
    paraph.innerText = content;
    return paraph;
}
function createImage(id, path, alternative) {
    const image = document.createElement("img");
    image.src = path;
    image.id = id;
    image.alt = alternative;
    return image;
}
function createInput(id, type) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    return input;
}
function createForm(id, method = "get", action = () => { }) {
    const form = document.createElement("form");
    form.id = id;
    form.method = method;
    form.onsubmit = (e) => {
        e.preventDefault(); // facultatif, évite le rechargement
        action(e);
    };
    return form;
}
function createLink(id, toGo) {
    const link = document.createElement("link");
    link.id = id;
    link.href = toGo;
    return link;
}
export { createButton as Button, createView as View, createParaph as Text, createImage as Image, createForm as Form, createLink as Link, createInput as Input };
//# sourceMappingURL=Elements.js.map