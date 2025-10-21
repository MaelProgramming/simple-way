/**
 * 🔘 Crée un bouton HTML avec un gestionnaire d'événement "click".
 * @param id - Identifiant unique du bouton.
 * @param functionToExecute - Fonction à exécuter lors du clic.
 * @param content - Texte affiché sur le bouton.
 */
function createButton(id, functionToExecute, content) {
    const btn = document.createElement("button");
    btn.id = id;
    btn.textContent = content;
    btn.addEventListener("click", functionToExecute);
    return btn;
}
/**
 * 🧱 Crée une div (vue) générique pour contenir d'autres éléments.
 * @param id - Identifiant unique de la div.
 */
function createView(id) {
    const div = document.createElement("div");
    div.id = id;
    return div;
}
/**
 * 📝 Crée un paragraphe <p> avec un texte.
 * @param id - Identifiant unique du paragraphe.
 * @param content - Contenu textuel du paragraphe.
 */
function createParaph(id, content) {
    const paraph = document.createElement("p");
    paraph.id = id;
    paraph.innerText = content;
    return paraph;
}
/**
 * 🖼️ Crée une image avec un chemin et un texte alternatif.
 * @param id - Identifiant unique de l'image.
 * @param path - Source (src) de l'image.
 * @param alternative - Texte alternatif (alt).
 */
function createImage(id, path, alternative) {
    const image = document.createElement("img");
    image.src = path;
    image.id = id;
    image.alt = alternative;
    return image;
}
/**
 * ⌨️ Crée un champ de saisie HTML.
 * @param id - Identifiant unique.
 * @param type - Type de champ (text, password, number, etc.).
 */
function createInput(id, type) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    return input;
}
/**
 * 📤 Crée un formulaire avec gestion d'événement "submit".
 * @param id - Identifiant unique.
 * @param method - Méthode HTTP ("get" ou "post").
 * @param action - Fonction à exécuter lors de la soumission.
 */
function createForm(id, method = "get", action = () => { }) {
    const form = document.createElement("form");
    form.id = id;
    form.method = method;
    // Empêche le rechargement et exécute la fonction d’action
    form.onsubmit = (e) => {
        e.preventDefault();
        action(e);
    };
    return form;
}
/**
 * 🔗 Crée un lien cliquable (<a>).
 * @param id - Identifiant unique du lien.
 * @param toGo - URL vers laquelle le lien doit pointer.
 * @returns Un élément <a> prêt à être inséré dans le DOM.
 */
function createLink(id, toGo, textContent) {
    const link = document.createElement("a"); // Création du lien
    link.id = id; // Attribution de l'ID
    link.href = toGo; // URL cible
    link.textContent = textContent; // Affiche l'URL comme texte par défaut
    link.target = "_blank"; // Ouvre dans un nouvel onglet
    link.rel = "noopener noreferrer"; // Sécurité pour les liens externes
    return link;
}
/**
 * 💬 Crée un span avec texte et classe CSS.
 * @param id - Identifiant unique.
 * @param content - Texte à afficher.
 * @param cssClass - Classe CSS pour le style.
 */
function createSpan(id, content, cssClass) {
    const span = document.createElement("span");
    span.innerText = content;
    span.id = id;
    span.className = cssClass;
    return span;
}
/**
 * 📋 Crée une liste non ordonnée (<ul>) ou ordonnée (<ol>).
 * @param id - Identifiant unique.
 * @param items - Éléments à inclure dans la liste.
 * @param ordered - Si true, crée une <ol> au lieu d’une <ul>.
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
 * 🪟 Crée une fenêtre modale simple avec titre et contenu.
 * @param id - Identifiant unique.
 * @param title - Titre de la fenêtre.
 * @param content - Contenu à afficher dans la modale.
 */
function createModal(id, title, content) {
    // Fond semi-transparent
    const overlay = document.createElement("div");
    overlay.id = id;
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.4)";
    overlay.style.display = "none";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";
    // Boîte de contenu
    const modalBox = document.createElement("div");
    modalBox.style.background = "#fff";
    modalBox.style.padding = "20px";
    modalBox.style.borderRadius = "12px";
    modalBox.style.width = "300px";
    modalBox.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    modalBox.style.textAlign = "center";
    // Titre et texte
    const modalTitle = document.createElement("h3");
    modalTitle.textContent = title;
    const modalContent = document.createElement("p");
    modalContent.textContent = content;
    // Bouton de fermeture
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Fermer";
    closeBtn.onclick = () => (overlay.style.display = "none");
    modalBox.append(modalTitle, modalContent, closeBtn);
    overlay.appendChild(modalBox);
    return overlay;
}
/**
 * 🧭 Crée un système d'onglets (Tabs) basique.
 * @param id - Identifiant unique.
 * @param tabs - Tableau d’onglets avec titre et contenu.
 */
function createTabs(id, tabs) {
    const container = document.createElement("div");
    container.id = id;
    const tabHeader = document.createElement("div");
    tabHeader.style.display = "flex";
    tabHeader.style.gap = "10px";
    tabHeader.style.cursor = "pointer";
    const tabContent = document.createElement("div");
    tabContent.style.marginTop = "10px";
    tabs.forEach((tab, index) => {
        const button = document.createElement("button");
        button.textContent = tab.title;
        button.style.padding = "6px 12px";
        button.style.borderRadius = "6px";
        button.style.border = "1px solid #ccc";
        button.style.background = index === 0 ? "#ddd" : "#f9f9f9";
        // Changement de contenu à chaque clic
        button.onclick = () => {
            tabContent.textContent = tab.content;
            Array.from(tabHeader.children).forEach(btn => btn.style.background = "#f9f9f9");
            button.style.background = "#ddd";
        };
        tabHeader.appendChild(button);
    });
    // Contenu du premier onglet par défaut
    tabContent.textContent = tabs[0]?.content ?? "";
    container.append(tabHeader, tabContent);
    return container;
}
/**
 * 🍞 Crée le conteneur principal pour les toasts.
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
 * ⚡ Crée un toast (notification temporaire).
 * @param message - Texte du message.
 * @param type - Type de notification : success | error | info.
 */
function createToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = createToastContainer();
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.padding = "10px 16px";
    toast.style.borderRadius = "8px";
    toast.style.color = "#fff";
    toast.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    const colors = {
        success: "#4CAF50",
        error: "#F44336",
        info: "#2196F3",
    };
    toast.style.background = colors[type];
    container.appendChild(toast);
    // Apparition
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
    });
    // Disparition automatique après 3 secondes
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
/**
 * 🧭 Crée une barre de navigation simple et stylée.
 * @param id - Identifiant unique.
 * @param links - Tableau de liens {label, href}.
 * @param background - Couleur d’arrière-plan.
 * @param color - Couleur du texte.
 */
function createNavbar(id, links, background = "#1e1e1e", color = "#ffffff") {
    const nav = document.createElement("nav");
    nav.id = id;
    nav.style.display = "flex";
    nav.style.justifyContent = "space-between";
    nav.style.alignItems = "center";
    nav.style.padding = "10px 20px";
    nav.style.background = background;
    nav.style.color = color;
    nav.style.position = "sticky";
    nav.style.top = "0";
    nav.style.zIndex = "100";
    // Logo / titre du site
    const title = document.createElement("span");
    title.textContent = document.title || "Mon Site";
    title.style.fontWeight = "bold";
    title.style.fontSize = "1.1rem";
    // Conteneur de liens
    const linkContainer = document.createElement("div");
    linkContainer.style.display = "flex";
    linkContainer.style.gap = "16px";
    // Création de chaque lien
    links.forEach(link => {
        const a = document.createElement("a");
        a.textContent = link.label;
        a.href = link.href;
        a.style.color = color;
        a.style.textDecoration = "none";
        a.style.transition = "0.2s";
        a.onmouseenter = () => (a.style.opacity = "0.7");
        a.onmouseleave = () => (a.style.opacity = "1");
        linkContainer.appendChild(a);
    });
    nav.append(title, linkContainer);
    return nav;
}
// 🧩 Exporte toutes les fonctions sous forme de composants de ton mini framework
export { createButton as Button, createView as View, createParaph as Text, createImage as Image, createForm as Form, createLink as Link, createInput as Input, createSpan as Span, createList as List, createModal as Modal, createTabs as Tab, createToast as Toast, createToastContainer as ToastContainer, createNavbar as NavBar };
//# sourceMappingURL=Elements.js.map