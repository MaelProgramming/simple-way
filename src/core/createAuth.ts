import { Text, Button, View, Form, Link, Input } from "./Elements";

const auth = Form("Login Form", "post", (e) => {
  e.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;
  const acceptCondition = (document.getElementById("condition") as HTMLInputElement).checked;

  if (name === "mael" && password === "test" && acceptCondition) {
    alert("✅ Authentifié !")
  } else {
    alert("❌ Erreur d'authentification !");
  }
});
auth.style.border = "1px solid #333";
auth.style.padding = "20px";
auth.style.margin = "20px";

// Ajout des champs AVANT export
const nameInput = Input("name", "text");
const passwordInput = Input("password", "password");
const acceptInput = Input("condition", "checkbox");
const submitButton = Button(
  "submitButton",
  () => {
    console.log("Formulaire soumis !");
  },
  "Se connecter"
);

auth.appendChild(nameInput);
auth.appendChild(passwordInput);
auth.appendChild(acceptInput);
auth.appendChild(submitButton);

export { auth };
