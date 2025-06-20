const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Helper to download image from a URL and save locally
const downloadImageFromUrl = async (imageUrl, destFolder) => {
  // Extract extension from URL or default to '.jpg'
  const ext = path.extname(imageUrl).split('?')[0] || '.jpg';

  // Generate a filename using timestamp
  const filename = `${Date.now()}-from-url${ext}`;

  // Create the full save path (folder + filename)
  const savePath = path.join(destFolder, filename);

  // Create a writable stream for saving the image
  const writer = fs.createWriteStream(savePath);

  // Download the image as a stream
  const response = await axios({
    url: imageUrl,
    method: 'GET',
    responseType: 'stream',
  });

  // Pipe the response data into the writable stream
  response.data.pipe(writer);

  // Return a promise that resolves when writing is finished
  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve({ filename, savePath }));
    writer.on('error', reject);
  });
};

module.exports = downloadImageFromUrl;
