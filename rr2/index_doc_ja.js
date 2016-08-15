#!/usr/bin/env node
//
// Solr clusterの設定を登録する
// 
// 2016/3/28 Maho Takara
//

var fs     = require('fs');
var auth   = require('./watson.rtrv_rank.auth.json');
auth.credentials['version'] = 'v1';
var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank(auth.credentials);
var params = require('./cluster_id.json');
var rr_cnf = require('./rr_config.json');

params.collection_name = rr_cnf.collection_name;

solrClient = retrieve_and_rank.createSolrClient(params);
console.log('Indexing a document...');
var path = rr_cnf.docs_path;
var files = fs.readdirSync(path);

for ( var i = 0; i < files.length; i++) {
    console.log(i + ":" + files[i]);
    filepath = path + "/" + files[i];
    doc = fs.readFileSync(filepath,'utf8');
    doc = JSON.parse(fs.readFileSync(filepath,'utf8'));

    solrClient.add(doc, function (err, response) {
	if (err) {
	    console.log('Error indexing document: ', err);
	}
	else {
	    console.log('Indexed a document.');
	    solrClient.commit(function(err) {
		if(err) {
		    console.log('Error committing change: ' + err);
		}
		else {
		    console.log('Successfully committed changes.');
		}
	    });
	}
    });
}
