import { Page, expect, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly successHeader: Locator;
    readonly button: Locator;
    readonly bothCredentialsError: Locator;
    readonly wrongEmailError: Locator;
    readonly wrongPasswordError: Locator;
    readonly requiredUsername: Locator;
    readonly requiredPassword: Locator;

    constructor(page : Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder("eg. user@user.com")
        this.passwordInput = page.getByPlaceholder("*******")
        this.successHeader = page.getByRole('heading', {name: "Login Successful"})
        this.button = page.getByRole('button', {name: "Login"})
        this.bothCredentialsError = page.getByText("Your email and password both are invalid!")
        this.wrongEmailError = page.getByText("Your email is invalid!")
        this.wrongPasswordError = page.getByText("Your password is invalid!")
        this.requiredUsername = page.getByText("Email is a required field")
        this.requiredPassword = page.getByText("Password is a required field")
    }

    async navigate() {
        await this.page.goto("https://practice.qabrains.com/")
    }

    async username_password_verifier(username : string, password : string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.button.click()

        if (username == "qa_testers@qabrains.com" && password == "Password123") {
            console.log("Right Credentials")
            await expect(this.successHeader).toBeVisible({timeout: 5000})
        } else if(username == "qa_testers@qabrains" && password == "Password123") {
            console.log("Wrong Email, Right Password")
            await expect(this.wrongEmailError).toBeVisible
            await expect(this.successHeader).toBeHidden() 
        } else if(username == "qa_testers@qabrains.com" && password == "Password") {
            console.log("Right Email, Wrong Password")
            await expect(this.wrongPasswordError).toBeVisible()
            await expect(this.successHeader).toBeHidden() 
        }  else {
            console.log("Both Wrong Credentials")
            await expect(this.successHeader).toBeHidden()
            await expect(this.bothCredentialsError).toBeVisible()
        }
        await this.page.waitForTimeout(1000)
    }

    async username_password_blank(username : string, password: string) {
       await this.usernameInput.fill(username)
       await this.passwordInput.fill(password)
       await this.button.click()

       if (username == "" && password == "Password123") {
            console.log("Missing Email")
            await expect(this.requiredUsername).toBeVisible()
            await expect(this.successHeader).toBeHidden()
       } else if (username == "qa_testers@qabrains.com" && password == "") {
            console.log("Missing Password")
            await expect(this.requiredPassword).toBeVisible()
            await expect(this.successHeader).toBeHidden()
       }
    }

}