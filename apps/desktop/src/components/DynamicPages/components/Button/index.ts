import ButtonComponent from './ButtonComponent.svelte';

export type IButtonComponent = BaseButton<SimpleButton> | BaseButton<PicturedButton>;

// Different kinds of buttons
interface BaseButton<T> {
    type: "Button";
    attributes: T;
};

interface SimpleButton {
    type: "simple";
};

interface PicturedButton {
    type: "pictured";
};

export const ButtonComponentDeclaration = {
    type: "Button",
    component: ButtonComponent
}