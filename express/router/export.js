const express = require("express");
const router = express.Router();
const excel = require("exceljs");
const transporter = require("../emailTransporterConnect.js");

const exportExcel = async ({columns = [], rows = [], filename = "", emailto = "", title = "", content = ""}) => {
  const exportname = `${filename}.xlsx`;
  console.log("이름/??", exportname)
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet(exportname);
    worksheet.columns = columns;
    worksheet.addRows(rows);
    const buffer = await workbook.xlsx.writeBuffer();
    const mailOptions = {
            from: 'steve@gmail.com',
            to: emailto,
            subject: title,
            html: content,
            attachments: [
                {
                    filename,
                    content: buffer,
                    contentType:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
            ],
        };
        await transporter.sendMail(mailOptions);
    };


router.post("/excel", (req, res) => {

  console.log(req.body.name);

  const exportConfig = {
    columns: req.body.columns || [],
    rows: req.body.rows || [],
    filename: req.body.filename || "excelData"
  }

  exportExcel(exportConfig);
  res.send("Export Excel")
});


module.exports = router;
