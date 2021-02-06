/*
 * @Author: shenjianfei
 * @Date: 2021-02-02 14:12:24
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-02-02 15:23:23
 */
module.exports = () =>{
    function render(json){
        this.set("Content-Type","application/json")
        this.body = JSON.stringify(json)
    }
    return async (ctx,next)=>{
        ctx.send = render.bind(ctx)
        ctx.log.error('ikcamp');
        await next();
    }
}