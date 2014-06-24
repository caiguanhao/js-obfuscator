var Q           = require('q');
var http        = require('http');
var entities    = require('entities');
var querystring = require('querystring');
var htmlparser  = require('htmlparser2');

function request(method, postData, reqHeaders) {
  var deferred = Q.defer();
  reqHeaders = reqHeaders || {};
  var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit' +
      '/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
  };
  for (var h in reqHeaders) {
    headers[h] = reqHeaders[h];
  }
  var req = http.request({
    host: 'www.javascriptobfuscator.com',
    port: 80,
    path: '/',
    method: method || 'GET',
    headers: headers
  }, function(res) {
    res.setEncoding('utf8');
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      deferred.resolve({
        headers: res.headers,
        body: body
      });
    });
  });
  if (postData) {
    req.write(querystring.stringify(postData));
  }
  req.end();
  return deferred.promise;
}

function getFormData(content) {
  var keys = [
    '__EVENTTARGET',
    '__EVENTARGUMENT',
    '__VIEWSTATE',
    '__EVENTVALIDATION',
    'uploader1',
    'Button1'
  ];
  var formData = {};
  var deferred = Q.defer();
  var parser = new htmlparser.Parser({
    onopentag: function(name, attribs) {
      if (name === 'input') {
        if (keys.indexOf(attribs.name) > -1) {
          formData[attribs.name] = attribs.value || '';
        }
      }
    },
    onend: function(tagname) {
      deferred.resolve(formData);
    }
  });
  parser.write(content);
  parser.end();
  return deferred.promise;
}

function getResult(content) {
  var getText;
  var deferred = Q.defer();
  var parser = new htmlparser.Parser({
    onopentag: function(name, attribs) {
      if (name === 'textarea' && attribs.name === 'TextBox2') {
        getText = true;
      }
    },
    ontext: function(text) {
      if (getText === true) {
        getText = text;
      }
    },
    onend: function(tagname) {
      deferred.resolve(getText);
    }
  });
  parser.write(content);
  parser.end();
  return deferred.promise;
}

function obfuscate(strInput, options) {
  return request().
  then(function(res) {
    var headers = {};
    var cookie = res.headers['set-cookie'][0];
    var cookiedata = cookie.slice(0, cookie.indexOf(';'));
    headers['Cookie'] = cookiedata;
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return getFormData(res.body).then(function(formData) {
      return {
        formData: formData,
        headers: headers
      };
    });
  }).
  then(function(bundle) {
    bundle.formData['UploadLib_Uploader_js'] = '1';
    bundle.formData['TextBox1'] = strInput;
    bundle.formData['TextBox2'] = '';
    bundle.formData['cbEncodeStr'] = 'on';
    bundle.formData['cbEncodeNumber'] = 'on';
    bundle.formData['cbMoveStr'] = 'on';
    bundle.formData['cbReplaceNames'] = 'on';
    bundle.formData['TextBox3'] = '^_get_\r\n^_set_\r\n^_mtd_';
    return bundle;
  }).
  then(function(bundle) {
    return request('POST', bundle.formData, bundle.headers);
  }).
  then(function(res) {
    return getResult(res.body);
  }).
  then(function(result) {
    result = entities.decodeHTML(result).trim();
    if (result.length === 0) {
      throw 'Empty result.';
    }
    if (result.slice(0, 33) === 'JScriptCodeDom.CodeParseException') {
      throw result;
    }
    return result;
  });
}

module.exports = obfuscate;
