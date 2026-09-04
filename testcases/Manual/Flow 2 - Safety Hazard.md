# Test Cases: Flow 2 - Safety Hazard Report

This document outlines the manual test scenarios for **Flow 2 - Safety Hazard Report** 
---

## 1. Test Suite Summary

* **Suite ID:** TS_HAZARD_02
* **Suite Name:** Safety Hazard Reporting & Follow-Up Lifecycle
* **Objective:** Validate end-to-end reporting of safety hazards, dynamic dropdown dependencies, mandatory field validation, notification dispatch to assigned Person In Charge (PIC) & area personnel, offline submission queuing, and the completion of follow-up tasks by the PIC.

---

## 2. Manual Test Cases

### TC_HAZARD_001: Successful Safety Hazard Report Creation (Online)
* **Category:** Functional (Positive)
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * User is logged into the WeMine Mobile App with active network connectivity.
  * Master data (Locations, Sublocations, Areas, Employees) is pre-synced.
* **Test Steps:**
  1. Open the WeMine Mobile App and navigate to the **Hazard** menu.
  2. Tap **Report New Hazard** / **+**.
  3. Select a valid **Location** from the dropdown.
  4. Select a valid **Sublocation** (filtered based on chosen Location).
  5. Select a valid **Area** (filtered based on chosen Sublocation).
  6. Enter optional text in **Area Description** (e.g., *"Near emergency exit door B"*).
  7. Capture or upload an image in **Evidence** (Mandatory).
  8. Observe the **PIC** field.
  9. Submit the form.
* **Expected Result:**
  * **PIC** field is automatically pre-selected to the current reporter.
  * Form submits successfully and returns `200 OK` or `201 Created`.
  * System generates a new hazard entry and automatically creates a corresponding **Follow-up Task**.
  * The assigned PIC receives a push/in-app notification for the follow-up task.
  * All users assigned to that specific **Area** receive a notification regarding the reported hazard.

---

### TC_HAZARD_002: Dynamic Cascading Dropdowns (Location -> Sublocation -> Area)
* **Category:** Functional / UI
* **Priority:** P1 (High)
* **Pre-conditions:**
  * User is on the Hazard Reporting screen.
* **Test Steps:**
  1. Observe the **Sublocation** dropdown before selecting a **Location**.
  2. Select **Location A**.
  3. Expand the **Sublocation** dropdown and observe available options.
  4. Change **Location** to **Location B**.
  5. Expand the **Sublocation** dropdown again.
  6. Select **Sublocation B1** and observe the **Area** dropdown options.
* **Expected Result:**
  * **Sublocation** and **Area** dropdowns are disabled or empty until their parent hierarchy is selected.
  * Changing the parent Location resets and filters child Sublocations dynamically without app crashes or stale options.

---

### TC_HAZARD_003: Mandatory Field Validation on Hazard Submission
* **Category:** Functional (Negative)
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * User is on the Hazard Reporting screen.
* **Test Steps:**
  1. Leave **Location**, **Sublocation**, **Area**, and **Evidence** blank.
  2. Attempt to tap **Submit**.
  3. Fill in Location, Sublocation, and Area, but leave **Evidence** blank.
  4. Attempt to tap **Submit**.
* **Expected Result:**
  * Form submission is blocked.
  * Clear validation error messages appear for required fields (**Location**, **Sublocation**, **Area**, **Evidence**, **PIC**).
  * **Area Description** remains optional and does not block submission when empty.

---

### TC_HAZARD_004: Offline Hazard Report Submission & Sync Queue
* **Category:** Offline / Reliability
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * Master data was cached previously.
  * Device is switched to **Airplane Mode** (No Internet Connection).
* **Test Steps:**
  1. Open WeMine Mobile App.
  2. Go to **Hazard** menu and fill out all required fields (**Location**, **Sublocation**, **Area**, **Evidence**).
  3. Tap **Submit**.
  4. Verify entry in local sync queue / list view.
  5. Re-enable internet connection (Turn off Airplane Mode).
  6. Observe background sync behavior or trigger manual sync.
* **Expected Result:**
  * Form submits locally without throwing error dialogs.
  * Record is stored in local storage marked as "Pending Sync".
  * Once connectivity is restored, the report automatically syncs with the backend.
  * Backend generates the hazard entry, follow-up task, and dispatches notifications after sync.

---

### TC_HAZARD_005: Successful Follow-Up Task Resolution by PIC
* **Category:** Functional (Positive Workflow)
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * A hazard report has been submitted (TC_HAZARD_001).
  * The assigned PIC is logged in and opens the assigned **Follow-up Task**.
* **Test Steps:**
  1. Open the assigned **Follow-up Task** detail screen.
  2. Upload a resolution photo under **Evidence** (Image Picker).
  3. Select a valid date and time under **Resolution Date** (DateTime Picker - Mandatory).
  4. Tap the **(+)** button next to **Co Observer** to add additional observers.
  5. Select valid users for each Co Observer field.
  6. Tap **Submit Resolution**.
* **Expected Result:**
  * The **(+)** button dynamically appends new **Co Observer** select dropdowns.
  * Follow-up task updates to "Completed" / "Resolved" state.
  * Notification is sent to the **Direct Supervisor** of the designated area upon resolution.

---

### TC_HAZARD_006: Co-Observer Dynamic Field Addition & Removal
* **Category:** UI / Boundary
* **Priority:** P2 (Medium)
* **Pre-conditions:**
  * PIC is on the Follow-Up Task resolution screen.
* **Test Steps:**
  1. Tap the **(+)** button on the **Co Observer** section multiple times (e.g., 3 times).
  2. Verify that 3 separate user select dropdowns appear.
  3. Select different observers in each field.
  4. Attempt to select duplicate observers across fields.
  5. If remove/delete buttons exist, remove one Co Observer field.
* **Expected Result:**
  * Additional **Co Observer** fields render cleanly without UI overlaps.
  * Duplicate selections are handled gracefully (either prevented or visually indicated).
  * Removed fields disappear correctly without losing data in other fields.

---

### TC_HAZARD_007: Validation on Follow-Up Task Resolution Fields
* **Category:** Functional (Negative)
* **Priority:** P1 (High)
* **Pre-conditions:**
  * PIC is on the Follow-Up Task resolution screen.
* **Test Steps:**
  1. Leave **Resolution Date** empty.
  2. Attach evidence image and tap **Submit**.
  3. Select a future **Resolution Date** beyond current system time (if restricted by business logic).
* **Expected Result:**
  * Submission fails when mandatory fields (**Resolution Date**) are missing.
  * Validation message appears indicating that Resolution Date is required.

---

## 3. Workflow Verification Checklist

* **Step 1: Hazard Creation**
  * **Inputs:** Location (Req), Sublocation (Req), Area (Req), Area Description (Opt), Evidence (Req), PIC (Pre-selected to Reporter).
  * **Trigger:** Submits report offline or online.
* **Step 2: Task Generation & Notification**
  * **Action:** System creates Hazard Record + Follow-up Task.
  * **Notifications:** Push sent to **PIC** (for task) & **Area Users** (for hazard alert).
* **Step 3: Task Resolution**
  * **Inputs:** Evidence (Img), Resolution Date (DateTime), Co Observers (Dynamic Selects via `+` button).
  * **Action:** PIC completes task.
  * **Notification:** Push sent to **Direct Supervisor** of the area.