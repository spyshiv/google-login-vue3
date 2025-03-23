# Vue 3 Google Login Component

A lightweight and customizable Vue 3 component for Google OAuth 2.0 code-based authentication.

## Installation

```
npm install google-login-vue3
```

## Usage

**Import the component:**

    <template>
        <GoogleLogin
            :clientId="YOUR_GOOGLE_CLIENT_ID"
            @success="handleSuccess"
            @error="handleError"
        />
    </template>

    <script setup>
    import GoogleLogin from 'google-login-vue3';

    const handleSuccess = (response) => {
        const { code } = response;
        console.log('code:', code);
        // Send 'code' to your backend for verification
    };

    const handleError = (error) => {
        console.error('Google login error:', error);
    };
    </script>

Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google Client ID.

### Handle the success and error events:

- The `success` event provides the Google authorization code, which you need to send to your backend for verification and token exchange.

- The `error` event provides information about any errors that occurred during the login process.

## Customization

- You can customize the button appearance by using the default slot.

- The component includes default styling, but you can override it or extend it with your own CSS.

## Backend Integration

- After receiving the authorization code from the `success` event, you need to send it to your backend.

- Your backend should then exchange the code for access and refresh tokens using Google's OAuth 2.0 API.

- Refer to the Google OAuth 2.0 documentation for detailed instructions on backend integration.

## Important Notes

- Ensure that you have configured the allowed JavaScript origins and redirect URIs in your Google Cloud Console project.

- The user must allow popups for the Google login to work.

- Implement robust error handling for production use.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bug reports or feature requests.

## License

MIT

## Author

Shiv Baran Singh [spyshiv@gmail.com](mailto:spyshiv@gmail.com)
