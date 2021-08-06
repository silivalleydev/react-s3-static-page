const express = require("express");
const router = express.Router();
const excel = require("exceljs");

router.get("/excel", (req, res) => {
  let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet("Tutorials");

const columns = [
  { header: "id", key: "id", width: 5 },
  { header: "title", key: "title", width: 25 },
  { header: "description", key: "description", width: 25 },
  { header: "published", key: "published", width: 10 },
];

const rows = [
  {
    id: 1,
    title: "hello",
    description: "what",
    published: "blah"
  },
  {
    id: 2,
    title: "hello",
    description: "what",
    published: "blah"
  },
  {
    id: 3,
    title: "hello",
    description: "what",
    published: "blah"
  },
  {
    id: 4,
    title: "hello",
    description: "what",
    published: "blah"
  },
]


worksheet.columns = columns;

// Add Array Rows
worksheet.addRows(rows);

// res is a Stream object
res.setHeader(
  "Content-Type",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);
res.setHeader(
  "Content-Disposition",
  "attachment; filename=" + "tutorials.xlsx"
);

return workbook.xlsx.write(res).then(function () {
  res.status(200).end();
});
  // res.send("Export Excel")
});


module.exports = router;
