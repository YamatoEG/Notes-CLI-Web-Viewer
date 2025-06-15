import { readFile } from "node:fs/promises";
import http from "node:http";
import open from "open";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || '';
  });
};

export const formatNotes = (notes) => {
  return notes.map(note => {
    return `<div class="note">
      <p>${note.content}</p>
      <div class="tags">${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
    </div>`;
  }).join('\n');
};

export const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    try {
      if (req.url === '/style.css') {
        const cssPath = path.join(__dirname, 'style.css');
        const css = await readFile(cssPath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(css);
        return;
      }

      const htmlPath = new URL("./template.html", import.meta.url);
      const template = await readFile(htmlPath, 'utf-8');
      const html = interpolate(template, { notes: formatNotes(notes) });

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end("Internal Server Error");
      console.error(err);
    }
  });
};

export const start = (notes, port) => {
  const server = createServer(notes);
  server.listen(port, () => {
    const address = `http://localhost:${port}`;
    console.log(`server on ${address}`);
    open(address);
  });
};
