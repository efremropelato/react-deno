// @deno-types="https://raw.githubusercontent.com/Soremwar/deno_types/4a50660/react/v16.13.1/react.d.ts"
import React from "https://dev.jspm.io/react@17.0.0";
import ReactDOMServer from "https://dev.jspm.io/react-dom@17.0.0/server";
import { opine } from "https://deno.land/x/opine@0.25.0/mod.ts";
import App from "./app.tsx";

/**
 * Create our client bundle - you could split this out into
 * a preprocessing step.
 */
const [diagnostics, js] = await Deno.bundle(
  "./client.tsx",
  undefined,
  { lib: ["dom", "dom.iterable", "esnext"] },
);

if (diagnostics) {
  console.log(diagnostics);
}

/**
 * Create our Opine server.
 */
const app = opine();
const browserBundlePath = "/browser.js";

const html =
  `<html><head><script type="module" src="${browserBundlePath}"></script><style>* { font-family: Helvetica; }</style></head><body><div id="root">${
    (ReactDOMServer as any).renderToString(<App />)
  }</div></body></html>`;

app.use(browserBundlePath, (req, res, next) => {
  res.type("application/javascript").send(js);
});

app.use("/", (req, res, next) => {
  res.type("text/html").send(html);
});

app.listen({ port: 3000 });

console.log("React SSR App listening on port 3000");
