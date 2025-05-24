document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('sheet-url');
  const saveButton = document.getElementById('save-url');
  const statusMessage = document.getElementById('status-message');

  // Load saved URL if it exists
  chrome.storage.local.get(['sheetUrl'], (result) => {
    if (result.sheetUrl) {
      urlInput.value = result.sheetUrl;
    }
  });

  // Save URL to storage
  saveButton.addEventListener('click', () => {
    const url = urlInput.value.trim();
    
    if (!url) {
      showMessage('Please enter a valid Google Sheets URL', 'error');
      return;
    }

    try {
      const sheetUrl = new URL(url);
      
      // Validate it's a Google Sheets URL
      if (!sheetUrl.hostname.includes('docs.google.com') || !url.includes('/spreadsheets/d/')) {
        throw new Error('Not a Google Sheets URL');
      }

      // Extract the spreadsheet ID
      const matches = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (!matches) {
        throw new Error('Invalid Google Sheets URL format');
      }

      const spreadsheetId = matches[1];
      
      // Save both the full URL and the spreadsheet ID
      chrome.storage.local.set({ 
        sheetUrl: url,
        spreadsheetId: spreadsheetId
      }, () => {
        showMessage('Sheet Linked!', 'success');
      });
    } catch (e) {
      showMessage('Please enter a valid Google Sheets URL', 'error');
    }
  });

  function showMessage(text, type) {
    statusMessage.textContent = text;
    statusMessage.className = `message ${type}`;
    statusMessage.style.display = 'block';
    
    setTimeout(() => {
      statusMessage.style.display = 'none';
    }, 3000);
  }
});