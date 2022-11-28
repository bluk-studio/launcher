import PostComponent from './PostComponent.svelte';

export interface IPostComponent {
    type: "Post",
    attributes: {

    }
};

export const PostComponentDeclaration = {
    type: "Post",
    component: PostComponent,
}