const proxy = require('./proxy')
const S = require('string')
const cheerio = require("cheerio");
const config = require('./config')
module.exports = {
    async run (proxy_url) {
       console.log('调用接口获取参数')
       let res =  await proxy.fetch('https://www.wjx.cn/m/'+config.curid+'.aspx',{
           headers:{
           }
       },proxy_url).catch(e=>{return null})
       	console.log('获取参数成功')
	if(res && res.status === 200){
           let cookie = await res.headers.get('set-cookie')
           let html = await res.text();
           var $ = S(html)
           var $$ = cheerio.load(html);
           var jqnonce = $.between('var jqnonce="','";').s;
           let starttime = $$('#starttime').val()
           let rn = $.between('var rndnum="','";').s;
           return {
                jqnonce,
               cookie,
               starttime,
               rn
           }
       }else{
           console.log('报错了',res)
           return null
       }
    }
}
