export function generatePDF(data, title, description, fileName, headers, dataMapper) {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(title, 10, 10);

    // Add description
    doc.setFontSize(12);
    doc.text(description, 10, 20);

    // Map data rows based on the provided dataMapper
    const rows = data.map(item => dataMapper(item));

    // Add table to PDF
    doc.autoTable({
        head: [headers], // Use the provided headers
        body: rows, // Use the mapped rows
        startY: 30,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [0, 123, 255] }
    });

    // Save the PDF
    doc.save(fileName);
}