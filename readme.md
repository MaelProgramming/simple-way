# Simple Way

**Simple Way** is a lightweight JavaScript/TypeScript framework to easily create DOM components: `View`, `Button`, `Form`, `Input`, `Text`, and `Link`.  
It’s simple, fast, and usable in any front-end project.

---

## 🚀 Installation

### From GitHub
```bash
npm install github:MaelProgramming/simple-way
```
From npm (once published)
```bash
npm install simple-way
```
### Basic Exemples

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test Simple Way</title>
</head>
<body>
  <script type="module">
    import { View, Button, Input } from "https://unpkg.com/@maelgruand/simple-way/dist/index.js";

    const app = View("app");
    document.body.appendChild(app);
    const input = Input("name", "text")
    const btn = Button("btn1", () => alert(`Hello ${input.value}`), "Click me");
    app.appendChild(input)
    app.appendChild(btn);
  </script>
</body>
</html>

```
### ⚡ Avalaible components
| Component                  | Description                                                |
|----------------------------|------------------------------------------------------------|
| `View(id)`                 | Creates a `<div>` with a specific id                       |
| `Text(id, content)`        | Creates a `<p>` element with given content                 |
| `Input(id, type)`          | Creates an `<input>` of type text, password, checkbox, etc.|
| `Button(id, functionToExecute, content)` | Creates a `<button>` with a click callback and text |
| `Form(title, method, onSubmit)` | Creates a `<form>` with a title, method (`get`/`post`), and onsubmit callback |
| `Link(id, href, content)`  | Creates an `<a>` element with a link and text             |

![npm](https://img.shields.io/npm/v/@maelgruand/simple-way)
![License](https://img.shields.io/npm/l/@maelgruand/simple-way)