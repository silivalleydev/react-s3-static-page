const express = require("express");
const router = express.Router();
const excel = require("exceljs");
const connection = require("../connection");
const transporter = require("../emailTransporterConnect.js");

const exportExcel = async ({columns = [], rows = [], filename = "", emailto = "", title = "", content = ""}) => {
  const exportname = `${filename}.xlsx`;
  console.log("이름뭐임", exportname)
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


const dataSelect = (config = {}, req, res) => {
        const {
          SQL,
          SQL_WHERE_CLAUSE,
          filename,
          emailto,
          title,
          content
        } = config;

        console.log('컨피그데이터??', config)

        connection.query(
        SQL,
        SQL_WHERE_CLAUSE,
        function (err, result = [], fields) {
          if (err) {
            return res.status(400).json({
              status: "error",
              error: "req body cannot be empty",
            });
          } else {
            console.log("결과물쿼리데이터???", result)
            const columns = req.body.columns || []
            // const columns =  []
            let rows = [];
            if (result.length > 0) {
              if (columns.length > 0) {
                  const reqColumnKeys = columns.map(c => c.key) || [];
                  result.forEach((rs = {}) => {
                    let obj = {};
                    Object.keys(rs).forEach(key => {
                      console.log(key)
                      const keyMatchIdx = reqColumnKeys.indexOf(key);
                      if (keyMatchIdx !== -1) {
                        Object.assign(obj, { [key]: rs[key] });
                      }
                    })

                    rows.push(obj);
                  })
              } else {
                  Object.keys(result[0]).forEach(key => {
                    const obj = { header: key, key };
                    columns.push(obj);
                  })
                  rows = result;
              }
            }
            const exportConfig = {
              columns,
              rows,
              filename,
              emailto, 
              title, 
              content
            }

            console.log("컨피그???",exportConfig)
            exportExcel(exportConfig);

            res.send("Export Excel")
            // return res.status(200).json({
            //   status: "success"
            // });
          }
        }
      );
}

router.post("/excel_db_data", (req, res) => {
      const SQL = req.body.query;
      const SQL_WHERE_CLAUSE = req.body.where;
      const filename = req.body.filename;
      const emailto = req.body.emailto;
      const title = req.body.title;
      const content = req.body.content;
      const SELECT_CONFIG = {
        SQL, 
        SQL_WHERE_CLAUSE, 
        filename, 
        emailto, 
        title, 
        content
      }
        console.log(req.body);

      dataSelect(SELECT_CONFIG, req, res);



});


module.exports = router;
