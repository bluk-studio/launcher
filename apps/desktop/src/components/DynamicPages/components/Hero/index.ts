import type { IComponent } from '..';
import Component from './HeroComponent.svelte';

export interface IHeroComponent {
  type: "Hero";
  attributes: {
    title: String,
    subtitle: String,
    withGameImage: Boolean,
    subcomponents: Array<IComponent>,
  }
};

export const HeroComponentDeclaration = {
  type: "Hero",
  component: Component,
};