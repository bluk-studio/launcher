import ButtonComponent from './ButtonComponent.svelte';

export type IButtonComponent = BaseButton<SimpleButton> | BaseButton<PicturedButton> | BaseButton<LinkedButton>;

// Different kinds of buttons
interface BaseButton<T> {
    type: "Button";
    attributes: T;
};

interface SimpleButton {
    type: "simple";
    text: string,
};

interface LinkedButton {
    type: "link",
    text: string,
    link: string,
};

interface PicturedButton {
    type: "pictured";
    text: string,
};

export const ButtonComponentDeclaration = {
    type: "Button",
    component: ButtonComponent
}