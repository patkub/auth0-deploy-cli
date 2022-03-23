import path from 'path';
import { constants } from '../../../tools';

import { getFiles, existsMustBeDir, loadJSON } from '../../../utils';
import { DirectoryHandler, Context } from '.'

type ParsedRulesConfigs = {
  rulesConfigs: unknown[] | undefined
}

function parse(context: Context): ParsedRulesConfigs {
  const rulesConfigsFolder = path.join(context.filePath, constants.RULES_CONFIGS_DIRECTORY);
  if (!existsMustBeDir(rulesConfigsFolder)) return { rulesConfigs: undefined }; // Skip

  const foundFiles: string[] = getFiles(rulesConfigsFolder, ['.json']);

  const rulesConfigs = foundFiles.map((f) => loadJSON(f, context.mappings))
    .filter((p) => Object.keys(p).length > 0); // Filter out empty rulesConfigs

  return {
    rulesConfigs
  };
}

async function dump(): Promise<void> {
  // do not export rulesConfigs as its values cannot be extracted
  return;
}

const rulesConfigsHandler: DirectoryHandler<ParsedRulesConfigs> = {
  parse,
  dump,
}

export default rulesConfigsHandler;
