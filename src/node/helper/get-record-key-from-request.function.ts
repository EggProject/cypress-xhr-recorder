/**
 *
 * @param req
 */
export function getRecordKeyFromRequest(req: { url: string; method: string }) {
    return  `${req.method}__${req.url}`
}
