/*
 * @Author: shenjianfei
 * @Date: 2021-02-02 14:15:59
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-02-04 15:24:48
 */
const path = require('path')
const ip = require('ip')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

const miSend = require('./mi-send')
const miLog = require('./mi-log/logger')
const miHttpError = require('./mi-http-error')

const miRule = require('./mi-rule')
module.exports = (app) =>{
    miRule({
        app,
        rules: [
          {
            folder: path.join(__dirname, '../controller'),
            name: 'controller'
          },
          {
            folder: path.join(__dirname, '../service'),
            name: 'service'
          }
        ]
      })
    app.use(miHttpError({
      errorPageFolder: path.resolve(__dirname, '../errorPage')
    }))
    app.use(miLog({
      env: app.env,  // koa 提供的环境变量
      projectName: 'koa2-tutorial',
      appLogLevel: 'debug',
      dir: 'logs',
      serverIp: ip.address()
    }))
    app.use(staticFiles(path.resolve(__dirname, "../public")))
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '../views'),
        nunjucksConfig: {
          trimBlocks: true
        }
    }));
    
    app.use(bodyParser())
    app.use(miSend())

    app.on("error",(err,ctx)=>{
        if (ctx && !ctx.headerSent && ctx.status < 500) {
            ctx.status = 500
        }
        if (ctx && ctx.log && ctx.log.error) {
            if (!ctx.state.logged) {
                ctx.log.error(err.stack)
            }
        }
    })
}