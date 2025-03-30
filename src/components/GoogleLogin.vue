<template>
  <div class="g_id_signin" v-if="props.mode === 'JWT'"></div>
  <div v-else @click="handleLogin">
    <slot>
      <CustomButton />
    </slot>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted } from "vue";
const CustomButton = defineAsyncComponent(() => import("./CustomButton.vue"));

const props = defineProps({
  clientId: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    default: "JWT",
    validator: (value) => ["code", "JWT"].includes(value)
  },
  oneTapLogin: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["success", "error"]);

const handleLogin = () => {
  if (props.mode === "code") {
    window.google.accounts.oauth2
      .initCodeClient({
        client_id: props.clientId,
        scope: "profile email",
        callback: (response) => {
          if (response.error) {
            emit("error", response);
          } else {
            emit("success", response);
          }
        }
      })
      .requestCode();
  }
};

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;

  script.onload = () => {
    if (props.mode === "JWT") {
      window.google.accounts.id.initialize({
        client_id: props.clientId,
        callback: (response) => {
          if (response.credential) {
            emit("success", { credential: response.credential });
          } else {
            emit("error", response);
          }
        },
        auto_select: false
      });
      window.google.accounts.id.renderButton(
        document.querySelector(".g_id_signin"),
        { theme: "outline", size: "large" }
      );
      if (props.oneTapLogin) {
        window.google.accounts.id.prompt();
      }
    }
  };
  document.head.appendChild(script);
});
</script>
