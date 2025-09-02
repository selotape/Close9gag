const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
let TIMEOUT = 15 * MIN; //NEVER GO BELOW 1*MIN !!

async function close_all_9gag() {
	try {
		const tabs = await chrome.tabs.query({});
		const items = await chrome.storage.sync.get({
			urlBlackList: '9gag.com',
			timeout: 15
		});
		
		const urlBlackList = items.urlBlackList.split(",");
		TIMEOUT = items.timeout * MIN;
		
		for (const tab of tabs) {
			for (const url of urlBlackList) {
				const trimmedUrl = url.trim();
				if (trimmedUrl !== "" && tab.url.includes(trimmedUrl)) {
					await chrome.tabs.remove(tab.id);
					break;
				}
			}
		}
	} catch (error) {
		console.error('Error closing tabs:', error);
	}
}

function close_all_9gag_and_repeat() {
	close_all_9gag();
	setTimeout(close_all_9gag_and_repeat, TIMEOUT);
}

// Listen for messages from options page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'close_tabs') {
		close_all_9gag();
		sendResponse({success: true});
	}
});

// Start the process when service worker starts
close_all_9gag_and_repeat();