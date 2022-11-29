import type { ICustomPageThemeStore } from "src/stores";
import type { IComponent } from "../components";

export type IPage = {
    components: Array<IComponent>
    theme?: ICustomPageThemeStore,
};