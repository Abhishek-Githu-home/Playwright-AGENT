Feature: Amazon-style shopping flow
  As an online shopper
  I want to search for products, manage my cart, and check out
  So that I can complete a purchase end-to-end

  Background:
    Given I am on the Amazon home page

  Scenario: Search for an existing product
    When I search for "headphones"
    Then I should see search results containing "headphones"

  Scenario: Search for a product that does not exist
    When I search for "zzz-nonexistent-product-zzz"
    Then I should see a no results message

  Scenario: Add a product to the cart
    When I open the first product on the home page
    And I add the product to the cart
    Then the added to cart confirmation should be visible
    And the cart badge should show 1 item

  Scenario: Remove a product from the cart
    Given I have added a product to the cart
    When I open the cart
    And I remove the first item from the cart
    Then the cart should be empty

  Scenario: Complete checkout with valid shipping details
    Given I have added a product to the cart
    When I open the cart
    And I proceed to checkout
    And I fill in valid shipping details
    And I place the order
    Then I should see the order confirmation page
    And the order id should be displayed

  Scenario: Checkout fails validation when full name is missing
    Given I have added a product to the cart
    When I open the cart
    And I proceed to checkout
    And I fill in shipping details without a full name
    And I place the order
    Then I should see a full name validation error
