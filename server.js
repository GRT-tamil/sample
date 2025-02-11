require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to access this server
app.use(express.json());

const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjcwOGYxNGMxLTc2NTUtNGUwOC1hZWJlLTNhMjg3MTljOTc3NCIsImlhdCI6MTczODY2Njk1NSwic3ViIjoiZGV2ZWxvcGVyLzdmMzMxN2EyLWI5OGYtZDAyZS1mNmI5LWZmZWIyZGRlODQzNCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ5LjM3LjIxNS4xNzUiXSwidHlwZSI6ImNsaWVudCJ9XX0.jUZyLCP3I_6E-5hA5DcQo7uvIPY1BtKT_aOx0d-pO-th83R6LS4ZlTllvCijBkUBlNkycenEzcN14m8Dv4PehA"; // Store this securely in .env

app.get("/clashofclans/:playerTag", async (req, res) => {
    try {
        const playerTag = req.params.playerTag.replace("#", "%23");
        console.log(`Fetching data for player: ${playerTag}`); // Debugging log
        const response = await axios.get(`https://api.clashofclans.com/v1/players/${playerTag}`, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });
        // console.log("API Response:", response.data); // Debugging log
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message); // Debugging log
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));