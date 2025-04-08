require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");
const path = require("path");
const fs = require("node:fs"); // For handling file paths if you're sending an image file
const Images = require("../models/Image");

const generateImage = async (req, res) => {
  const { prompt, aspect_ratio, negative_prompt, api_key } = req.body;
  console.log(prompt, aspect_ratio, negative_prompt, api_key);

  try {
    const payload = {
      prompt,
      output_format: "webp",
      aspect_ratio, // 16:9 1:1 21:9 2:3 3:2 4:5 5:4 9:16 9:21
      negative_prompt,
    };

    const FINAL_STABILITY_API_KEY = api_key || process.env.STABILITY_API_KEY;
    const response = await axios.postForm(
      `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${FINAL_STABILITY_API_KEY}`,
          Accept: "image/*",
        },
      }
    );

    if (response.status === 200) {
      // Prepare image data for ImgBB
      const formData = new FormData();
      formData.append("image", Buffer.from(response.data).toString("base64"));

      const IMGBB_API_KEY_WORKING =
        process.env.IMGBB_API_KEY || "1c642c430a09a00bd14335fe0b77a9e2";

      try {
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY_WORKING}`,
          formData,
          { headers: formData.getHeaders() }
        );

        if (imgbbResponse.status === 200) {
          const imageUrl = imgbbResponse.data.data.url;
          console.log(`Image URL: `, imageUrl);

          const newImage = await Images.create({
            prompt: prompt,
            url: imageUrl,
          });

          await newImage.save();
          return res.status(200).json({ imageUrl });
        } else {
          throw new Error(
            `ImgBB Error: ${imgbbResponse.status} - ${imgbbResponse.data}`
          );
        }
      } catch (imgbbError) {
        console.error("ImgBB upload failed:", imgbbError.message);

        // Save locally if ImgBB upload fails
        const localFilename = `${prompt.replace(
          /[^a-zA-Z0-9]/g,
          "_"
        )}_${Date.now()}.webp`;
        const outputPath = path.join(__dirname,  "../uploads", localFilename);
        fs.writeFileSync(outputPath, response.data);

        const localUrl = `http://picgen-api.devmindslab.com/uploads/${localFilename}`;
        console.log("Saved locally:", localUrl);

        return res.status(200).json({ imageUrl: localUrl });
      }
    } else {
      throw new Error(`${response.status}: ${response.data.toString()}`);
    }
  } catch (error) {
    console.error("Error generating image:", error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

const fetchAllRecentImages = async (req, res) => {
  try {
    const recentImages = await Images.find({}).sort({ createdAt: -1 });
    if (!recentImages) {
      return res.status(404).json({ message: "no recent message found" });
    }
    res.status(200).json(recentImages);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server internal error" });
  }
};

module.exports = { generateImage, fetchAllRecentImages };
