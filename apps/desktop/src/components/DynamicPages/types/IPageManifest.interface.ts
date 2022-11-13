export interface IComponent {
  type: String,
  atttributes: Record<string, string | object | boolean>,
};

export type IPage = Array<IComponent>;