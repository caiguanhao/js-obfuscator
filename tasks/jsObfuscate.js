var async       = require('async');
var jsObfuscate = require('../jsObfuscate');

module.exports = function(grunt) {

  grunt.registerMultiTask(
    'jsObfuscate',
    'Obfuscate JavaScript files via javascriptobfuscator.com.',
    function() {

    var options = this.options();
    var cc = options.concurrency;
    cc = /^[0-9]+$/.test(cc) && (cc > 0 && cc < 100) ? cc : 2;

    var queue = async.queue(function(task, callback) {
      var content = task.src.map(function(src) {
        return grunt.file.read(src).replace(/^\#\!.*/, '');
      }).join('\n;\n');
      jsObfuscate(content, options).
        then(function(obfuscated) {
          grunt.file.write(task.dest, obfuscated);
        }).
        then(callback).
        catch(callback);
    }, cc);

    queue.drain = this.async();

    var files = this.files;

    for (var i = 0; i < files.length; i++) {
      queue.push(files[i], (function(current) {
        return function(err) {
          if (err) {
            var src = current.src.join(', ');
            console.error(('Fatal error occurred when processing ' + src +
              ':').red);
            grunt.fail.fatal(err);
          }
          grunt.log.ok('Obfuscated: ' + current.dest.cyan);
        };
      })(files[i]));
    }

  });

};
