function youtube_clickbait(e){document.querySelectorAll('[id=video-title]').forEach(function(e){if('SSS-Youtube'!==e.id){var t=e.innerText;console.log(t);var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState&&200===n.status){var t=JSON.parse(n.responseText).Result,o=document.createElement('div');if(t>.9)o.style.textDecoration='underline',o.style.color='rgb(128, 0, 0)',o.style.fontSize='18px',o.style.textAlign='right',o.textContent='Clickbait';else if(t>.6&&t<.9){o.style.textDecoration='underline',o.style.color='rgb('+Number(1.28*t).toFixed(0)+', '+Number(1.28*(100-t)).toFixed(0)+', 0)',o.style.textAlign='right',o.style.fontSize='18px';var i=Math.round(100*t);o.textContent=i+'% Clickbait';}e.parentNode.parentNode.append(o);}},n.open('GET','http://127.0.0.1:5000/pred?text='+t,!0),n.send();}e.id='SSS-Youtube';});}