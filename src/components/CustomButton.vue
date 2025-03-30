<template>
  <div :style="props.buttonStyles">
    <img :src="googleLogo" alt="Google Logo" :style="props.logoStyles" />
    <span>Sign in with Google</span>
  </div>
</template>

<script setup>
import googleLogo from "../assets/google-logo.png";

const props = defineProps({
  buttonStyles: {
    type: Object,
    default: () => ({
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      padding: "10px 20px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
    })
  },
  logoStyles: {
    type: Object,
    default: () => ({
      width: "20px",
      height: "20px",
      marginRight: "10px"
    })
  }
});
</script>
