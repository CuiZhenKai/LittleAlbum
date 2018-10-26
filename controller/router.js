//引入file文件包
var file = require("../models/file.js");
//引入formidable包
var formidable = require('formidable');
//引入path模块
var path = require('path');
//引入fs
var fs = require('fs');
//引入时间
var sd = require("silly-datetime");
//router.js是用于向外部暴露一些中间件
exports.showIndex = function (req,res){
    //这就是node的编程思维,就是所有的东西都是异步的
    //所以,内层函数,不是return回来东西,而是调用高层函数提供的
    //注意:把数据当做回调函数的参数来使用
    file.getAllAlbums(function(allAlbums){
        res.render("index",{
            "albums":allAlbums
        });
    })
}

//显示所有图片
exports.showAlbum= function (req,res){
    //遍历相册中的所有图片
    var albumName = req.params.albumName;
    //具体业务交给model
    file.getAllImageByAlbumName(albumName,function (imagesArray){
        res.render("album",{
            "albumname":albumName,
            "images":imagesArray
        });
    });   
}

//上传图片
exports.showUp = function(req,res){
    //命令file模块（我们自己写的函数）调用getAllAlbums函数
    //得到所有文件夹名字之后做的事情，写在回调函数里面
    file.getAllAlbums(function(albums){
        res.render("up",{
            albums : albums
        });
    });
};

//上传表单
exports.doPost = function (req,res){
    var form = new formidable.IncomingForm();
    //console.log(__dirname);
    form.uploadDir = path.normalize(__dirname + "/../tempup/");

    form.parse(req, function(err, fields, files,next) {
        //console.log(fields);
        //console.log(files);
        if(err){
            next();
            return;
        }

        //判断文件尺寸
        var size = parseInt(files.tupian.size);
        if(size > 5000){
            res.send("图片尺寸应该小于5M");
            //删除图片
            fs.unlink(files.tupian.path);
            return;
        }

        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);


        var wenjianjia = fields.wenjianjia;
        var oldpath = files.tupian.path;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
        fs.rename(oldpath,newpath,function (err){
            if(err){
                res.send("改名失败");
                return;
            }
            res.send("成功");
        });
    });

    return;

}