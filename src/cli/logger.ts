import picocolor from 'picocolors';
import figures from 'figures';
import { RunnerResults } from '../core/runner';
import { pluralize } from '../utils/string';

export const getLogger = (debug = false, silent = false) => ({
  error(error: Error | string) {
    const message = (error instanceof Error && error.message) || error;

    console.log(picocolor.red(String(message)));

    if (debug && error instanceof Error) {
      console.log(error.stack);
    }
  },

  log(...values: any[]) {
    if (!silent) {
      console.log(...values);
    }
  },

  start(loadedConfigPath: string = null) {
    this.log(picocolor.yellow('Generating font kit...'));

    if (!loadedConfigPath) return;
    this.log(
      picocolor.green(
        `${figures.tick} Using configuration file: ${picocolor.green(
          picocolor.bold(loadedConfigPath)
        )}`
      )
    );
  },

  results({ assetsIn, writeResults, options: { inputDir } }: RunnerResults) {
    const iconsCount = Object.values(assetsIn).length;

    this.log(
      picocolor.white(
        `${figures.tick} ${iconsCount} ${pluralize(
          'SVG',
          iconsCount
        )} found in ${inputDir}`
      )
    );

    for (const { writePath } of writeResults) {
      this.log(
        picocolor.blue(`${figures.tick} Generated ${picocolor.cyan(writePath)}`)
      );
    }

    this.log(picocolor.green(picocolor.bold('Done')));
  }
});
