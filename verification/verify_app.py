from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        print("Navigating to http://localhost:3000...")
        page.goto("http://localhost:3000")

        # Wait for the hero section to be visible
        print("Waiting for Hero section...")
        page.wait_for_selector('h1:has-text("Polygraphy 2.0")', timeout=10000)
        page.screenshot(path="verification/hero.png")
        print("Hero screenshot captured.")

        # Scroll to Configurator
        print("Scrolling to Configurator...")
        page.evaluate("window.scrollBy(0, window.innerHeight)")
        page.wait_for_timeout(2000) # Wait for scroll and animations

        # Interact with the Configurator
        print("Interacting with Configurator...")
        # Toggle Eyelets
        eyelets_btn = page.locator('button:has-text("Eyelets")')
        if eyelets_btn.is_visible():
            eyelets_btn.click()
            page.wait_for_timeout(1000)

        # Change Material
        glossy_btn = page.get_by_text("Glossy")
        if glossy_btn.is_visible():
            glossy_btn.click()
            page.wait_for_timeout(1000)

        page.screenshot(path="verification/configurator.png")
        print("Configurator screenshot captured.")

        # Scroll to Footer
        print("Scrolling to Footer...")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(1000)

        # Hover over Academy element
        academy_box = page.locator('p:has-text("Bleed & Safe Zones")').first
        if academy_box.is_visible():
            academy_box.hover()
            page.wait_for_timeout(500)
            page.screenshot(path="verification/footer.png")
            print("Footer screenshot captured.")

        browser.close()

if __name__ == "__main__":
    verify_app()
