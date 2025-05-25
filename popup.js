document.addEventListener('DOMContentLoaded', function() {
    // Load saved URL
    chrome.storage.sync.get(['webAppUrl'], function(result) {
        if (result.webAppUrl) {
            document.getElementById('sheet-url').value = result.webAppUrl;
        }
    });

    // Save URL
    document.getElementById('save-url').addEventListener('click', function() {
        const webAppUrl = document.getElementById('sheet-url').value;
        const statusMsg = document.getElementById('status-message');
        if (!webAppUrl) {
            statusMsg.textContent = 'Please enter a valid URL';
            statusMsg.className = 'error';
            statusMsg.style.display = 'block';
            return;
        }

        chrome.storage.sync.set({
            webAppUrl: webAppUrl
        }, function() {
            statusMsg.textContent = 'Connected!';
            statusMsg.className = 'success';
            statusMsg.style.display = 'block';
            setTimeout(() => {
                statusMsg.style.display = 'none';
            }, 2000);
        });
    });
});