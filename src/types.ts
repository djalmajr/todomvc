import { Component } from 'haunted/lib/component';
import { GenericRenderer } from 'haunted';

export type Obj = Object & Record<string, any>;

export type HTMLConstructor<T extends HTMLElement> = {
  new (...args: any[]): T;
};

export interface Renderer<P extends object> extends GenericRenderer {
  (this: Component<P>, host: Component<P>): unknown | void;
  observedAttributes?: (keyof P)[];
}
