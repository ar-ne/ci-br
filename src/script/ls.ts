const fs = require('fs');
const path = require('path');

function displayFile(param: string) {
    //转换为绝对路径
    param = path.resolve(param);
    fs.stat(param, (err: any, stats: { isDirectory: () => any; }) => {
        //如果是目录的话，遍历目录下的文件信息
        if (stats.isDirectory()) {
            if (param.includes('node_modules')) return;
            fs.readdir(param, (err: any, file: any[]) => {
                file.forEach((e) => {
                    //遍历之后递归调用查看文件函数
                    //遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
                    const absolutePath = path.resolve(path.join(param, e));
                    displayFile(absolutePath)
                })
            })
        } else {
            //如果不是目录，打印文件信息
            console.log(param)
        }
    })
}

displayFile('./');