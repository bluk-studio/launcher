import CounterComponent from './CounterComponent.svelte';

export interface ICounterComponent {
    type: "Counter",
    attributes: {
        text?: String,
        fetchOptions?: {
            link: string,
            interval: number,
        }
    };
};

export const CounterComponentDeclaration = {
    type: "Counter",
    component: CounterComponent,
};