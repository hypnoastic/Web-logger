let floatingButton = null;
let selectedText = '';

// Create floating button
function createFloatingButton() {
    if (!floatingButton) {
        floatingButton = document.createElement('button');
        floatingButton.id = 'saveToSheetBtn';
        floatingButton.innerHTML = '💾 Save to Sheet';
        floatingButton.style.display = 'none';
        document.body.appendChild(floatingButton);

        floatingButton.addEventListener('click', saveSelection);
    }
}

// Position the floating button near selection
function updateButtonPosition(event) {
    if (!floatingButton) return;
    
    const selection = window.getSelection();
    if (!selection.toString().trim()) {
        floatingButton.style.display = 'none';
        return;
    }

    selectedText = selection.toString().trim();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    floatingButton.style.position = 'fixed';
    floatingButton.style.top = `${rect.bottom + window.scrollY + 10}px`;
    floatingButton.style.left = `${rect.left + window.scrollX}px`;
    floatingButton.style.display = 'block';
}

// Save the selected text and metadata
async function saveSelection() {
    const data = {
        text: selectedText,
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString()
    };

    // Get the web app URL from storage
    chrome.storage.sync.get(['webAppUrl'], async function(result) {
        if (!result.webAppUrl) {
            alert('Please set up the Google Apps Script Web App URL in the extension settings');
            return;
        }

        try {
            const response = await fetch(result.webAppUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            floatingButton.innerHTML = '💾 ✓ Saved!';
            setTimeout(() => {
                floatingButton.innerHTML = '💾 Save to Sheet';
            }, 2000);
        } catch (error) {
            console.error('Error saving to sheet:', error);
            alert('Error saving to sheet. Please check the console for details.');
        }
    });
}

// Initialize
document.addEventListener('mouseup', updateButtonPosition);
createFloatingButton();