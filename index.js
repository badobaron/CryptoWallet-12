let Koa = require('koa')
let app = new Koa()
let route = require('./router/router')
let static = require('koa-static')
let path = require('path')
let views = require('koa-views')
let koaBody = require('koa-body')

app.use(async (ctx,next) =>{
  console.log(`${ctx.method} ${ctx.url} ………`);
  await next()
})

app.use(koaBody({multipart:true}))
app.use(static(path.join(__dirname,'static')))
app.use(views(path.join(__dirname,'views'),{extension:'ejs',map:{html:'ejs'}}))
app.use(route.routes())

console.log('正在监听端口：3000');
app.listen(3000)
