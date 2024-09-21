const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

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

test("UI Controls", async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    //await page.pause();
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test('@Child windows hadl', async ({browser})=> {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([context.waitForEvent('page'), documentLink.click()])

    const text = await newPage.locator(".red").textContent();
    console.log(text)
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());
})