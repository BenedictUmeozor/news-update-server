const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { keywords, limit, offset } = req.body;

  let url = `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&languages=en`;

  if (keywords) {
    url = url + `&keywords=${keywords}`;
  }

  if (limit && limit > 0) {
    url = url + `&limit=${limit}`;
  }

  if (offset && offset > 0) {
    url = url + `&offset=${offset}`;
  }

  try {
    const { data } = await axios.get(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => console.log("Running"));
