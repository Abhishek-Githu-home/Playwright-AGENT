# 🎭 Playwright-Agent & MCP

A comprehensive automation testing framework built with Playwright modal Context Protocol Agents (Agent Planner, Agent Generator and Healer) using advanced LLM techniques.

## Overview
Playwright-Agent is a test automation solution that combines the power of **LLM** ,**Playwright** (89.3% JavaScript) with **Gherkin** feature files (10.7%) for readable, maintainable end-to-end testing.

## Language Composition

- **JavaScript**: 89.3% - Core automation logic and test implementation.
- **Gherkin**: 10.7% - Human-readable feature files for BDD scenarios.

## Features

- 🎭 **Playwright AGENT & MCP** - Modern browser automation with LLM assistance of Agent Planner, Agent Generator and Agent Healer
- 📋 **BDD Framework** - Gherkin feature files for clear test scenarios
- 🤖 **LLM-Based Architecture** - Intelligent LLM interaction for test execution and reporting
- 📊 **Test Reporting** - Detailed execution reports and logs
- ⚡ **Fast Execution** - Parallel test execution capabilities

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Abhishek-Githu-home/Playwright-AGENT.git

# Navigate to the project
cd Playwright-AGENT

# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific feature file
npm test -- features/yourfeature.feature

# Run with specific browser
npm test -- --browser=chrome
```

## Project Structure

```
Playwright-AGENT/
├── features/          # Gherkin feature files
├── steps/            # Step definitions
├── pages/            # Page Object Models
├── utils/            # Helper utilities
├── config/           # Configuration files
└── reports/          # Test reports
```

## Amazon Automation Suite (POM + BDD/Cucumber + Allure)

A full end-to-end automation project targeting an Amazon-style e-commerce flow, covering search, add-to-cart, and checkout. It is implemented two ways against the **same Page Object Model**:

1. **Playwright Test runner** — plain POM-based specs (`tests/amazon/*.spec.js`).
2. **BDD / Cucumber ("CDD" run)** — Gherkin feature files driven by Cucumber step definitions (`features/amazon-shopping.feature`, `tests/cucumber/steps/amazon.steps.js`).

Both runners report into the same **Allure** results directory, so a single Allure report shows results from both the Playwright suite and the Cucumber suite together.

### ⚠️ Network note

This suite targets a **local Amazon-style demo storefront** (`mock-site/`) instead of the real `amazon.in` / `flipkart.com`. Real Amazon/Flipkart domains are not reachable from network-restricted sandboxes (including the one this suite was originally built and run in), and automating the live production sites can also trip bot/CAPTCHA protections. The demo storefront is a small static site (home, search, product, cart, checkout, confirmation pages) served by a zero-dependency Node server, built with the **same well-known element IDs Amazon itself uses** (`#twotabsearchtextbox`, `#nav-search-submit-button`, `#add-to-cart-button`, `#placeYourOrder1`, etc.), so the POM is realistic and the same code can be pointed at a real site:

```bash
BASE_URL=https://www.amazon.in npm run test:amazon
```

(Selectors would likely need small adjustments for the live DOM, and running against production Amazon should only be done with proper authorization.)

### Project structure

```
mock-site/                     # local Amazon-style demo storefront (server + static pages)
tests/pages/amazon/            # Page Object Model (HomePage, SearchResultsPage, ProductPage,
                                # CartPage, CheckoutPage, ConfirmationPage, AmazonPageManager)
tests/amazon/                  # Playwright Test runner specs (POM-based)
tests/fixtures/amazonTestData.js
features/amazon-shopping.feature   # Gherkin BDD scenarios
tests/cucumber/steps/amazon.steps.js
tests/cucumber/support/        # Cucumber World + hooks (browser lifecycle, screenshot-on-fail)
playwright.amazon.config.js    # Playwright config scoped to the Amazon suite
cucumber.js                    # Cucumber config (feature paths, allure-cucumberjs formatter)
```

### Running it

```bash
npm install

# Playwright Test runner suite (POM)
npm run test:amazon

# Cucumber BDD / "CDD" suite
npm run test:amazon:bdd

# Both suites + combined Allure report (HTML folder + single-file HTML)
npm run test:amazon:all
npm run allure:open                    # opens allure-report/ (multi-page)
# or just open allure-report-single-file/index.html directly in a browser
```

Both suites can also be started independently against the mock storefront with `npm run mock:start` if you want the server running in a separate terminal.

### Reporting

- `allure-playwright` captures results from the Playwright Test runner suite.
- `allure-cucumberjs` captures results from the Cucumber suite, including a screenshot attached to any failed scenario (see `tests/cucumber/support/hooks.js`).
- Both write into `./allure-results`, so `npm run allure:generate` produces one combined report covering everything.

## Repository Information

- **Owner**: [@Abhishek-Githu-home](https://github.com/Abhishek-Githu-home)
- **Default Branch**: Main
- **Repository URL**: https://github.com/Abhishek-Githu-home/Playwright-AGENT

## Features Enabled

✅ Issues
✅ Pull Requests
✅ Projects
✅ Wiki
✅ Downloads
✅ Discussions (available)

## Contribution Guidelines

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For issues, questions, or suggestions, please use the [Issues](https://github.com/Abhishek-Githu-home/Playwright-AGENT/issues) section of this repository.
