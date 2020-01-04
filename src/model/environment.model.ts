import {isNil} from '../type-guard/is-nil';
import {isBoolean} from '../type-guard/is-boolean';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {EnvironmentInterface} from './environment.interface';
import {isString} from '../type-guard/is-string';

export class EnvironmentModel implements EnvironmentInterface {
  readonly playMode: boolean;
  readonly recordMode!: boolean;
  readonly recordServerUrl?: string;
  readonly playServerUrl?: string;

  constructor(
    env: EnvironmentInterface = {
      recordMode: Cypress.env('xhr_recorder_recordMode'),
      recordServerUrl: Cypress.env('xhr_recorder_recordServerUrl'),
      playServerUrl: Cypress.env('xhr_recorder_playServerUrl')
    }
  ) {
    if (isNil(env.recordServerUrl) || !isString(env.recordServerUrl) || env.recordServerUrl.length === 0) {
      // set default
      env.recordServerUrl = 'http://localhost:9001';
    }
    if (isNil(env.playServerUrl) || !isString(env.playServerUrl) || env.playServerUrl.length === 0) {
      // set default
      env.playServerUrl = 'http://localhost:9001';
    }
    if (!isBoolean(env.recordMode)) {
      // set default
      env.recordMode = false;
    } else {
      env.recordMode = coerceBooleanProperty(env.recordMode);
    }
    Object.assign(this, env);
    this.playMode = !env.recordMode;
  }
}
