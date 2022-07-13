'use strict';

const fs = require('fs');

let rawData = fs.readFileSync('imageData.json');
let imageData = JSON.parse(rawData);

const allUrls = [];

for (const imgObj of imageData) {
  allUrls.push(imgObj.download_url);
}

console.log(allUrls);
console.log(imageData.length);
