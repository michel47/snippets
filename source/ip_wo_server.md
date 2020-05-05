# how to get the public IP with out connecting to an outside server

This code gives the local IP, not the public on
any ideas how to get the publick one ?


<!-- begin snippet: js hide: false-->

<!-- language: lang-js -->
console.log(
(req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress).split(",")[0] );

<!-- end snippet -->

