import CounterComponent from './CounterComponent.svelte';

export interface ICounterComponent {
    type: "Counter",
    attributes: {
        text: String,
    };
};

export const CounterComponentDeclaration = {
    type: "Counter",
    component: CounterComponent,
};