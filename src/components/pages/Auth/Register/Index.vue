<template>
  <div id="register" class="w-100">

    <div class="row mb-3">

      <button class="btn z-depth-0 p-0 color-1 text-left bg-transparent" v-if="step > 1" @click="previousStep()">
        <i class="fal fa-long-arrow-left mr-1"></i> Retour
      </button>

    </div>

    <choose-who @setRole="setRoleAfterChoice" v-if="step === 1"/> <!-- step : 1 -->
    <nurse-birthday @setBirthday="setBirthdayAfterFill" v-else-if="step === 2"/> <!-- step : 2 -->
    <main-form :birthday="user.birthday" :role="user.role" @setUser="setUserAfterFill" v-else-if="step === 3"/>
    <!-- step : 3 -->

  </div>
</template>

<script>

  import ChooseWho     from './ChooseWho'
  import NurseBirthday from './NurseBirthday'
  import MainForm      from './MainForm'

  export default {
    name: "Register",

    components: {
      ChooseWho,
      NurseBirthday,
      MainForm,
    },

    data() {
      return {
        user: {},
        step: 1
      }
    },

    methods: {

      setRole(role) {
        this.user.role = role
      },

      setRoleAfterChoice(role) {
        this.setRole(role)
        this.step = this.isDefinedUserRole() ? (this.user.role === 'nurse' ? 2 : 3) : this.step
        this.$forceUpdate()
      },

      isDefinedUserRole() {
        return this.user.role && !(this.user.role === null)
      },

      setBirthday(date) {
        this.user.birthday = this.helpers.moment(date)
      },

      setBirthdayAfterFill(date) {
        this.setBirthday(date)
        this.step = this.isDefinedBirthday() ? 3 : this.step
        this.$forceUpdate()
      },

      isDefinedBirthday() {
        return this.user.birthday && !(this.user.birthday === null)
      },

      setUser(user) {
        this.user = user
      },

      setUserAfterFill(user) {
        this.setUser(user)
        // this.step = this.isDefinedBirthday() ? 3 : this.step
        this.$forceUpdate()
      },

      /*isDefinedBirthday() {
        return this.user.birthday && !(this.user.birthday === null)
      },*/

      previousStep() {
        if (this.step === 3 && this.user.role === 'parent')
          this.step = 1
        else
          this.step -= 1
      }

    }
  }
</script>

<style scoped>

</style>
