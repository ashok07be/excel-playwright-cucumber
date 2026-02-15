Feature: SauceDemo Login Tests

  Scenario: Login with valid credentials
    Given I navigate to "https://www.saucedemo.com/"
    When I fill in the "username" with "standard_user"
    And I fill in the "password" with "secret_sauce"
    And I click on the "loginButton"
    Then I should see the "productTitle"

  Scenario: Login with invalid credentials
    Given I navigate to "https://www.saucedemo.com/"
    When I fill in the "username" with "invalid_user"
    And I fill in the "password" with "invalid_pass"
    And I click on the "loginButton"
    Then I should see the "errorMessage" message