import { useState, startComponent } from "./core/state";
import { View, Text, Image } from "./core/Elements";


// Crée et ajoute la div dans le DOM
const app = View("app");
document.body.appendChild(app);

const img = Image("image", "./demo/ts_demo.png", "Text alternatif")
const text = Text("text", "Ceci est une démo de Simple Way (Framework)")

app.appendChild(img)
app.appendChild(text)

