import chalk from 'chalk';
import enquirer from 'enquirer';
import {copy, existsSync} from 'fs-extra';
import {join} from 'path';
import {currentVersion, replaceInFile, root, run} from '../internal/helpers';

export const createPackage = async () => {
  const templateLocation = join(root, 'templates', 'package');
  if (!existsSync(templateLocation)) {
    console.log(chalk.red(`Unable to location template project in ${templateLocation}. Aborting.`));
    return;
  }

  interface Answers {
    packageName: string;
  }

  enquirer.prompt<Answers>({
    type: 'input',
    name: 'packageName',
    message: 'Enter package name (e.g. `foo` to create `@livedesigner/foo`).',
  }).then(async ({packageName}) => {
    const destination = join(root, 'packages', packageName);
    console.log(chalk.blue(`Creating package @livedesigner/${packageName} in ${destination}...`));
    await copy(templateLocation, destination);
    await replaceInFile(join(destination, 'README.md'), ['REPLACEME'], [packageName]);
    await replaceInFile(join(destination, 'package.json'), ['REPLACEME', 'VERSION'], [packageName, currentVersion]);
    run('yarn lerna bootstrap');
  });
};