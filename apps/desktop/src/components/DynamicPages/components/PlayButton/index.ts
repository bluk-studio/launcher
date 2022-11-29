import Component from './PlayButtonComponent.svelte';

export interface IPlayButtonComponent {
  type: "PlayButton";
  attributes: {}
};

export const PlayButtonComponentDeclaration = {
  type: "PlayButton",
  component: Component,
};