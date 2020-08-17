var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  })
})

var pgOpt = require('pg')
var pgConfig = {
  user: 'postgres',
  database: 'postgres',
  password: 'KAxa5WZSRx6nD',
  host: 'vis.cdyoue.com',
  port: '5432',
  client_encoding: 'utf8',
  poolSize: 5,
  poolIdleTimeout: 30000,
  reapIntervalMillis: 10000
};
var pgPool = new pgOpt.Pool(pgConfig)

// home api
router.get('/home', function(req, res){
  const { home } = req.query

  pgPool.connect(function (isErr, client, done) {
    if (isErr) {
      console.log('connect query:' + isErr.message);
      return;
    }
    client.query(`select DISTINCT building from guixi_form_1_73 where home= '${home}' ORDER BY building`, [], function (isErr, rst) {
      done();
      if (isErr) {
      } else {
        res.json(rst.rows)
        res.end()
      }
    })
  });
});

router.get('/building', function(req, res){
  const { home, building } = req.query

  pgPool.connect(function (isErr, client, done) {
    if (isErr) {
      console.log('connect query:' + isErr.message);
      return;
    }
    client.query(`select DISTINCT unit from guixi_form_1_73 where home='${home}' and building='${building}'`, [], function (isErr, rst) {
      done();
      if (isErr) {
      } else {
        res.json(rst.rows)
        res.end()
      }
    })
  });
})

router.get('/unit', function(req, res){
  const { home, building, unit } = req.query

  pgPool.connect(function (isErr, client, done) {
    if (isErr) {
      console.log('connect query:' + isErr.message);
      return;
    }
    client.query(`select * from guixi_form_1_73 where home='${home}' and building='${building}' and unit='${unit}'`, [], function (isErr, rst) {
      done();
      if (isErr) {
      } else {
        res.json(rst.rows)
        res.end()
      }
    })
  });
})

// company api
router.get('/company', function(req, res){
  const { company} = req.query

  pgPool.connect(function (isErr, client, done) {
    if (isErr) {
      console.log('connect query:' + isErr.message);
      return;
    }
    client.query(`select * from guixi_form_1_71 where company='${company}'`, [], function (isErr, rst) {
      done();
      if (isErr) {
      } else {
        res.json(rst.rows)
        res.end()
      }
    })
  });
})

router.get('/enterprise', function(req, res){
  const { company} = req.query

  pgPool.connect(function (isErr, client, done) {
    if (isErr) {
      console.log('connect query:' + isErr.message);
      return;
    }
    client.query(`select * from guixi_form_1_72 where company='${company}'`, [], function (isErr, rst) {
      done();
      if (isErr) {
      } else {
        res.json(rst.rows)
        res.end()
      }
    })
  });
})

module.exports = router
