/* seems to only run once */

console.log('content script running');

function onMessage(request, sender, sendResponse) {
  // console.log(sender.tab); 
  console.log("content script got", request);
  scanPage();
}
chrome.extension.onMessage.addListener(onMessage);
console.log('listening')

// regex = /page_id=([0-9]*)/
// m = regex.exec(document.body.innerHTML);

// Test the text of the body element against our regular expression.
// if (m) {
//   // The regular expression produced a match, so notify the background page.
//   console.log('match!')
//   chrome.extension.sendRequest({
//     matches: m
//   }, function(response) {});

// } else {
//   // No match was found.
//   console.log('no match')
// }

function grabUrls() {
  var urls = [];
  var classNames = ['feed-photo', 'profilePic', 'UFIActorImage', 'photo', 'groups', 'avatar'];

  for (i in classNames) {
    var els = document.getElementsByClassName(classNames[i]);  
    console.log(els);
    for (j = 0; j < els.length; j++) {
      var url = els[j].src;
      console.log(url);
      if (urls.indexOf(url) == -1) {
        urls.push(url);
      }
    }
  }

  return urls;
}

function scanPage() {
  
  var urls = grabUrls();

  chrome.extension.sendMessage({
      data: {
        key: 'urls',
        value: urls      
      }
    }, 
    function(response) {
      console.log('sent!');
    }
  );
}