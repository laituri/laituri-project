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
import { RadioComponentConfig } from '../fields/radio/radio.config';
import { RepeaterComponentConfig } from '../fields/repeater/repeater.config';
import { SubmitComponentConfig } from '../fields/submit/submit.config';
import { TextComponentConfigs } from '../fields/text/text.config';
import { TextareaComponentConfig } from '../fields/textarea/action.config';
import {
  MarkdownTextSectionComponentAsInfoConfig,
  MarkdownTextSectionComponentConfig,
} from '../fields/markdown-text-section/markdown-text-section.config';
import { MarkdownEditorComponentConfig } from '../fields/markdown-editor/markdown-editor.config';

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
    MarkdownTextSectionComponentConfig,
    MarkdownTextSectionComponentAsInfoConfig,
    MarkdownEditorComponentConfig,
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
      if (keyMatch.deprecatedWarning) {
        console.warn(keyMatch.deprecatedWarning);
      }
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
