const { test, expect } = require('@playwright/test');

test("Browser context-Validating Error login", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    await userName.fill(".card-body a")
    await page.locator("[style*='block']").textContent("Incorrect");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    await page.locator(".card-body a").first().textContent();
    await page.locator(".card-body a").nth(1).textContent( );
    let allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});
