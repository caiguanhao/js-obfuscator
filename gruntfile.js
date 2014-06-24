module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      output: 'test/output'
    },
    jsObfuscate: {
      test: {
        files: {
          'test/output/test.js': [
            'test/bind.js',
            'test/reduce.js'
          ]
        }
      },
      fail: {
        files: {
          'test/output/fail.js': 'test/fail.js'
        }
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', [
    'clean',
    'jsObfuscate'
  ]);

};
