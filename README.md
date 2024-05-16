# YahooWS2

## Description
YahooWS2 is a tool for retrieving data about price, open, close and more from Yahoo Finance using Puppeteer.

## Installation
Make sure you have Node.js installed.

1. Clone the repository:
```bash
git clone <repository-url>
```   
2. Install dependencies:
```bash
npm install 
```
3. To run the development server with all tickers:
```bash
npm run dev
```
## Additional Functionalities
You may customize paths in the missingTicker.js and showFiles.js.

To create a missing_ticker.txt showing all the missing ticker that havent downaloaded 
```bash 
npm run missing
```
To run the development server with missing tickers:
```bash
 npm run dev2
```

To create a file fileList.txt with all ticker that you have already downloaded 
```bash
npm run show
```
