const proxy = require('./proxy')
var qs = require('qs');
const FormData = require('form-data')
var zlib = require('zlib');
let getAnswer = require('./getAnswer')
const config = require('./config')
module.exports = {
    async run(obj,proxy_url){
        let cookie = obj.cookie;
        let formData = new FormData()
        formData.append('submitdata',getAnswer.get())
        delete obj.cookie;
        let params = Object.assign({
            curid: config.curid,
            starttime:'',
            source : 'directphone',
            submittype :1,
            hlv : 1,
            t : new Date().getTime()*1,
        },obj)
        if(obj){
            let res = await proxy.fetch('https://www.wjx.cn/joinnew/processjq.ashx?'+qs.stringify(params),{
                method:'POST',
                authority: 'www.wjx.cn',
                path: '/m/'+config.curid+'.aspx',
                timeout:5000,
                body: formData,
                headers:{
                    cookie:cookie
                }
            },proxy_url).catch(e=>{
                console.log("发生错误",e)
            })
            console.log(cookie)
            if(res && res.status == 200){
                let text = await res.text()
                console.log('调取接口成功返回',text)
            }else{
                console.error("失败:ERROR1")
            }
            
        }else{
            console.error("失败:ERROR1")
        }

    }
}