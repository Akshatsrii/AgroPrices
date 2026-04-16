const axios = require("axios");

const getPrediction = async (days) => {
  try {
    const res = await axios.post("http://localhost:5000/predict", {
      days,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getPrediction };