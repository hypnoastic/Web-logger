// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'saveToSheet',
    title: '📤 Save to Sheet',
    contexts: ['selection']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'saveToSheet') {
    const { sheetUrl } = await chrome.storage.local.get(['sheetUrl']);
    
    if (!sheetUrl) {
      // Notify content script to show error toast
      chrome.tabs.sendMessage(tab.id, {
        type: 'SHOW_TOAST',
        message: '❌ Please set up Google Sheet URL in extension settings',
        toastType: 'error'
      });
      return;
    }
    
    const data = {
      text: info.selectionText,
      url: tab.url,
      title: tab.title,
      timestamp: new Date().toISOString()
    };
    
    try {
      const response = await fetch(sheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Failed to save');
      
      // Notify content script to show success toast
      chrome.tabs.sendMessage(tab.id, {
        type: 'SHOW_TOAST',
        message: '✅ Saved to Sheet!',
        toastType: 'success'
      });
    } catch (error) {
      // Notify content script to show error toast
      chrome.tabs.sendMessage(tab.id, {
        type: 'SHOW_TOAST',
        message: '❌ Failed to Save',
        toastType: 'error'
      });
      console.error('Error saving to sheet:', error);
    }
  }
});