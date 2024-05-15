import fs from 'fs';
import path from 'path';

const dir = '../Downloads';
const tickersFilePath = './tickers.txt';

function readTickersFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data.split(',').map(ticker => ticker.trim().replace(/"/g, ''));
    } catch (error) {
        console.error('Error reading tickers file:', error);
        return [];
    }
}

function readDir(dir) {
    const dirList = {};
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        if (fs.statSync(path.join(dir, file)).isFile()) {
            const tickerFile = file.split('.')[0];
            dirList[tickerFile] = true;
        }
    });

    return dirList;
}

const tickersFromTxt = readTickersFromFile(tickersFilePath);
const dirList = readDir(dir);
const missingTickers = tickersFromTxt.filter(ticker => !dirList[ticker]).reverse();

const tickerString = missingTickers.map((ticker, index) => {
    return (index > 0 && (index + 1) % 10 === 0) ? `"${ticker}"` + '\n' : `"${ticker}"`;
}).join(', ');

const pathNewFile = './missing_tickers.txt';    

fs.writeFileSync(pathNewFile, tickerString);

console.log(pathNewFile);
