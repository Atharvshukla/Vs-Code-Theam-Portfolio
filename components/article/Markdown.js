// A small markdown renderer for the long-form content in data/*.js.
// Supports headings, paragraphs, lists, code fences, blockquotes, tables, hr and inline marks.
import { Window } from "../ui";

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** The ## headings of a document, for the table of contents. */
export function extractHeadings(content) {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const text = l.slice(3).replace(/\*\*/g, "").replace(/`/g, "").trim();
      return { id: slugify(text), text };
    });
}

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g;

function inline(text, keyPrefix = "") {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyPrefix}${i}`;
    if (!part) return null;
    if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={key}>{inline(part.slice(2, -2), `${key}-`)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const external = /^https?:/.test(link[2]);
      return (
        <a key={key} href={link[2]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {link[1]}
        </a>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

const isUl = (l) => /^\s*[-*]\s+/.test(l) && !/^\s*\*\*/.test(l);
const isOl = (l) => /^\s*\d+\.\s+/.test(l);
const isTable = (l) => l.trim().startsWith("|");
const isHr = (l) => /^\s*(---+|\*\*\*+)\s*$/.test(l);

function splitRow(line) {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

export default function Markdown({ content }) {
  const lines = content.replace(/\r/g, "").trim().split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = `b${i}`;

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) code.push(lines[i++]);
      i++;
      out.push(
        <Window key={key} title={lang || "snippet"} className="my-6 shadow-none" bodyClassName="overflow-x-auto">
          <pre className="!m-0 !rounded-none !border-0 !bg-transparent">
            <code>{code.join("\n")}</code>
          </pre>
        </Window>
      );
      continue;
    }

    // The page renders the title itself.
    if (line.startsWith("# ")) {
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      out.push(
        <h2 key={key} id={slugify(text.replace(/\*\*/g, ""))} className="scroll-mt-28">
          {inline(text)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      out.push(<h3 key={key}>{inline(line.slice(4).trim())}</h3>);
      i++;
      continue;
    }

    if (isHr(line)) {
      out.push(<hr key={key} />);
      i++;
      continue;
    }

    if (line.startsWith(">")) {
      const quote = [];
      while (i < lines.length && lines[i].startsWith(">")) quote.push(lines[i++].replace(/^>\s?/, ""));
      out.push(<blockquote key={key}>{inline(quote.join(" "))}</blockquote>);
      continue;
    }

    if (isTable(line)) {
      const rows = [];
      while (i < lines.length && isTable(lines[i])) rows.push(lines[i++]);
      const [head, ...rest] = rows;
      const body = rest.filter((r) => !/^\s*\|?[\s:-]+\|[\s:|-]*$/.test(r));
      out.push(
        <div key={key} className="mb-6 overflow-x-auto rounded-lg border border-ink-700">
          <table className="!mb-0">
            <thead>
              <tr>
                {splitRow(head).map((c, j) => (
                  <th key={j}>{inline(c)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri}>
                  {splitRow(r).map((c, j) => (
                    <td key={j}>{inline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (isUl(line) || isOl(line)) {
      const ordered = isOl(line);
      const items = [];
      while (i < lines.length && (ordered ? isOl(lines[i]) : isUl(lines[i]))) {
        items.push(lines[i++].replace(ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/, ""));
      }
      const List = ordered ? "ol" : "ul";
      out.push(
        <List key={key}>
          {items.map((it, j) => (
            <li key={j}>{inline(it, `${key}-${j}-`)}</li>
          ))}
        </List>
      );
      continue;
    }

    // A line that is only bold reads as a minor heading.
    if (/^\*\*[^*]+\*\*:?$/.test(line.trim())) {
      out.push(<h3 key={key}>{line.trim().replace(/\*\*/g, "")}</h3>);
      i++;
      continue;
    }

    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3} |>|```)/.test(lines[i]) &&
      !isUl(lines[i]) &&
      !isOl(lines[i]) &&
      !isTable(lines[i]) &&
      !isHr(lines[i])
    ) {
      para.push(lines[i++].trim());
    }
    if (para.length === 0) {
      // Unrecognised line: render it as text so nothing is dropped.
      para.push(lines[i++].trim());
    }
    out.push(<p key={key}>{inline(para.join(" "))}</p>);
  }

  return <div className="prose-dev">{out}</div>;
}
