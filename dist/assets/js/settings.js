console.clear();

toggle = document.querySelectorAll('.toggle');
const fno = document.getElementById('fake-news-opt');
const hso = document.getElementById('hate-speech-opt');
const cbo = document.getElementById('click-baits-opt');
const pwo = document.getElementById('profanity-words-opt');
const save_button = document.getElementById('save_settings');


chrome.storage.sync.get(['white_list'], function(result) {
  if(result.white_list){
    var whiteList = (result.white_list).split('|');
    for(var i=0; i<whiteList.length;i++){
      if(whiteList[i] !== 'undefined'){
        var node = document.createElement('LI');                 // Create a <li> node
        var textnode = document.createTextNode(whiteList[i]); 
        node.className = 'list-group-item';
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById('ul_whitelist').appendChild(node);
      }   
    }
  }
}
);

chrome.storage.sync.get(['options'], function (result) {
  console.log(result.options);
  if (typeof result.options === 'undefined') {

  }

  else {
    for (var i = 0; i < ((result.options).length); i++) {
      var n = '.' + ((result.options)[i]);
      console.log(n);
      var find_element = document.querySelectorAll(n);
      //console.log(find_element);

      if (find_element[0].classList.contains('disable_fake_news')) {
        fno.classList.add('hidden');
      }

      if (find_element[0].classList.contains('disable_hate_speech')) {
        hso.classList.add('hidden');
      }

      if (find_element[0].classList.contains('disable_click_baits')) {
        cbo.classList.add('hidden');
      }

      if (find_element[0].classList.contains('disable_profanity_words')) {
        pwo.classList.add('hidden');
      }

      find_element[0].classList.add('is-on');

    }
  }
}
);



for (var i = 0; toggle.length > i; i++) {
  toggle[i].addEventListener('click', function () {
    this.classList.toggle('is-on');
    if (this.classList.contains('disable_fake_news')) {
      fno.classList.toggle('hidden');
    }

    if (this.classList.contains('disable_hate_speech')) {
      hso.classList.toggle('hidden');
    }

    if (this.classList.contains('disable_click_baits')) {
      cbo.classList.toggle('hidden');
    }

    if (this.classList.contains('disable_profanity_words')) {
      pwo.classList.toggle('hidden');
    }
  });
}


save_button.addEventListener('click', function () {
  var selected_options = [];
  var toggles = document.querySelectorAll('.toggle');
  for (var i = 0; toggles.length > i; i++) {
    if (toggles[i].classList.contains('is-on')) {
      //console.log('SSS');
      //console.log(toggles[i].classList);
      kk = toggles[i].classList;
      //console.log(kk);
      //console.log(kk[2]);
      selected_options.push(kk[2]);
    }
  }

  chrome.storage.sync.set({ options: selected_options }, function () {
    console.log('Options: ' + selected_options);
  });
});
