---
title: "code snippet #{{QMID}}"
subtitle: "coding our way up to consciousness"
abstract: "solving dependencies and modules call in perl"
author: michelc@gc-bank.org
keywords: "bindir, code, perl, modules, lib, dependencies"
date: "Thu Apr  9 16:40:57 CEST 2020"
hdate: "{{HDATE}}"
ring: code5
---
{% assign QM = "{{QM}}" %}
{% assign QMID = "{{QMID}}" %}
## today's snippet: [bindir](https://cloudflare-ipfs.com/ipfs/{{QM}}) code ([#{{QMID}}][snip])

In order to make sure all dependencies are taking care automagically
within my perl scripts, I now load the library next to the source : ../lib

here is the piece of code that help achieve this :

``use lib "$bindir/../lib"``

where $bindir is defined in a BEGIN block as :

```perl
BEGIN {
  my$p=rindex($0,'/',length($0)-8);our$bindir=($p>0)?substr($0,0,$p):'.';
}
```

note: the rindex function doesn't accept negative position, hence the call to length().

[snip]: https://qwant.com/?q=%26g+%23{{QMID}}

<!--
 $qm: {{QM}}$
 -->
