<template>
  <div class="col-12 col-lg-10 col-xl-9 px-0 mx-auto">
    <form id="formRegister" class="w-100" @submit.prevent="register()">

      <div class="row">

        <div class="col-12 col-lg-6 mx-auto">
          <div class="klk-form-group mb-3">
            <input type="text" class="form-control" name="lastname" id="lastname" v-model="user.lastname"
                   :class="{'is-invalid': errors.lastname}">
            <label :class="{'active': user.lastname !== null}" for="lastname">
              <i class="fal fa-user fa-xs mr-2"></i>Nom
            </label>
          </div>
        </div>

        <div class="col-12 col-lg-6 mx-auto">
          <div class="klk-form-group mb-3">
            <input type="text" class="form-control" name="firstname" id="firstname" v-model="user.firstname"
                   :class="{'is-invalid': errors.firstname}">
            <label :class="{'active': user.firstname !== null}" for="firstname">
              <i class="fal fa-user fa-xs mr-2"></i>Prénom
            </label>
          </div>
        </div>

      </div>


      <div class="row">

        <div class="col-12 mx-auto">
          <div class="klk-form-group mb-3">
            <input type="text" class="form-control" name="email" id="email" v-model="user.email"
                   :class="{'is-invalid': errors.email}">
            <label :class="{'active': user.email !== null}" for="email">
              <i class="fal fa-at fa-xs mr-2"></i>Adresse email
            </label>
          </div>
        </div>

      </div>

      <div class="row">

        <div class="col-12 mx-auto">
          <div class="klk-form-group mb-3">
            <input type="password" class="form-control" name="password" id="password" v-model="user.password"
                   :class="{'is-invalid': errors.password}">
            <label :class="{'active': user.password !== null}" for="password">
              <i class="fal fa-lock fa-xs mr-2"></i>Mot de passe
            </label>
          </div>
        </div>

      </div>

      <div class="row">

        <div class="col-12 mx-auto">
          <div class="klk-form-group mb-3">
            <input type="password" class="form-control" name="confirm_password" id="confirm_password"
                   v-model="user.confirm_password" :class="{'is-invalid': errors.confirm_password}">
            <label :class="{'active': user.confirm_password !== null}" for="confirm_password">
              <i class="fal fa-lock fa-xs mr-2"></i>Confirmation mot de passe
            </label>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-12 mx-auto">
          <div class="klk-form-group mb-3">
            <button class="btn border border-color-2 color-2 z-depth-0 btn-block bg-transparent">Enregistrer</button>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>

  import sha1 from 'sha1'

  export default {
    name: "MainForm",

    props: ['birthday', 'role'],

    data() {
      return {
        user  : {},
        errors: {}
      }
    },

    created() {
      this.resetUser()
      this.resetErrors()
    },

    methods: {

      resetUser() {
        this.user = {
          firstname       : 'Akbly',
          lastname        : 'Sofiane',
          email           : 'sofiane.akbly@gmail.com',
          password        : 'toto',
          confirm_password: 'toto',
        }
        // this.user = { firstname: null, lastname: null, email: null, password: null, confirm_password: null }
      },

      resetErrors() {

        Object.keys(this.user).map((key) => {
          this.errors[key] = false
        })
        // this.errors = { firstname: false, lastname: false, email: false, password: false, confirm_password: false }
      },

      checkField() {
        let value, error = false
        Object.keys(this.user).map((key) => {
          value = this.user[key]
          if (!value || value === null || value === '') {
            error = true
            this.errors[key] = true
          }
          else
            this.errors[key] = false
        })
        this.errors = JSON.parse(JSON.stringify(this.errors))
        // this.$forceUpdate()
        return !error
      },

      checkPassword() {

        if (!(this.user.password === this.user.confirm_password)) {
          this.errors.password = true
          this.errors.confirm_password = true
          return false
        }
        return true
      },

      register() {

        if (!(this.checkField()))
          return false

        if (!(this.checkPassword()))
          return false

        this.user.birthday = this.birthday
        this.user.role = this.role

        let data = JSON.parse(JSON.stringify(this.user))
        data.password = sha1(data.password)
        delete data.confirm_password

        // this.$store.commit('setFormLoad', true)

        this.api.post('/register', data).then((r) => {
          this.$store.commit('setFormLoad', false)
          this.cookie.set(this.$store.getters.COOKIE_NAME, r.data.data.access_token, { expires: parseInt(r.data.data.expires_in / 86400) + 1 })
          this.$router.push({ name: 'home' })
          location.reload()
        }, () => this.$store.commit('setFormLoad', false))

      }

    }

  }
</script>

<style scoped>

</style>
