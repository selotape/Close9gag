var SEC = 1000;
var MIN = 60*SEC;
var HOUR = 60*MIN;
var TIMEOUT = 15*MIN; //NEVER GO BELOW 1*MIN !!

function close_all_9gag(){
	chrome.tabs.query({}, function(tabs) {
		tabs.forEach(function closeIf9Gag(tab, index) {
			chrome.storage.sync.get({
				urlBlackList: '9gag.com',
				timeout: 15*MIN
			}, function(items) {
				urlBlackList = items.urlBlackList.split(",");
				urlBlackList.forEach(function(url) {
					url = url.trim();
					if ((url != "") && (tab.url.includes(url))){
						chrome.tabs.remove(tab.id);
					}
				});
				TIMEOUT = items.timeout*MIN;
			});
		});
	});
}

function close_all_9gag_and_repeat() {
	close_all_9gag();
	setTimeout(close_all_9gag_and_repeat,TIMEOUT);
}

setTimeout(close_all_9gag_and_repeat,TIMEOUT);