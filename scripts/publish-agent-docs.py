#!/usr/bin/env python3
"""Place agent Markdown next to the HTML pages and write the indexes.

Hugo renders each docs page to index.md in that page's directory. Leaf pages
are published as slug.md (for example /docs/inference/quickstart.md). Section
roots stay index.md. HTML remains the canonical URL and is the only form
listed in sitemap.xml.
"""

import json
import os
import re
import sys
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
BASE = "https://docs.podstack.ai"

INTRO = """# Podstack Documentation

> Podstack is the console at https://podstack.ai. GPU instances are billed per second from the hourly rate, from boot until you terminate them. Extra disk is billed per GB-hour. Jobs are billed only while they run. Inference is billed per token from a prepaid wallet. There is no monthly or annual subscription. Prices show in INR for India and USD elsewhere. The OpenAI-compatible API is https://podstack.ai/api/v1 with keys that start with ps_live_. The podstack CLI is release 1.2.0. The Python package is podstack 1.8.0 or newer: pip install podstack (https://pypi.org/project/podstack/1.8.0/). Version 1.8.0 replaces the old notebook API.

Live model ids and rates: https://podstack.ai/app/models and GET https://podstack.ai/api/v1/models. Live GPU rates: https://podstack.ai/#pricing.
"""


def rel_from_href(href):
    path = urlparse(href).path
    if not path.startswith("/"):
        raise SystemExit(f"markdown alternate is not a site path: {href}")
    return path.lstrip("/")


def parse_front_matter(text):
    if not text.startswith("---\n"):
        raise ValueError("missing front matter")
    end = text.find("\n---\n", 4)
    if end < 0:
        raise ValueError("unterminated front matter")
    data = {}
    for line in text[4:end].splitlines():
        if not line.strip() or ":" not in line:
            continue
        key, value = line.split(":", 1)
        value = value.strip()
        if len(value) >= 2 and value[0] == '"' and value[-1] == '"':
            value = json.loads(value)
        data[key.strip()] = value
    return data


def main():
    if not os.path.isdir(PUBLIC):
        raise SystemExit("public/ is missing; run hugo first")

    moved = 0
    pages = []
    for dirpath, _, files in os.walk(PUBLIC):
        if "index.html" not in files:
            continue
        html_path = os.path.join(dirpath, "index.html")
        html = open(html_path, encoding="utf-8").read()
        match = re.search(
            r'rel=alternate type=text/markdown href=([^\s">]+)|'
            r'rel="alternate" type="text/markdown" href="([^"]+)"',
            html,
        )
        if not match:
            continue
        href = match.group(1) or match.group(2)
        source = os.path.join(dirpath, "index.md")
        if not os.path.isfile(source):
            raise SystemExit(f"HTML links to markdown but {source} was not rendered ({href})")
        target = os.path.join(PUBLIC, rel_from_href(href))
        os.makedirs(os.path.dirname(target), exist_ok=True)
        if os.path.abspath(source) != os.path.abspath(target):
            os.replace(source, target)
            moved += 1
        text = open(target, encoding="utf-8").read()
        try:
            meta = parse_front_matter(text)
        except ValueError as exc:
            raise SystemExit(f"{target}: {exc}") from exc
        for key in ("title", "description", "url", "lastmod"):
            if not meta.get(key):
                raise SystemExit(f"{target}: front matter missing {key}")
        if not meta["url"].startswith(BASE + "/"):
            raise SystemExit(f"{target}: url is not on {BASE}")
        if "](/" in text:
            raise SystemExit(f"{target}: root-relative markdown link was not rewritten")
        md_url = BASE + "/" + os.path.relpath(target, PUBLIC).replace(os.sep, "/")
        if md_url != href.split("#")[0]:
            raise SystemExit(f"{target}: file URL {md_url} does not match alternate {href}")
        pages.append({
            "url": meta["url"],
            "md_url": md_url,
            "title": meta["title"],
            "description": meta["description"],
            "lastmod": meta["lastmod"],
            "body": text,
        })

    if not pages:
        raise SystemExit("no agent markdown pages were published")

    pages.sort(key=lambda page: page["url"])
    records = [{k: page[k] for k in ("url", "md_url", "title", "description", "lastmod")} for page in pages]

    with open(os.path.join(PUBLIC, "pages.json"), "w", encoding="utf-8") as handle:
        json.dump(records, handle, indent=2, ensure_ascii=False)
        handle.write("\n")

    with open(os.path.join(PUBLIC, "pages.yaml"), "w", encoding="utf-8") as handle:
        handle.write("pages:\n")
        for record in records:
            handle.write(f"  - url: {json.dumps(record['url'], ensure_ascii=False)}\n")
            handle.write(f"    md_url: {json.dumps(record['md_url'], ensure_ascii=False)}\n")
            handle.write(f"    title: {json.dumps(record['title'], ensure_ascii=False)}\n")
            handle.write(f"    description: {json.dumps(record['description'], ensure_ascii=False)}\n")
            handle.write(f"    lastmod: {json.dumps(record['lastmod'], ensure_ascii=False)}\n")

    lines = [INTRO.rstrip(), "", "## Pages", ""]
    for record in records:
        lines.append(f"- [{record['title']}]({record['md_url']}): {record['description']}")
    lines.extend([
        "",
        "## Optional",
        "",
        f"- [Full documentation]({BASE}/llms-full.txt)",
        f"- [Page index (JSON)]({BASE}/pages.json)",
        f"- [Page index (YAML)]({BASE}/pages.yaml)",
        f"- [Sitemap]({BASE}/sitemap.xml)",
        "",
    ])
    with open(os.path.join(PUBLIC, "llms.txt"), "w", encoding="utf-8") as handle:
        handle.write("\n".join(lines))

    with open(os.path.join(PUBLIC, "llms-full.txt"), "w", encoding="utf-8") as handle:
        handle.write(f"# Podstack Documentation\n\nConcatenated Markdown for {len(pages)} pages. The HTML page in each url field is canonical.\n\n")
        for page in pages:
            handle.write(page["body"].rstrip())
            handle.write("\n\n")

    sitemap = open(os.path.join(PUBLIC, "sitemap.xml"), encoding="utf-8").read()
    if ".md" in sitemap:
        raise SystemExit("sitemap.xml lists a .md URL")
    if not sitemap.startswith("<?xml"):
        raise SystemExit("sitemap.xml is missing")

    leaf = os.path.join(PUBLIC, "docs/inference/quickstart.md")
    section = os.path.join(PUBLIC, "docs/inference/index.md")
    nested = os.path.join(PUBLIC, "docs/inference/quickstart/index.md")
    for path in (leaf, section):
        if not os.path.isfile(path):
            raise SystemExit(f"expected markdown file missing: {path}")
    if os.path.isfile(nested):
        raise SystemExit("leaf page was left at quickstart/index.md")

    print(f"published {len(pages)} markdown pages ({moved} leaf files moved)")
    print("wrote pages.json, pages.yaml, llms.txt, llms-full.txt")


if __name__ == "__main__":
    try:
        main()
    except BrokenPipeError:
        sys.exit(0)
