import { Injectable } from '@angular/core';
import { DynamicFormFieldComponentConfig } from '../dynamic-form.types';

interface DynamicFormFieldComponentConfigMap {
  [key: string]: DynamicFormFieldComponentConfig;
}

@Injectable({
  providedIn: 'root',
})
export class DynamicFormComponentsService {
  private components: DynamicFormFieldComponentConfigMap = {};

  constructor() {}

  public registerComponents(
    components: DynamicFormFieldComponentConfig[],
    override?: boolean,
  ): void {
    console.log('Register components!', { components });
    const componentMap = this.componentsToMap(components);
    if (override) {
      this.components = componentMap;
    } else {
      this.components = {
        ...this.components,
        ...componentMap,
      };
    }
  }

  public getComponentConfig(key: string): DynamicFormFieldComponentConfig {
    const components = this.components;
    const keyMatch = components[key];
    if (keyMatch) {
      if (keyMatch.deprecatedWarning) {
        console.warn(keyMatch.deprecatedWarning);
      }
      return keyMatch;
    }
    return null;
  }

  private componentsToMap(
    components: DynamicFormFieldComponentConfig[],
  ): DynamicFormFieldComponentConfigMap {
    return components.reduce((acc, cur) => {
      const { key } = cur;
      acc[key] = cur;
      return acc;
    }, {});
  }
}
