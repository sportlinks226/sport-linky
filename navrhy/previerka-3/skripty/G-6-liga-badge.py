"""G-6: v appke overí štítok LIGA pri tenisových federáciách a EN názvy (Playwright)."""
import os
os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", "/opt/pw-browsers")
from playwright.sync_api import sync_playwright
OUT = "/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/snimky/"
with sync_playwright() as pw:
    b = pw.chromium.launch(args=["--no-sandbox"], executable_path="/opt/pw-browsers/chromium-1243/chrome-linux64/chrome"); p = b.new_page(viewport={"width": 1200, "height": 800})
    for url, name in [("http://127.0.0.1:8123/tenis/asociacie/europa/", "G-1-sk-tenis-europa-liga-stitok"),
                      ("http://127.0.0.1:8124/football/clubs/oceania/australia/", "G-2-en-australia-interny-odkaz"),
                      ("http://127.0.0.1:8124/football/clubs/asia/yemen/jemensk%C3%A1-liga/", "G-3-en-jemen-sk-nazov"),
                      ("http://127.0.0.1:8124/tennis/associations/europe/", "G-4-en-tenis-europa")]:
        p.goto(url, wait_until="networkidle"); p.wait_for_timeout(1500)
        tags = p.eval_on_selector_all(".liga-tag, .lt", "els => els.map(e => (e.closest('.card-link')||e.parentElement).innerText.replace(/\\s+/g,' ').slice(0,80))")
        links = p.eval_on_selector_all(".card-link a[href], a.card-link, .card-link", "els => els.slice(0,5).map(e => (e.getAttribute('href')||e.querySelector('a')?.getAttribute('href'))+' | '+e.innerText.replace(/\\s+/g,' ').slice(0,70))")
        print(name, "| štítky:", tags[:6]); print("   linky:", links)
        p.screenshot(path=OUT + name + ".png")
    b.close()
