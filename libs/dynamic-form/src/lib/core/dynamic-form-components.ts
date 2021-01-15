import { ActionComponentConfig } from '../fields/action/action.config';
import { CheckboxGroupComponentConfig } from '../fields/checkbox-group/checkbox-group.config';
import { CheckboxComponentConfig } from '../fields/checkbox/checkbox.config';
import { ChipsComponentConfig } from '../fields/chips/chips.config';
import { ColorComponentConfig } from '../fields/color/color.config';
import { DateComponentConfig } from '../fields/date/date.config';
import { DropdownComponentConfig } from '../fields/dropdown/dropdown.config';
import { DynamicFormFieldComponentConfig } from '../dynamic-form.types';
import { FileComponentConfig } from '../fields/file/file.config';
import {
  GroupComponentConfig,
  ContantainerComponentConfig,
} from '../fields/group/group.config';
import { InfoComponentConfig } from '../fields/info/info.config';
import { MarkdownComponentConfig } from '../fields/markdown/markdown.config';
import { RadioComponentConfig } from '../fields/radio/radio.config';
import { RepeaterComponentConfig } from '../fields/repeater/repeater.config';
import { SubmitComponentConfig } from '../fields/submit/submit.config';
import { TextComponentConfigs } from '../fields/text/text.config';
import { TextareaComponentConfig } from '../fields/textarea/action.config';

export class DynamicFormComponents {
  /* Default components */
  private defaultComponents: DynamicFormFieldComponentConfig[] = [
    ...TextComponentConfigs,
    TextareaComponentConfig,
    RepeaterComponentConfig,
    GroupComponentConfig,
    ContantainerComponentConfig,
    ActionComponentConfig,
    CheckboxComponentConfig,
    CheckboxGroupComponentConfig,
    ChipsComponentConfig,
    ColorComponentConfig,
    DateComponentConfig,
    DropdownComponentConfig,
    FileComponentConfig,
    InfoComponentConfig,
    MarkdownComponentConfig,
    RadioComponentConfig,
    SubmitComponentConfig,
  ];

  constructor(
    private components: DynamicFormFieldComponentConfig[] = [],
    private discardDefaults: boolean = false,
  ) {}

  public getComponentConfig(key: string): DynamicFormFieldComponentConfig {
    const components = this.getComponentConfigs();
    const keyMatch = components.find((component) => component.key === key);
    if (keyMatch) {
      return keyMatch;
    }
    return null;
  }

  private getComponentConfigs(): DynamicFormFieldComponentConfig[] {
    if (this.discardDefaults) {
      return this.components;
    }
    return [...this.components, ...this.defaultComponents];
  }
}
