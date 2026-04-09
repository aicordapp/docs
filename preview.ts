
import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { compile } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { pathToFileURL } from "url";

const windowsComponentsPath =
  process.env.DOCS_MDX_COMPONENTS_PATH ??
  "D:\\Code\\work\\AICord\\dashboardV2\\aicord\\app\\docs\\mdx-components.tsx";

const componentsModuleUrl = pathToFileURL(windowsComponentsPath).href;
const { docsMdxComponents = {} } = await import(componentsModuleUrl);

const previewMdxComponents = {
  ...docsMdxComponents,
  a: ({ href = "", children, ...props }: any) =>
    React.createElement(
      "a",
      {
        href,
        ...(href.startsWith("http://") || href.startsWith("https://")
          ? { target: "_blank", rel: "noreferrer" }
          : {}),
        ...props,
      },
      children
    ),
};

const app = express();
const PORT = 3001;

// simple HTML shell
function html(content: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>MDX Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-black text-white p-8">
        <div id="root">${content}</div>
      </body>
    </html>
  `;
}

// compile MDX → React component
async function mdxToComponent(mdx: string) {
  const compiled = await compile(mdx, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
  });

  const fn = new Function(String(compiled));
  const { default: Content } = fn(runtime);
  return Content;
}

// render MDX file
app.get(/.*/, async (req: express.Request, res: express.Response) => {
  try {
    const docsRoot = path.resolve(process.cwd());
    const requestPath = decodeURIComponent(req.path).replace(/^\/+/, "");
    let filePath = path.resolve(docsRoot, requestPath);

    // Prevent path traversal outside the docs workspace.
    if (!filePath.toLowerCase().startsWith(docsRoot.toLowerCase())) {
      return res.status(403).send("Path is outside the docs root");
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }

    if (fs.statSync(filePath).isDirectory()) {
      const candidates = ["index.mdx", "README.mdx", "README.md"];
      const matched = candidates
        .map((candidate) => path.join(filePath, candidate))
        .find(
          (candidatePath) =>
            fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile()
        );

      if (!matched) {
        return res.status(404).send("No previewable MDX/MD file in directory");
      }

      filePath = matched;
    }

    if (!fs.statSync(filePath).isFile()) {
      return res.status(404).send("File not found");
    }

    const mdx = fs.readFileSync(filePath, "utf-8");
    const Content = await mdxToComponent(mdx);

    const element = React.createElement(
      (props: any) =>
        React.createElement(Content, {
          components: previewMdxComponents,
          ...props,
        })
    );

    const rendered = renderToString(element);

    res.send(html(rendered));
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`MDX preview running at http://localhost:${PORT}`);
});