<template>
  <div class="google-login-container">
    <GoogleLogin
      clientId="ADD_YOUR_GOOGLE_CLIENT_ID"
      @success="handleSuccess"
      @error="handleError"
    />
  </div>
</template>

<script setup>
import GoogleLogin from "./components/GoogleLogin.vue";

const handleSuccess = (response) => {
  console.log("Google login Success:", response);
  const { credential } = response;
  console.log("credential:", credential); // send 'credential' to backend for verification
  /* for mode 'code'
    const { code } = response;
    console.log("code:", code); // send 'code' to backend for verification
  */
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
  height: 100vh;
}
</style>
