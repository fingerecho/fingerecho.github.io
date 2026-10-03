#!/usr/bin/env python3
"""
生成 sitemap.txt 的简单爬虫

用法:
    python3 gen_sitemap.py https://example.com

依赖:
    pip install requests beautifulsoup4
"""

import sys
import time
from urllib.parse import urljoin, urlparse, urldefrag
from collections import deque

import requests
from bs4 import BeautifulSoup


def is_same_domain(base_netloc, url):
    """判断 URL 是否属于同一域名（忽略 www 前缀差异）"""
    netloc = urlparse(url).netloc.lower()
    base = base_netloc.lower()
    if netloc.startswith("www."):
        netloc = netloc[4:]
    if base.startswith("www."):
        base = base[4:]
    return netloc == base


def normalize(url):
    """去掉 fragment，规范化 URL"""
    url, _ = urldefrag(url)
    return url.rstrip("/") if url.endswith("/") and url.count("/") > 3 else url


def crawl(start_url, output="sitemap.txt", delay=0.3, max_pages=2000):
    parsed = urlparse(start_url)
    if not parsed.scheme:
        start_url = "https://" + start_url
        parsed = urlparse(start_url)

    base_netloc = parsed.netloc
    visited = set()
    queue = deque([normalize(start_url)])
    headers = {"User-Agent": "Mozilla/5.0 (compatible; SitemapGenerator/1.0)"}

    while queue and len(visited) < max_pages:
        url = queue.popleft()
        if url in visited:
            continue
        visited.add(url)

        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code != 200 or "text/html" not in resp.headers.get("Content-Type", ""):
                continue
            soup = BeautifulSoup(resp.text, "html.parser")
        except requests.RequestException as e:
            print(f"[跳过] {url} -> {e}", file=sys.stderr)
            continue

        print(f"[抓取] {url}")
        for a in soup.find_all("a", href=True):
            link = urljoin(url, a["href"])
            link = normalize(link)
            if not link.startswith(("http://", "https://")):
                continue
            if is_same_domain(base_netloc, link) and link not in visited:
                queue.append(link)

        time.sleep(delay)

    with open(output, "w", encoding="utf-8") as f:
        for url in sorted(visited):
            f.write(url + "\n")

    print(f"\n共生成 {len(visited)} 条 URL，已写入 {output}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法: python3 gen_sitemap.py <网站首页URL> [输出文件]")
        sys.exit(1)

    start = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "sitemap.txt"
    crawl(start, out)