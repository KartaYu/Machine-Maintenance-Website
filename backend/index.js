const express = require('express');
const bodyParser = require('body-parser');
const app = express(); //express 後端框架
const mysql = require('mysql');
const cors = require('cors');
const schedule = require('node-schedule');
const nodemailer = require("nodemailer");
require('dotenv').config({ path: "./.env" })

console.log(process.env.DB_USER)
// Email設定
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST ,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

// 連接 mySQL 資料庫
// Host 記得修改
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(db.state)



// 排程檢查
var taskFreq = '50 */60 * * * *' //crontab格式 每分鐘執行


const sche = schedule.scheduleJob(taskFreq, () => {
    
    const sqlSelect_machine = "SELECT * FROM test_db.new_table;";
    const need_update = [];

    db.query(
        sqlSelect_machine, (err, result) => {
            //console.log(result)
            //test = JSON.parse(JSON.stringify(result))
            //console.log(err)
            const sqlUpdateNextDate = "UPDATE `test_db`.`new_table` SET `next_date` = ? WHERE (`m_name` = ?) and (`user_name` = ?);";

            for (var i = 0; i < JSON.parse(JSON.stringify(result)).length; i++) {
               
                const curr_date = new Date(JSON.parse(JSON.stringify(result))[i].next_date)
                const today = new Date()
                const days = parseInt(JSON.parse(JSON.stringify(result))[i].days)
                const m_name = JSON.parse(JSON.stringify(result))[i].m_name
                const u_name =  JSON.parse(JSON.stringify(result))[i].user_name
                const email = JSON.parse(JSON.stringify(result))[i].mail

                var mailOption = {
                    from : '"Test" <xxx@nctu.edu.tw>',
                    to: email,
                    subject : "機器名稱定期維護通知",
                    text: "機器名稱 : " + m_name + "今天到期" + "請" + u_name + "進行檢查謝謝!" 
                  };
                
                console.log(email)

                if ((curr_date.getDate() - today.getDate()) === 0){
                    console.log(true)
                    curr_date.setDate(today.getDate() + parseInt(days)) //更新下次日期

                    db.query(sqlUpdateNextDate
                        , [ curr_date.toISOString().slice(0, 10), m_name, u_name]
                        , (err, res) => {
                           
                    });

                    transporter.sendMail(mailOption,function(error, info) {//寄信方法
                        if (error) {
                          return console.log(error);
                        } else {
                           console.log("訊息已發送: " + info.response);
                        }
                      });
                    }

                    
            }




        },
    );

})






// 抓取維護清單
app.get("/machines/list-machine", (req, res) => {
    const sqlSelect_machine = "SELECT * FROM test_db.new_table;";
    db.query(
        sqlSelect_machine, (err, result) => {
            res.send(result)
            console.log(result)
            console.log(err)
        }
    )
})

// 建立維護資料 
app.post("/machines/creat-machine/", (req, res) => {
    // SQL 插入指令
    const sqlInsert_machine = "INSERT INTO `test_db`.`new_table` (m_name, user_name, mail, start_date, days, next_date, due_date) VALUES (?, ?, ?, ?, ?, ?, ?);";
    console.log(req.body)
    // 送出Query
    db.query(sqlInsert_machine
        , [req.body.machineName, req.body.name, req.body.email, req.body.start_date,
        req.body.days, req.body.next_date, req.body.due_date]
        , (err, res) => {
            console.log(err)
            console.log(res)
        });

});

// 刪除維護資料
app.delete("/machines/delete-machine/", (req, res) => {
    const sqlDelete_machine = "DELETE FROM `test_db`.`new_table` WHERE (`m_name` = ?) and (`user_name` = ?);";

    db.query(sqlDelete_machine
        , [req.body.m_name, req.body.user_name], (err, res) => {
            return res
        }
    )
});

// 更新維護資料
app.post("/machines/update-machine/", (req, res) => {
    // 預計維護日期重新計算
    const newNextDay = new Date(req.body.start_date)

    // SQL 插入指令
    newNextDay.setDate(newNextDay.getDate() + parseInt(req.body.days))

    const sqlUpdate_machine = "UPDATE `test_db`.`new_table` SET `m_name` = ?, `user_name` = ?, `mail` = ?, `start_date` = ?, `days` = ?, `next_date` = ?, `due_date` = ? WHERE (`m_name` = ?) and (`user_name` = ?);";

    // 送出Query
    db.query(sqlUpdate_machine
        , [req.body.machineName, req.body.name, req.body.email, req.body.start_date, req.body.days, newNextDay, req.body.due_date, req.body.current_mname, req.body.current_uname]
        , (err, res) => {
            console.log(err)
            console.log(res)
        });

});




// app.get("/", (req, res) => {
//     const sqlInsert = 
//     "INSERT INTO new_table (m_name, user_name, mail, due_date) VALUES ('M1', 'BOB', 'test@gmnail.com', '2022/05/01');";
//     db.query(sqlInsert, (err, result)=>{
//         res.send("test")
//     })

// });

// 設定listen port
app.listen(3001, () => {
    console.log("running on port 3001");
});