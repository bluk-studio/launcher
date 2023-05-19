import type { IComponent } from "./components/Component";
import type { IPageTheme } from "./PageTheme";

export interface IPage {
    components: Array<IComponent>,
    theme?: IPageTheme,  
};