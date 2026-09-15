/**
 * Centralized Export Utility for MIRA AI Sign Language Platform
 * Provides native client-side file generation and downloads for CSV, Excel, PDF, and Print.
 */

// Helper to download a blob with a specified filename and mime type
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 150);
}

/**
 * Generates and downloads an RFC-4180 compliant CSV file
 * @param {Array<Object>} data Array of objects or records
 * @param {string} filename Output filename without or with .csv extension
 */
export function exportToCSV(data, filename = 'report.csv') {
  if (!data || !data.length) {
    data = [{ Status: 'No data records available for export', GeneratedAt: new Date().toISOString() }];
  }

  const cleanFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  const keys = Object.keys(data[0]);

  const csvRows = [];
  // Add Header Row
  csvRows.push(keys.map(k => `"${String(k).replace(/"/g, '""')}"`).join(','));

  // Add Data Rows
  for (const row of data) {
    const values = keys.map(k => {
      const val = row[k] === null || row[k] === undefined ? '' : String(row[k]);
      return `"${val.replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  // Prepend UTF-8 BOM so Excel opens accented & special characters seamlessly
  const csvContent = '\uFEFF' + csvRows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, cleanFilename);
}

/**
 * Generates and downloads an Excel-compatible XML Spreadsheet (.xls)
 * Opens cleanly in Microsoft Excel, LibreOffice, Apple Numbers, and Google Sheets
 * @param {Array<Object>} data 
 * @param {string} filename 
 * @param {string} sheetName 
 */
export function exportToExcel(data, filename = 'report.xls', sheetName = 'Report Data') {
  if (!data || !data.length) {
    data = [{ Status: 'No data records available', Timestamp: new Date().toISOString() }];
  }

  const cleanFilename = filename.endsWith('.xls') || filename.endsWith('.xlsx') 
    ? (filename.endsWith('.xlsx') ? filename.replace('.xlsx', '.xls') : filename)
    : `${filename}.xls`;

  const keys = Object.keys(data[0]);

  let rowsXml = '';
  // Header row
  rowsXml += '<Row ss:StyleID="HeaderStyle">';
  for (const k of keys) {
    rowsXml += `<Cell><Data ss:Type="String">${escapeXml(String(k))}</Data></Cell>`;
  }
  rowsXml += '</Row>';

  // Data rows
  for (const row of data) {
    rowsXml += '<Row>';
    for (const k of keys) {
      const val = row[k] === null || row[k] === undefined ? '' : String(row[k]);
      const isNum = !isNaN(Number(val)) && val.trim() !== '';
      const type = isNum ? 'Number' : 'String';
      rowsXml += `<Cell><Data ss:Type="${type}">${escapeXml(val)}</Data></Cell>`;
    }
    rowsXml += '</Row>';
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:html="http://www.w3.org/TR/REC-html40">
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Bottom"/>
      <Borders/>
      <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
      <Interior/>
      <NumberFormat/>
      <Protection/>
    </Style>
    <Style ss:ID="HeaderStyle">
      <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
      <Interior ss:Color="#7C3AED" ss:Pattern="Solid"/>
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
    </Style>
  </Styles>
  <Worksheet ss:Name="${escapeXml(sheetName)}">
    <Table>
      ${rowsXml}
    </Table>
  </Worksheet>
</Workbook>`;

  const blob = new Blob([xmlContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
  downloadBlob(blob, cleanFilename);
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Creates and prints or downloads a high-fidelity formatted HTML/PDF Report
 * Opens a print-formatted view that triggers the browser's native Save to PDF dialog
 * @param {Object} config Report options
 */
export function printOrDownloadPDF({
  title = 'Platform Progress Report',
  subtitle = 'Sign Language AI Learning & Analytics',
  sections = [],
  metadata = {},
  action = 'print' // 'print' | 'download'
}) {
  const generatedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const metadataHtml = Object.entries(metadata).map(([k, v]) => `
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 8px;">
      <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; letter-spacing: 0.5px;">${k}</div>
      <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 4px;">${v}</div>
    </div>
  `).join('');

  const sectionsHtml = sections.map(sec => {
    let contentHtml = '';
    if (sec.type === 'table' && sec.data && sec.data.length) {
      const keys = Object.keys(sec.data[0]);
      contentHtml = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
          <thead>
            <tr style="background: #7c3aed; color: white;">
              ${keys.map(k => `<th style="padding: 10px 12px; text-align: left; font-weight: 600;">${k}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${sec.data.map((row, idx) => `
              <tr style="background: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}; border-bottom: 1px solid #e2e8f0;">
                ${keys.map(k => `<td style="padding: 10px 12px; color: #334155;">${row[k] ?? ''}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (sec.type === 'list' && Array.isArray(sec.items)) {
      contentHtml = `
        <ul style="margin-top: 8px; padding-left: 20px; color: #334155; font-size: 14px; line-height: 1.6;">
          ${sec.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      `;
    } else if (sec.content) {
      contentHtml = `<p style="color: #334155; font-size: 14px; line-height: 1.6; margin-top: 8px;">${sec.content}</p>`;
    }

    return `
      <div style="margin-top: 28px; page-break-inside: avoid;">
        <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin: 0;">
          ${sec.title}
        </h3>
        ${contentHtml}
      </div>
    `;
  }).join('');

  const htmlDocument = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title} - Sign Language AI</title>
  <style>
    @media print {
      body { margin: 0; padding: 15mm; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .no-print { display: none !important; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: white;
      color: #0f172a;
      max-width: 900px;
      margin: 0 auto;
      padding: 32px 24px;
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 24px; padding: 12px 16px; background: #f1f5f9; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 13px; color: #475569;">Ready to export. Press <strong>Print / Save as PDF</strong> or use Ctrl+P.</span>
    <button onclick="window.print()" style="background: #7c3aed; color: white; border: none; padding: 8px 18px; border-radius: 6px; font-weight: 600; cursor: pointer;">Print / Save as PDF</button>
  </div>

  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #7c3aed; padding-bottom: 18px;">
    <div>
      <h1 style="margin: 0; font-size: 26px; color: #1e1b4b; font-weight: 800;">${title}</h1>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">${subtitle}</p>
    </div>
    <div style="text-align: right;">
      <span style="display: inline-block; background: #ede9fe; color: #6d28d9; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700;">Verified Platform Report</span>
      <div style="font-size: 12px; color: #94a3b8; margin-top: 6px;">${generatedDate}</div>
    </div>
  </div>

  ${metadataHtml ? `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 24px;">${metadataHtml}</div>` : ''}

  ${sectionsHtml}

  <div style="margin-top: 48px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8;">
    <span>Sign Language AI Learning Platform • Certified Educational Record</span>
    <span>Generated on ${generatedDate}</span>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>`;

  if (action === 'download') {
    const blob = new Blob([htmlDocument], { type: 'text/html;charset=utf-8' });
    const cleanName = `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Report.html`;
    downloadBlob(blob, cleanName);
  } else {
    const printWindow = window.open('', '_blank', 'width=950,height=800');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlDocument);
      printWindow.document.close();
    } else {
      const blob = new Blob([htmlDocument], { type: 'text/html;charset=utf-8' });
      downloadBlob(blob, `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Report.html`);
    }
  }
}
