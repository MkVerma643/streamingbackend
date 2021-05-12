// Here we need to create a router
// router will decide where to go for what task

let Express = require('express')
let router = Express.Router()   // creation of router
let fs = require('fs')



// Defining the router here
router.get('/allassets' , (req,res)=>{
    let fs = require('fs')
    var files = fs.readdirSync('assets')
    console.log("Files in assets folder are " ,  files)
    res.send({
        videos:files
    })
})

router.get('/playvideo', (req,res)=>{
    const path = 'assets/'+req.query.filename
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mkv',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mkv',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
})


module.exports = router  // sending router to outside world