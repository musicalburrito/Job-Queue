/**
 * Created by nancyli on 12/7/17.
 */
'use strict';
var kue = require('kue');
var jobs = kue.createQueue();
var msg = require('./reqModel');
var router = require('express').Router();
var axios = require('axios');
var fetch = require('node-fetch');

router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, ' +
        'Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', function(req, res) {
    res.json({message: 'API Initialized!'})
});

router.route('/app/jobs')
    .post(function(req,res){
        var job = jobs.create('new_job', req.body.url);
        job.save(function(){
            res.json(job.id);
            var htmlBody = new msg();
            htmlBody.jobid = job.id;
            htmlBody.htmlmsg = '';
            htmlBody.jobstatus = 'in progress';
            htmlBody.save(function (err) {
                if (err)
                    res.send(err);
            })
        });
    })
    .get(function(req, res){
        var query = msg.find({jobid: req.query.id});
        query.select('htmlmsg');
        query.exec(function (err, msg) {
            if (err) res.send(err);
            if (msg) res.json(msg);
            res.json({message: 'this job does not exist'})
        })
    });

router.route('/app/status/:jobid')
    .get(function(req,res){
        var query = msg.findOne({jobid: req.params.jobid});
        // query.select('')
        query.exec(function(err,msg){
            if (err) res.send(err);
            if (!msg) {
                res.send('this job does not exist');
                return;
            }
            if (msg.jobstatus == 'completed' ){
                res.json(msg.htmlmsg);
                return;
            }
            res.json(msg.jobstatus);
        })
    })
    .patch(function(req,res){
        msg.updateOne({jobid: req.params.jobid}, {$set:{jobstatus: 'completed', htmlmsg: req.body.htmlmsg}},
            function(err, msg){
                if (err) res.send(err);
            });
        res.send('status updated to complete');
        });

jobs.process('new_job', function (job, done){
    const data = job.data;
    fetch(data).then(function(res) {
        return res.text();
    }).then(function(body) {
        var url = 'http://localhost:3000/app/status/' + job.id;
        axios.patch(url, {
            htmlmsg: body
        });
    });
    done && done();
});

module.exports = router;