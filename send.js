const proxy = require('./proxy')
var qs = require('qs');
const FormData = require('form-data')
var zlib = require('zlib');
let getAnswer = require('./getAnswer')
const config = require('./config')
// let ktimes = 0
function dataenc(a,ktimes) {
    var c, d, e, b = ktimes % 10;
    for (0 == b && (b = 1),
    c = [],
    d = 0; d < a.length; d++)
        e = a.charCodeAt(d) ^ b,
        c.push(String.fromCharCode(e));
    return c.join("")

}
module.exports = {
    async run(obj,proxy_url,ktimes){
        let cookie = obj.cookie;
        let formData = new FormData()
        let answer = await getAnswer.get()
        formData.append('submitdata',answer)
        delete obj.cookie;
        let params = Object.assign({
            curid: config.curid,
            starttime:'',
            source : 'directphone',
            submittype :1,
            ktimes: 70,
            hlv : 1,
            t : new Date().getTime()*1,
            jqsign: (dataenc(obj.jqnonce, 70)),
        },obj)
        console.log(params)
        params.submitdata = '1$2}2$1|2'
        if(obj){
            let res = await proxy.fetch('https://www.wjx.cn/joinnew/processjq.ashx?'+qs.stringify(params),{
                method:'POST',
                authority: 'www.wjx.cn',
                path: '/m/'+config.curid+'.aspx',
                timeout:5000,
                body: formData,
                headers:{
                    Origin: 'https://www.wjx.cn',
                    cookie:cookie
                }
            },proxy_url).catch(e=>{
                console.log("发生错误",e)
            })
            console.log(cookie)
            if(res && res.status == 200){
                let text = await res.text()
                console.error('调取接口成功返回',text)
            }else{
                console.error("失败:ERROR1")
            }
            
        }else{
            console.error("失败:ERROR1")
        }

    }
}