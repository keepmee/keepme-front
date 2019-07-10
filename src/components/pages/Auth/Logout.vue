<template>
  <div></div>
</template>

<script>
  export default {
    name: "Logout",

    created() {
      this.cookie.delete(this.$store.getters.COOKIE_NAME)
      this.api.post('/logout', null).then((r) => {
        this.$router.push({ name: 'login' })
      })
    }
  }
</script>

<style scoped>

</style>
