
export default function createComponent(type: string, content: string) {
  const element = document.createElement(type);
  element.textContent = content;
  return element;
}
