'use strict';
require('dotenv').config();
let cassandra= require('cassandra-driver');

let client = new cassandra.Client({contactPoints:[ process.env.HOST ], protocolOptions:{port: process.env.PORT_CASSANDRA}, keyspace: process.env.KEYSPACE, queryOptions: {fetchSize: 50000}, socketOptions: {readTimeout: 0, connectTimeout: 360000}})
client.connect(function (err){
  if (err) {
    client.shutdown();
    return console.error('There was an error when connecting', err);
  }
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
  console.log('Running at: http://'+process.env.HOST+':'+process.env.PORT_APP);
})

module.exports=client;
