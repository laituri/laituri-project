// #!/usr/bin/env node
import { mock } from './mockdat';
import { usage } from 'yargs';
import { readFileSync, writeFileSync } from 'fs';

const { template, output, repeat } = usage('Usage: -n <name>')
  .option('template', {
    alias: 't',
    describe: 'Template file path',
    type: 'string',
    demandOption: true,
  })
  .option('output', {
    alias: 'o',
    describe: 'Output file',
    type: 'string',
    demandOption: true,
  })
  .option('repeat', {
    alias: 'r',
    describe: 'Repeat json object',
    type: 'number',
  }).argv;

const file = readFileSync(template);
const templateContent = file.toString();
const mocked = mock({
  template: templateContent,
  repeat,
  outputFormat: 'string',
});

writeFileSync(output, mocked);

console.log(`New file created: ${output}`);
