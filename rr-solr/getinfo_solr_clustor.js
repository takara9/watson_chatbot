#!/usr/bin/env node
//
// IBM Watson R&R に Apache Solr Cluster の作成状態を確認する
//  
//
// 作者 Maho Takara    takara@jp.ibm.com
//
// Copyright (C) 2016 International Business Machines Corporation 
// and others. All Rights Reserved. 
// 
// 2016/8/15  初版
//
//

var fs     = require('fs');
var auth   = require('./watson.rtrv_rank.auth.json');
auth.credentials['version'] = 'v1';
var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank(auth.credentials);
var params = require('./cluster_id.json');

retrieve_and_rank.pollCluster(params,function(err, response) {
    if (err)
	console.log('error:', err);
    else
	console.log(JSON.stringify(response, null, 2));
});
