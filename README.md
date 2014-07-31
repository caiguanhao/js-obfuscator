js-obfuscator
=============

Obfuscate JavaScript files via [javascriptobfuscator.com](
http://www.javascriptobfuscator.com/).

**IMPORTANT**: It is possible that your code can be viewed and/or stored by
javascriptobfuscator.com. Please DO NOT include any sensitive data. If you
care about your code, split and uglify them before obfuscating.

---

You can install it globally as a command:

```
npm install -g js-obfuscator
echo "var fs = require('fs')" | jsobfuscate -o keepIndentations=false
var _0x40c7=["\x66\x73"];var fs=require(_0x40c7[0]);
```

Or install it as a dependency:

```
npm install js-obfuscator --save
var jsObfuscator = require('js-obfuscator');
jsObfuscator ( <string> input [, <object> options ] )
Returns: a Q promise.
```

Or you can use it with Grunt `~0.4.0`:

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

## Options

### keepLinefeeds
Type: `Boolean` Default: `false`

### keepIndentations
Type: `Boolean` Default: `false`

### encodeStrings
Type: `Boolean` Default: `true`

### encodeNumbers
Type: `Boolean` Default: `true`

### moveStrings
Type: `Boolean` Default: `true`

### replaceNames
Type: `Boolean` Default: `true`

### variableExclusions
Type: `Array`   Default: `[ '^_get_', '^_set_', '^_mtd_' ]`

### concurrency (for Grunt plugin only)
Type: `Number`  Default: `2`  Range: `1 - 99`

## Command

```
$ jsobfuscate -h
Usage: jsobfuscate [OPTIONS] [FILES]

Obfuscate JavaScript files via javascriptobfuscator.com.
Read from STDIN if no files specified.

Default Options:
  -o keepLinefeeds=false
  -o keepIndentations=false
  -o encodeStrings=true
  -o encodeNumbers=true
  -o moveStrings=true
  -o replaceNames=true
  -o variableExclusions="['^_get_', '^_set_', '^_mtd_']"
```

## Examples

### Grunt

```js
grunt.initConfig({
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
        variableExclusions: [ '^_get_', '^_set_', '^_mtd_' ]
      },
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

### Call

```js
var jsObfuscator = require('js-obfuscator');

var script = 'Array.prototype.diff = function(a) {' +
'  return this.filter(function(i) {return a.indexOf(i) === -1;});' +
'};';

var options = {
  keepLinefeeds:      true,
  keepIndentations:   true,
  encodeStrings:      true,
  encodeNumbers:      true,
  moveStrings:        true,
  replaceNames:       true,
  variableExclusions: [ '^_get_', '^_set_', '^_mtd_' ]
};

jsObfuscator(script, options).then(function(obfuscated) {
  console.log(obfuscated);
}, function(err) {
  console.error(err);
});

/*
var _0xa3c9=["\x64\x69\x66\x66","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65",
"\x69\x6E\x64\x65\x78\x4F\x66","\x66\x69\x6C\x74\x65\x72"]
Array[_0xa3c9[1]][_0xa3c9[0]]=function (_0x4068x1)
{
  return this[_0xa3c9[3]](function (_0x4068x2)
  {
    return _0x4068x1[_0xa3c9[2]](_0x4068x2)===-1;
  }
  );
}
;
*/
```

## Developer

* caiguanhao &lt;caiguanhao@gmail.com&gt;
