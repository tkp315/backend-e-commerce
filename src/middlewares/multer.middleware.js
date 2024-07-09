import multer from "multer";

const publicDir = "../../public"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,publicDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  
  
  
});

export const upload = multer({ storage });
