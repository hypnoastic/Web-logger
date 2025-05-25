// Google Apps Script code to be deployed as a Web App

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Captured Text');
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('Captured Text');
      // Add headers
      const headers = ['Timestamp', 'Text', 'Page Title', 'URL'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#f3f3f3');
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp,
      data.text,
      data.title,
      data.url
    ];
    
    // Append the new row
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 4);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Add this function to test the web app deployment
function doGet() {
  return ContentService.createTextOutput('The web app is working correctly.');
}