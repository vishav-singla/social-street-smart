var r=/:\/\/(.[^\/]+)/,prevWebsite='',myURL='about:blank',msgs='';console.log('start');var URL=chrome.extension.getURL('../../common/news_websites.json'),request=new XMLHttpRequest;if(request.open('GET',URL,!1),request.send(null),200===request.status)msgs=JSON.parse(request.responseText);var websites=msgs.Website,domainsList=msgs.Domain,comments=msgs.Comments;function checkWebsite(e){if(prevWebsite!==e){console.log('visiting: '+e);for(var s=0;s<1964;s++)if(e===domainsList[s]||e.includes(domainsList[s])||domainsList[s].includes(e)){var t={type:'basic',title:'Webite Info: '+websites[s],message:'Comments: '+comments[s],iconUrl:'../../assets/icon/72.png'};chrome.notifications.create(t);break;}}prevWebsite=e;}chrome.tabs.onUpdated.addListener(function(e,s,t){chrome.tabs.getSelected(null,function(e){myURL=e.url,k=myURL,k=myURL.match(r)[1],myWebsite=k.replace(/^(https?:\/\/)?(www\.)?/,''),checkWebsite(myWebsite),chrome.storage.sync.set({website:myWebsite});});});