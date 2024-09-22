import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join("public")));

app.post("/generate-media", async (req, res) => {
    const { prompt } = req.body;
    const API_KEY = process.env.PIXABAY_API_KEY;

    try {
        const imageResponse = await fetch(`https://pixabay.com/api/?key=45684768-73aac1d5f59f83ab66304ad54&q=${encodeURIComponent(prompt)}&image_type=photo`);
        const imageData = await imageResponse.json();

        const videoResponse = await fetch(`https://pixabay.com/api/videos/?key=45684768-73aac1d5f59f83ab66304ad54&q=${encodeURIComponent(prompt)}`);
        const videoData = await videoResponse.json();

        const imageUrls = imageData.hits.map(hit => hit.webformatURL);
        const videoUrls = videoData.hits.map(hit => hit.videos.medium.url);
        console.log("deepika")
        res.json({ imageUrls, videoUrls });
    } catch (error) {
        console.error("Error fetching media:", error);
        res.status(500).json({ message: "Error fetching media." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log("saiyam dubey")
    console.log(`Server running on http://localhost:${PORT}`);
});
