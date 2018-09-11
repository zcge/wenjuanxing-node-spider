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
module.exports = {
    get(){
        let arr = [];
        for(let i = 1;i<=5;i++){
            if( i == 1){
               arr.push(i+'$'+ randomNum(1,4))
            }else if(i==2){
                arr.push(i+'$'+ randomNum(1,4))
            }else if(i==3){
                arr.push(i+'$'+ randomNum(1,4))
            }else if(i==4){
                arr.push(i+'$'+ randomNum(1,4))
            }else if(i==5){
                arr.push(i+'$'+ randomNum(1,4))
            }
        }
        let answers = arr.join('}');
        console.log('生成的答案是',answers)
        return answers;
    }
}
