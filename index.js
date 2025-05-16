const youtubedl = require("youtube-dl-exec");
const fs = require("fs");
const path = require("path");

const download_Directory = "yt_downloads";

// Create directory if it doesn't exist
if (!fs.existsSync(download_Directory)) {
  fs.mkdirSync(download_Directory);
}

let errorLinks = [];

const links = [
  "https://youtu.be/OLj--Zcm1-g?si=Sn0YJ7dICVCIonil",
  "https://youtu.be/qRzqFA08UlM?si=1TMH3on-BNA34aIm",
  "https://youtu.be/eF1gy4b763Y?si=L9XTfyf3wQ9M0g1C",
  "https://youtu.be/_m5mrh1bEZg?si=qnrv5q5A0lk0LJqN",
  "https://youtu.be/Ot89uSWqzOM?si=GogTQqPMzKHEdIK7",
  "https://youtu.be/U_sWZ_oMk0o?si=ih4UeA4OJYNJExID",
  "https://youtu.be/of7pRovDP2o?si=AXZ6XmRlmVZaiiAh",
  "https://youtu.be/sAzMWOIvbKw?si=S5GXqCG4d8czr68y",
  "https://youtu.be/WpjgHeL6_zE?si=jdaMnwXj2fNk1RJp",
  "https://youtu.be/H-rkmeHF6UY?si=tZAiIb6epJDleEFK",
  "https://youtu.be/aTHmOJLG6rs?si=0UbL1IVNlzxuSeoU",
  "https://youtu.be/TA171BtvQaY?si=zCu15WIXucwgzoYz",
  "https://youtu.be/hlEP8RVlp7k?si=NilZecr4AVCw3ubQ",
  "https://youtu.be/mf3eU-IwO8Y?si=FkVWttujOhM0EUTh",
  "https://youtu.be/3iXUZGDg-1E?si=5RkOKYrngIOqhfED",
  "https://youtu.be/z6X7_L8aAvg?si=_4_Q4aBoGTjlbxEu",
  "https://youtu.be/sAzMWOIvbKw?si=hXo_WBw28JMuZ4um",
  "https://youtu.be/JKUIKwIw0oc?si=uaL5Su8jl1rluPKb",
  "https://youtu.be/SqZNjK_xUHk?si=-8i67WHm9f3jUJSw",
  "https://youtu.be/s0LTzJc4Qys?si=JUQdyQeounR36RAe",
  "https://youtu.be/xb4ikOvwdDc?si=4RTQwf31nF5qGTTh",
  "https://youtu.be/dxFF1VqyBrY?si=JnB-NnEKERgdHBZ2",
  "https://youtu.be/vBT_b4FJTI8?si=PuB8ljS12yKAemuB",
  "https://youtu.be/GT9nc_c3i_k?si=PabJr4e6GbC3u-gw",
  "https://youtu.be/lA0U0BSZXdw?si=mtxc8L6KrxgiGWr1",
  "https://youtu.be/lvgJKPgNDKI?si=5Budelncssvol2oh",
  "https://youtu.be/KliEFgPTqP0?si=7hgC5fHgfz6_9MAy",
  "https://youtu.be/7NLjTH5s8-o?si=V6j8SHTWYlJOGrDb",
  "https://youtu.be/_UkldZoG6oY?si=61c6Le5QpPI7eDQC",
  "https://youtu.be/6gxoqYOOA6Q?si=yyp7_fJChUXXoROD",
  "https://youtu.be/7wtSxvZa1Sw?si=EnrVjPedcSpE4Dcz",
  "https://youtu.be/q69mD5R3tUo?si=0c4O_PGkygW91OlU",
  "https://youtu.be/X-aJuKWIVZM?si=v2uux3eaQ6CQzUMk",
  "https://youtu.be/ZUZG9z8977Q?si=y3gmy9-keb_mGe6W",
  "https://youtu.be/h_K9NKbLaXE?si=zYhtIRPBGotw-u0G",
  "https://youtu.be/imgpBLb6g0E?si=fFjmx0dZzWF3APUM",
  "https://youtu.be/NJmfyoWv10w?si=wBQGXP19mrBlGEi2",
  "https://youtu.be/9gAIekpC1Kg?si=u9ZddnjwbHNXvjSh",
  "https://youtu.be/2A7-2JB-z64?si=NC96pI2QbbvK7Kux",
  "https://youtu.be/JJJ1dxtWGAA?si=mB_j6nbfTtiENq5E",
  "https://youtu.be/5cokMshdpn8?si=Gu6l3dHgVKdvbB90",
  "https://youtu.be/0qdY0RyG5yg?si=-vUAMetmBDzAbR4P",
  "https://youtu.be/xd-9cdiJeFE?si=WnGz4wpcy0LU3iKl",
  "https://youtu.be/VeGXL1CjODk?si=rIb99t9f2fBhxJzS",
  "https://youtu.be/HeEePZW_4Ig?si=q4bCgttSHu7h201a",
  "https://youtu.be/Xrg4X_a_pY0?si=ELHlwB7cfVa8Cah1",
  "https://youtu.be/GHrxc-tf4ic?si=kUViRHnv_FxAdPV9",
  "https://youtu.be/Q7uiGV2Zbr8?si=KHqo3VbcTcqwCbyE",
  "https://youtu.be/tumvKqIj8Jc?si=CRHlAta3KVtWz8Ki",
  "https://youtu.be/AanmSKTOnDo?si=lXIjLMIwaYKjqff2",
  "https://youtu.be/50pkaaM-YnA?si=Wxo9hma-z3AgfSPc",
  "https://youtu.be/xs7tN0A7RC8?si=5j1K9M35HUgaV3at",
  "https://youtu.be/Nqwmh4WXMmo?si=trh9NYd31A6gfWwX",
  "https://youtu.be/k9plOYAmpBU?si=7jnQBtiEyJ0r-5Fi",
  "https://youtu.be/wVGolRgQilc?si=i0Fb9cQekkaVZqVv",
  "https://youtu.be/C4HV5ubXyAY?si=zHoOL_wsZkHeDPaf",
  "https://youtube.com/watch?v=715y2vQBg5s&feature=shared",
  "https://youtu.be/S0m427pGqaI?si=04iuEVxHRXqlZRSp",
  "https://youtu.be/mQ6HqGxA0_s?si=1Fua0tGK4M89D8Au",
  "https://youtu.be/sSId_KDgYZ4?si=Nd5YgJ0x2UZRTP0D",
  "https://youtu.be/VyvlJoV_q8s?si=_UyMaNQLFtuqghmL",
  "https://youtu.be/lsqsggtTZfs?si=pfY3NwrHjRJzJlhy",
  "https://youtu.be/SsnUz96suv8?si=dB8O1v1ihez-LVVY",
  "https://youtu.be/ZGR-LQCLUX4?si=oREcf6X2VwnrPy1G",
  "https://youtu.be/2GCDa0MBcU0?si=oZ4uHKzcsl0BUE2Q",
  "https://youtu.be/hXrFiK0Wa64?si=Y95stmuwsXQPWGIJ",
  "https://youtu.be/c0DVdVBKTFI?si=zU6TU77vg_bH_IIz",
  "https://youtu.be/gqwajYAEa4Q?si=yhaYLA4EAZBDTewl",
  "https://youtu.be/hdqmqaKUdX8?si=DbSzGOTdqk2Kq3nO",
  "https://youtu.be/S0icwQSlbpE?si=TaFfb8KkacCvnDjg",
  "https://youtu.be/vXWKT22zv-8?si=CTEMDMwKnVkzARTt",
  "https://youtu.be/L6NwENLQFcY?si=O0QZ0j2Mv_7th_G8",
  "https://youtu.be/oFes2IPlJi4?si=o0Ej8g8ErzjOZfDl",
  "https://youtu.be/2fWwpXuxrTI?si=hp1p_CG_bjNL9m9q",
  "https://youtu.be/Zfdb-ybkeGQ?si=DL9dmiTAY2eifkuL",
  "https://youtu.be/l56w_vccUgk?si=eNO4Qa-LqlMwQ0Zm",
  "https://youtu.be/W5tCl48D_Lw?si=0AvmLLFOY9B_zbi9",
  "https://youtu.be/jvh4tBDcTwI?si=cE1al7TuNTDDQy0G",
  "https://youtu.be/LTdlXQE9tOE?si=6N_30d-zA1wz8X3p",
  "https://youtu.be/ANikGpQd0y4?si=0XhqNdwelarDCaXT",
  "https://youtu.be/aVHOwIn7B74?si=USiPGlU9hRiR3_z-",
  "https://youtu.be/c1H4rzd-BUk?si=CuUcQUokiaIBeQ39",
  "https://youtu.be/Ak7f_0Ispxs?si=e4aSHiODR7Brn6wO",
  "https://youtu.be/-yVBGdIjt9I?si=R6AyBgU5kYAfiEBs",
  "https://youtu.be/-XryW1sWml8?si=sDHLE4dutnWEJ943",
  "https://youtu.be/uEkUVBR16DM?si=4mHvCkW2VIAxGFDw",
];

async function downloadVideos() {
  for (const url of links) {
    const options = {
      extractAudio: true,
      audioFormat: "mp3",
      output: path.join(download_Directory, "%(title)s.%(ext)s"),
    };

    try {
      await youtubedl(url, options);
      console.log(`MP3 downloaded successfully from ${url}`);
    } catch (error) {
      errorLinks.push(url);
      console.error(`Failed to download from ${url}:`, error);
    }
  }
}

downloadVideos();
console.log("Download process completed.");
console.log("Failed links:", errorLinks);



// const youtubedl = require("youtube-dl-exec");
// const download_Directory = "yt_downloads";
// const path = require("path");
// const fs = require("fs");
// // if the directory not exists then create it
// if (!fs.existsSync(download_Directory)) {
//   fs.mkdirSync(download_Directory);
// }

// const links = [
//   "https://youtu.be/OLj--Zcm1-g?si=Sn0YJ7dICVCIonil",
//   "https://youtu.be/qRzqFA08UlM?si=1TMH3on-BNA34aIm",
//   "https://youtu.be/eF1gy4b763Y?si=L9XTfyf3wQ9M0g1C",
//   "https://youtu.be/_m5mrh1bEZg?si=qnrv5q5A0lk0LJqN",
//   "https://youtu.be/Ot89uSWqzOM?si=GogTQqPMzKHEdIK7",
//   "https://youtu.be/U_sWZ_oMk0o?si=ih4UeA4OJYNJExID",
//   "https://youtu.be/of7pRovDP2o?si=AXZ6XmRlmVZaiiAh",
//   "https://youtu.be/sAzMWOIvbKw?si=S5GXqCG4d8czr68y",
//   "https://youtu.be/WpjgHeL6_zE?si=jdaMnwXj2fNk1RJp",
//   "https://youtu.be/H-rkmeHF6UY?si=tZAiIb6epJDleEFK",
//   "https://youtu.be/aTHmOJLG6rs?si=0UbL1IVNlzxuSeoU",
//   "https://youtu.be/TA171BtvQaY?si=zCu15WIXucwgzoYz",
//   "https://youtu.be/hlEP8RVlp7k?si=NilZecr4AVCw3ubQ",
//   "https://youtu.be/mf3eU-IwO8Y?si=FkVWttujOhM0EUTh",
//   "https://youtu.be/3iXUZGDg-1E?si=5RkOKYrngIOqhfED",
//   "https://youtu.be/z6X7_L8aAvg?si=_4_Q4aBoGTjlbxEu",
//   "https://youtu.be/sAzMWOIvbKw?si=hXo_WBw28JMuZ4um",
//   "https://youtu.be/JKUIKwIw0oc?si=uaL5Su8jl1rluPKb",
//   "https://youtu.be/SqZNjK_xUHk?si=-8i67WHm9f3jUJSw",
//   "https://youtu.be/s0LTzJc4Qys?si=JUQdyQeounR36RAe",
//   "https://youtu.be/xb4ikOvwdDc?si=4RTQwf31nF5qGTTh",
//   "https://youtu.be/dxFF1VqyBrY?si=JnB-NnEKERgdHBZ2",
//   "https://youtu.be/vBT_b4FJTI8?si=PuB8ljS12yKAemuB",
//   "https://youtu.be/GT9nc_c3i_k?si=PabJr4e6GbC3u-gw",
//   "https://youtu.be/lA0U0BSZXdw?si=mtxc8L6KrxgiGWr1",
//   "https://youtu.be/lvgJKPgNDKI?si=5Budelncssvol2oh",
//   "https://youtu.be/KliEFgPTqP0?si=7hgC5fHgfz6_9MAy",
//   "https://youtu.be/7NLjTH5s8-o?si=V6j8SHTWYlJOGrDb",
//   "https://youtu.be/_UkldZoG6oY?si=61c6Le5QpPI7eDQC",
//   "https://youtu.be/6gxoqYOOA6Q?si=yyp7_fJChUXXoROD",
//   "https://youtu.be/7wtSxvZa1Sw?si=EnrVjPedcSpE4Dcz",
//   "https://youtu.be/q69mD5R3tUo?si=0c4O_PGkygW91OlU",
//   "https://youtu.be/X-aJuKWIVZM?si=v2uux3eaQ6CQzUMk",
//   "https://youtu.be/ZUZG9z8977Q?si=y3gmy9-keb_mGe6W",
//   "https://youtu.be/h_K9NKbLaXE?si=zYhtIRPBGotw-u0G",
//   "https://youtu.be/imgpBLb6g0E?si=fFjmx0dZzWF3APUM",
//   "https://youtu.be/NJmfyoWv10w?si=wBQGXP19mrBlGEi2",
//   "https://youtu.be/9gAIekpC1Kg?si=u9ZddnjwbHNXvjSh",
//   "https://youtu.be/2A7-2JB-z64?si=NC96pI2QbbvK7Kux",
//   "https://youtu.be/JJJ1dxtWGAA?si=mB_j6nbfTtiENq5E",
//   "https://youtu.be/5cokMshdpn8?si=Gu6l3dHgVKdvbB90",
//   "https://youtu.be/0qdY0RyG5yg?si=-vUAMetmBDzAbR4P",
//   "https://youtu.be/xd-9cdiJeFE?si=WnGz4wpcy0LU3iKl",
//   "https://youtu.be/VeGXL1CjODk?si=rIb99t9f2fBhxJzS",
//   "https://youtu.be/HeEePZW_4Ig?si=q4bCgttSHu7h201a",
//   "https://youtu.be/Xrg4X_a_pY0?si=ELHlwB7cfVa8Cah1",
//   "https://youtu.be/GHrxc-tf4ic?si=kUViRHnv_FxAdPV9",
//   "https://youtu.be/Q7uiGV2Zbr8?si=KHqo3VbcTcqwCbyE",
//   "https://youtu.be/tumvKqIj8Jc?si=CRHlAta3KVtWz8Ki",
//   "https://youtu.be/AanmSKTOnDo?si=lXIjLMIwaYKjqff2",
//   "https://youtu.be/50pkaaM-YnA?si=Wxo9hma-z3AgfSPc",
//   "https://youtu.be/xs7tN0A7RC8?si=5j1K9M35HUgaV3at",
//   "https://youtu.be/Nqwmh4WXMmo?si=trh9NYd31A6gfWwX",
//   "https://youtu.be/k9plOYAmpBU?si=7jnQBtiEyJ0r-5Fi",
//   "https://youtu.be/wVGolRgQilc?si=i0Fb9cQekkaVZqVv",
//   "https://youtu.be/C4HV5ubXyAY?si=zHoOL_wsZkHeDPaf",
//   "https://youtube.com/watch?v=715y2vQBg5s&feature=shared",
//   "https://youtu.be/S0m427pGqaI?si=04iuEVxHRXqlZRSp",
//   "https://youtu.be/mQ6HqGxA0_s?si=1Fua0tGK4M89D8Au",
//   "https://youtu.be/sSId_KDgYZ4?si=Nd5YgJ0x2UZRTP0D",
//   "https://youtu.be/VyvlJoV_q8s?si=_UyMaNQLFtuqghmL",
//   "https://youtu.be/lsqsggtTZfs?si=pfY3NwrHjRJzJlhy",
//   "https://youtu.be/SsnUz96suv8?si=dB8O1v1ihez-LVVY",
//   "https://youtu.be/ZGR-LQCLUX4?si=oREcf6X2VwnrPy1G",
//   "https://youtu.be/2GCDa0MBcU0?si=oZ4uHKzcsl0BUE2Q",
//   "https://youtu.be/hXrFiK0Wa64?si=Y95stmuwsXQPWGIJ",
//   "https://youtu.be/c0DVdVBKTFI?si=zU6TU77vg_bH_IIz",
//   "https://youtu.be/gqwajYAEa4Q?si=yhaYLA4EAZBDTewl",
//   "https://youtu.be/hdqmqaKUdX8?si=DbSzGOTdqk2Kq3nO",
//   "https://youtu.be/S0icwQSlbpE?si=TaFfb8KkacCvnDjg",
//   "https://youtu.be/vXWKT22zv-8?si=CTEMDMwKnVkzARTt",
//   "https://youtu.be/L6NwENLQFcY?si=O0QZ0j2Mv_7th_G8",
//   "https://youtu.be/oFes2IPlJi4?si=o0Ej8g8ErzjOZfDl",
//   "https://youtu.be/2fWwpXuxrTI?si=hp1p_CG_bjNL9m9q",
//   "https://youtu.be/Zfdb-ybkeGQ?si=DL9dmiTAY2eifkuL",
//   "https://youtu.be/l56w_vccUgk?si=eNO4Qa-LqlMwQ0Zm",
//   "https://youtu.be/W5tCl48D_Lw?si=0AvmLLFOY9B_zbi9",
//   "https://youtu.be/jvh4tBDcTwI?si=cE1al7TuNTDDQy0G",
//   "https://youtu.be/LTdlXQE9tOE?si=6N_30d-zA1wz8X3p",
//   "https://youtu.be/ANikGpQd0y4?si=0XhqNdwelarDCaXT",
//   "https://youtu.be/aVHOwIn7B74?si=USiPGlU9hRiR3_z-",
//   "https://youtu.be/c1H4rzd-BUk?si=CuUcQUokiaIBeQ39",
//   "https://youtu.be/Ak7f_0Ispxs?si=e4aSHiODR7Brn6wO",
//   "https://youtu.be/-yVBGdIjt9I?si=R6AyBgU5kYAfiEBs",
//   "https://youtu.be/-XryW1sWml8?si=sDHLE4dutnWEJ943",
//   "https://youtu.be/uEkUVBR16DM?si=4mHvCkW2VIAxGFDw",
// ];

// links.forEach((url) => {
//   // here I have to write the logic for the downloading the youtube video

//   const options = {
//     extractAudio: true,
//     audioFormat: "mp3",
//     output: path.join(download_Directory, "%(title)s.%(ext)s"),
//   };
//   youtubedl(url, options).then(() => {
//     console.log(`${format.toUpperCase()} downloaded successfully.`);
//   });
// });

// const readline = require("readline");

//
// const fs = require("fs");
// const path = require("path");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Paste YouTube URL: ", function (url) {
//   rl.question("Download as (mp3 or mp4): ", function (format) {
//     const options =
//       format === "mp3"
//         ? {
//             extractAudio: true,
//             audioFormat: "mp3",
//             output: path.join(download_Directory, "%(title)s.%(ext)s"),
//           }
//         : {
//             format: "bestvideo+bestaudio",
//             output: "%(title)s.%(ext)s",
//           };

//     youtubedl(url, options)
//       .then(() => {
//         console.log(`${format.toUpperCase()} downloaded successfully.`);
//         rl.close();
//       })
//       .catch((err) => {
//         console.error("Download failed:", err);
//         rl.close();
//       });
//   });
// });
