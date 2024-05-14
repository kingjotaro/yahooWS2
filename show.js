import fs from 'fs';
import path from 'path';

function listFilesInDirectory(directory) {
    try {
        const files = fs.readdirSync(directory);
        return files.filter(file => fs.statSync(path.join(directory, file)).isFile());
    } catch (error) {
        console.error('Error listing files in directory:', error);
        return [];
    }
}

const directory = '../Downloads';
const fileList = listFilesInDirectory(directory);

const outputFile = './fileList.txt';

const fileListString = fileList.map((file, index) => {
    return (index > 0 && (index + 1) % 10 === 0) ? `"${file.split('.')[0]}"\n` : `"${file.split('.')[0]}"`;
}).join(', ');

fs.writeFileSync(outputFile, fileListString);

console.log(`File list written to ${outputFile}`);
