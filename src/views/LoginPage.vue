<template>
  <div class="container">
    <h1>Login</h1>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="urlHelp"
          placeholder="Enter your email"
          v-model="email"
        />
        <button class="btn btn-danger mt-3" @click="login" :disabled="loading">Login</button>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import { getUserByEmail, setUser, createUser } from "@/services/User";

export default {
  data() {
    return {
      loading: false,
      email: ""
    }
  },
  methods: {
    async login() {
      this.loading = true;
      const user = await getUserByEmail(this.email);

      if (user) {
        setUser(user);
        this.$router.push({ name: "Home" });
      } else {
        await createUser({email: this.email});
        localStorage.setItem('tutorial', "firstVideo");
        this.$router.push({ name: "VideoRegister" });
      }
    }
  }
};
</script>

<style scoped>
h1, .form-label {
  color: white;
}
.btn-danger {
  background-color: transparent;
}
</style>