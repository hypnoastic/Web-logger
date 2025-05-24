// Create and inject the floating button
const button = document.createElement('button');
button.className = 'web-to-sheet-button';
button.innerHTML = '📤 Save to Sheet';
document.body.appendChild(button);

// Create and inject the toast element
const toast = document.createElement('div');
toast.className = 'web-to-sheet-toast';
document.body.appendChild(toast);

// Show toast message
function showToast(message, type) {
  toast.textContent = message;
  toast.className = `web-to-sheet-toast ${type}`;
  toast.style.display = 'block';
  
  // Hide toast after animation
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// Handle text selection
document.addEventListener('mouseup', (e) => {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  
  if (selectedText) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // Position the button near the selection
    button.style.left = `${rect.left + window.scrollX}px`;
    button.style.top = `${rect.bottom + window.scrollY + 10}px`;
    button.style.display = 'flex';
  } else {
    button.style.display = 'none';
  }
});

// Hide button when clicking elsewhere
document.addEventListener('mousedown', (e) => {
  if (e.target !== button) {
    button.style.display = 'none';
  }
});

// Handle button click
button.addEventListener('click', async () => {
  const selectedText = window.getSelection().toString().trim();
  
  if (!selectedText) return;
  
  // Get sheet URL from storage
  const result = await new Promise(resolve => chrome.storage.local.get(['sheetUrl'], resolve));
  const { sheetUrl } = result;
  
  if (!sheetUrl) {
    showToast('❌ Please set up Google Sheet URL in extension settings', 'error');
    return;
  }
  
  // Prepare data
  const data = {
    text: selectedText,
    url: window.location.href,
    title: document.title,
    timestamp: new Date().toISOString()
  };
  
  try {
    // Format data for Google Sheets
    const sheetData = [
      data.timestamp,
      data.text,
      data.url,
      data.title
    ];

    // Get the spreadsheet ID
    const spreadsheetResult = await new Promise(resolve => chrome.storage.local.get(['spreadsheetId'], resolve));
    const { spreadsheetId } = spreadsheetResult;
    
    if (!spreadsheetId) {
      throw new Error('Invalid sheet configuration');
    }

    // Construct the Google Sheets API URL for appending data
    const apiUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;
    
    // Append data using the Sheets API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/csv',
      },
      body: sheetData.join(',')
    });
    
    if (!response.ok) throw new Error('Failed to save');
    
    showToast('✅ Saved to Sheet!', 'success');
    button.style.display = 'none';
  } catch (error) {
    showToast('❌ Failed to Save', 'error');
    console.error('Error saving to sheet:', error);
  }
});