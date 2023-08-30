<template>
  <h1>Login</h1>
</template>

<script>
import { getUserByEmail, setUser } from "@/services/User";

export default {
  async mounted() {
    const user = await getUserByEmail("lucasedbatista@gmail.com");
    setUser(user);
    this.$router.push({ name: "Home" });
  },
};
</script>
