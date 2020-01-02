import loadJsonFile from 'load-json-file';
import {XhrResponse} from './model/xhr.response';
import {PlayTestConfig} from '../model/play-test-config';
import {NotFoundFileException} from './exception/not-found-file.exception';
import {NotInitedXhrStoreException} from './exception/not-inited-xhr-store.exception';
import {NotFoundNextStepResponseException} from './exception/not-found-next-step-response.exception';

export class XhrStoreService {
  store!: { [url: string]: XhrResponse[] };
  private iteratorStep!: { [key: string]: number };
  private fixtureDirPath = process.env.FIXTURE_DIR_PATH;

  async loadFile({ name }: PlayTestConfig): Promise<string> {
    const path = `${this.fixtureDirPath}/${name}.json`;
    try {
      this.resetStore();
      this.store = await loadJsonFile(path);
      return path;
    } catch (error) {
      throw new NotFoundFileException(path);
    }
  }

  private resetStore() {
    delete this.store;
    this.iteratorStep = {} as any;
  }

  getNextStepResponse(url: string) {
    if (this.store === undefined) {
      throw new NotInitedXhrStoreException();
    }
    if (this.iteratorStep[url] === undefined) {
      this.iteratorStep[url] = -1;
    }
    console.log('getNextStepResponse next step: ', this.iteratorStep[url] + 1);
    if (this.store[url].length >= this.iteratorStep[url] + 1) {
      return this.store[url][++this.iteratorStep[url]];
    }
    throw new NotFoundNextStepResponseException();
  }
}
