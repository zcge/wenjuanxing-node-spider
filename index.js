process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const getParams = require('./getParams')
const send = require('./send')
const getIp = require('./getIp')
const config = require('./config')
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
let sleep = (time)=>{
    return new Promise((res)=>{
        setTimeout(()=>{
            res()
        },time)
    })
}
let task = async (ip)=>{
    if(!ip){return}
    try {
        let proxy_url = 'http://'+ip
        console.log('获取到的ip',proxy_url)
        let obj = await getParams.run(proxy_url)
        
        let time = randomNum(5000,30000)
        console.log(obj)
        console.log('模拟填写问卷等待时间--',time/1000 + 's'); 
        await sleep(time)
        console.log('开始发送')
        await send.run(obj,proxy_url,30)
        return null
    } catch (error) {
        console.log('发生未知的错误',error)
    }
    
}
let runTask = async()=>{
    let ips = await getIp.get()
    console.log('得到的ips',ips)
    for(let i = 0;i<ips.length;i++){
        task(ips[i])
    }
}
let main = ()=>{
    // 11 秒调用一次接口获取5 个可用的ip 地址
    runTask();
    setInterval(async()=>{
        runTask();
    },config.time * 1000)
}
main()
