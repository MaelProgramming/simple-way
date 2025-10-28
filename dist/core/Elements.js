// 🟢 Mini Framework UI Vanilla TS avec CSS intégré
import { Notification } from "./Notifications";
import { Database } from "./database/Database";
import { IndexedDBDriver } from "./database/IndexDB-driver";
/**
 * 🔘 Crée un bouton HTML avec gestion de classe CSS et click.
 */
function createButton(id, onClick, content, primary = true) {
    const btn = document.createElement("button");
    btn.id = id;
    btn.textContent = content;
    btn.addEventListener("click", onClick);
    btn.classList.add("muil-btn", primary ? "muil-btn-primary" : "muil-btn-secondary");
    return btn;
}
/**
 * 🧱 Crée une div (vue) générique.
 */
function createView(id) {
    const div = document.createElement("div");
    div.id = id;
    return div;
}
/**
 * 📝 Crée un paragraphe <p>.
 */
function createParaph(id, content) {
    const paraph = document.createElement("p");
    paraph.id = id;
    paraph.innerText = content;
    return paraph;
}
/**
 * 🖼️ Crée une image.
 */
function createImage(id, path, alternative) {
    const image = document.createElement("img");
    image.id = id;
    image.src = path;
    image.alt = alternative;
    return image;
}
/**
 * ⌨️ Crée un champ de saisie.
 */
function createInput(id, type) {
    const input = document.createElement("input");
    input.id = id;
    input.type = type;
    input.classList.add("muil-input");
    return input;
}
/**
 * 📤 Crée un formulaire avec gestion de submit.
 */
function createForm(id, method = "get", action = () => { }) {
    const form = document.createElement("form");
    form.id = id;
    form.method = method;
    form.onsubmit = (e) => {
        e.preventDefault();
        action(e);
    };
    return form;
}
/**
 * 🔗 Crée un lien cliquable (<a>).
 */
function createLink(id, toGo, textContent) {
    const link = document.createElement("a");
    link.id = id;
    link.href = toGo;
    link.textContent = textContent;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
}
export function createDatabase(providerName, stores = []) {
    // Ici on choisit IndexedDB comme driver pour l’instant
    const driver = new IndexedDBDriver(providerName, 1, stores);
    const db = new Database(driver);
    // On connecte la base dès la création
    db.connect().catch((err) => {
        console.error("Failed to connect to database:", err);
    });
    return db;
}
/**
 * 💬 Crée un span avec texte et classe CSS.
 */
function createSpan(id, content, cssClass) {
    const span = document.createElement("span");
    span.id = id;
    span.innerText = content;
    span.className = cssClass;
    return span;
}
/**
 * 📋 Crée une liste (ul ou ol).
 */
function createList(id, items, ordered = false) {
    const list = ordered ? document.createElement("ol") : document.createElement("ul");
    list.id = id;
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
    return list;
}
/**
 * 🪟 Crée une modale.
 */
function createModal(id, title, content) {
    const overlay = document.createElement("div");
    overlay.id = id;
    overlay.classList.add("muil-modal-overlay");
    const modalBox = document.createElement("div");
    modalBox.classList.add("muil-modal-box");
    const modalTitle = document.createElement("h3");
    modalTitle.textContent = title;
    const modalContent = document.createElement("p");
    modalContent.textContent = content;
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Fermer";
    closeBtn.classList.add("muil-btn", "muil-btn-secondary");
    closeBtn.onclick = () => (overlay.style.display = "none");
    modalBox.append(modalTitle, modalContent, closeBtn);
    overlay.appendChild(modalBox);
    return overlay;
}
/**
 * 🧭 Crée un système d'onglets (Tabs).
 */
function createTabs(id, tabs) {
    const container = document.createElement("div");
    container.id = id;
    const tabHeader = document.createElement("div");
    tabHeader.classList.add("muil-tabs-header");
    tabHeader.style.display = "flex";
    tabHeader.style.gap = "10px";
    const tabContent = document.createElement("div");
    tabContent.style.marginTop = "10px";
    tabs.forEach((tab, index) => {
        const button = document.createElement("button");
        button.textContent = tab.title;
        if (index === 0)
            button.classList.add("active");
        button.onclick = () => {
            tabContent.textContent = tab.content;
            Array.from(tabHeader.children).forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        };
        tabHeader.appendChild(button);
    });
    tabContent.textContent = tabs[0]?.content ?? "";
    container.append(tabHeader, tabContent);
    return container;
}
/**
 * 🍞 Crée le conteneur pour les toasts.
 */
function createToastContainer() {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    container.style.zIndex = "2000";
    return container;
}
/**
 * ⚡ Crée un toast (notification).
 */
function createToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = createToastContainer();
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.classList.add("muil-toast", `muil-toast-${type}`);
    container.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
Notification.create("Nouvelle alerte !", { body: "Tu as un nouveau message !" }, () => {
    console.log("Notification cliquée !");
});
/**
 * 🧭 Crée une barre de navigation.
 */
function createNavbar(id, links, background = "#1e1e1e", color = "#ffffff") {
    const nav = document.createElement("nav");
    nav.id = id;
    nav.classList.add("muil-navbar");
    nav.style.background = background;
    nav.style.color = color;
    const title = document.createElement("span");
    title.textContent = document.title || "Mon Site";
    title.style.fontWeight = "bold";
    title.style.fontSize = "1.1rem";
    const linkContainer = document.createElement("div");
    linkContainer.style.display = "flex";
    linkContainer.style.gap = "16px";
    links.forEach(link => {
        const a = document.createElement("a");
        a.textContent = link.label;
        a.href = link.href;
        a.style.color = color;
        a.style.textDecoration = "none";
        a.onmouseenter = () => a.style.opacity = "0.7";
        a.onmouseleave = () => a.style.opacity = "1";
        linkContainer.appendChild(a);
    });
    nav.append(title, linkContainer);
    return nav;
}
// 🧩 Exports
export { createButton as Button, createView as View, createParaph as Text, createImage as Image, createInput as Input, createForm as Form, createLink as Link, createSpan as Span, createList as List, createModal as Modal, createTabs as Tab, createToast as Toast, createToastContainer as ToastContainer, createNavbar as NavBar, createDatabase as DB };
//# sourceMappingURL=Elements.js.map