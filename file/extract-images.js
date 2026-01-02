const fs = require('fs');
const path = require('path');

const targetExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp',
    '.mp4',
    '.mp3'
];

const sourceFolder = __dirname;
const outputFolder = path.join(__dirname, 'extracted_files');

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

function extractFiles(folder) {
    fs.readdirSync(folder).forEach(item => {
        const fullPath = path.join(folder, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            extractFiles(fullPath);
        } else {
            const ext = path.extname(item).toLowerCase();
            if (targetExtensions.includes(ext)) {
                const dest = path.join(outputFolder, item);
                fs.copyFileSync(fullPath, dest);
                console.log(`Extracted: ${item}`);
            }
        }
    });
}

extractFiles(sourceFolder);

console.log("\n✔ Extraction completed!");
console.log("✔ All images, mp3, and mp4 files were copied to: extracted_files");
