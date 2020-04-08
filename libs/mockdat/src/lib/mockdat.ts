import * as handlebars from 'handlebars';
import * as defaultHelpers from './helpers';
import * as defautMockdata from './data';

interface Helpers {
  [name: string]: () => any;
}

interface ParseConfig {
  mockdata?: any;
  helpers?: Helpers;
  partials?: any;
  index?: number;
}

interface MockDatConfig {
  template: string | object;
  repeat?: number;
  helpers?: Helpers;
  outputFormat?: 'json' | 'string';
}

export function mock({
  template,
  repeat,
  helpers,
  outputFormat,
}: MockDatConfig): string | object {
  const parseConfig = { helpers };

  if (!repeat && typeof template !== 'object') {
    return parse(template, parseConfig);
  }

  if (repeat > 0) {
    const values = [];
    for (let i = 0; i < repeat; i++) {
      const object = getParsedJson(
        template,
        { ...parseConfig, index: i },
        false,
      );
      values.push(object);
    }
    return outputFormat === 'string' ? JSON.stringify(values) : values;
  }

  return getParsedJson(template, parseConfig, outputFormat === 'string');
}

function getParsedJson(
  template: string | object,
  config: ParseConfig,
  stringify?: boolean,
  index?: number,
) {
  const jsonTemplate = parse(stringifyTemplate(template), config);
  if (stringify) {
    return jsonTemplate;
  }
  const object = JSON.parse(jsonTemplate);

  return object;
}

function stringifyTemplate(template: string | object) {
  if (typeof template === 'string') {
    return template;
  }
  return JSON.stringify(template);
}

function parse(template: string, config?: ParseConfig) {
  config = config || null;
  config.mockdata = handlebars.Utils.extend(
    {},
    defautMockdata,
    { index: config.index },
    config.mockdata,
  );
  config.helpers = handlebars.Utils.extend({}, defaultHelpers, config.helpers);
  config.mockdata.__cache = {};
  try {
    return handlebars.compile(template)(config.mockdata, {
      helpers: config.helpers,
      partials: config.partials,
    });
  } catch (error) {
    return error;
  }
}
