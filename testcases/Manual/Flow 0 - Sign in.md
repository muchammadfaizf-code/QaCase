# Test Cases: Flow 0 - Sign In

This document outlines the manual test scenarios for **Flow 0 - Sign in**

---

## 1. Test Suite Summary

* **Suite ID:** TS_AUTH_00
* **Suite Name:** Authentication & Initial Sync
* **Objective:** Validate tenant lookup, Microsoft SSO, user profile retrieval, master data sync with progress bar, app restart prompt, and offline setup handling.

---

## 2. Manual Test Cases

### TC_AUTH_001: Successful Sign-In with Valid Tenant & Master Data Sync
* **Category:** Functional (Positive)
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * User has an active account linked to a valid tenant.
  * Device has a stable internet connection.
  * App is installed with no cached session.
* **Test Steps:**
  1. Open WeMine (Mobile/Web).
  2. Enter valid `Username` in username field.
  3. Tap/Click **Next**.
  4. Inspect network request to `/user/who`.
  5. Enter valid password on Microsoft SSO screen.
  6. Observe `/user/me` call.
  7. Observe `/tenant/master` call.
  8. Observe sequential master data fetch (locations, sublocations, areas, employees, forms) & progress bar.
  9. Verify restart prompt upon completion.
* **Expected Result:**
  * `/user/who` returns `200 OK` with valid tenant info.
  * App redirects to Microsoft login page.
  * Microsoft SSO authenticates successfully.
  * `/user/me` fetches user profile.
  * `/tenant/master` returns endpoints list.
  * Progress bar updates dynamically (0–100%).
  * Dialog appears: *"Please restart the app to finalize master data update."*

---

### TC_AUTH_002: Master Data Sync Interruption & Recovery
* **Category:** Edge Case / Recovery
* **Priority:** P1 (High)
* **Pre-conditions:**
  * User is in the middle of step 7 (Master data download progress bar active).
* **Test Steps:**
  1. Start initial login process.
  2. Turn off internet connection mid-way through downloading master data.
  3. Turn internet connection back on.
  4. Tap **Retry** button on error dialog.
* **Expected Result:**
  * App displays network error alert when connection is dropped.
  * App provides **Retry** option without redirecting back to step 1.
  * Sync resumes/restarts and completes successfully once network is restored.

---

### TC_AUTH_003: Sign-In with Non-Existent / Invalid Username
* **Category:** Functional (Negative)
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * Device connected to active network.
  * App opened on initial Sign-In screen.
* **Test Steps:**
  1. Enter non-existent `Username` (e.g., `invalid_user_99`).
  2. Tap/Click **Next**.
* **Expected Result:**
  * `/user/who` returns error response (e.g., `404 Not Found`).
  * App shows inline error: *"Username or tenant not found."*
  * User is NOT redirected to Microsoft SSO screen.

---

### TC_AUTH_004: Invalid Password on Microsoft SSO
* **Category:** Functional (Negative)
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * Valid username entered in WeMine.
  * App redirected to Microsoft SSO screen.
* **Test Steps:**
  1. Enter wrong password on Microsoft login screen.
  2. Tap **Sign In**.
* **Expected Result:**
  * Microsoft SSO handles authentication failure with standard error message (*"Incorrect password"*).
  * User remains on Microsoft login screen.
  * Access token/session is NOT returned to WeMine.

---

### TC_AUTH_005: App Restart Post-Master Data Sync
* **Category:** Functional (Positive)
* **Priority:** P1 (High)
* **Pre-conditions:**
  * TC_AUTH_001 completed successfully.
  * Restart prompt dialog is visible on screen.
* **Test Steps:**
  1. Tap **Restart Now** on the prompt dialog.
  2. Re-open/launch the app.
* **Expected Result:**
  * App closes/reloads successfully.
  * Main dashboard opens directly without asking for credentials again.
  * All offline master data (locations, areas, dynamic forms) is cached and accessible.

---

### TC_AUTH_006: First-Time Login Attempt with No Internet
* **Category:** Boundary / Offline
* **Priority:** P1 (High)
* **Pre-conditions:**
  * App freshly installed (no local cache).
  * Device set to Airplane Mode / No internet.
* **Test Steps:**
  1. Open app.
  2. Enter valid `Username`.
  3. Tap **Next**.
* **Expected Result:**
  * App immediately detects no connectivity.
  * Displays user-friendly message: *"Internet connection required for initial sign-in."*
  * `/user/who` request is blocked gracefully.

---

### TC_AUTH_007: Subsequent Launch in Offline Mode (Cached Session)
* **Category:** Offline Characteristic
* **Priority:** P0 (Critical)
* **Pre-conditions:**
  * User previously signed in and completed master data sync.
  * Device set to Airplane Mode / Offline.
* **Test Steps:**
  1. Launch WeMine app.
  2. Verify main dashboard and features.
* **Expected Result:**
  * App bypasses login using valid offline session token.
  * User can access dynamic forms, locations, and record activities offline.

---

### TC_AUTH_008: Progress Bar UI & Endpoint Sequential Load Verification
* **Category:** UI / UX
* **Priority:** P2 (Medium)
* **Pre-conditions:**
  * Valid user initiating first-time login.
* **Test Steps:**
  1. Proceed through Microsoft SSO.
  2. Watch the progress bar during step 7.
  3. Compare UI progress indicators against API network logs for each endpoint (`locations`, `sublocations`, `areas`, `employees`, `forms`).
* **Expected Result:**
  * Progress bar advances smoothly without freezing.
  * Label text accurately reflects current loading stage (e.g., *"Downloading Forms..."*).
  * Reaches 100% prior to displaying restart prompt.

---

## 3. API Sequence Trace Checklist

* **Step 1:** Tenant Lookup
  * **Endpoint:** `POST /user/who`
  * **Expected Code:** `200 OK`
* **Step 2:** Microsoft SSO Authentication
  * **Endpoint:** OAuth2 Provider
  * **Expected Code:** `200 OK` / Token
* **Step 3:** User Profile Fetch
  * **Endpoint:** `GET /user/me`
  * **Expected Code:** `200 OK`
* **Step 4:** Master Data Endpoint List
  * **Endpoint:** `GET /tenant/master`
  * **Expected Code:** `200 OK`
* **Step 5:** Master Sync Sub-Requests
  * **Endpoint:** Dynamic Endpoints (`/locations`, `/forms`, etc.)
  * **Expected Code:** `200 OK`