const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const { mergePdfs } = require("./testpdf");

const upload = multer({ dest: "uploads/" });
app.use("/static", express.static("public"));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 2), function (req, res, next) {
  if (req.files.length !== 2) {
    return res.status(400).send("Please upload exactly two PDF files.");
  }

  // Define the paths for the uploaded PDFs
  const pdf1Path = path.join(__dirname, req.files[0].path);
  const pdf2Path = path.join(__dirname, req.files[1].path);

  console.log("Merging files:", pdf1Path, pdf2Path);

  // Call mergePdfs and handle the result
  mergePdfs(pdf1Path, pdf2Path)
    .then((outputFileName) => {
      // Redirect to the merged PDF with the unique filename
      res.redirect(`/static/${outputFileName}`);
    })
    .catch((err) => {
      console.error("Error merging PDFs:", err);
      res.status(500).send("Failed to merge PDFs");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
