# PDF Template Overlay Guide

## New Approach - PDF Text Overlay

This updated solution allows you to overlay form data on top of your existing PDF templates that already have logos and configuration images baked in.

## How to Use

### Option 1: Use Your PDF Template (Recommended)
1. **Select PDF Template**: Click the "Select PDF Template" button and choose your `RAD_OC_CAC.pdf` file
2. **Fill out the form** with all the required information
3. **Click "Generate PDF with Template"** - this will overlay all text on your template

### Option 2: Auto-Generated Template  
1. **Leave the PDF template field empty**
2. **Select template type** from the dropdown (or leave as "auto-select")
3. **Click "Generate PDF with Template"** - this will create a basic template with overlaid text

## What Gets Overlaid

The system will overlay the following information on your PDF:

### Basic Information
- Project/NOP Number
- Sales Representative  
- Customer Name
- Ambient Temperature
- Altitude
- Fan specifications
- Fan noise levels

### Dimensions
- Cooler Width, Height, Depth
- Core Height
- Core Widths (1, 2, 3 depending on configuration)

### Cooler Specifications
Based on selected cooler types:

**Oil Cooler:**
- Oil type
- Entry temperature
- Flowrate
- Performance specifications

**Water Cooler:**
- Medium type
- Entry temperature  
- Flowrate
- Performance specifications

**Charge Air Cooler:**
- Charge air type
- Entry temperature
- Flowrate
- Pressure
- Performance specifications

### Additional Information
- Remarks/Notes

## Positioning Adjustment

The text overlay positions are pre-configured but may need adjustment based on your specific PDF template layout. 

### For Your RAD_OC_CAC.pdf Template:
The coordinates are set to place text in typical form field locations. If the text doesn't align properly:

1. You can adjust the coordinate values in the JavaScript code
2. The coordinates use PDF coordinate system (bottom-left origin)
3. You can identify proper positions by opening your PDF and noting where text fields should be placed

## Testing Process

1. **Start with a simple test**: Fill in just Project Number, Sales Rep, and Customer
2. **Generate PDF with your template** to see basic overlay positioning
3. **Check alignment**: If text appears in wrong positions, we can adjust coordinates
4. **Test dimensions**: Enter dimension values and check overlay positioning
5. **Test cooler specifications**: Select cooler types and enter specifications

## Fallback Options

- **Standard PDF Generation**: If template overlay fails, click "Generate Standard PDF" for the original approach
- **Email**: "Send via Outlook" still works for email integration

## Next Steps

Once you test this with your `RAD_OC_CAC.pdf` template, we can:

1. **Fine-tune positioning** if needed
2. **Create templates for other configurations** (RAD_OC, RAD_CAC, etc.)
3. **Add support for multiple template files**
4. **Implement image overlay** if you want to add user-uploaded images to the template

## Advantages of This Approach

✅ **Uses your pre-made templates** with logos and configuration images  
✅ **Much faster** than trying to insert images programmatically  
✅ **Consistent branding** with your existing PDF layout  
✅ **Flexible positioning** - can be adjusted for any template layout  
✅ **Maintains PDF quality** - no image conversion issues  
✅ **Works offline** - no external dependencies for template loading  

Try it out and let me know how the positioning looks!