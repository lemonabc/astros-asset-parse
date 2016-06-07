'use strict';

// let [nodeUrl, nodePath, nodeFs] = {}
var nodeUrl = require('url');
var nodePath = require('path');
var nodeFs = require('fs');



module.exports = new astro.Middleware('*', function(asset, next) {
    let req = asset.request;
    let prjCfg = asset.prjCfg;
    if (req && req.url) {
        let url = nodeUrl.parse(req.url).pathname;
        let info = null;
        let urlInfo = url.match(/^\/([^\/,\\]+)\/([^\/,\\]+)\/([a-z,0-9,A-Z,\-,_,\/]+)\.([^\/,\\]+)$/i);
        if (urlInfo) {
            let pagename = urlInfo[3];
            info = {
                fileType: urlInfo[1], //page
                modType: asset.modNameFull[urlInfo[2]],
                name: urlInfo[3],
                extname: urlInfo[4]
            };
            if (info.modType) {
                switch (info.fileType) {
                    case 'js':
                        break;
                    case 'css':
                        break;
                    case 'img':
                        if (info.modType) {
                            let _t = info.name.replace(/([^\/,\\]+)\/([^\/,\\]+)$/i, function(a, b, c) {
                                return b + nodePath.sep + 'img' + nodePath.sep + c
                            });
                            info.filePath = nodePath.join(prjCfg[info.modType], _t + '.' + info.extname);
                        }
                        break;
                    default:
                        // info.filePath = nodePath.join(prjCfg.root, url);
                }
            }
        }
        info = info || {};
        if (!info.modType) {
            info.modType = 'static';
            info.path = nodePath.join(prjCfg.root, 'assets', url)
            info.fileType = nodePath.extname(url);
            if(info.fileType && info.fileType.charAt(0) == '.'){
                info.fileType = info.fileType.substr(1)
            }
        }

        for (let p in info) {
            asset[p] = info[p];
        }
    }
    asset.data = asset.read();
    // 发布路径
    // asset.relpath = [prjCfg.release, asset.fileType, asset.modNameMin[asset.modType], asset.name + (asset.fileType == 'img' ? '' : ('.' + asset.extName))].join(nodePath.sep);
    // delete asset.request;
    // console.log(asset);
    next(asset);
});

// module.exports = aa;
