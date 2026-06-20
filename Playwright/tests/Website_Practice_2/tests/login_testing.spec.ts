import {test, expect} from "@playwright/test"
import {LoginPage} from "../page_objects/login_page"

test("Login By POM", async ({page}) => {
    const login = new LoginPage(page)

    //Right Credentials
    await login.navigate()
    await login.Username_Password_Verifier("qa_testers@qabrains.com", "Password123")

    //Both Wrong
    await login.navigate()
    await login.Username_Password_Verifier("qa_testers@qbrains.com", "Passd123")

    //Missing Password
    await login.navigate()
    await login.Username_Password_Verifier("qa_testers@qabrains.com", "")

    //Missing Username
    await login.navigate()
    await login.Username_Password_Verifier("", "Password123")

    //Right Password, Wrong Email
    //Right Email, Wrong Password
})