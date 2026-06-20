import {test, expect} from "@playwright/test"
import {LoginPage} from "../page_objects/login_page"

test("Login By POM", async ({page}) => {
    const login = new LoginPage(page)

    //Right Credentials
    await login.navigate()
    await login.username_password_verifier("qa_testers@qabrains.com", "Password123")

    //Both Wrong
    await login.navigate()
    await login.username_password_verifier("qa_testers@qbrains.com", "Passd123")

    //Wrong Email, Right Password
    await login.navigate()
    await login.username_password_verifier("qa_testers@qabrains.com", "Password123")

    //Right Email, Wrong Password
    await login.navigate()
    await login.username_password_verifier("qa_testers@qabrains.com", "Password")

    //Missing Password
    await login.navigate()
    await login.username_password_blank("qa_testers@qabrains.com", "")
    
    //Missing Email
    await login.navigate()
    await login.username_password_blank("", "Password123")
    
    
})