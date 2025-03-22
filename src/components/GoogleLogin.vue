<template>
  <div @click="handleLogin" :style="props.buttonStyles">
    <slot>
      <img :src="googleLogo" alt="Google Logo" :style="props.logoStyles" />
      <span>Sign in with Google</span>
    </slot>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import googleLogo from "../assets/google-logo.png";

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
  buttonStyles: {
    type: Object,
    default: () => ({
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      padding: "10px 20px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    }),
  },
  logoStyles: {
    type: Object,
    default: () => ({
      width: "20px",
      height: "20px",
      marginRight: "10px",
    }),
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
});
</script>
