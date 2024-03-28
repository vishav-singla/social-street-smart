var r = /:\/\/(.[^/]+)/;
var prevWebsite='';
var myURL = 'about:blank'; // A default url just in case below code doesn't work
var msgs='';
var websites = [];
var domainsList = [];
var comments = [];


async function getNewsWebsites(URL) {
  const request = await fetch(URL);
  msgs = await request.json();
  websites= msgs.Website;
  domainsList= msgs.Domain;
  comments= msgs.Comments; 
  return;
}

var URL= chrome.runtime.getURL('../../common/news_websites.json');
getNewsWebsites(URL);

// Wait 1 second until the news websites, domains and comments are loaded
setTimeout(function(){
  console.log(msgs);
}, 1000);

// avoid Cannot create item with duplicate id SsSorigin
if(chrome.contextMenus !== undefined)
  chrome.contextMenus.removeAll();
  
var newsOriginContextMenu= {
  'id': 'SsSorigin',
  'title': 'Get probable News ',
  'contexts':['selection']
};



chrome.contextMenus.create(newsOriginContextMenu);
chrome.contextMenus.onClicked.addListener(function(clickData){
  if(clickData.menuItemId==='SsSorigin' && clickData.selectionText){
    //console.log(clickData.selectionText);
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
      //console.log("received" + clickData.selectionText);
        var data = JSON.parse(xhttp.responseText);
        var info_high = data['HIGH'];
        var info_some = data['SOME'];
        var info_minimal = data['MINIMAL'];

        var notific = {
          type: 'basic',
          title: 'Origin probabilities: ',
          message: 'High:' + info_high + ', SOME: '+ info_some,
          expandedMessage: 'High' + info_minimal,
          iconUrl: '../../assets/icon/72.png'
        };

        console.log(info_high);
        chrome.notifications.create(notific); 
      }
    };
    xhttp.open('GET', 'http://18.221.117.28:7000/pred?text=' + clickData.selectionText, true);
    xhttp.send();
  }
});




function checkWebsite(myWebsite){
  // avoid checking the same website twice
  if(prevWebsite === myWebsite)
    return;

  console.log('visiting: ' + myWebsite);
  // console.log(domainsList.length);

  for(var i = 0; i < domainsList.length; i++) {
    if ( (myWebsite===domainsList[i]) || (myWebsite.includes(domainsList[i])) || (domainsList[i].includes(myWebsite)) ) { //compares if website is in the list
      var opt = {
        type: 'basic',
        title: 'Webite Info: ' + websites[i],
        message: 'Comments: ' + comments[i],
        iconUrl: '../../assets/icon/72.png'
      };

      chrome.notifications.create(opt);
      break;

    }

  }
  prevWebsite=myWebsite;
}



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { // onUpdated should fire when the selected tab is changed or a link is clicked
  //check if the tab is not complete to avoid loading the url before it is loaded
  if (changeInfo.status !== 'complete') 
    return;
  // check if tab is undefined
  if(tab.url === undefined)
    return;


  myURL = tab.url;
  const k = myURL.match(r)[1];
  const myWebsite = k.replace(/^(https?:\/\/)?(www\.)?/,'');
  
  checkWebsite(myWebsite);
  chrome.storage.sync.set({'website': myWebsite});
});