# Web-to-Sheet Logger Chrome Extension

A Chrome Extension that allows you to save highlighted text from any webpage directly to a Google Sheet through a Google Apps Script Web App.

## Features

- Save highlighted text to Google Sheets with a single click
- Floating save button appears near text selections
- Right-click context menu integration
- Customizable Google Apps Script Web App URL
- Toast notifications for success/error feedback
- Saves page title, URL, and timestamp along with selected text

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Setup

1. Create a Google Apps Script Web App that accepts POST requests and writes to a Google Sheet
2. Deploy the Web App and copy its URL
3. Click the extension icon in Chrome
4. Paste the Web App URL and click "Link Sheet"

## Usage

1. Select any text on a webpage
2. Click the "📤 Save to Sheet" button that appears near the selection
3. Alternatively, right-click the selected text and choose "📤 Save to Sheet"
4. A toast notification will confirm if the save was successful

## Data Format

The extension sends the following JSON data to your Google Apps Script:

```json
{
  "text": "Selected text content",
  "url": "Current page URL",
  "title": "Page title",
  "timestamp": "ISO format timestamp"
}
```

## Permissions

- `activeTab`: To access the current tab's content
- `scripting`: To inject content scripts
- `storage`: To save the Sheet URL
- `contextMenus`: For right-click menu integration

## Files

- `manifest.json`: Extension configuration
- `popup.html/js`: Settings UI for Sheet URL
- `content.js/css`: Handles text selection and floating button
- `background.js`: Context menu functionality

## License

MIT License