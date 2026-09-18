#!/usr/bin/env python3
"""Regenerate sitemap.xml from the pages on disk. Run after adding or removing a page:
    python3 build_sitemap.py
"""
import glob, os, datetime
SITE = "https://www.treasurevalleymentalhealth.com/"
PRIORITY = {"": "1.0", "services": "0.9", "team": "0.9", "contact": "0.9", "fees": "0.8"}
today = datetime.date.today().isoformat()
paths = [""] + sorted(d for d in os.listdir(".") if os.path.isfile(os.path.join(d, "index.html")))
rows = []
for p in paths:
    loc = SITE + (p + "/" if p else "")
    pri = PRIORITY.get(p, "0.8" if p.endswith("-boise") or p.endswith("-idaho") else "0.7")
    rows.append(f"  <url><loc>{loc}</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>{pri}</priority></url>")
xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(rows) + "\n</urlset>\n"
open("sitemap.xml", "w").write(xml)
print(f"sitemap.xml: {len(rows)} pages")
