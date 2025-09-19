const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
let TIMEOUT = 15 * MIN; //NEVER GO BELOW 1*MIN !!

function shouldCloseTab(tabUrl, targetDomain) {
	try {
		const url = new URL(tabUrl);
		const tabDomain = url.hostname;
		
		// Exact domain match or subdomain match
		return tabDomain === targetDomain || tabDomain.endsWith('.' + targetDomain);
	} catch (error) {
		// If URL parsing fails, fall back to original behavior
		return tabUrl.includes(targetDomain);
	}
}

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
				if (trimmedUrl !== "" && shouldCloseTab(tab.url, trimmedUrl)) {
					await chrome.tabs.remove(tab.id);
					break;
				}
			}
		}
	} catch (error) {
		console.error('Error closing tabs:', error);
	}
}

async function setupAlarm() {
	const items = await chrome.storage.sync.get({
		timeout: 15
	});
	
	const timeoutMinutes = parseInt(items.timeout, 10);
	console.log('Setting up alarm with timeout:', timeoutMinutes, 'minutes');
	
	// Clear existing alarm
	chrome.alarms.clear('close9gag');
	
	// Create new alarm with updated timeout
	chrome.alarms.create('close9gag', {
		delayInMinutes: timeoutMinutes,
		periodInMinutes: timeoutMinutes
	});
	
	// Verify alarm was created
	const alarm = await chrome.alarms.get('close9gag');
	console.log('Alarm created:', alarm);
}

// Listen for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
	console.log('Alarm fired:', alarm.name);
	if (alarm.name === 'close9gag') {
		console.log('Executing close_all_9gag');
		close_all_9gag();
	}
});

// Listen for messages from options page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'close_tabs') {
		close_all_9gag();
		sendResponse({success: true});
	} else if (request.action === 'update_alarm') {
		setupAlarm();
		sendResponse({success: true});
	}
});

// Setup alarm when service worker starts
setupAlarm();

// Create a test alarm for debugging (1 minute)
chrome.alarms.create('test', { delayInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
	if (alarm.name === 'test') {
		console.log('TEST ALARM FIRED - alarms are working!');
	}
});