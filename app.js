//引入express模块
var express = require('express');
//初始化express
var app = express();
//引入router模块
var router = require("./controller");

//设置模板引擎
app.set("view engine","ejs");

//路由中间件
//处理静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));

//处理首页
app.get("/",router.showIndex);

//处理上传图片的页面
app.get("/up",router.showUp);
//显示某一个相册的内容
app.get("/:albumName",router.showAlbum);
//处理上传的图片
app.post("/up",router.doPost);
//处理错误的页面
app.use(function (req,res){
    res.render("err",{
        "baseUrl":req.pathname
    });
});


//监听端口,创建服务器
app.listen(3000,()=>{
    console.log("服务器正在监听3000端口!");
});