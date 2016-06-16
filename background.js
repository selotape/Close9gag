var sec = 1000;
var min = sec * 60;
var hour = min * 60;


function close_all_9gag() {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {};
  chrome.tabs.query(queryInfo, function(tabs) {

	tabs.forEach(function closeIf9Gag(tab, index) {
		if (tab.url.includes("9gag.com")){
			chrome.tabs.remove(tab.id);
		}
    })
  });
  setTimeout(close_all_9gag,15*min);
}

close_all_9gag();

//document.addEventListener('DOMContentLoaded', close_all_9gag);
