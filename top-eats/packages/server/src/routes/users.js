import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import fileUpload from "../models/fileUpload";

const router = express.Router();

router
  .route("/:id")
  .get(async (req, res) => {
    const populateReviews = [];
    const populateSaved = [];
    const user = await User.findOne({ _id: req.params.id })
      .populate(populateReviews)
      .populate(populateSaved)
      .exec();
    if (user) {
      res.json(user.toJSON());
    } else {
      res.status(404).end;
    }
  })
  .put(async (req, res) => {
    const {
      password,
      confirmPassword,
      currentPassword,
      profile_image,
    } = req.body;
    const { id } = req.params;

    const user = await User.findById({ id });
    if (password && confirmPassword && currentPassword) {
      const user = await User.findById({ id: id });
      const passwordsMatch = await bcrypt.compare(
        currentPassword,
        user.hashedPassword
      );

      if (!passwordsMatch) {
        return res.status(401).json({ message: "Passwords do not match!" });
      } else if (password !== confirmPassword) {
        return res.status(404).json({ message: "Passwords must match!" });
      }
    }

    if (password) {
      if (await bcrypt.compare(currentPassword, user.passwordHash)) {
        try {
          const hashedPassword = await bcrypt.hash(password, 12);
          const updateUser = await User.findByIdAndUpdate(
            {
              _id: id,
            },
            {
              passwordHash: hashedPassword,
            },
            {
              profile_image: profile_image,
            },
            {
              new: true,
            }
          );
          res.json(updateUser.toJSON());
        } catch (error) {
          res.status(401).end();
        }
      }
    } else if (profile_image) {
      const updateUser = await User.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          profile_image: profile_image,
        },
        {
          new: true,
        }
      );
      res.json(updateUser.toJSON());
    }
  });

router.route("/").post(fileUpload(), async (req, res) => {
  if (req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files selected" });
  }
  const receivedFile = req.files.file;
  const uploadPath =
    path.join(__dirname, "../") + "public/" + receivedFile.name;

  receivedFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.status(200).json({ message: "Success!" });
  });
});

export const downloadFile = async (req, res) => {
  const { fileName } = req.params;
  res.sendFile(path.join(__dirname, "../") + "/fileUploads/" + fileName);
};

module.exports = router;
