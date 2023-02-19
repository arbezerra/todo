#!/usr/bin/env node

import app from "../app";

const port = normalizePort(process.env.PORT || "5000");

app.listen(port, () => {
  console.log("Listening on " + port);
});

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}