/*jshint node:true */
/*global require */
'use strict';

var mysql = require('mysql2'),
    logEntries = [],
    loggingEnabled = false,
    dbconfig = require('./dbconfig'),
    pool = mysql.createPool({
        host: dbconfig.host,
        user: dbconfig.user,
        password: dbconfig.password,
        database: dbconfig.database
    }),
    executeQuery = function (query, callback) {
            pool.getConnection(function (error, connection) {
                if (error) {
                    console.error('server.getConnection - error:%s', error);
                    callback(error);
                    return;
                }
                if (!connection.tzConfigured) {
                    connection.tzConfigured = true;
                }
                connection.query(query.sql, query.values, function (error, results) {
                    if (!error) {
                        connection.release();
                        callback(null, results);
                    } else {
                        console.log("executeQuery error: ", error);
                        callback(error);
                    }
                    connection.release();
                });
            });
    };

var executeQueryNew = function(query, callback){
  const pool = mysql.createPool(dbconfig);
  pool.query(query, function(error, results, fields) {
    callback(error, results, fields)
  })
}

var executeQueryWithConnect = function(query, callback){
  const connection = mysql.createConnection(dbconfig);
  connection.query(query, function(error, results){
    callback(error, results)
    connection.close();
  });
}

// Executes a stored procedure and returns an array of result sets.
exports.executeCallableStatement = function (storedProcedure, callback) {
    executeQuery(storedProcedure, function (error, results) {
        callback(error, results);
    });
};
exports.query = function(query, callback) {
  executeQuery(query, callback);
}
exports.executeQueryNew = executeQueryNew;
exports.executeQueryWithConnect = executeQueryWithConnect;
