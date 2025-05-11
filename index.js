
const youtubedl = require('youtube-dl-exec');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Paste YouTube URL: ", function (url) {
  rl.question("Download as (mp3 or mp4): ", function (format) {
    const options = format === 'mp3'
      ? {
          extractAudio: true,
          audioFormat: 'mp3',
          output: '%(title)s.%(ext)s'
        }
      : {
          format: 'bestvideo+bestaudio',
          output: '%(title)s.%(ext)s'
        };

    youtubedl(url, options)
      .then(() => {
        console.log(`${format.toUpperCase()} downloaded successfully.`);
        rl.close();
      })
      .catch(err => {
        console.error("Download failed:", err);
        rl.close();
      });
  });
});
