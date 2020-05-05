---
code: ipfsboard
title: "IPFS Memo #{{QMID}}"
subtitle: "interplanetary file system : a few useful links"
abstract: "we use IPFS for both our immutable records along with mfs for our mutables ones"
thumbnail: thmb.jpg
preview: thmb.jpg
author: michelc@gc-bank.org
keywords: "ipfs, hash, sha256, mutables, immutables"
date: "Sat Apr 18 04:52:59 CEST 2020"
hdate: "{{HDATE}}"
ring: ipfs
qm: "{{QM}}"
ready: Qmbxn7yHY4eNym9LZB2ATMLjgrN8FKkz1Fg8Fx2BYxQxGj
---
<!--
This is to make pandoc code compatible with jekyll !
{% assign code = page.code %}
{% assign QM = page.qm %}
{% assign QMID = page.qm | truncate: 7 %}
-->
## today's snippet: [{{code}}][code] code ([#{{QMID}}][snip])

[IPFS] files are stored at [addresse][1] by their content using a hash function like [SHA256].

An ipfs file can be accessed by several manner :

* using a local gateway :
<br><http://yoogle.com:8080/ipfs/{{QM}}>
* using a local api end-point :
<br><http://localhost:5001/webui/#/files/ipfs/{{QM}}>
* using a public gateway such as :

   - [gateway.ipfs.io](https://gateway.ipfs.io/ipfs/{{ready}})
   - [cloudflare-ipfs.io](https://cloudflare-ipfs.io/ipfs/{{ready}})
   - [ipfs.blockring™.ml](https://ipfs.blockring™.ml/{{ready}})
   - [dweb.link](http://dweb.link/ipfs/{{ready}})
   - [ipfs.2read.com](https://ipfs.2read.com/ipfs/{{ready}})
   - [siderus.io](https://siderus.io/ipfs/{{ready}})
   - [ipns.io](https://ipns.io/{{ready}})

   - [wayback machine](https://internet-archive.com/save/https://ipfs.io/ipfs/{{ready}})
   - [archive.is] ([KxCPX](https://archive.vn/wip/KxCPX))

[1]: https://ipfs.blockringtm.ml/ipfs/QmaRV1gdTgtR5Y7uM3sc9ZcgxMq66kyHi2ojLw6yXsGDRL#/ipfs/{{QM}}
[{{code}}]: https://ipfs.blockringtm.ml/ipfs/QmaRV1gdTgtR5Y7uM3sc9ZcgxMq66kyHi2ojLw6yXsGDRL#/ipfs/QmUearm8LdCy3GuLy28w1NXX8ypBXP8HhZvLb5F4EjjzBb
[IPFS]: https://qwant.com/?q=IPFS+Interplanetary+File+System
[SHA256]: https://qwant.com/?q=&26+SHA256

```js
```

[code]: https://cloudflare-ipfs.com/ipfs/{{QM}}
[snip]: https://qwant.com/?q=%26g+%23{{QMID}}

<!--
 $qm: {{QM}}$
 -->
