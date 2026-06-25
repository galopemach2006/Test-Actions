import {test, expect} from "@playwright/test"
import {products} from "../page-objects/product_visibility"

test.describe("Product Testing", () => {
    let p : products
    
    test.beforeEach(async ({page}) => {
        p = new products(page)
        await page.goto("https://www.saucedemo.com/")
        await p.productNameVerifier()
    })

    test.afterEach(async () => {
        console.log("Testing Complete")
    })

    test("Product Verifier 001 - Sees Product Name after Valid Login", async () => {
        const v = await p.productVisibility(p.productNameLocator)
        expect(v).toEqual(6)
    })

    test("Product Verifier 002 - Sees Product Description after Valid Login", async () => {
        const v = await p.productVisibility(p.productDescriptionLocator)
        expect(v).toEqual(6)
    })

    test("Product Verifier 003 - Sees Product Price after Valid Login", async () => {
        const v = await p.productVisibility(p.productPriceLocator)
        expect(v).toEqual(6)
    })

    test("Product Verifier 004 - Sees Product Image after Valid Login", async () => {
        const v = await p.productVisibility(p.productImageLocator)
        expect(v).toEqual(12)
    })

    test("Product Verifier 5 - Six products can be added to cart and displays accurate no. of items.", async ({page}) => {
        await p.productButton.first().waitFor()
        const b = await p.productButton.all()
        let no_of_remove = 0 

        for(const button of b) {
            await button.click()
            await page.waitForTimeout(1000)
            no_of_remove++
        }

        expect(p.addToCartBadge).toHaveText("6")
    })
})