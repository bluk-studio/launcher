import TextComponent from './TextComponent.svelte';

export interface ITextComponent {
    type: "Text";
    attributes: {
        text: String,
        color?: String,
        size?: 'sm' | 'normal' | 'medium' | 'huge',
    };
};

export const TextComponentDeclaration = {
    type: "Text",
    component: TextComponent,
}