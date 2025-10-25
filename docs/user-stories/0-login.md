# Login

AS a user
I WANT TO login with my email and password
SO THAT I can access my private data

## Acceptance Criteria

- GIVEN a user is on the home page
  WHEN the user clicks on the login link
  THEN the login page is visible
- GIVEN a user is on the login page
  WHEN the user login is successfull
  THEN the user is redirected to the dashboard page
- GIVEN a user is on the login page
  WHEN the user login is not successfull
  THEN an error message is shown
- GIVEN a user is not authenticated
  WHEN the user navigates to a protected page
  THEN the user is redirected to the login page

## Data Models

```ts
interface User {
  id: string;
  email: string;
  password: string;
}
```
