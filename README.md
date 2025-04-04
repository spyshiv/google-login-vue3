# Vue 3 Google Login Component

![Login Demo](https://github.com/spyshiv/google-login-vue3/blob/18073aa38600f5f759933be28f8ead3be0916c4e/src/assets/google-login.gif)

A lightweight and customizable Vue 3 component for Google OAuth 2.0 authentication supports code-based and JWT-based authentication modes.

## Installation

```
npm install google-login-vue3
```

## Usage

**Import the component:**

```vue
<template>
    <GoogleLogin
        :clientId="YOUR_GOOGLE_CLIENT_ID"
        mode="JWT"  // Change to "code" for authorization code flow
        :oneTapLogin="true"  // Only applicable in JWT mode
        @success="handleSuccess"
        @error="handleError"
    />
</template>

<script setup>
import GoogleLogin from 'google-login-vue3';

const handleSuccess = (response) => {
    console.log('Success response:', response);
    if (response.credential) {
        console.log('JWT Token:', response.credential);
        // Use the JWT token for authentication
    } else if (response.code) {
        console.log('Authorization Code:', response.code);
        // Send the code to your backend for token exchange
    }
};

const handleError = (error) => {
    console.error('Google login error:', error);
};
</script>
```

Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google Client ID.

### Reference Doc:

[Get your Google API client ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)

## Authentication Modes

### 1. **JWT-Based Authentication (ID Token Flow)** (Default Mode)

- Google directly issues a JWT (ID token) to the front end.

- No backend exchange is needed unless further validation is required.

- Suitable for apps that only need identity verification.

- Uses Google Identity Services (`g_id_signin`).

- Supports **Google One Tap login** (`oneTapLogin` prop).

### 2. **Code-Based Authentication (Authorization Code Flow)**

- The front end requests an authorization code from Google.

- This code must be sent to the backend for exchange with access and refresh tokens.

- Used in traditional OAuth 2.0 authentication.

- Requires a backend implementation to manage tokens securely.

### Handle the success and error events:

- The `success` event provides either:

  - `{ credential: <JWT Token> }` in JWT mode.

  - `{ code: <Authorization Code> }` in code mode.

- The `error` event provides information about any login failures.

## Props

- `clientId` (String, required): Your Google OAuth Client ID.

- `mode` (String, default: "JWT"): Either "JWT" or "code".

- `oneTapLogin` (Boolean, default: `true`): Enables Google One Tap login (applicable in JWT mode only).

## Customization

- The component renders Google’s default Sign-In button in JWT mode.

- You can customize the button appearance using the default slot in code mode.

## Backend Integration (For Code-Based Flow)

- If using `mode="code"`, the authorization code must be sent to the backend.

- The backend should exchange the code for access and refresh tokens using Google's OAuth 2.0 API.

- Refer to the Google OAuth 2.0 documentation for detailed backend integration.

## Important Notes

- Ensure that your Google Cloud Console project is configured correctly with allowed JavaScript origins and redirect URIs.

- The user must allow popups for the Google login to work.

- Implement robust error handling for production use.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bug reports or feature requests.

## License

MIT

## Author

Shiv Baran Singh [spyshiv@gmail.com](mailto:spyshiv@gmail.com)
