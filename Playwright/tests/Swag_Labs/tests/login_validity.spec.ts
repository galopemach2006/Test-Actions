import {test, expect} from "@playwright/test"
import {Login} from "../page-objects/login"
import data from "../test-data/login_data.json"

test.describe("Swag Labs Login", () => {
    let c : Login
    const credentials = data.credentials
    const errorMessages = data.errorLoginMessages

    test.beforeEach(async ({page}) => {
        c = new Login(page)
        await page.goto("https://www.saucedemo.com/")
    })

    test.afterEach(async () => {
        console.log("Testing Complete")
    })
        
    //-------------------Happy Path-------------------------//
    test("Login 001 - Valid Login", async ({page}) => {
        await c.fillLogin(credentials.rightCredentials)
        await expect(page.getByText("Swag Labs")).toBeVisible()
    })

    //-------------------Edge Cases-------------------------//
    test("Login 002 - Invalid Login", async ({page}) => {
        await c.fillLogin(credentials.wrongCredentials)
        await expect(page.getByText(errorMessages.invalidUserPass)).toBeVisible()
    })

    test("Login 003 - Wrong Username", async ({page}) => {
        const wrongUsername = {...credentials.rightCredentials, email: credentials.wrongCredentials.email}
        await c.fillLogin(wrongUsername)
        await expect(page.getByText(errorMessages.invalidUserPass)).toBeVisible()
    })

    test("Login 004 - Wrong Password", async ({page}) => {
        const wrongPassword = {...credentials.rightCredentials, password: credentials.wrongCredentials.password}
        await c.fillLogin(wrongPassword)
        await expect(page.getByText(errorMessages.invalidUserPass)).toBeVisible()
    })

    test("Login 005 - Blank Credentials", async ({page}) => {
        await c.fillLogin(credentials.blank)
        await expect(page.getByText("Epic sadface: Username is required")).toBeVisible()
    })

    test("Login 006 - Blank Username", async ({page}) => {
        const blankUsername = {...credentials.rightCredentials, email: credentials.blank.email}
        await c.fillLogin(blankUsername)
        await expect(page.getByText("Epic sadface: Username is required")).toBeVisible()
    })

    test("Login 007 - Blank Password", async ({page}) => {
        const blankUsername = {...credentials.rightCredentials, password: credentials.blank.password}
        await c.fillLogin(blankUsername)
        await expect(page.getByText("Epic sadface: Password is required")).toBeVisible()
    })

})