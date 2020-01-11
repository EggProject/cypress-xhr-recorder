import {XhrStoreService} from './service/xhr-store.service';
import {createAndStartPlayControllerApp} from './function/create-and-start-play-controller-app.function';
import {createAndStartPlayProxyApp} from './function/create-and-start-play-proxy-app.function';
import {PlayStateModel} from './model/play-state.model';

/**
 *
 * @param state
 * @param xhrStoreService
 */
export function startNodeApps(state = new PlayStateModel(), xhrStoreService = new XhrStoreService()) {
  createAndStartPlayControllerApp(state, xhrStoreService);
  createAndStartPlayProxyApp(state, xhrStoreService);
}

startNodeApps();
