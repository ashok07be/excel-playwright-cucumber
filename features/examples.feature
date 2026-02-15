Feature: Example Scenarios for Dynamic Testing

  Scenario: Navigate to a URL and perform actions
    Given I navigate to "https://example.com"
    When I fill in the "username" with "testuser"
    And I fill in the "password" with "password123"
    And I click on the "loginButton"
    Then I should see the "welcomeMessage"

  Scenario: Select an option from a dropdown
    Given I navigate to "https://example.com"
    When I select "option1" from the "dropdownMenu"
    Then I should see the "selectionConfirmation" message

  Scenario: Verify element visibility
    Given I navigate to "https://example.com"
    When I click on the "toggleButton"
    Then the "hiddenElement" should be visible

  Scenario: Fill a form and submit
    Given I navigate to "https://example.com/form"
    When I fill in the "firstName" with "John"
    And I fill in the "lastName" with "Doe"
    And I click on the "submitButton"
    Then I should see the "submissionSuccess" message