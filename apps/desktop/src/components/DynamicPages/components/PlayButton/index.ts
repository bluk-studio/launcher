import Component from './PlayButtonComponent.svelte';

export interface IPlayButtonComponent {
  type: "PlayButton";
  attributes: {
    text?: String,
  }
};

export const PlayButtonComponentDeclaration = {
  type: "PlayButton",
  component: Component,
};