
/*
 * the purpose of this module is to switch production module w/ local one if they exists !
 * usage:
<script src="https://michel47.github.io/snippets/js/switch-modules.js" class="exp"></script>
 */

thisscript = document.currentScript
let src = thisscript.src

thisscript.version = '1.1';
thisscript.name = src.replace(RegExp('.*/([^/]+)$'),"$1")
console.log(thisscript.name+': '+thisscript.version)


// test if experimental ...
if (thisscript.className.match('exp')) { 

  console.dir(thisscript)

  src = src.replace(RegExp('.*/github.com/'),'../')
  console.log('oldsrc: '+thisscript.src)
  console.log('newsrc: '+src)
  thisscript.src = src
}   


