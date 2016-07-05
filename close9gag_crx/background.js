var sec = 1000;
var min = sec * 60;
var hour = min * 60;
var TIMEOUT = 10*sec

function close_all_9gag() {
  
	var queryInfo = {};
	
	chrome.tabs.query(queryInfo, function(tabs) {
		tabs.forEach(function closeIf9Gag(tab, index) {
			chrome.storage.sync.get({
				sitesList: '9gag.com,'
			}, function(items) {
				sitesList = items.sitesList.split(",");
				sitesList.forEach(function(site) {
					if (tab.url.includes(site)){
						chrome.tabs.remove(tab.id);
					}
				});
			});
		});
	});
  setTimeout(close_all_9gag,TIMEOUT);
}

setTimeout(close_all_9gag,TIMEOUT);