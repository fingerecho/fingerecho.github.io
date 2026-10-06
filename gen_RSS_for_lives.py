#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
from datetime import datetime
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom

LIVE_DIR = "lives"
INDEX_FILE = os.path.join(LIVE_DIR, "index.html")
OUTPUT_FILE = os.path.join(LIVE_DIR, "rss.xml")
BASE_URL = "https://fingerecho.com"

def parse_index():
    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    entries = []
    tbody_match = re.search(r"<tbody>(.*?)</tbody>", content, re.DOTALL)
    if tbody_match:
        tbody = tbody_match.group(1)
        rows = re.findall(r"<tr><td>[^<]*</td><td><a href=\"([^\"]+)\"[^>]*alt=\"([^\"]*)\"[^>]*>([^<]+)</a></td><td>([^<]*)</td></tr>", tbody)
        for href, alt_text, title, date_str in rows:
            if href == "index.html":
                continue
            if href.startswith("http"):
                link = href
            else:
                clean_href = href.lstrip("./")
                link = f"{BASE_URL}/lives/{clean_href}"
            entries.append({
                "title": title.strip(),
                "link": link,
                "date_str": date_str.strip(),
                "filename": href,
                "description": alt_text.strip()
            })
    return entries

def parse_date(date_str):
    date_str = date_str.replace("/", "-")
    if "before" in date_str.lower():
        return datetime(2019, 11, 28)
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        try:
            return datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            return datetime.now()

def generate_rss(entries):
    rss = Element("rss", version="2.0", attrib={
        "xmlns:atom": "http://www.w3.org/2005/Atom",
        "xmlns:content": "http://purl.org/rss/1.0/modules/content/"
    })
    channel = SubElement(rss, "channel")

    SubElement(channel, "title").text = "FingerEcho Lives"
    SubElement(channel, "link").text = f"{BASE_URL}/lives/"
    SubElement(channel, "description").text = "FingerEcho 生活随笔与技术分享"
    SubElement(channel, "language").text = "zh-CN"
    SubElement(channel, "lastBuildDate").text = datetime.now().strftime("%a, %d %b %Y %H:%M:%S %z")
    SubElement(channel, "generator").text = "gen_RSS_for_lives.py"

    atom_link = SubElement(channel, "atom:link", href=f"{BASE_URL}/lives/rss.xml", rel="self", type="application/rss+xml")

    for entry in entries:
        item = SubElement(channel, "item")
        SubElement(item, "title").text = entry["title"]
        SubElement(item, "link").text = entry["link"]
        SubElement(item, "guid", isPermaLink="true").text = entry["link"]
        pub_date = parse_date(entry["date_str"])
        SubElement(item, "pubDate").text = pub_date.strftime("%a, %d %b %Y %H:%M:%S %z")
        SubElement(item, "description").text = entry.get("description", entry["title"])

    rough_string = tostring(rss, encoding="utf-8")
    reparsed = minidom.parseString(rough_string)
    pretty_xml = reparsed.toprettyxml(indent="  ", encoding="utf-8")

    with open(OUTPUT_FILE, "wb") as f:
        f.write(pretty_xml)
    print(f"RSS generated: {OUTPUT_FILE}")

def main():
    entries = parse_index()
    print(f"Found {len(entries)} entries")
    generate_rss(entries)

if __name__ == "__main__":
    main()