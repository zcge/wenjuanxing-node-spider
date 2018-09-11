
const fetch = require('node-fetch')
var HttpsProxyAgent = require('https-proxy-agent');
const opt = {
    fetch: async function (url, opt,proxy_url) {
        var ipOpt = {}
        var agent = new HttpsProxyAgent(proxy_url);
        ipOpt = {
            timeout:5000,
            agent:agent
        };
        return fetch(url, Object.assign({}, ipOpt, opt))
    }
}
module.exports = opt
