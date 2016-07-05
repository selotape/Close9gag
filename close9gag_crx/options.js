// Saves options to chrome.storage.sync.
function save_options() {
  var sitesList = document.getElementById('BlackListedSites').value;
  chrome.storage.sync.set({
	sitesList: sitesList
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 3000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
	sitesList: '9gag.com,'
  }, function(items) {
	document.getElementById('BlackListedSites').value = items.sitesList;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);