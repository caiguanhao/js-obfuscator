module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      output: 'test/output'
    },
    jsObfuscate: {
      test: {
        options: {
          concurrency: 2,
          keepLinefeeds: false,
          keepIndentations: false,
          encodeStrings: true,
          encodeNumbers: true,
          moveStrings: true,
          replaceNames: true,
          variableExclusions: [
            '^_get_',
            '^_set_',
            '^_mtd_'
          ]
        },
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
