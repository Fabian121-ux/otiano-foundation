"""Read-only public-site availability smoke test for GitHub Actions.

A passing result verifies public HTML and one JS bundle; it does not prove
that the latest GitHub commit has been deployed or that private APIs work.
"""
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

ORIGIN = "https://otianofoundation.org/"
ALLOWED_HOSTS = {"otianofoundation.org", "www.otianofoundation.org"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_title = False
        self.title = ""
        self.scripts = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def get(url):
    req = Request(url, headers={"User-Agent": "OFD-GitHub-Public-Smoke/1.0"})
    with urlopen(req, timeout=20) as response:
        resolved_url = response.geturl()
        if urlparse(resolved_url).hostname not in ALLOWED_HOSTS:
            raise RuntimeError("Website unexpectedly redirects to a different domain")
        if response.status != 200:
            raise RuntimeError(f"Unexpected HTTP status: {response.status}")
        return resolved_url, response.read(1_500_000)


def main():
    url, content = get(ORIGIN)
    text = content.decode("utf-8", errors="replace")
    parser = Page()
    parser.feed(text)
    if "Otiano Foundation" not in parser.title:
        raise RuntimeError("Missing expected website title; wrong site or outage")
    bundles = [urljoin(url, src) for src in parser.scripts
               if "/assets/" in src and src.endswith(".js")]
    if not bundles:
        raise RuntimeError("No compiled React/Vite JavaScript asset referenced")
    asset_url, asset = get(bundles[0])
    if not asset:
        raise RuntimeError("Compiled JavaScript asset is empty")
    print("PASS: expected foundation HTML and a linked JS bundle are accessible")
    print(f"Web page: {url}")
    print(f"JS asset: {asset_url}")


if __name__ == "__main__":
    main()
