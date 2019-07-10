<template>
  <div class="parameters-index">

    <div class="container">

      <general-settings/>

      <div class="children-container">

        <div class="row w-100 border-bottom border-color-3 ">
          <div class="col-12 d-flex align-items-center pl-0">
            <i class="fal fa-child fa-1x grey-text"></i><span class="mx-3 color-1">|</span>
            <label class="h5 font-weight-light mb-0">Mes enfants</label>
          </div>
        </div>

        <div class="row w-100 my-4">

          <div class="card card-child rounded z-depth-0 border mx-auto my-3" v-for="child in children">

            <div class="card-header border-0 p-0 z-depth-1 rounded">
              <div class="card-icon rounded bg-color- d-flex justify-content-center align-items-center mx-auto">
                <i class="fal fa-child fa-3x text-white color-1"></i>
              </div>
            </div>

            <div class="card-body">
              <h5 class="card-title text-center">{{ child.lastname }}</h5>
              <div class="card-content">

                <ul class="fa-ul">
                  <li>
                    <span class="fa-li color-1"><i class="fal fa-birthday-cake"></i></span>
                    <p class="card-text" v-if="child.birthday">
                      {{ helpers.moment(child.birthday).format('L') }}
                      <span class="font-italic small">({{ getAge(child.birthday) }} ans)</span>
                    </p>
                    <p class="card-text font-italic grey-text" v-else>Non défini</p>
                  </li>
                  <li>
                    <span class="fa-li color-1"><i class="fal fa-info-circle"></i></span>
                    <p class="card-text" v-if="child.notes && child.notes !== ''">{{ getNote(child.notes) }}</p>
                    <p class="card-text font-italic grey-text" v-else>Non défini</p>
                  </li>
                </ul>

              </div>
            </div>

            <hr class="w-25 d-block mt-1 mb-3 mx-auto">

            <div class="card-foot">

              <div class="row my-1 pt-1">

                <div class="col-4 mx-auto d-flex justify-content-center align-items-center">
                  <i class="fal fa-pencil-alt text-success cursor-pointer"></i>
                </div>

                <div class="col-4 mx-auto d-flex justify-content-center align-items-center">
                  <i class="fal fa-trash-alt text-danger cursor-pointer"></i>
                </div>

              </div>

            </div>

          </div>

          <form id="formChildren" class="w-100 mx-auto">
          </form>

        </div>

      </div>

    </div>

    <!-- <button @click="run()">rerun</button> -->

  </div>
</template>

<script>

  // import DatePicker from 'vuejs-datepicker'
  // import { fr }     from 'vuejs-datepicker/dist/locale'

  // import axios from 'axios'

  import GeneralSettings from './includes/GeneralSettings'

  export default {
    name: "Index",

    components: {
      GeneralSettings
    },

    data() {
      return {
        user    : {},
        children: {}

      }
    },

    created() {
      this.run()
    },

    methods: {

      getCurrentUser() {
        this.api.get('/users/current').then((r) => {
          this.user = r.data.data.user
          // this.saveUser = this.helpers.clone(this.user)
        })
      },

      getUserChildren() {
        this.api.get('/children/current').then((r) => {
          this.children = r.data.data.children
          // this.saveUser = this.helpers.clone(this.user)
        })
      },

      getAge(birthday) {
        return this.helpers.moment().diff(this.helpers.moment(birthday), 'years')
      },

      getNote(note, length = 125) {
        return note.length <= length ? note : note.substr(0, length) + '...'
      },

      run() {
        this.getCurrentUser()
        this.getUserChildren()
      }

    }
  }
</script>

<style scoped>

  .card.card-child {
    width: 325px;
  }

  .card.card-child .card-header {
    background: url("../../../../assets/img/auth.jpg") no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    background-size: 100% 100%;
    background-position: center center;
  }

  .card.card-child .card-header .card-icon {
    height: 150px;
    width: 100%;
    background-color: rgba(33, 37, 41, .9);
  }

  .card.card-child .card-body {
    height: 180px;
  }

  .card.card-child .card-body ul p.card-text {
    text-align: left;
    color: #212529;
  }

  .card.card-child .card-foot {
    height: 50px;
  }

</style>
