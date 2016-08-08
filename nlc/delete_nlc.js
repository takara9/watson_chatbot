#!/usr/bin/env node
//
// NLCを削除する
// 
// 作者 Maho Takara    takara@jp.ibm.com
//
// Copyright (C) 2016 International Business Machines Corporation 
// and others. All Rights Reserved. 
// 
// 2016/3/24 初版
//

var fs = require('fs');
var watson = require('watson-developer-cloud');
var wnc = require('./watson_nlc_credentials.json');
var cnf = require('./nlc_config.json');
var params = require('./nlc_id.json');
var nlc = watson.natural_language_classifier(wnc.credentials);

nlc.remove(params, function(err, status) {
    if (err) {
	console.log("err = ", err);
    } else {
	console.log("status = ", status);
    }
});

