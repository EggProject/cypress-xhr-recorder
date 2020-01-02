export interface RecordStateModel {
  runAppServer: boolean;
  runProxyServer: boolean;
  /**
   * Ebbe gyujtjuk a rogziteni kivant xhr kereseket
   */
  queue: { [key: string]: any };
}
