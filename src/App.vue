<template>
  <div class="google-login-container">
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      @success="handleSuccess"
      @error="handleError"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import GoogleLogin from "./components/GoogleLogin.vue";

const handleSuccess = (response) => {
  const { code } = response;
  console.log("code:", code);
  // send 'code' to backend for verification
};

const handleError = (error) => {
  console.error("Google login error:", error);
};
</script>

<style scoped>
.google-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Make it full height for centering */
}
</style>
