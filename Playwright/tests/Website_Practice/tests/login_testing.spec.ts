import {test, expect} from "@playwright/test"
import {LoginPage} from "../page_objects/login_page"

test("Both Correct Credentials", async ({page}) => {
    const login = new LoginPage(page)
    await login.navigate()
    await login.bothCredentialsTrue()
})

test("Wrong Email", async ({page}) => {
    const login = new LoginPage(page)
    await login.navigate()
    await login.wrongEmail()
})

test("Wrong Password", async ({page}) => {
    const login = new LoginPage(page)
    await login.navigate()
    await login.wrongPassword()
})

test("Both Wrong Credentials", async ({page}) => {
    const login = new LoginPage(page)
    await login.navigate() 
    await login.bothCredentialsFalse()
})

test("Blank Email", async ({page}) => {
    const login = new LoginPage(page)
    await login.navigate()
    await login.emailBlank()
})

test("Blank Password", async ({page}) => {
    const login = new LoginPage(page)
    await login.navigate()
    await login.passwordBlank()
})