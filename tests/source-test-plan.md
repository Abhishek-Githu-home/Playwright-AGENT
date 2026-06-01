# Sauce Demo — Manual Test Plan

URL: https://www.saucedemo.com/

Scope
- End-to-end manual test cases covering login scenarios, product browsing, cart/checkout flows, error validation, boundary-value analysis (BVA), UI/accessibility, and stability checks.

Assumptions
- Application is publicly available at the given URL.
- Test accounts per Sauce Demo docs: `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`.
- Payments are simulated / not applicable.

Test Areas
- Login and authentication flows
- Products listing, product cards, sorting
- Add to cart / remove / cart badge
- Checkout: form validation, overview, finish
- Error handling and negative scenarios
- Boundary value checks on form fields
- Accessibility and responsive UI

High-Priority Smoke Scenarios
- Login page loads with Username/Password fields and Login button.
- Login with `standard_user` / `secret_sauce` → Products page visible.
- Add single item to cart → cart badge increments and cart shows item.
- Add multiple items → cart shows all items and badge count correct.
- Remove item → cart updates and badge decrements.
- Checkout happy path: fill name/postal code → Overview → Finish → confirmation.

Detailed Test Cases

1) Login — Valid Credentials
- Steps: Open URL → enter `standard_user` / `secret_sauce` → click Login
- Expect: Navigate to Products page; product list visible.

2) Login — Invalid Credentials
- Steps: Enter wrong username/password → click Login
- Expect: Error message shown with clear text; remain on login page.

3) Login — Locked Out User
- Steps: Enter `locked_out_user` + `secret_sauce` → click Login
- Expect: Locked-out error message displayed; cannot access Products page.

4) Login — Missing Fields
- Steps: Click Login with empty Username and/or Password
- Expect: Validation or error message indicating required fields; user stays on login page.

5) Products — Browse & Card Details
- Steps: Login as `standard_user` → inspect product cards
- Expect: Each card shows name, description, price, image, and Add to cart button.

6) Add to Cart — Single Product
- Steps: Click Add to cart for a product
- Expect: Button toggles to Remove; cart badge shows 1; Cart page lists the product with correct price.

7) Add to Cart — Multiple Products
- Steps: Add three different products
- Expect: Cart badge shows 3; Cart page lists all items with correct prices.

8) Remove Item from Cart
- Steps: From Cart page click Remove for an item
- Expect: Item removed, cart badge decremented, subtotal updated.

9) Checkout — Happy Path
- Steps: Add items, go to Cart → Checkout → Fill First Name, Last Name, Postal Code → Continue → Finish
- Expect: Overview shows items, tax, and total; Finish shows order confirmation (e.g., THANK YOU).

10) Checkout — Missing Fields Validation
- Steps: Click Continue without filling required fields
- Expect: Error messages (e.g., "Error: First Name is required"); cannot proceed until fixed.

11) Checkout — Postal Code BVA
- Steps: Test Postal Code values: empty, 1 char, typical, very long (>50 chars), special characters
- Expect: Appropriate validation or acceptance; no crashes; helpful messages.

12) Product Sorting and Filtering
- Steps: Use sort dropdown (if present) to change order (e.g., price low-high)
- Expect: Products reorder accordingly and UI reflects the selected sort.

13) Problem User Behavior
- Steps: Login as `problem_user` and browse/add to cart
- Expect: Known UI/asset anomalies (broken images/links) per Sauce Demo behavior — document observed issues.

14) Performance Glitch User
- Steps: Login as `performance_glitch_user`
- Expect: Potential delays in loading/operations; verify acceptable timeouts and that operations eventually succeed.

15) Accessibility & UI Checks
- Steps: Resize viewport to desktop/tablet/mobile; navigate using keyboard (Tab/Enter)
- Expect: Layout adapts; controls reachable and operable via keyboard; images include alt text.

16) Security & Input Sanitization
- Steps: Enter long and special-character strings into login and checkout fields
- Expect: Inputs are handled without XSS or client errors; validation errors shown where appropriate.

17) Session & Logout
- Steps: Login and then Logout from the menu
- Expect: User returned to login page; protected pages require login again.

18) Error Handling — Network Failure (simulated)
- Steps: Simulate offline during add-to-cart or checkout (devtools/network)
- Expect: App surfaces a graceful error, preserves state if possible, and allows retry when network returns.

Boundary Value Analysis (BVA) Examples
- Username/Password lengths: 1 char, typical, 256 chars.
- Postal code: empty, 1 char, normal, long (>50 chars), special characters.
- Quantities: Swag Labs uses per-item Add to Cart; exercise adding/removing multiple items to simulate quantity effects.

Test Data Examples
- Users: `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`.
- Password: `secret_sauce`.
- Names and postal codes: normal and edge-case values for BVA.

Pass/Fail Criteria
- Pass: Critical flows (login, add-to-cart, checkout) complete successfully and UI validations behave as specified.
- Fail: Authentication broken, inability to add items to cart, checkout blocked by client errors, or JavaScript errors that prevent flow.

Deliverables
- This manual test plan saved as `tests/source-test-plan.md`.
