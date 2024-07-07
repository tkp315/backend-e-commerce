import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:true
});

const uploadOnCloudinary = async function (localFilePath) {
  try {
    if (!localFilePath) {
      console.log("File Path on local storage is not found");
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: process.env.FOLDER,
      use_filename: true,
      secure: true,
      resource_type:'auto',
    });

    await fs.promises.unlink(localFilePath);
    console.log("File is uploaded on cloudinary :", response.secure_url);
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath);
    }
    console.log(
      "file is not uploaded on Cloudinary and deleted from local storage also",
      error
    );
    return null;
  }
};
export { uploadOnCloudinary };
