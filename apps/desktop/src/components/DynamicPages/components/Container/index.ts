import type { IComponent } from '..';
import ContainerComponent from './ContainerComponent.svelte';

export interface IContainerComponent {
    type: "Container",
    attributes: {
        direction?: 'horizontal' | 'vertical';
        align?: 'center' | 'start' | 'end';
        justify?: 'start' | 'center' | 'between' | 'evenly' | 'end';
        padding?: 'none' | 'sm' | 'md' | 'lg';
        gap?: 'none' | 'sm' | 'md';
        width?: 'auto' | 'full' | '1/3' | '2/3';
        childrens: Array<IComponent>;
    }
};

export const ContainerComponentDeclaration = {
    type: "Container",
    component: ContainerComponent,
}