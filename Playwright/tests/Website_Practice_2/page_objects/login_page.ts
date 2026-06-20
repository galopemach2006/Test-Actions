import { Page, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    constructor(page : Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("https://practice.qabrains.com/")
    }

    async Username_Password_Verifier(username : string, password : string) {
        const user = await this.page.getByPlaceholder("eg. user@user.com")
        const pass = await this.page.getByPlaceholder("*******")

        await user.fill(username)
        await pass.fill(password)

        await this.page.getByRole('button', {name: "Login"}).click()
        const header = this.page.getByRole('heading', {name: "Login Successful"})
        const both_invalid = this.page.getByText("Your email and password both are invalid!")
        const no_password = this.page.getByText("Password is a required field")
        const no_email = this.page.getByText("Email is a required field")

        if (username == "qa_testers@qabrains.com" && password == "Password123") {
            console.log("Right Credentials")
            await expect(header).toBeVisible({timeout: 5000})
        } else if(username == "qa_testers@qabrains.com" && password == ""){
            console.log("Missing Password")
            await expect(no_password).toBeVisible()
        } else if(username == "" && password == "Password123") {
            console.log("Missing Email")
            await expect(no_email).toBeVisible()
        } else {
            console.log("Both Wrong Credentials")
            await expect(header).toBeHidden()
            await expect(both_invalid).toBeVisible()
        }

        await this.page.waitForTimeout(2000)
    }

}