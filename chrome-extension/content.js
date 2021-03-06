chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    var url = request.url;
    var title = request.title;
    var keywords = request.keywords;

    var finalUrl = 'https://fac-share.herokuapp.com/add-resource-ext' + '?' + 'url=' + url + '&title=' + title + '&keywords=' + keywords;;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.log(xhr.responseType);
      }
    }
    xhr.open("POST", finalUrl, true);
    xhr.send();

    sendResponse({});

  });

document.addEventListener('DOMContentLoaded', function() {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    (function() {
      var ln = links[i];
      var location = ln.href;
      ln.onclick = function() {
        chrome.tabs.create({
          active: true,
          url: location
        });
      };
    })();
  }
});