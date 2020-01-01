import {StateModel} from './model/state.model';
import {createAndStartControllerApp} from './function/create-and-start-controller-app.function';
import {createAndStartProxyApp} from './function/create-and-start-proxy-app.function';

export function startNodeApps(state: StateModel) {
  createAndStartControllerApp(state);
  createAndStartProxyApp(state);
}
