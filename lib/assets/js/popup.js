

window.onload = function() {

  chrome.storage.sync.get(['Main_Switch, white_list'], function(result){

    console.log(result.white_list);

    if((result.white_list)==='undefined') {
      chrome.storage.sync.set({"white_list": "|stackoverflow.com"});
    }
    
    if((result.Main_Switch)==='undefined') {
      chrome.storage.sync.set({"Main_Switch": "yes"});
    }
    
  });


  var curWebsite='';

  function setWebsite(website){
    curWebsite=website;
  }
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var r = /:\/\/(.[^/]+)/;
    k=tabs[0].url.match(r)[1];
    myWebsite=k.replace(/^(https?:\/\/)?(www\.)?/,'');
    setWebsite(myWebsite);
  });
  
  
  chrome.storage.sync.get(['Main_Switch'], function(result) {
    var onOff = document.getElementById('mainonoffswitch');

    if(result.Main_Switch==='yes'){
      if (!((onOff.classList).contains('is_on'))) {
        onOff.classList.add('is_on');
        onOff.checked = true;
      }
    }
    //console.log(result.Main_Switch+'yo');

    if(result.Main_Switch==='no'){
      if ((onOff.classList).contains('is_on')) {
        onOff.classList.remove('is_on');
        onOff.checked = false;
      }
    }
  }
  );


  chrome.storage.sync.get(['white_list'], function(result) {
  
    if(result.white_list){
      //console.log('wl'+ result.white_list);

      var onOff = document.getElementById('whitelistSwitch');
      console.log(result.white_list);    
      console.log(curWebsite);
      if((result.white_list).includes('|'+curWebsite)){
        if (!((onOff.classList).contains('is_on'))) {
          onOff.classList.add('is_on');
          onOff.checked = true;
        }

      }

      if((!(result.white_list).includes('|'+curWebsite))){
        if ((onOff.classList).contains('is_on')) {
          onOff.classList.remove('is_on');
          onOff.checked = false;
        }
      }

    }
  }
  );



  var onOff = document.getElementById('mainonoffswitch');
  //console.log(onOff);

  onOff.addEventListener('click', function () {
    var flag;
    if(this.classList.contains('is_on')){
      this.classList.remove('is_on');
      chrome.storage.sync.set({'Main_Switch': 'no'});
      chrome.storage.sync.get(['Main_Switch'], function(result) {
        // console.log(result.Main_Switch);
      });

      flag=1;
    }

    if(!(this.classList.contains('is_on'))&&(flag!==1)){
      this.classList.add('is_on');
      chrome.storage.sync.set({'Main_Switch': 'yes'});
      chrome.storage.sync.get(['Main_Switch'], function(result) {
        //console.log(result.Main_Switch);
      });     
    }

  });


  var whiteList = document.getElementById('whitelistSwitch');
  whiteList.addEventListener('click', function () {
    if(this.classList.contains('is_on')){
      this.classList.remove('is_on');
      chrome.storage.sync.get(['white_list'], function(result) {
        var websiteList = result.white_list;
        websiteList = websiteList.replace('|' + curWebsite, '');
        console.log(websiteList+'after removal');
        chrome.storage.sync.set({'white_list': websiteList});
      }
      );}


    else
    {
      this.classList.add('is_on');
      chrome.storage.sync.get(['white_list'], function(result) {
        // console.log(curWebsite);
        var websiteList= '';
        websiteList=websiteList+result.white_list;
        if(websiteList){
          websiteList=websiteList+'|'+curWebsite;
          console.log(websiteList);
        }

        else {
          console.log(curWebsite);
          websiteList=websiteList+curWebsite;
          console.log(websiteList);
        }

        chrome.storage.sync.set({'white_list': websiteList});
      });
    }
  });
      
};
