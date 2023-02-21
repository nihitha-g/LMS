const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req,File,cb){
        //own logic on dest
        //aws/s3
        //req.body.ids
        cb(null,"Uploads/");
    },
    filename:function(req,file,cb){
        // let ext = path.extname(file.originalname)
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage:storage
})
module.exports = upload
// app.post("/image",(req,res) =>{
    //     upload(req,res,(err) =>{
        //         if (err){
            //             console.log(err)
            //             res.status(400).send("something wrong")
            //         }
            //         res.send(req.file)
            //         console.log("file running")
            //     });
            //     //db call
            // });
            
            // app.listen(5555)
            
            // const express = require('express')
            // const app = express()
            // const multer = require('multer')
            
            // const upload = multer({dest:"Uploads/"}).single("demo_image")
            // app.get("/",(req,res) =>{
            //     res.send("hello")
            // })