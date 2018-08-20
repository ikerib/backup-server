const express = require('express');
const router = express();
const fs = require('fs');
const path = require('path');
const dirTree = require('./directory-tree');
const listDir = require('./list-dir');
const http = require('http');
const url  = require('url');
const mime = require('mime');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Backup server API' });
});

router.get('/servers', function (req, res, next) {
    const srcpath = '/mnt/nfs';
    const zerrenda = fs.readdirSync(srcpath)
        .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory());

    return res.status(200).send(zerrenda);

});

router.get('/dirlist', function (req, res, next) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    const dir = query.dir;

    const tree = listDir( dir, {exclude:'/mnt/nfs/jails/'},null);

    return res.status(200).json(tree);

});

router.get('/lsdir', function (req, res, next) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    const dir = query.dir;

    const tree = dirTree( dir, {exclude:'/mnt/nfs/jails/'},null,true);

    return res.status(200).json(tree);

});

router.get('/ls', function (req, res, next) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    const dir = query.dir;

    const tree = dirTree(dir);

    return res.status(200).json(tree);

});

router.get('/lssnapshoot', function (req, res, next) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    let dir = query.dir;
    let zerrenda = null;
    let resp = null;
    dir = dir + "/.zfs";

    if (fs.existsSync(dir)) {
        dir = dir + "/snapshot";
        if (fs.existsSync(dir)) {
            zerrenda = fs.readdirSync(dir).filter(
                file => fs.lstatSync(
                    path.join(dir, file)).isDirectory()
            );
        }
    }

    if ( zerrenda !== null ) {
        let rest = zerrenda.reverse().map(function (x) {
            let dt = x.split("-")[1].split(".");
            let ano = dt[0].substring(0, 4);
            let mes = dt[0].substring(4, 6);
            let dia = dt[0].substring(6, 8);
            let hora = dt[1].substring(0, 2);
            let min = dt[1].substring(2, 4);

            let r;
            r = ano + "-" + mes + "-" + dia + " " + hora + ":" + min;
            return {dir:query.dir,fs:x,dt:r};
        });

        return res.status(200).send(rest);
    }

    return res.status(404).send("Ez da aurkitu");


});

router.get('/jetsi', function (req, res, next) {
  console.log("GET download");
  return res.status(200).send("jetxi");
});

router.post('/jetsi', function (req, res, next) {
    let filesFolders = req.body.fs;

    for (var i = 0, len = filesFolders.length; i < len; i++) {
      console.log(filesFolders[i].item);

        $ff = filesFolders[i].item;

    }

  //return res.status(200).send("test");
});

module.exports = router;
