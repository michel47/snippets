// Effect Javascript


 var dat = new Date();
 var tics = Math.floor(dat.getTime() / 1000);
 console.log('tics:'+tics)
 var angle = (dat.getTime() % 1710997) * 360 / 1710997; 
 console.log('angle:'+angle.toFixed(3))

 var thmb = document.getElementById('thmb');
 if (thmb) {
    thmb.style.filter = 'hue-rotate('+angle.toFixed(2)+'deg)';
 }

 var previewimg = document.getElementById('preview').childNodes[0];
 if (previewimg) {
    previewimg.style.transform = 'rotate('+angle.toFixed(2)+'deg)';
    previewimg.style.filter = 'hue-rotate('+(angle.toFixed(2) - 60)+'deg)';
 }

 var logoimg = document.getElementById('logo');
 if (logoimg) {
    logoimg.style.transform = 'rotate('+angle.toFixed(2)+'deg)';
    logoimg.style.filter = 'hue-rotate('+(angle.toFixed(2) - 60)+'deg)';
 }
 console.log(document.getElementsByTagName('body')[0].style)
 /* see [*](https://css-tricks.com/apply-a-filter-to-a-background-image/) */
