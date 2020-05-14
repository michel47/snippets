// mychelium routines ...

// detect the core ...
const core=getCoreName(document.location.href)
const pp = core['dir'].substr(1,2);
let coreid = document.getElementById('core')
if (coreid) {
  document.getElementById('core').innerHTML = core.name
  console.log('corename: ',core)
}

if (typeof(api_url) == 'undefined') {
var api_url = core['api_url']
console.log('api_url: ',api_url)
}
if (typeof(gw_url) == 'undefined') {
var gw_url = core['gw_url']
console.log('gw_url: ',gw_url)
}


function getCoreName(url) {
  console.log('getCoreName.url: '+url)
  let core = {};
  core['kgi_url'] = 'http://127.0.0.1:76278/'; // SmartContract interface (holoServe)
  core['mfs_url'] = 'http://127.0.0.1:11248/'; // MFS2IPFS proxy
  if (url.match('holo') ) {
/* ---------------------------
   IPFS: /media/IPFS/HOLORING
   Susanna R. Dohogne
   /ip4/127.0.0.1/tcp/5211
   /ip4/127.0.0.1/tcp/8421
   /ip4/127.0.0.1/tcp/4211
--------------------------- */
    core['bot'] = 'Susanna R. Dohogne'
    core['name'] = 'holoRings'
    core['index'] = 'hlindex.log'
    core['dir'] = '/.hlrings';
    core['gw_url'] = 'http://127.0.0.1:8421';
    core['api_url'] = 'http://127.0.0.1:5211/';
  } else if (url.match('block')) {
/* ---------------------------
   IPFS: $HOME/.ipms
   Eunice D. Molt
   /ip4/127.0.0.1/tcp/5122
   /ip4/0.0.0.0/tcp/8199
   /ip4/0.0.0.0/tcp/32989
--------------------------- */
    core['bot'] = 'Eunice D. Molt'
    core['name'] = 'blockRing™'
    core['index'] = 'brindex.log'
    core['dir'] = '/.brings';
    core['gw_url'] = 'http://127.0.0.1:8122';
    core['api_url'] = 'http://127.0.0.1:8199/';

  } else if (url.match('KIN')) {
/* ---------------------------
   IPFS: $HOME/.ipfs (KIN)
   Letha J. Serve
   /ip4/127.0.0.1/tcp/5021
   /ip4/0.0.0.0/tcp/8198
   /ip4/0.0.0.0/tcp/45409
--------------------------- */
    core['bot'] = 'Letha J. Serve'
    core['name'] = 'Krys*thal INtelligence Network'
    core['index'] = 'knindex.log'
    core['dir'] = '/.knrings';
    core['gw_url'] = 'http://127.0.0.1:8198';
    core['api_url'] = 'http://127.0.0.1:5021/';
  } else if (url.match('js')) {
/* ---------------------------
   IPFS: /media/IPFS/SELF
   Dallas I. Messervy
   .jsrings/	QmVDAQkjExB5QWamq89q7fqzCfLxHZ7zr2QmvrrzNqWmCB	0
   /ip4/0.0.0.0/tcp/5001
   /ip4/0.0.0.0/tcp/8080
   /ip4/127.0.0.1/tcp/4001
--------------------------- */
    core['bot'] = 'Dallas I. Messervy'
    core['name'] = 'jsRings™'
    core['index'] = 'jsindex.log'
    core['dir'] = '/.jsrings';
    core['gw_url'] = 'http://127.0.0.1:8080';
    core['api_url'] = 'http://127.0.0.1:5001/';
  } else {
/* ---------------------------
   IPFS: /media/IPFS/PRIV
   Alisa V. Greenen
   /ip4/127.0.0.1/tcp/5042
   /ip4/127.0.0.1/tcp/8082
   /ip4/127.0.0.1/tcp/4042
--------------------------- */
    core['bot'] = 'Alisa V. Greenen'
    core['name'] = 'persoRings'
    core['index'] = 'prindex.log'
    core['dir'] = '/.prings'; // privateRings
    core['gw_url'] = 'http://127.0.0.1:8082';
    core['api_url'] = 'http://127.0.0.1:5042/';
  }
  return core;
}

/* 
---------------------------
IPFS: /media/IPFS/AUDIO
Clara A. Kunka
/ip4/127.0.0.1/tcp/5004
/ip4/0.0.0.0/tcp/8044
/ip4/127.0.0.1/tcp/4004
---------------------------
IPFS: /media/IPFS/BACKUP
Anthony T. Sklenar
/ip4/127.0.0.1/tcp/5008
/ip4/127.0.0.1/tcp/8048
/ip4/127.0.0.1/tcp/4008
---------------------------
IPFS: /media/IPFS/COLD
Wilda B. Boepple
/ip4/127.0.0.1/tcp/5052
/ip4/127.0.0.1/tcp/8092
/ip4/127.0.0.1/tcp/4012
---------------------------
IPFS: /media/IPFS/FILED
Preston V. Setias
/ip4/127.0.0.1/tcp/5009
/ip4/127.0.0.1/tcp/8049
/ip4/127.0.0.1/tcp/4009
---------------------------
IPFS: /media/IPFS/HOLORING
Susanna R. Dohogne
/ip4/127.0.0.1/tcp/5211
/ip4/127.0.0.1/tcp/8421
/ip4/127.0.0.1/tcp/4211
---------------------------
IPFS: /media/IPFS/IMAGES
Desiree R. Lorman
/ip4/127.0.0.1/tcp/5005
/ip4/0.0.0.0/tcp/8045
/ip4/127.0.0.1/tcp/4005
---------------------------
IPFS: /media/IPFS/IMG
Desiree R. Lorman
/ip4/127.0.0.1/tcp/5005
/ip4/0.0.0.0/tcp/8045
Error: this action must be run in online mode, try running 'ipfs daemon' first
---------------------------
IPFS: /media/IPFS/INFINITE
Cheryl J. Heinzmann
/ip4/0.0.0.0/tcp/5242
/ip4/0.0.0.0/tcp/8282
/ip4/127.0.0.1/tcp/4242
---------------------------
IPFS: /media/IPFS/LEDGER
Amie R. Mancias
/ip4/127.0.0.1/tcp/5007
/ip4/127.0.0.1/tcp/8047
/ip4/127.0.0.1/tcp/4007
---------------------------
IPFS: /media/IPFS/LOSTNFOUND
Julio S. Prattella
/ip4/127.0.0.1/tcp/5041
/ip4/127.0.0.1/tcp/8081
/ip4/127.0.0.1/tcp/4041
---------------------------
IPFS: /media/IPFS/MEDIA
Valarie L. Baccari
/ip4/127.0.0.1/tcp/5006
/ip4/0.0.0.0/tcp/8046
/ip4/127.0.0.1/tcp/4006
---------------------------
IPFS: /media/IPFS/MUTABLES
Tammy L. Clukies
/ip4/127.0.0.1/tcp/5010
/ip4/127.0.0.1/tcp/8050
/ip4/127.0.0.1/tcp/4010
---------------------------
IPFS: /media/IPFS/OOB
Adele A. Landacre
/ip4/127.0.0.1/tcp/5051
/ip4/0.0.0.0/tcp/8091
/ip4/127.0.0.1/tcp/4051
---------------------------
IPFS: /media/IPFS/PERM
Jon S. Huenergardt
/ip4/127.0.0.1/tcp/5043
/ip4/127.0.0.1/tcp/8083
/ip4/127.0.0.1/tcp/4043
---------------------------
IPFS: /media/IPFS/PERMLINK
Deana C. Baremore
/ip4/0.0.0.0/tcp/5003
/ip4/0.0.0.0/tcp/8043
/ip4/127.0.0.1/tcp/4003
---------------------------
IPFS: /media/IPFS/PRIV
Alisa V. Greenen
/ip4/127.0.0.1/tcp/5042
/ip4/127.0.0.1/tcp/8082
Error: this action must be run in online mode, try running 'ipfs daemon' first
---------------------------
IPFS: /media/IPFS/PRIVATE
Alisa V. Greenen
/ip4/127.0.0.1/tcp/5002
/ip4/127.0.0.1/tcp/8042
/ip4/127.0.0.1/tcp/4002
---------------------------
IPFS: /media/IPFS/RANDOM
Nolan L. Nham
/ip4/127.0.0.1/tcp/5011
/ip4/127.0.0.1/tcp/8051
/ip4/127.0.0.1/tcp/4011
---------------------------
IPFS: /media/IPFS/SELF
Dallas I. Messervy
.jsrings/	QmVDAQkjExB5QWamq89q7fqzCfLxHZ7zr2QmvrrzNqWmCB	0
/ip4/0.0.0.0/tcp/5001
/ip4/0.0.0.0/tcp/8080
/ip4/127.0.0.1/tcp/4001
---------------------------
IPFS: /media/IPFS/WUOTAI
Basil A. Fontanini
/ip4/127.0.0.1/tcp/5046
/ip4/127.0.0.1/tcp/8086
/ip4/127.0.0.1/tcp/4046
---------------------------
IPFS: /media/IPFS/XPN
Jennie C. Casilla
/ip4/127.0.0.1/tcp/5053
/ip4/0.0.0.0/tcp/8093
/ip4/127.0.0.1/tcp/4053
---------------------------
 */

