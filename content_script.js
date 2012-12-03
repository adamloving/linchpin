console.log('running');

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

var profilePics = document.getElementsByClassName('profilePic');
var urls = [];


for (i in profilePics) {
  var url = profilePics[i].src;
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