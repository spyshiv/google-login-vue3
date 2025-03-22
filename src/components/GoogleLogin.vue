<template>
  <div @click="handleLogin">
    <slot>
      <div class="google-login-button">
        <img
          src="../assets/google-logo.png"
          alt="Google Logo"
          class="google-icon"
        />
        <span>Sign in with Google</span>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  clientId: {
    type: String,
    required: true,
  },
  onSuccess: {
    type: Function,
    default: () => {},
  },
  onError: {
    type: Function,
    default: () => {},
  },
});

const handleLogin = () => {
  if (typeof google === "undefined" || !google.accounts) {
    props.onError({
      message: "Google Sign-In library not loaded.",
    });
    return;
  }

  google.accounts.oauth2
    .initCodeClient({
      client_id: props.clientId,
      scope: "profile email",
      callback: (response) => {
        if (response.error) {
          props.onError(response);
        } else {
          props.onSuccess(response);
        }
      },
    })
    .requestCode();
};

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => {
    // google library loaded
  };
});
</script>

<style scoped>
.google-login-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.google-login-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.google-icon {
  margin-right: 10px;
}

.google-login-button span {
  font-weight: 500;
}
</style>
