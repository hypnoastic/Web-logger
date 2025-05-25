# Text to Google Sheets Chrome Extension

This Chrome Extension allows you to select any text on a webpage and save it to a Google Sheet along with metadata like timestamp, page title, and URL.

## Features

- Select text on any webpage
- Floating "Save to Sheet" button appears near selection
- Saves selected text with metadata:
  - Timestamp
  - Page title
  - URL
  - Selected text
- Configurable Google Sheets integration
- Real-time saving with visual feedback

## Setup Instructions

### 1. Set up the Google Apps Script

1. Open or create a Google Sheet where you want to store the captured text
2. Go to Extensions > Apps Script
3. Copy the contents of `apps-script.js` into the script editor
4. Save the script
5. Deploy as a web app:
   - Click "Deploy" > "New deployment"
   - Click "Select type" > "Web app"
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone with the link"
   - Click "Deploy"
   - Authorize the application when prompted
   - Copy the Web App URL for later use

### 2. Install the Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the folder containing these extension files
5. The extension icon should appear in your toolbar

### 3. Configure the Extension

1. Click the extension icon in the toolbar
2. Paste the Google Apps Script Web App URL from step 1
3. Click Save

## Usage

1. Select any text on a webpage
2. A "Save to Sheet" button will appear near your selection
3. Click the button to save the text and metadata to your Google Sheet
4. Check your Google Sheet to see the saved data

## Files Structure

- `manifest.json`: Extension configuration
- `content.js`: Handles text selection and saving
- `popup.html` & `popup.js`: Extension settings UI
- `styles.css`: Styling for the floating button
- `background.js`: Background service worker
- `apps-script.js`: Google Apps Script code

## Permissions

The extension requires the following permissions:
- `activeTab`: To access the current page's content
- `scripting`: To inject the content script
- `storage`: To save the Web App URL setting

## Troubleshooting

- If the save button doesn't appear, refresh the page
- If saving fails, check the Web App URL in the extension settings
- Make sure the Google Apps Script is deployed with the correct permissions
- Check the browser console for any error messages

## Security Note

The Google Apps Script Web App URL should be kept private and not shared with others, as it provides access to your Google Sheet.