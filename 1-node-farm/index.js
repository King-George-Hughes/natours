const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require(`${__dirname}/modules/replaceTemplate`);

// Calling Data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Calling Templates
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  const { pathname, query } = url.parse(req.url, true);

  //   Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el));
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

    res.end(output);

    // Product Page
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page Not Found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});

// FILES
// // Synchronous Way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `This is what we know about avocado: ${textIn}. \nCreated on ${new Date().toUTCString()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File is written");

// // Asynchronous
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   //   console.log(data);
//   if (err) throw err;

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     // console.log(data2);
//     if (err) throw err;

//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       //   console.log(data3);

//       if (err) throw err;

//       fs.writeFile(`./txt/final.txt`, `${data2} \n${data3}`, "utf-8", (err) => {
//         console.log("Your file is written!!");
//         if (err) throw err;
//       });
//     });
//   });
// });
