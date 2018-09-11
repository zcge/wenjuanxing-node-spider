const fetch = require('node-fetch');
const config = require('./config')
module.exports = {
    async get(){
       //填写爬虫的代理提取的api
       let res = await fetch(config.apiUrl); 
       let a = await res.text();
       return a.split('\n').map((ip)=>{return ip.replace('\r','')}).filter((item)=>{return !!item})
    }
}

