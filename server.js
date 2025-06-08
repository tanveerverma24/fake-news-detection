require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.FACT_CHECK_API_KEY;

app.post('/check-news', async (req, res) => {
  const { news } = req.body;

  if (!news || news.trim() === '') {
    return res.status(400).json({ error: 'No news content provided.' });
  }

  try {
    const response = await axios.get('https://factchecktools.googleapis.com/v1alpha1/claims:search', {
      params: {
        query: news,
        key: API_KEY,
      },
    });

    const claims = response.data.claims || [];

    if (claims.length === 0) {
      return res.json({ verdict: 'No evidence found. Be cautious.' });
    }

    res.json({
      verdict: 'Similar claims found.',
      claims: claims.map(claim => ({
        text: claim.text,
        claimant: claim.claimant,
        claimReview: claim.claimReview.map(review => ({
          publisher: review.publisher.name,
          url: review.url,
          title: review.title,
          rating: review.textualRating
        })),
      })),
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Something went wrong. Try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
