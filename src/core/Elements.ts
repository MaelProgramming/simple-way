
function createButton(id: string, functionToExecute: () => void, content: string): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.id = id;
  btn.textContent = content;
  btn.addEventListener("click", functionToExecute);
  return btn;
}
function createView(id: string): HTMLDivElement {
  const div = document.createElement("div");
  div.id = id
  return div;
}
function createParaph(id: string, content: string){
    const paraph = document.createElement("p")
    paraph.id = id
    paraph.innerText = content
    return paraph
}

function createImage(id: string, path: string, alternative: string){
  const image = document.createElement("img")
  image.src = path
  image.id = id
  image.alt = alternative
  return image
}
export {createButton as Button, createView as View, createParaph as Text, createImage as Image}
