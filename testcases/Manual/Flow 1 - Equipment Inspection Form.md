# Test Cases: Flow 1 - Equipment Inspection Form

This document outlines the manual test scenarios for **Flow 1 - Equipment Inspection Form** based on the [WeMine Project Specifications](https://github.com/WinterBTech/QaCase/blob/main/case.md).

---

## 1. Test Suite Summary

* **Suite ID:** TS_INSPECTION_01
* **Suite Name:** Equipment Inspection & Dynamic Form Builder
* **Objective:** Validate dynamic form generation (up to 50 field limits supporting various input types), submission history views, redirection workflows, and mandatory field requirements within WeMineOffice/WeMine.

---

## 2. Manual Test Cases

### TC_INSPECT_001: Successful Navigation to Equipment Inspection and Previous Submissions View
* **Category:** Functional (Positive)
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * User is logged into the WeMine application.
  * Master data and inspection modules are fully synced.
* **Test Steps:**
  1. Open the WeMine main navigation menu.
  2. Tap/Click on **Equipment Inspection**.
  3. Observe the landing view and check the list of historical submissions.
  4. Tap the **+ New Submission** or redirection button.
* **Expected Result:**
  * The historical submissions list loads successfully with proper pagination/timestamps.
  * The user is cleanly redirected to the new inspection submission form page.

---

### TC_INSPECT_002: Dynamic Form Rendering with All Supported Field Types (Up to 50 Fields)
* **Category:** Functional / UI
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * Administrator has configured a dynamic inspection form via the web form builder containing all 5 supported field types.
* **Test Steps:**
  1. Navigate to the new equipment inspection form.
  2. Select a valid **Form Code**.
  3. Observe the dynamically rendered fields corresponding to the Form Code configuration:
     * **Input Text** (e.g., serial numbers, remarks)
     * **Input Date Picker** (e.g., inspection date)
     * **Input Select** (dropdown choices)
     * **Input Radio** (up to four options)
     * **Image Picker** (evidence/photo upload)
  4. Fill out each field type with valid test data.
* **Expected Result:**
  * Dynamic form renders all configured fields smoothly up to the 50-field threshold without layout breaking or performance lag.
  * Each field type accepts correct user input (text entry, date selection, dropdown item selection, single radio option out of four, and image attachment).

---

### TC_INSPECT_003: Mandatory vs. Optional Field Validation on Dynamic Forms
* **Category:** Functional (Negative)
* **Priority:** P1 (High)
* **Pre-conditions:**
  * User is on the dynamic equipment inspection submission form.
* **Test Steps:**
  1. Leave mandatory dynamic fields (e.g., Form Code, required inspection check items) empty.
  2. Attempt to tap **Submit**.
  3. Fill out required fields while leaving optional text fields blank, then submit.
* **Expected Result:**
  * Form submission is blocked when mandatory fields are omitted, displaying inline validation error highlights.
  * Form submits successfully when all mandatory requirements are fulfilled, regardless of empty optional text fields.

---

### TC_INSPECT_004: Radio Button Constraint Verification (Max Four Options)
* **Category:** UI / Boundary
* **Priority:** P2 (Medium)
* **Pre-conditions:**
  * Form builder has configured Radio field inputs.
* **Test Steps:**
  1. Locate an **Input Radio** field component on the inspection form.
  2. Count the available selection choices.
  3. Select an option and switch to another option.
* **Expected Result:**
  * Radio fields strictly enforce a maximum of four options as per specification.
  * Only one radio option can be selected at a time within each radio group.

---

### TC_INSPECT_005: Image Picker Attachment & Preview
* **Category:** Functional / UX
* **Priority:** P1 (High)
* **Pre-conditions:**
  * User is filling out an inspection form containing an **Image Picker** field.
* **Test Steps:**
  1. Tap the **Image Picker** field.
  2. Select an image from local device storage or capture a photo using the camera.
  3. Verify thumbnail preview.
  4. Remove or replace the attached image.
* **Expected Result:**
  * Image is uploaded/attached correctly with a clear thumbnail preview.
  * Replacement or deletion of the image updates the form state instantly.

---

## 3. Workflow Verification Checklist

* **Step 1: Module Entry**
  * **Action:** Navigate to **Equipment Inspection**.
  * **Expected:** View previous submissions list and click button to open new submission form.
* **Step 2: Dynamic Form Generation**
  * **Action:** Enter **Form Code**.
  * **Expected:** Form dynamically builds fields (Text, Date Picker, Select, Radio up to 4 options, Image Picker) up to 50 field limits.
* **Step 3: Submission & Offline Caching**
  * **Action:** Complete form data and submit (online or offline).
  * **Expected:** Submission queues or saves successfully, appending to the historical submissions log.