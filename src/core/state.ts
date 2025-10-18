// core/render.ts
import type { Component } from "./type";

let currentComponent: any = null;
let hookIndex = 0;

export function startComponent(component: Component, rootSelector: string) {
  const root = document.querySelector(rootSelector) as HTMLElement | null;
  if (!root) throw new Error(`Root element ${rootSelector} not found`);

  const instance = { hooks: [] as any[], root, component };
  currentComponent = instance;
  hookIndex = 0;

  const element = component({});
  root.innerHTML = "";
  root.appendChild(element);
}

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
  const hooks = currentComponent.hooks;

  if (hooks[hookIndex] === undefined) {
    hooks[hookIndex] = initialValue;
  }

  const currentIndex = hookIndex;

  const setState = (newValue: T) => {
    hooks[currentIndex] = newValue;
    rerender();
  };

  const value = hooks[hookIndex];
  hookIndex++;

  return [value, setState];
}

function rerender() {
  if (!currentComponent) return;

  const { component, root } = currentComponent;
  hookIndex = 0;
  const newTree = component();

  root.innerHTML = "";
  root.appendChild(newTree);
}
