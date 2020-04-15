// some useful js functions...


function query2json(q) {
  let j = {}
  q.split('&').forEach( p => { let [k,v] = p.split('='); j[k] = v })
  console.log(j)
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
   .then ( d => { return log2json(d) } )
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
function log2json(d) {
  let data = d.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
      data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
  let json = JSON.parse(data);
  return json
}

function fetchPostText(url, content) {
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
     console.log('fetchGetJson input url '+url)
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


function validate(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return Promise.resolve(resp)
  } else {
    console.log('status:',resp.status)
    return Promise.reject(new Error(resp.statusText))
  }
}

function consLog(data) { console.log('info:',data); return data; }
function logError(err) { console.error(err); }

true; // $Source:  /my/js/scripts/essential.js$
