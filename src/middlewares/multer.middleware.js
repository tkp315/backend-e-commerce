import multer from "multer";
import path from 'path'
import fs from 'fs'
const publicDir = path.resolve(__dirname,'../../public')
if(fs.existsSync(publicDir)){
  fs.mkdirSync(publicDir,{recursive:true})
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,publicDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  
  
  
});

export const upload = multer({ storage });
