export type Component<P = {}> = (props: P) => HTMLElement;

type ComponentInstance = {
  hooks: any[];
  root: HTMLElement;
  component: Component;
};

export type methodForm = "Get" | "Post"