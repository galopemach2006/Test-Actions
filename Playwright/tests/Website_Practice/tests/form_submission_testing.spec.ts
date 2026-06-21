import { test, expect } from "@playwright/test";
import { forms } from "../page-objects/form_submission";
import forms_data from "../test-data/forms_data.json"

test.describe("Submission Forms Testing", () => {
  let f: forms  
  const data = forms_data.completeData
  const bData = forms_data.blankData
  const iData = forms_data.invalidData

  test.beforeEach(async ({page}) => {
    f = new forms(page)
    await f.navigate();
  })

  test("Complete Information", async () => {
    await f.placeholderInformation(data.name, data.email, data.contactNo, data.date, data.uploadFile);
    await f.radioButtonCheck(data.color);
    await f.locatorInformation(data.checkbox, data.country);
    await f.completeInformation();
  });

  test("Blank Information", async () => {
    await f.submitForm();
    await f.blankInformation();
  });

  test("Email Verification - Invalid Format", async () => {
    await f.placeholderInformation(data.name, iData.invalidEmail2, data.contactNo, data.date, data.uploadFile);
    await f.radioButtonCheck(data.color);
    await f.locatorInformation(data.checkbox, data.country);
    await f.emailInvalidFormat(`Please include an '@' in the email address. '${iData.invalidEmail2}' is missing an '@'.`);
  });

  test("Email Verification - Blank Email", async () => {
    await f.placeholderInformation(data.name, bData.email, data.contactNo, data.date, data.uploadFile);
    await f.radioButtonCheck(data.color);
    await f.locatorInformation(data.checkbox, data.country);
    await f.noEmail();
  })

  test("Email Verification - Invalid Email", async () => {
    await f.placeholderInformation(data.name, iData.invalidEmail1, data.contactNo, data.date, data.uploadFile);
    await f.radioButtonCheck(data.color);
    await f.locatorInformation(data.checkbox, data.country);
    await f.emailInvalidFormat(`Please include an '@' in the email address. '${iData.invalidEmail1}' is missing an '@'.`);
  });
});
