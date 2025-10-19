import { View, Text, Image, Button } from "./core/Elements.js";
const createV = document.getElementById("createDiv");
const createButt = document.getElementById("createButton");
const createImg = document.getElementById("createImage");
const createTxt = document.getElementById("createText");
const toggleCode = document.getElementById("toggleCode");
const editor = document.getElementById("editor");
const codeEditor = document.getElementById("codeEditor");
const codeArea = document.getElementById("codeArea");
const applyCode = document.getElementById("applyCode");
// === Fonction pour ajouter un élément ===
function addElement(element) {
    element.draggable = true;
    // clic droit → suppression
    element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (confirm("Supprimer cet élément ?"))
            element.remove();
        updateCode();
    });
    // double clic → édition du texte
    element.addEventListener("dblclick", () => {
        if (element instanceof HTMLParagraphElement || element instanceof HTMLButtonElement || element instanceof HTMLDivElement) {
            const newText = prompt("Nouveau texte :", element.textContent || "");
            if (newText !== null)
                element.textContent = newText;
            updateCode();
        }
    });
    editor.appendChild(element);
    updateCode();
}
// === Drag & Drop ===
elementDragSetup();
function elementDragSetup() {
    editor.addEventListener("dragover", (e) => e.preventDefault());
    editor.addEventListener("drop", (e) => {
        e.preventDefault();
        const id = e.dataTransfer?.getData("text/plain");
        const element = document.getElementById(id);
        if (element) {
            const rect = editor.getBoundingClientRect();
            element.style.position = "absolute";
            element.style.left = `${e.clientX - rect.left - element.offsetWidth / 2}px`;
            element.style.top = `${e.clientY - rect.top - element.offsetHeight / 2}px`;
            updateCode();
        }
    });
}
// === Fonctions de création ===
createV?.addEventListener("click", () => {
    const div = View(`view-${Date.now()}`);
    div.textContent = "Nouvelle View";
    div.style.background = "#e0e0e0";
    div.style.padding = "10px";
    div.style.borderRadius = "6px";
    addElement(div);
});
createButt?.addEventListener("click", () => {
    const btn = Button(`btn-${Date.now()}`, () => alert("Bouton cliqué !"), "Clique-moi");
    addElement(btn);
});
createTxt?.addEventListener("click", () => {
    const txt = Text(`text-${Date.now()}`, "Ceci est un texte généré.");
    addElement(txt);
});
createImg?.addEventListener("click", () => {
    const img = Image(`img-${Date.now()}`, "../demo/ts.png", "Image générée");
    img.style.borderRadius = "8px";
    img.style.cursor = "move";
    addElement(img);
});
// === Mise à jour du code HTML ===
function updateCode() {
    codeArea.value = editor.innerHTML.trim();
}
// === Appliquer le code manuellement ===
applyCode?.addEventListener("click", () => {
    editor.innerHTML = codeArea.value;
    updateCode();
});
// === Bascule entre mode visuel et code ===
toggleCode?.addEventListener("click", () => {
    const showingCode = codeEditor.style.display === "flex";
    codeEditor.style.display = showingCode ? "none" : "flex";
    editor.style.display = showingCode ? "block" : "none";
    toggleCode.textContent = showingCode ? "💻 CODE" : "🧱 VISUEL";
    updateCode();
});
//# sourceMappingURL=index.js.map