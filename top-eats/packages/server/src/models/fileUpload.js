import { Schema, model } from "mongoose";

const fileUploadSchema = new Schema(
  {
    filePath: String,
  },
  {
    timestamps: true,
  }
);

export default model("FileUpload", fileUploadSchema);
