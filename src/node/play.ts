import {XhrStoreService} from './service/xhr-store.service';
import {createAndStartPlayControllerApp} from './function/create-and-start-play-controller-app.function';
import {createAndStartPlayProxyApp} from './function/create-and-start-play-proxy-app.function';

export function startNodeApps(xhrStoreService: XhrStoreService) {
  createAndStartPlayControllerApp(xhrStoreService);
  createAndStartPlayProxyApp(xhrStoreService);
}

startNodeApps(new XhrStoreService());
