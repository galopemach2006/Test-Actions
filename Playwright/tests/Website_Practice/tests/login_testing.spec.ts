import { test, expect } from "@playwright/test";
import { loginPage } from "../page-objects/login_page";
import login_data from "../test-data/login_data.json"

test.describe("Testing Login", () => {
  let login: loginPage

  test.beforeEach(async ({page}) => {
    login = new loginPage(page)
    await page.goto("https://practice.qabrains.com/")
  })  

  test("Both Correct Credentials", async () => {
    const c = login_data.bothCredentialsCorrect
    await login.email_password(c.email, c.password);
    await expect(login.successHeader).toBeVisible()
  });

  test("Wrong Email", async () => {
    const c = login_data.wrongEmail
    await login.email_password(c.email, c.password);
    await expect(login.wrongEmailError).toBeVisible()
  });

  test("Wrong Password", async () => {
    const c = login_data.wrongPassword
    await login.email_password(c.email, c.password);
    await expect(login.wrongPasswordError).toBeVisible()
  });

  test("Both Wrong Credentials", async () => {
    const c = login_data.bothWrongCredentials
    await login.email_password(c.email, c.password);
    await expect(login.bothCredentialsError).toBeVisible()
  });

  test("Blank Email", async () => {
    const c = login_data.blankEmail
    await login.email_password(c.email, c.password);
    await expect(login.requiredEmail).toBeVisible()
  });

  test("Blank Password", async () => {
    const c = login_data.blankPassword
    await login.email_password(c.email, c.password);
    await expect(login.requiredPassword).toBeVisible()
  });
});
