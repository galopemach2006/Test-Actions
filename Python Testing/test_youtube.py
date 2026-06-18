import re
from playwright.sync_api import Page, expect

def test_youtube_title(page: Page):
    page.goto("https://www.youtube.com")
    expect(page).to_have_title(re.compile("YouTube"))