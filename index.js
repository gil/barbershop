var fs = require('fs');
var winston = require('winston');
var async = require('async');
var request = require('request');
var UglifyJS = require('uglify-js');
var mkdirp = require('mkdirp');
var groups = require('./groups');

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({ colorize: true }),
    new winston.transports.File({ filename: 'barbershop.log' })
  ]
});

function downloadScript(url) {
  return function(callback) {
    logger.info('Downloading script: ' + url);
    request(url, function (error, response, body) {
      logger.info('Downloaded script: ' + url);
      callback(error, body);
    });
  };
}

function processGroup(group) {
  return function(callback) {

    logger.info('Processing group: ' + group.dest);

    if( typeof group.source === 'string' ) {
      group.source = [group.source];
    }

    var downloadCalls = group.source.map(function(url) {
      return downloadScript(url);
    });

    async.parallel(downloadCalls, function(err, results) {
      group.sourcesData = results;
      callback(false, group);
    });

  };
}

function compressGroup(group) {
  var concat = '';

  group.sourcesData.forEach(function(data) {
    concat += data + '\n\n';
  });

  logger.info('Compressing group: ' + group.dest);
  var uglifyResult = UglifyJS.minify(concat, {fromString: true});

  mkdirp.sync('scripts/');
  fs.writeFileSync('scripts/' + group.dest, uglifyResult.code);
}

var destCalls = groups.map(function(group) {
  return processGroup(group);
});

async.series(destCalls, function(err, groups) {
  
  groups.forEach(function(group) {
    compressGroup(group);
  });
  logger.info('Done processing groups!');

});
