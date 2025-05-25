// Background script is minimal for this extension
// It's included for potential future features like:
// - Badge updates
// - Context menu integration
// - Network request handling

chrome.runtime.onInstalled.addListener(() => {
    console.log('Text to Google Sheets extension installed');
});