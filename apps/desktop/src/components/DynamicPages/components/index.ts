// Importing all components and making new map from them
import { HeroComponentDeclaration } from './Hero';
import { PlayButtonComponentDeclaration } from './PlayButton';
import { TextComponentDeclaration } from './Text';
import { CounterComponentDeclaration } from './Counter';
import { ContainerComponentDeclaration } from './Container';
import { PostComponentDeclaration } from './Post';
import { CivilizationComponentDeclaration } from './Civilization';
import { ButtonComponentDeclaration } from './Button';

const Components: Map<String, any> = new Map();
[ButtonComponentDeclaration, CivilizationComponentDeclaration, HeroComponentDeclaration, PlayButtonComponentDeclaration, TextComponentDeclaration, CounterComponentDeclaration, ContainerComponentDeclaration,PostComponentDeclaration].forEach(({ type, component }) => {
  Components.set(type, component);
});

export { Components };

// Importing <>ComponentPayload types and exporting them
import type { IHeroComponent } from './Hero';
import type { IPlayButtonComponent } from './PlayButton';
import type { ITextComponent } from './Text';
import type { ICounterComponent } from './Counter';
import type { IContainerComponent } from './Container';
import type { IPostComponent } from './Post';
import type { ICivilizationComponent } from './Civilization';
import type { IButtonComponent } from './Button';

export type IComponent = IHeroComponent | IPlayButtonComponent | ITextComponent | ICounterComponent | IContainerComponent | IPostComponent | ICivilizationComponent | IButtonComponent;