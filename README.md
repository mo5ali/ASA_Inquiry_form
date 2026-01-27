# ASA Sales Inquiry Form

A professional HTML form designed to streamline the sales inquiry process and make life easier for the technical department.

## Overview

This sales inquiry form collects comprehensive information from potential customers and formats it into a structured, easy-to-read summary for the technical department. It includes validation, data formatting, and export capabilities.

## Features

### Comprehensive Data Collection
- **Customer Information**: Company details, contact information, address
- **Product/Service Details**: Category, name, quantity, detailed description
- **Technical Requirements**: Specifications, existing infrastructure, installation/training needs
- **Timeline & Budget**: Expected dates, urgency levels, budget ranges
- **Additional Information**: Notes, reference numbers, source tracking

### Technical Department Benefits
- **Structured Format**: All inquiry data formatted in a clear, consistent layout
- **Priority Indicators**: Visual urgency levels for quick prioritization
- **Action Items Checklist**: Pre-formatted task list for technical team
- **Easy Export**: Copy to clipboard or download as text file
- **Unique Inquiry IDs**: Automatic generation for tracking and reference

### User Experience
- **Real-time Validation**: Instant feedback on required fields
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Professional UI**: Clean, modern interface with smooth interactions
- **Data Safety**: Warns users before leaving with unsaved changes
- **Easy Reset**: Clear form with confirmation

## Usage

### Opening the Form

Simply open `index.html` in any modern web browser:

```bash
# Navigate to the directory
cd /path/to/ASA_Inquiry_form

# Open in your default browser (examples)
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Or double-click the `index.html` file in your file explorer.

### Filling Out the Form

1. **Customer Information** (Required)
   - Enter company name, contact details, email, and phone number
   - Optionally add job title and company address

2. **Product/Service Information** (Required)
   - Select product category from dropdown
   - Enter product/service name
   - Provide detailed description
   - Specify quantity and unit

3. **Technical Requirements** (Optional)
   - Add technical specifications
   - Describe existing system/infrastructure
   - Check boxes for installation or training needs

4. **Timeline and Budget** (Required)
   - Select expected delivery/start date
   - Choose urgency level
   - Optionally specify budget range

5. **Additional Information** (Optional)
   - Add any additional notes
   - Enter reference/project number if applicable
   - Indicate how you heard about the company

### Submitting the Form

1. Click **Submit Inquiry** button
2. Form validates all required fields
3. On success:
   - Unique inquiry ID is generated
   - Success message is displayed
   - Formatted summary is shown for technical department
   - Options to copy or download the summary

### Managing Inquiries

After submission, you can:
- **Copy to Clipboard**: Click to copy formatted summary
- **Download as Text**: Save inquiry as `.txt` file
- **Submit Another**: Reset form for new inquiry

## File Structure

```
ASA_Inquiry_form/
├── index.html      # Main HTML form
├── styles.css      # Styling and responsive design
├── script.js       # Form logic, validation, and formatting
└── README.md       # This documentation
```

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup with form validation
- **CSS3**: Modern styling with gradients, flexbox, and grid
- **Vanilla JavaScript**: No dependencies, works in all modern browsers

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Features Implementation

**Form Validation**
- HTML5 native validation for required fields
- Custom validation for email and phone formats
- Real-time feedback with visual indicators

**Data Formatting**
- Structured text output optimized for technical review
- Automatic text wrapping for readability
- Priority indicators and action items checklist
- Timestamp and unique ID generation

**Export Options**
- Clipboard API for instant copying
- Blob API for file downloads
- Formatted text suitable for email or documentation

## Customization

### Modifying Product Categories
Edit the `productCategory` select options in `index.html`:

```html
<option value="YourCategory">Your Category Name</option>
```

### Changing Budget Ranges
Update the `budgetRange` select options in `index.html`.

### Adjusting Form Fields
Add or remove form fields in `index.html` and update the `formatSummary()` function in `script.js` to include new fields in the output.

### Styling
Modify `styles.css` to change colors, fonts, or layout:
- Header gradient: Lines 7-8, 39-40
- Primary color: `#667eea`
- Secondary color: `#764ba2`

## Integration

For production use, integrate with backend services:

### API Integration
Replace the console.log in `script.js` (line 62) with an API call:

```javascript
// Send to backend
fetch('/api/inquiries', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    // Handle success
})
.catch(error => {
    // Handle error
});
```

### Email Integration
Configure to send formatted summary via email to technical department.

### Database Storage
Store inquiries in a database for tracking and reporting.

## Security Considerations

For production deployment:
- Implement CSRF protection
- Add rate limiting to prevent spam
- Sanitize all input data server-side
- Use HTTPS for data transmission
- Implement proper authentication if needed

## License

This project is available for use as needed.

## Support

For issues or questions, please contact the technical department or create an issue in the repository.

---

**Last Updated**: January 2026  
**Version**: 1.0.0