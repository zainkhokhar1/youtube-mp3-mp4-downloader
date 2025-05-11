const express = require('express');
const path = require('path');
const fs = require('fs');
const youtubedl = require('youtube-dl-exec');
const cors = require('cors');

const app = express();
const port = 3000;
const downloadsDir = path.join(__dirname, 'temp_downloads');

// Create temp downloads directory if it doesn't exist
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Download endpoint
app.post('/download', async (req, res) => {
  const { url } = req.body;
  
  if (!url || !url.includes('facebook.com')) {
    return res.status(400).json({ error: 'Please provide a valid Facebook URL' });
  }

  try {
    const options = {
      format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]',
      output: path.join(downloadsDir, 'fb_reel_%(id)s.%(ext)s'),
      noWarnings: true,
      noCheckCertificates: true,
      addHeader: [
        'referer:facebook.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      ]
    };

    console.log('Starting download from:', url);
    await youtubedl(url, options);

    // Find the downloaded file
    const files = fs.readdirSync(downloadsDir);
    const videoFile = files.find(file => file.startsWith('fb_reel_') && file.endsWith('.mp4'));

    if (!videoFile) {
      throw new Error('Downloaded file not found');
    }

    const filePath = path.join(downloadsDir, videoFile);
    
    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${videoFile}"`);
    res.setHeader('Content-Type', 'video/mp4');
    
    // Stream file to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    // Cleanup after streaming completes
    fileStream.on('end', () => {
      fs.unlinkSync(filePath);
      console.log('Temporary file deleted:', filePath);
    });

  } catch (error) {
    console.error('Download failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});