// Saves options to chrome.storage.sync.
function save_options() {
  var urlBlackList = document.getElementById('urlBlackList').value;
  var timeout = document.getElementById('timeout').value;
  chrome.storage.sync.set({
	urlBlackList: urlBlackList,
	timeout: timeout
  }, function() {
    // Notify background script to update alarm with new timeout
    chrome.runtime.sendMessage({action: 'update_alarm'});
    
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 3000);
  });
}

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
	urlBlackList: '9gag.com',
	timeout: 15
  }, function(items) {
	document.getElementById('urlBlackList').value = items.urlBlackList;
	document.getElementById('timeout').value = items.timeout;
  });
}

function test_close_all() {
	chrome.runtime.sendMessage({action: 'close_tabs'});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('test').addEventListener('click', test_close_all);