---
code: ipfscat
title: "code snippet #{{QMID}}"
subtitle: "holoRing: coding the next generation blockchains"
abstract: "ipfs cat of hash passed as fragment"
thumbnail: thmb.jpg
preview: thmb.jpg
author: michelc@gc-bank.org
keywords: "ipfs, hash, cat, javascript, fragment"
date: "Fri Apr 10 06:39:06 CEST 2020"
hdate: "{{HDATE}}"
ring: jscript
qm: "{{QM}}"
---
<!--
{% assign code = page.code %}
{% assign QM = page.qm %}
{% assign QMID = page.qmid | truncate: 7 %}
-->
## today's snippet: [{{code}}][code] code ([#{{QMID}}][snip])

[IPFS] files are stored at [addresse][1] by their content using a hash function like [SHA256].

With a little of javascript we have a simple way to get to view the file content within a div
this is neat for serverless websites, that pull data from ipfs.

The piece of [code] below takes the hash from the #fragment in the url and recover the file or directory
if it is a file it simply replaces the current &lt;div> with the content (in a &ltpre> tag).

example; the script an be view at this URL:
<br>[https://gateway.ipfs.io/ipfs/QmaRV1gdTgtR5Y7uM3sc9ZcgxMq66kyHi2ojLw6yXsGDRL#/ipfs/QmUearm8LdCy3GuLy28w1NXX8ypBXP8HhZvLb5F4EjjzBb][{{code}}]

[1]: https://ipfs.blockringtm.ml/ipfs/QmaRV1gdTgtR5Y7uM3sc9ZcgxMq66kyHi2ojLw6yXsGDRL#/ipfs/{{QM}}
[{{code}}]: https://ipfs.blockringtm.ml/ipfs/QmaRV1gdTgtR5Y7uM3sc9ZcgxMq66kyHi2ojLw6yXsGDRL#/ipfs/QmUearm8LdCy3GuLy28w1NXX8ypBXP8HhZvLb5F4EjjzBb
[IPFS]: https://qwant.com/?q=IPFS+Interplanetary+File+System
[SHA256]: https://qwant.com/?q=&26+SHA256

```js
// get fragment ...
var fragment = window.location.hash.slice(1)
console.log('fragment: '+fragment)
var thisscript = document.currentScript;
var caller = thisscript.parentNode;

// anonymous functions ...
const status = resp => {
  if (resp.status >= 200 && resp.status < 300) {
    return Promise.resolve(resp)
  }
  return Promise.reject(new Error(resp.statusText))
}
const error = e => console.log('catch: '+e);

var apiurl='http://127.0.0.1:5001/api/v0/files/stat?arg='+fragment+'&hash=true'
console.log('apiurl: '+apiurl)
fetch(apiurl)
.then(status)
.then((resp) => resp.json()) // Transform the data into json
.then(function(obj) {
  var hash = obj.Hash;
  var type = obj.Type;
  console.log(JSON.stringify(obj));
  //console.log('hash: '+hash) )
  if (type == 'directory') {
   window.location.href='http://127.0.0.1:8080/ipfs/' + hash;
  } else if (type == 'file') {
// get content of ipfs file
// substitute this div ...
    fetch('http://127.0.0.1:8080/ipfs/'+hash)
    .then( resp => resp.text()) // Transform the data into text
    .then( data => caller.innerHTML = '<pre>'+data+'</pre>' )
    .catch(error)
  }
})
.catch(error)
```

note: we use the parentNode attribute of the script to know which div to update,
such that the resulting html has no "trace" of the script :)

[code]: https://cloudflare-ipfs.com/ipfs/{{QM}}
[snip]: https://qwant.com/?q=%26g+%23{{QMID}}

<!--
 $qm: {{QM}}$
 -->
