var data = {};

// http://developer.chrome.com/extensions/history.html#event-onVisited
function onVisited(hi) {
  // tell content script to re-scan the page
  setTimeout(function() {
    console.log('onVisited', hi.url);
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendMessage(tab.id, {},  function(response) { console.log('sent!'); });
    });
  }, 3000);
}

function onMessage(request, sender, sendResponse) {
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  data[request.data.key] = request.data.value;
  console.log("got", request);
}

// chrome.runtime.onInstalled.addListener(function(object details) {...})
// Listen for the content script to send a message to the background page.
console.log('loaded background');

chrome.extension.onMessage.addListener(onMessage);
chrome.history.onVisited.addListener(onVisited);

// chrome.browserAction.onClicked.addListener(function(tabs.Tab tab) {...});

// var views = chrome.extension.getViews();
// for (var i = 0; i < views.length; i++) {
//   var view = views[i];
//   view.console.log('duh', view);
// }


// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');

// // ...draw to the canvas...
// var imageData = context.getImageData(0, 0, 19, 19);

// chrome.browserAction.setIcon({
//   imageData: imageData
// });