/*
 * @Author: shenjianfei
 * @Date: 2021-02-02 15:55:36
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-02-04 15:22:41
 */
const Path = require('path') 
const nunjucks = require('nunjucks')
module.exports = (opts = {}) => {
    const floder = opts.errorPageFolder
    const templatePath = Path.resolve(__dirname,'./error.html')
    let fileName = 'other'
    return async (ctx, next) => {
      try {
         await next();
         /**
          * 如果没有更改过 response 的 status，则 koa 默认的 status 是 404 
          */
         if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
      } catch (e) {
        let status = parseInt(e.status)
        // 默认错误信息为 error 对象上携带的 message
        const message = e.message
  
        // 对 status 进行处理，指定错误页面文件名 
        if(status >= 400){
          switch(status){
            case 400:
            case 404:
            case 500:
              fileName = status;
              break;
            // 其它错误 指定渲染 other 文件
            default:
              fileName = 'other'
          }
        }else{
            status = 500;
            fileName = status
        }
        const filePath = floder ? Path.join(folder,`${fileName}.html`) : templatePath;

        try{
            nunjucks.configure(folder ? folder : __dirname)
            const data = await nunjucks.render(filePath,{
                env:env,
                status:e.status || e.message,
                error:e.message,
                stack:e.stack
            })

            ctx.status = status;
            ctx.body = data;
        }catch(e){
            ctx.throw(500,`错误页渲染失败:${e.message}`)
        }
      }
    }
  }