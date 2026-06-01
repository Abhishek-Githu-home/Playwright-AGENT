Feature: Sauce Demo shopping and login flows
  As a QA automation user
  I want to validate Sauce Demo login, add-to-cart, and checkout flows
  So that the positive customer journeys are covered with Gherkin scenarios

  Scenario: Standard user login
    Given I open the Sauce Demo login page
    When I login as a standard_user
    Then I should land on the inventory page

  Scenario: Invalid user login
    Given I open the Sauce Demo login page
    When I login with invalid credentials
    Then I should see a login error containing "Epic sadface"

  Scenario: Locked out user login
    Given I open the Sauce Demo login page
    When I login as a locked_out_user
    Then I should see a locked out login error

  Scenario: Problem user login
    Given I open the Sauce Demo login page
    When I login as a problem_user
    Then I should land on the inventory page

  Scenario: Standard user add first product to cart and remove it
    Given I am logged in as a standard_user
    When I add the first product to the cart
    And I open the cart
    Then I should see 1 item in the cart
    When I remove the first item from the cart
    Then I should see 0 items in the cart

  Scenario: Problem user add first product to cart
    Given I am logged in as a problem_user
    When I add the first product to the cart
    And I open the cart
    Then I should see 1 item in the cart

  Scenario: Standard user completes checkout happy path
    Given I am logged in as a standard_user
    And I have added a product to the cart
    When I proceed to checkout
    And I complete checkout with standard user checkout data
    Then I should see the order confirmation page

  Scenario: Checkout validation with missing fields
    Given I am logged in as a standard_user
    And I have added a product to the cart
    When I proceed to checkout
    And I continue without filling checkout fields
    Then I should see a checkout error message
