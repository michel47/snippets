// some useful js functions...
//
console.log('essential.js: 1.1')

function load(e) {
    //console.log('load: ',e); 
    return new Promise(function(resolve, reject) {
        e.onload = resolve
        e.onerror = reject
    });
}
function readAsText(file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function() {
            resolve(reader.result);
        }
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
function readAsBinaryString(file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function() {
            resolve(reader.result);
        }
        reader.onerror = reject;
        reader.readAsBinaryString(file)
    });
}
function readAsDataURL(file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function() {
            resolve(reader.result);
        }
        reader.onerror = reject;
        reader.readAsDataURL(file)
    });
}


function query2json(q) {
  let j = {}
  q.split('&').forEach( p => { let [k,v] = p.split('='); j[k] = v })
  return j
}


function getQuery(form) {
  console.dir(form)
  var inputs = Array.from(form.elements)
  console.log(inputs);
  let names = inputs.map( e => e.name )
  let query = serialize(form);
  console.log(names)
  console.log('query: '+query)
  return(query)
}


function serialize(form) {
   var field, l, s = [];
   if (typeof form == 'object' && form.nodeName == "FORM") {
      var len = form.elements.length;
      for (var i=0; i<len; i++) {
         field = form.elements[i];
         if (field.name && !field.removed && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
            if (field.type == 'select-multiple') {
               l = form.elements[i].options.length; 
               for (var j=0; j<l; j++) {
                  if(field.options[j].selected)
                     s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
               }
            } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
               s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
            }
         }
      }
   }
   return s.join('&').replace(/%20/g, '+');
}

function getCfIp() {
   let url = 'https://www.cloudflare.com/cdn-cgi/trace'
   return fetch(url)
   .then( resp => resp.text() )
   .then ( d => { return list2json(d) } )
   .then( json => {
     if (typeof(json.ip) != 'undefined') {
        return json.ip
     } else if (typeof(json.query) != 'undefined') {
        return json.query
     } else {
       console.log('json:',json)
       return '0.0.0.0'
     }
   } )
   .catch( logError )
}
function list2json(d) {
  let data = d.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
      data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
  let json = JSON.parse(data);
  return json
}

function fetchPostBinary(url, content) {
     let form = new FormData(); // need encodeURI ... ??
     //console.log('fetchPostBinary: '+url,content)
     form.append('file', content)
     return fetch(url, { method: "POST", mode: 'cors', body: form })
     .then(consLog('fetchPostBinary.resp: '))
}

function fetchPostText(url, content) {
     let form = new FormData();
     form.append('file', content)
     return fetch(url, { method: "POST", mode: 'cors', body: form })
}

function fetchPostJson(url, obj) {
     let content = JSON.stringify(obj)
     let form = new FormData();
     form.append('file', content)
     return fetch(url, { method: "POST", mode: 'cors', body: form })
}

function fetchGetText(url) {
   return fetch(url, { method: "GET"} )
   .then(validate)
   .then( resp => resp.text() )
}

function fetchGetJson(url) {
     console.log('fetchGetJson.url: '+url)
     return fetch(url,{ method: "GET"} )
   .then(validate)
   .then( resp => resp.json() )
}

function getIp() {
 // let url = 'https://postman-echo.com/ip'
 // fetch(url).then(validate)
 let url = 'https://iph.heliohost.org/cgi-bin/jsonip.pl'
 url = 'https://api.ipify.org/?format=json'
 url = 'https://ipinfo.io/json'
 fetch(url,{mode:"cors"}).then(validate)
 .then( resp=> { return resp.json() } )
 .then( json => {
   if (typeof(json.ip) != 'undefined') {
     return json.ip
   } else if (typeof(json.query) != 'undefined') {
     return json.query
   } else {
     console.log('json:',json)
     return '0.0.0.0'
   }
  } )
 .catch( logError )
}

function getTic() {
   var dat = new Date();
   var result = Math.floor(dat.getTime() / 1000);
   return +result
}

function getSpot(tic, ip, peerId, nonce) {
     var ipInt = dot2Int(ip);
     var idInt = qm2Int(peerId);
     var spot = (tic ^ +ipInt ^ idInt ^ nonce)>>>0;
     
     var result = "--- # spot for "+peeId+"\n";
     result += "tic: "+tic+"\n";
     result += "ip: "+ipInt+"\n";
     result += "spot: "+spot+"\n";
     
     return result;
} 


function dot2Int(dot) {
    let d = dot.split('.');
    return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}

function qm2Int(qm) {
  plain = base58.decode(qm)
  let q16 = plain.to_hex();
  console.log('f'+q16)
  let d = q16.split('.');
  console.log('d: '+d)
  return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}
function to_hex(s) {
    var r = '';
    for (var i = 0; i < s.length; i++) {
        var v;
        if (s[i] < 0)
            s[i] += 256;
        v = s[i].toString(16);
        if (v.length == 1)
            v = '0' + v;
        r += v;
    }
    return r;
}






function validate(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return Promise.resolve(resp)
  } else {
    console.log('status:',resp.status)
    return Promise.reject(new Error(resp.statusText))
  }
}

function consLog(what) { return data => { console.log(what+': ',data); return data; } }
function logError(err) { console.error(err); }

true; // $Source:  /my/js/scripts/essential.js$
