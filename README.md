js-obfuscator
=============

Obfuscate JavaScript files via javascriptobfuscator.com.
This is also a Grunt plugin.

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

```shell
npm install js-obfuscator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile
with this line of JavaScript:

```js
grunt.loadNpmTasks('js-obfuscator');
```

Example
-------

```js
grunt.initConfig({
  jsObfuscate: {
    test: {
      files: {
        'dest/dest.js': [
          'src/src1.js',
          'src/src2.js'
        ]
      }
    }
  }
});
```
