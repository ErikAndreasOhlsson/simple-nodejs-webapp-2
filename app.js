'use strict'

import { resolve, normalize, join } from "path";
import { createServer } from "http";
import * as fs from "fs";

const staticBasePath = "./www";
const PORT = process.env.PORT || 5000;

const staticServe = function (req, res) {
  let resolvedBase = resolve(staticBasePath);
  let safeSuffix = normalize(req.url).replace(/^(\.\.[\/\\])+/, "");
  let fileLoc = join(resolvedBase, safeSuffix);

  fs.readFile(fileLoc, function (err, data) {
    if (err) {
      res.writeHead(404, "Not Found");
      res.write("404: File Not Found!");
      return res.end();
    }
    res.statusCode = 200;
    res.write(data);
    return res.end();
  });
};

const httpServer = createServer(staticServe);
httpServer.listen(PORT, () => {
  console.log("server listening on port 5000");
});
