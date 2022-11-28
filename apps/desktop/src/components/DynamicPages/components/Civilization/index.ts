import CivilizationComponent from './CivilizationComponent.svelte';

export interface ICivilizationComponent {
    type: "Civilization",
    attributes: {}
}

export const CivilizationComponentDeclaration = {
    type: "Civilization",
    component: CivilizationComponent,
}