const mergePdfs = async (pdf1, pdf2) => {
  const PDFMerger = (await import("pdf-merger-js")).default;
  const merger = new PDFMerger();

  // Generate unique name using timestamp
  let d = new Date().getTime();
  let outputFileName = `public/${d}.pdf`;

  // Merge the PDFs
  await merger.add(pdf1); // merge all pages of the first PDF
  await merger.add(pdf2, 2); // merge only page 2 of the second PDF

  // Save the merged PDF with the unique name
  await merger.save(outputFileName);

  console.log("PDFs merged successfully!");

  // Return the unique filename
  return `${d}.pdf`;
};

module.exports = { mergePdfs };
