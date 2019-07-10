<template>
  <div id="login" class="w-100">

    <form id="formLogin" class="w-100" @submit.prevent="login()">

      <div class="row">

        <div class="col-12 col-md-10 col-xl-8 mx-auto">
          <div class="klk-form-group">
            <input type="text" class="form-control" name="email" id="email" v-model="user.email">
            <label :class="{'active': user.email !== null}" for="email"><i class="fal fa-at fa-xs mr-2"></i>
              Adresse email
            </label>
          </div>
        </div>

      </div>

      <div class="row">

        <div class="col-12 col-md-10 col-xl-8 mx-auto">
          <div class="klk-form-group">
            <input type="password" class="form-control" name="password" id="password" v-model="user.password">
            <label :class="{'active': user.password !== null}" for="password"><i class="fal fa-lock fa-xs mr-2"></i>
              Mot de passe
            </label>
          </div>
        </div>

      </div>

      <div class="row">

        <div class="col-12 col-md-10 col-xl-8 mx-auto">

          <div class="klk-custom-checkbox">
            <label class="col-12 px-0 mb-4">
              <input type="checkbox" v-model="user.remember">
              Se souvenir de mes identifiants
            </label>
          </div>

        </div>

      </div>

      <div class="row">
        <div class="col-12 col-md-10 col-xl-8 mx-auto">
          <div class="klk-form-group mb-3">
            <button class="btn bg-color-1 z-depth-0 btn-block" type="submit">Connexion</button>
          </div>
        </div>
      </div>

      <div class="row">
        <hr class="w-25 my-4 my-md-5 border-color-1">
      </div>

      <div class="row">
        <div class="col-12 col-md-10 col-xl-8 mx-auto">
          <div class="klk-form-group">
            <button class="btn border border-color-2 color-2 z-depth-0 btn-block bg-transparent"
                    @click.prevent="goToRegister()">
              Inscription
            </button>
          </div>
        </div>
      </div>

    </form>

  </div>
</template>

<script>

  import sha1 from 'sha1'

  export default {
    name: "Login",

    data() {
      return {
        user: { email: 'sofiane.akbly@gmail.com', password: 'toto', remember: false }
      }
    },

    methods: {

      goToRegister() {
        this.$router.push({ name: 'register' })
      },

      login() {

        let data = JSON.parse(JSON.stringify(this.user))
        data.password = sha1(data.password)

        this.cookie.delete(this.$store.getters.COOKIE_NAME)
        this.cookie.delete(this.$store.getters.COOKIE_NAME + '-user')


        this.api.post('/login', data).then((r) => {
          this.cookie.set(this.$store.getters.COOKIE_NAME, r.data.data.access_token, { expires: parseInt(r.data.data.expires_in / 86400) + 1 })
          this.cookie.set(this.$store.getters.COOKIE_NAME + '-user', btoa(encodeURI(JSON.stringify(r.data.data.user))), { expires: parseInt(r.data.data.expires_in / 86400) + 1 })
          this.$router.push({ name: 'home' })
          location.reload()
        })
      }

    }
  }
</script>

<style scoped>

</style>
