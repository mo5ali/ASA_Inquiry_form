// Form elements
const form = document.getElementById('inquiryForm');
const resetBtn = document.getElementById('resetBtn');
const successMessage = document.getElementById('successMessage');
const summaryPanel = document.getElementById('summaryPanel');
const summaryContent = document.getElementById('summaryContent');
const inquiryIdSpan = document.getElementById('inquiryId');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const closeSummaryBtn = document.getElementById('closeSummaryBtn');

// Set minimum date to today
document.getElementById('expectedDate').min = new Date().toISOString().split('T')[0];

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!form.checkValidity()) {
        alert('Please fill in all required fields correctly.');
        return;
    }
    
    // Collect form data
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add checkbox values (they won't be in FormData if unchecked)
    data.installationRequired = document.getElementById('installationRequired').checked;
    data.trainingRequired = document.getElementById('trainingRequired').checked;
    
    // Generate inquiry ID
    const inquiryId = generateInquiryId();
    data.inquiryId = inquiryId;
    data.submissionDate = new Date().toLocaleString();
    
    // Format and display summary
    const summary = formatSummary(data);
    
    // Show success message
    inquiryIdSpan.textContent = inquiryId;
    form.style.display = 'none';
    successMessage.style.display = 'block';
    summaryPanel.style.display = 'block';
    summaryContent.textContent = summary;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Store summary for download/copy
    summaryPanel.dataset.summary = summary;
    
    // Simulate sending to technical department (in real implementation, this would be an API call)
    console.log('Inquiry submitted to technical department:', data);
    console.log('Formatted summary:\n', summary);
});

// Reset button handler
resetBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
        form.reset();
    }
});

// Copy to clipboard handler
copyBtn.addEventListener('click', function() {
    const summary = summaryPanel.dataset.summary;
    
    navigator.clipboard.writeText(summary).then(function() {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        copyBtn.style.background = '#28a745';
        copyBtn.style.color = 'white';
        
        setTimeout(function() {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
        }, 2000);
    }).catch(function(err) {
        alert('Failed to copy to clipboard. Please try manually selecting and copying the text.');
    });
});

// Download as text file handler
downloadBtn.addEventListener('click', function() {
    const summary = summaryPanel.dataset.summary;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const inquiryId = document.getElementById('inquiryId').textContent;
    
    a.href = url;
    a.download = `inquiry_${inquiryId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Close summary and reset form handler
closeSummaryBtn.addEventListener('click', function() {
    if (confirm('Would you like to submit another inquiry?')) {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
        summaryPanel.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Generate unique inquiry ID
function generateInquiryId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ASA-${timestamp}-${random}`;
}

// Format data into a technical summary
function formatSummary(data) {
    const lines = [];
    
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('                    ASA SALES INQUIRY SUMMARY                  ');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    lines.push(`Inquiry ID:       ${data.inquiryId}`);
    lines.push(`Submission Date:  ${data.submissionDate}`);
    lines.push('');
    
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push('CUSTOMER INFORMATION');
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push(`Company Name:     ${data.companyName}`);
    lines.push(`Contact Name:     ${data.contactName}`);
    if (data.contactTitle) {
        lines.push(`Job Title:        ${data.contactTitle}`);
    }
    lines.push(`Email:            ${data.email}`);
    lines.push(`Phone:            ${data.phone}`);
    if (data.address) {
        lines.push(`Address:          ${data.address.replace(/\n/g, '\n                  ')}`);
    }
    lines.push('');
    
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push('PRODUCT/SERVICE INFORMATION');
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push(`Category:         ${data.productCategory}`);
    lines.push(`Product/Service:  ${data.productName}`);
    lines.push(`Quantity:         ${data.quantity} ${data.unit}`);
    lines.push('');
    lines.push('Description:');
    lines.push(wrapText(data.productDescription, 65));
    lines.push('');
    
    if (data.technicalSpecs || data.existingSystem || data.installationRequired || data.trainingRequired) {
        lines.push('───────────────────────────────────────────────────────────────');
        lines.push('TECHNICAL REQUIREMENTS');
        lines.push('───────────────────────────────────────────────────────────────');
        
        if (data.technicalSpecs) {
            lines.push('Technical Specifications:');
            lines.push(wrapText(data.technicalSpecs, 65));
            lines.push('');
        }
        
        if (data.existingSystem) {
            lines.push('Existing System/Infrastructure:');
            lines.push(wrapText(data.existingSystem, 65));
            lines.push('');
        }
        
        const requirements = [];
        if (data.installationRequired) requirements.push('Installation/Configuration');
        if (data.trainingRequired) requirements.push('Training');
        
        if (requirements.length > 0) {
            lines.push(`Additional Services Required: ${requirements.join(', ')}`);
            lines.push('');
        }
    }
    
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push('TIMELINE AND BUDGET');
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push(`Expected Date:    ${formatDate(data.expectedDate)}`);
    lines.push(`Urgency Level:    ${data.urgency}`);
    if (data.budgetRange) {
        lines.push(`Budget Range:     ${data.budgetRange}`);
    }
    lines.push('');
    
    if (data.additionalNotes || data.referenceNumber || data.howHeard) {
        lines.push('───────────────────────────────────────────────────────────────');
        lines.push('ADDITIONAL INFORMATION');
        lines.push('───────────────────────────────────────────────────────────────');
        
        if (data.referenceNumber) {
            lines.push(`Reference Number: ${data.referenceNumber}`);
        }
        
        if (data.howHeard) {
            lines.push(`Source:           ${data.howHeard}`);
        }
        
        if (data.additionalNotes) {
            lines.push('');
            lines.push('Additional Notes:');
            lines.push(wrapText(data.additionalNotes, 65));
        }
        
        lines.push('');
    }
    
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('               TECHNICAL DEPARTMENT ACTION ITEMS                ');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    lines.push('☐ Review technical specifications');
    lines.push('☐ Verify product availability');
    lines.push('☐ Prepare cost estimate');
    lines.push('☐ Check integration requirements');
    lines.push('☐ Schedule follow-up call');
    lines.push('☐ Prepare proposal/quote');
    lines.push('');
    lines.push('Priority Level: ' + getPriorityIndicator(data.urgency));
    lines.push('');
    lines.push('═══════════════════════════════════════════════════════════════');
    
    return lines.join('\n');
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Helper function to wrap text
function wrapText(text, width) {
    if (!text) return '';
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
        if ((currentLine + word).length > width) {
            if (currentLine) lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    });
    
    if (currentLine) lines.push(currentLine.trim());
    
    return lines.join('\n');
}

// Helper function to get priority indicator
function getPriorityIndicator(urgency) {
    const indicators = {
        'Low': '● (Low - Flexible Timeline)',
        'Medium': '●● (Medium - Standard Priority)',
        'High': '●●● (High - Important)',
        'Critical': '●●●● (Critical - Urgent - Immediate Action Required)'
    };
    return indicators[urgency] || urgency;
}

// Real-time validation feedback
const inputs = form.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#e74c3c';
        } else if (this.checkValidity()) {
            this.style.borderColor = '#28a745';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(231, 76, 60)') {
            this.style.borderColor = '';
        }
    });
});

// Form change tracking
let formChanged = false;
form.addEventListener('input', function() {
    formChanged = true;
});

// Warn user before leaving if form has unsaved changes
window.addEventListener('beforeunload', function(e) {
    if (formChanged && form.style.display !== 'none') {
        e.preventDefault();
        e.returnValue = '';
    }
});
