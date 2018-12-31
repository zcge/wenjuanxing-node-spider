const fetch = require('node-fetch')
const get = async ()=>{
   let res = await  fetch('https://www.lnlexpress.com.au/index_getCode')
   let json = await res.json()
   console.log(json.submitdata)
   return json.submitdata
}
module.exports = {
    get
}