import { Buffer } from 'buffer';
import { AssetsMap } from '../utils/assets';
import { FormatOptions } from './format';
import { AssetType, OtherAssetType } from './misc';
import { RunnerOptions } from './runner';

export type FontGeneratorOptions = RunnerOptions & {
  assets: AssetsMap;
  formatOptions: FormatOptions;
  templates: { [key in OtherAssetType]: string };
};

export type Result = Promise<string | Buffer>;

export type FontGeneratorFn<DependencyT> = (
  options: FontGeneratorOptions,
  dependencyContent: DependencyT extends {} ? DependencyT : null
) => Result;

export type FontGenerator<DependencyT = void> = {
  generate: FontGeneratorFn<DependencyT>;
} & (DependencyT extends {} ? { dependsOn: AssetType } : {});
