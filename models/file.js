//file.js模块全部用来处理文件的操作

//引入fs文件包
var fs = require('fs');

//获取所有的文件夹
exports.getAllAlbums = function (callback){
    //我们现在集中精力去找到所有的文件夹
    fs.readdir("./uploads",function (err,files){
        //所有的文件夹
        var allAlbums = [];
        //实现文件迭代器
        (function iterator(i){
            if(i===files.length){
                callback(allAlbums);
                return;
            }
            fs.stat("./uploads/"+files[i],function (err,stats){
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
}

//通过文件名得到所有的图片
exports.getAllImageByAlbumName = function (albumName,callback){
    fs.readdir("./uploads/"+albumName,function (err,files){
        //防止所有的文件夹
        var allImages = [];
        //实现文件迭代器
        (function iterator(i){
            if(i===files.length){
                callback(allImages);
                return;
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],function (err,stats){
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
}