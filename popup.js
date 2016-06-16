function close_all_9gag() {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    //currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function(tabs) {

	tabs.forEach(function closeIf9Gag(tab, index) {
		if (tab.url.includes("stayfocusd") || tab.url.includes("9gag")){
			chrome.tabs.remove(tab.id);
		}
    })
  });
}

var t=setInterval(close_all_9gag,1000);