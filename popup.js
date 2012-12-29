backgroundPage = chrome.extension.getBackgroundPage();
backgroundPage.console.log(backgroundPage.data.urls);

function renderImages() {
  for (i in backgroundPage.data.urls) {
    var img = document.createElement("image");
    img.src = backgroundPage.data.urls[i];
    document.body.appendChild(img);  
  }  
}

setTimeout(renderImages, 500);

