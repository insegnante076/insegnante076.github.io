export function generatePDF(data, title, description, fileName) {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(title, 10, 10);

    // Add description
    doc.setFontSize(12);
    doc.text(description, 10, 20);

    // Add table headers
    const headers = [['Parola', 'Significato']];
    const rows = data.map(item => [item.word, item.meaning]);

    // Add table to PDF
    doc.autoTable({
        head: headers,
        body: rows,
        startY: 30,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [0, 123, 255] }
    });

    // Save the PDF
    doc.save(fileName);
}