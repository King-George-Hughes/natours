const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathname = req.url;

  if (pathname === "/" || pathname === "/overview") {
    res.end("This is the overview");
  } else if (pathname === "/product") {
    res.end("This is the product");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page Not Found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
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
