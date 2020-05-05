#

set -x
export IPFS_PATH=/media/IPFS/PERMLINK
tic=$(date +%s)
qm=$(ipfs add -Q -r .)
echo $tic: $qm >> qm.log
curl -s -I https://gateway.ipfs.io/ipfs/$qm | grep -i x-ipfs
echo save: https://archive.vn/?url=https://gateway.ipfs.io/ipfs/$qm
curl -s -I https://cloudflare-ipfs.com/ipfs/$qm | grep -i x-ipfs
echo save: https://archive.vn/?url=https://cloudflare-ipfs.com/ipfs/$qm

