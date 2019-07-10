<template>
  <div class="general-container">
    <div class="row w-100 border-bottom border-color-3 ">
      <div class="col-12 d-flex align-items-center pl-0">
      <!--<div class="col-3 col-md-2 col-xl-1 d-flex justify-content-center align-items-center">-->
        <i class="fal fa-cogs fa-1x grey-text"></i><span class="mx-3 color-1">|</span>
      <!--</div>-->
      <!--<div class="col-9 col-md-10 col-xl-11 d-flex align-items-center">-->
        <label class="h5 font-weight-light mb-0">Général</label>
      </div>
    </div>

    <div class="row w-100 my-4">
      <form id="formGeneral" class="w-100 mx-auto" @submit.prevent="saveGeneral()">

        <div class="row w-100 mb-5">

          <div
            class="col-6 col-md-4 border-right border-color-2 border-strong d-flex justify-content-center align-items-center">
            <i class="fal fa-id-card fa-5x color-1"></i>
          </div>

          <div class="col-6 col-md-8">

            <div class="row">

              <div class="col-12 col-md-6">
                <div class="klk-form-group">
                  <input type="text" class="form-control" name="firstname" id="firstname" v-model="user.firstname">
                  <label :class="{'active': user.firstname !== null}" for="firstname"><i
                    class="fal fa-user fa-xs mr-2"></i>
                    Nom
                  </label>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="klk-form-group">
                  <input type="text" class="form-control" name="lastname" id="lastname" v-model="user.lastname">
                  <label :class="{'active': user.lastname !== null}" for="lastname"><i
                    class="fal fa-user fa-xs mr-2"></i>
                    Prénom
                  </label>
                </div>
              </div>

            </div>

            <div class="row">

              <div class="col-12">
                <div class="klk-form-group">
                  <input type="text" class="form-control" name="email" id="email" v-model="user.email">
                  <label :class="{'active': user.email !== null}" for="email"><i class="fal fa-at fa-xs mr-2"></i>
                    Adresse email
                  </label>
                </div>
              </div>

            </div>

            <div class="row">

              <div class="col-12">
                <div class="klk-form-group">
                  <input type="tel" class="form-control" name="phone" id="phone" v-model="user.phone">
                  <label :class="{'active': user.phone !== null}" for="phone"><i class="fal fa-mobile fa-xs mr-2"></i>
                    N° de téléphone
                  </label>
                </div>
              </div>

            </div>

            <div class="row">

              <div class="col-12 mx-auto my-2">
                <div class="klk-form-group mb-0">
                  <date-picker ref="datePicker" name="birthday" v-model="user.birthday" :format="'dd/MM/yyyy'"
                               :monday-first="true"
                               :language="fr"
                               :open-date="minDate"
                               :input-class="'form-control'" id="birthday"/>
                  <label :class="{'active': user.birthday !== null}" for="birthday">
                    <i class="fal fa-birthday-cake fa-xs mr-2"></i> Date de naissance
                  </label>
                </div>
              </div>

            </div>

          </div>

        </div>

        <div class="row w-100 pt-5 mb-5">

          <div
            class="col-6 col-md-4 border-right border-color-2 border-strong d-flex justify-content-center align-items-center">
            <i class="fal fa-building fa-5x color-1"></i>
          </div>

          <div class="col-6 col-md-8">

            <div class="row">

              <div class="col-3 col-md-3 col-xl-2">
                <div class="klk-form-group">
                  <input type="number" class="form-control" name="number" id="number" v-model="address.number">
                  <label :class="{'active': address.number !== null}" for="number">Numéro </label>
                </div>
              </div>

              <div class="col-3 col-md-3 col-xl-2">
                <div class="klk-form-group">
                  <input type="text" class="form-control" name="number_2" id="number_2" v-model="address.number_2">
                  <label :class="{'active': address.number_2 !== null}" for="number_2">
                    Cpt. numéro
                  </label>
                </div>
              </div>

              <div class="col-3 col-md-6 col-xl-8">
                <div class="klk-form-group">
                  <input type="text" class="form-control" name="street_type" id="street_type"
                         v-model="address.street_type">
                  <label :class="{'active': address.street_type !== null}" for="street_type">
                    Type de voie <span class="font-italic">(rue, avenue etc.)</span>
                  </label>
                </div>
              </div>

            </div>

            <div class="row">

              <div class="col-12">
                <div class="klk-form-group">
                  <input type="text" class="form-control" name="street_name" id="street_name"
                         v-model="address.street_name">
                  <label :class="{'active': address.street_name !== null}" for="street_name">Adresse</label>
                </div>
              </div>

            </div>

            <div class="row">

              <div class="col-12">
                <div class="klk-form-group">
                  <input type="text" class="form-control" name="street_name_2" id="street_name_2"
                         v-model="address.street_name_2">
                  <label :class="{'active': address.street_name_2 !== null}" for="street_name_2">Complément
                    d'adresse</label>
                </div>
              </div>

            </div>

            <div class="row">

              <div class="col-12 col-md-4">
                <div class="klk-form-group">
                  <input type="text" class="form-control" name="zipcode" id="zipcode"
                         v-model="address.zipcode" @input="searchCity()">
                  <label :class="{'active': address.zipcode !== null}" for="zipcode">Code postal</label>
                </div>
              </div>

              <div class="col-12 col-md-8">
                <div class="klk-form-group">
                  <input type="text" class="form-control" name="city" id="city"
                         v-model="address.city">
                  <label :class="{'active': address.city !== null}" for="city">Ville</label>
                </div>
              </div>

            </div>

            <!--
              <div class="row">

                <div class="col-12 col-md-6">
                  <div class="klk-form-group">
                    <input type="text" class="form-control" name="firstname" id="firstname" v-model="user.firstname">
                    <label :class="{'active': user.firstname !== null}" for="firstname"><i
                      class="fal fa-user fa-xs mr-2"></i>
                      Nom
                    </label>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="klk-form-group">
                    <input type="text" class="form-control" name="lastname" id="lastname" v-model="user.lastname">
                    <label :class="{'active': user.lastname !== null}" for="lastname"><i class="fal fa-user fa-xs mr-2"></i>
                      Prénom
                    </label>
                  </div>
                </div>

              </div>

              <div class="row">

                <div class="col-12">
                  <div class="klk-form-group">
                    <input type="text" class="form-control" name="email" id="email" v-model="user.email">
                    <label :class="{'active': user.email !== null}" for="email"><i class="fal fa-at fa-xs mr-2"></i>
                      Adresse email
                    </label>
                  </div>
                </div>

              </div>

            -->
          </div>

        </div>

        <div class="row w-100">
          <div class="col-6 border-right d-flex justify-content-center align-items-center">
            <button class="btn btn-block z-depth-0" type="button" @click.prevent="cancelGeneral()"><i
              class="fal fa-ban fa-2x text-danger"></i></button>
          </div>
          <div class="col-6 border-left d-flex justify-content-center align-items-center">
            <button class="btn btn-block z-depth-0" type="submit"><i class="fal fa-save fa-2x text-success"></i>
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>

  import DatePicker from 'vuejs-datepicker'
  import { fr }     from 'vuejs-datepicker/dist/locale'

  import axios from 'axios'

  export default {
    name: "GeneralContainer",

    components: {
      DatePicker
    },

    data() {
      return {
        user    : {},
        saveUser: {},

        address    : {},
        saveAddress: {},

        minDate: new Date(),
        fr     : fr
      }
    },

    created() {
      this.run()
    },

    methods: {

      getCurrentUser() {
        this.api.get('/users/current').then((r) => {
          this.user = r.data.data.user
          this.saveUser = this.helpers.clone(this.user)
        })
      },

      getCurrentAddress() {
        this.api.get('/addresses/current').then((r) => {
          this.address = r.data.data.address
          this.saveAddress = this.helpers.clone(this.address)
        })
      },

      getChangeUserFields() {
        let tmp = {}, saveUser = this.saveUser, user = this.user

        if (user.firstname !== '' && user.firstname !== null && saveUser.firstname.toLowerCase() !== user.firstname.toLowerCase()) tmp.firstname = user.firstname
        if (user.lastname !== '' && user.lastname !== null && saveUser.lastname.toLowerCase() !== user.lastname.toLowerCase()) tmp.lastname = user.lastname
        if (user.phone !== '' && user.phone !== null && saveUser.phone !== user.phone) tmp.phone = user.phone
        if (user.birthday !== '' && user.birthday !== null && saveUser.birthday !== user.birthday) tmp.birthday = user.birthday
        if (user.email !== '' && user.email !== null && saveUser.email.toLowerCase() !== user.email.toLowerCase()) tmp.email = user.email

        return tmp
      },

      getChangeAddressFields() {
        let tmp = {}, saveAddress = this.saveAddress, address = this.address

        if (address.number !== '' && address.number !== null && saveAddress.number !== address.number) tmp.number = address.number
        if (address.number_2 !== '' && address.number_2 !== null && saveAddress.number_2 !== address.number_2) tmp.number_2 = address.number_2
        if (address.street_type !== '' && address.street_type !== null && saveAddress.street_type !== address.street_type) tmp.street_type = address.street_type
        if (address.street_name !== '' && address.street_name !== null && saveAddress.street_name !== address.street_name) tmp.street_name = address.street_name
        if (address.street_name_2 !== '' && address.street_name_2 !== null && saveAddress.street_name_2 !== address.street_name_2) tmp.street_name_2 = address.street_name_2
        if (address.zipcode !== '' && address.zipcode !== null && saveAddress.zipcode !== address.zipcode) tmp.zipcode = address.zipcode
        if (address.city !== '' && address.city !== null && saveAddress.city !== address.city) tmp.city = address.city
        if (address.latitude !== '' && address.latitude !== null && saveAddress.latitude !== address.latitude) tmp.latitude = address.latitude
        if (address.longitude !== '' && address.longitude !== null && saveAddress.longitude !== address.longitude) tmp.longitude = address.longitude

        return tmp
      },

      saveGeneral() {

        let nbReq = 0, maxReq = 2

        if (!this.helpers.equals(this.saveUser, this.user))
          this.api.put('/users', this.saveUser.id, this.getChangeUserFields()).then(() => {
            if (nbReq++ >= maxReq) this.run()
          })

        if (!this.helpers.equals(this.saveAddress, this.address)) {
          // let address = `${this.address.number}+${this.address.street_type}+${this.address.street_name}+${this.address.zipcode}+${this.address.city}`
          axios.get('https://nominatim.openstreetmap.org/search?q=' + `${this.address.number}+${this.address.street_type}+${this.address.street_name}+${this.address.zipcode}+${this.address.city}` + '&format=json').then((r) => {
            if (r.data && r.data.length > 0) {
              this.address.latitude = parseFloat(r.data[0].lat)
              this.address.longitude = parseFloat(r.data[0].lon)
              this.address = this.helpers.clone(this.address)
            }
            this.api.put('/addresses', this.saveAddress.id ? this.saveAddress.id : -1, this.getChangeAddressFields()).then(() => {
              if (nbReq++ >= maxReq) this.run()
            })
          })
        }
      },

      setMinBirthday() {
        this.minDate = this.helpers.moment()
        this.minDate.add(-18, 'year')
        this.minDate = new Date(this.minDate)
        this.minDate.setHours(14)
      },

      cancelGeneral() {
        this.user = this.helpers.clone(this.saveUser)
      },

      searchCity() {
        if (this.address.zipcode.length > 4)
          axios.get(`https://geo.api.gouv.fr/communes?codePostal=${this.address.zipcode}`).then((r) => {
            if (r.data && r.data.length > 0) {
              this.address.city = r.data[0].nom
              this.address = this.helpers.clone(this.address)
            }
          })
      },

      run() {
        this.getCurrentUser()
        this.getCurrentAddress()
        this.setMinBirthday()
      }

    }
  }
</script>

<style scoped>

</style>
