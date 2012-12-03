/* seems to only run once */

console.log('content script running');

function onMessage(request, sender, sendResponse) {
  // console.log(sender.tab); 
  console.log("content script got", request);
  scanPage();
}

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

function scanPage() {
  
  var els = [];
  var profilePics = document.getElementsByClassName('profilePic');
  for (i in profilePics) { els.push(profilePics[i]); }
  profilePics = document.getElementsByClassName('UFIActorImage');
  for (i in profilePics) { els.push(profilePics[i]); }

  var urls = [];

  for (i in els) {
    var url = els[i].src;
    console.log(url);
    urls.push(url);
  }

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

chrome.extension.onMessage.addListener(onMessage);