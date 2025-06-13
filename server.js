const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const screenshot = await page.screenshot();
  await browser.close();

  res.set('Content-Type', 'image/png');
  res.send(screenshot);
});

app.listen(3000, () => console.log('Running on port 3000'));
