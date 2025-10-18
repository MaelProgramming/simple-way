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
export { createButton as Button, createView as View, createParaph as Text, createImage as Image };
//# sourceMappingURL=Elements.js.map