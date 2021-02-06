/*
 * @Author: shenjianfei
 * @Date: 2021-02-01 14:56:07
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-02-04 15:43:26
 */
const HomeService = require("../service/home")
console.log(HomeService);
module.exports = {
    index :async(ctx, next)=>{
        await ctx.render("home/index", {title: "iKcamp欢迎您"})
    },
    home: async(ctx, next) => {
        console.log(ctx.request.query)
        console.log(ctx.request.querystring)
        ctx.response.body = '<h1>HOME page</h1>'
    },
    homeParams: async(ctx, next) => {
        console.log(ctx.params)
        ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },
    login: async(ctx, next) => {
        await ctx.render('home/login',{
            btnName: 'GoGoGo'
          })
    },
    register: async(ctx, next) => {
        const { app } = ctx

        let params = ctx.request.body
        let name = params.name
        let password = params.password

        // 留意 service 层的调用方式
        let res = await app.service.home.register(name,password)
        if(res.status == "-1"){
          await ctx.render("home/login", res.data)
        }else{
          ctx.state.title = "个人中心"
          await ctx.render("home/success", res.data)
        }
    }
}