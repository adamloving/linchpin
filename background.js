var data = {};

function onMessage(request, sender, sendResponse) {
  console.log(sender.tab ?
              "from a content script:" + sender.tab.url :
              "from the extension");
  
  data[request.data.key] = request.data.value;
  console.log("got", request);
}

// chrome.runtime.onInstalled.addListener(function(object details) {...})

// Listen for the content script to send a message to the background page.
console.log('loaded background');
chrome.extension.onMessage.addListener(onMessage);

// var views = chrome.extension.getViews();
// for (var i = 0; i < views.length; i++) {
//   var view = views[i];
//   view.console.log('duh', view);
// }


// chrome.browserAction.onClicked.addListener(function(tabs.Tab tab) {...});