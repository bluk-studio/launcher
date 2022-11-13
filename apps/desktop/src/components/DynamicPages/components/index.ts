import { HeroComponent } from './Hero';
import { PlayButtonComponent } from './PlayButton';

const Components: Map<String, any> = new Map();
[HeroComponent, PlayButtonComponent].forEach(({ type, component }) => {
  Components.set(type, component);
});

export { Components };