<template>
  <div id="createPost">
    <modal name="modal-create-post" :click-to-close="false" :height="'auto'" :adaptive="true" :reset="true"
           :scrollable="true" class="py-2">

      <div class="vmodal-header px-4">
        <button class="btn z-depth-0 color-1 btn-block bg-transparent" @click="hideModal()">
          <i class="fal fa-times fa-2x"></i>
        </button>
        <hr class="w-100 border-color-1">
      </div>

      <div class="vmodal-body p-4">
        <form @submit.prevent="save">

          <div class="row">
            <div class="col-12">
              <div class="klk-form-group">
                <input type="text" class="form-control" name="title" id="title" v-model="post.title">
                <label for="title"><i class="fal fa-font mr-2 fa-xs"></i>Titre</label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="klk-form-group">
                <textarea-autosize ref="description" class="w-1" rows="4" id="description" v-model="post.description"/>
                <label for="description"><i class="fal fa-water mr-2 fa-xs"></i>Description</label>
              </div>
            </div>
          </div>

          <div class="row">

            <div class="col-12">
              <label class="h6 grey-text w-100 text-center mb-0">Date & heure</label>
              <hr class="w-25 mb-4">
            </div>

            <div class="col-12 col-md-6">
              <div class="row">
                <label class="color-1 font-italic w-100 text-center mb-0">Début</label>
              </div>

              <div class="row">
                <div class="klk-form-group row d-flex justify-content-center align-items-center">

                  <div class="col-2">
                    <i class="fal fa-calendar-alt fa-1x5 color-1"></i>
                  </div>

                  <div class="col-10 px-0">
                    <date-picker ref="startDate" name="birthday" v-model="start.date" :format="'dd-MM-yyyy'"
                                 :monday-first="true"
                                 :language="fr"
                                 :calendar-class="'border-left-0 border-right-0 w-100'"
                                 :input-class="'form-control border-lef-0 border-rigt-0 border-to-0 rounde-0 text-center'"/>
                  </div>

                </div>
                <div class="klk-form-group row d-flex justify-content-center align-items-center">

                  <div class="col-2">
                    <i class="fal fa-clock fa-1x5 color-1"></i>
                  </div>

                  <div class="col-10 px-0">
                    <time-picker ref="startTime" v-model="start.time" :minute-interval="5" class="w-100"/>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="row">
                <label class="color-1 font-italic w-100 text-center mb-0">Fin</label>
              </div>
              <div class="row">
                <div class="klk-form-group row d-flex justify-content-center align-items-center">

                  <div class="col-2">
                    <i class="fal fa-calendar-alt fa-1x5 color-1"></i>
                  </div>

                  <div class="col-10 px-0">
                    <date-picker ref="endDate" name="birthday" v-model="end.date" :format="'dd-MM-yyyy'"
                                 :monday-first="true"
                                 :language="fr"
                                 :calendar-class="'border-left-0 border-right-0 border-top-0 w-100'"
                                 :input-class="'form-control border-lft-0 bordr-right-0 order-top-0 runded-0 text-center'"/>
                  </div>

                </div>
                <div class="klk-form-group row d-flex justify-content-center align-items-center">

                  <div class="col-2">
                    <i class="fal fa-clock fa-1x5 color-1"></i>
                  </div>

                  <div class="col-10 px-0">
                    <time-picker ref="endTime" v-model="end.time" :minute-interval="5" class="w-100"/>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <hr class="w-25 mb-5">

          <!--<div class="row">
            <div class="col-12 px-0">
              <div class="klk-form-group row">
                <div class="col-12">
                  <span class="mr-5">
                    <i class="fal fa-child mr-2"></i>Nombre d'enfants
                  </span>
                  <span v-for="i in 5">
                    <i class="far color-1 mx-2 cursor-pointer"
                       :class="{'fa-circle': post.children !== i, 'fa-dot-circle': post.children === i}"
                       @click="setChildren(i)"></i> {{ i }}
                  </span>
                </div>
              </div>
            </div>
          </div>-->

          <div class="row">

            <div class="col-12 mb-3">
              <label class="h6 grey-text w-100 text-center mb-0">Les enfants à faire garder</label>
              <hr class="w-25 mb-4">
            </div>

            <div class="col-12 px-0">
              <div class="klk-form-group row">
                <div class="col-4 mx-auto" v-for="child in children">
                  <div class="klk-custom-checkbox w-100">
                    <label class="mb-4 w-100">
                      <input type="checkbox" @click="toggleChildren(child.id)"
                             :checked="post.children.includes(child.id)">
                      {{ child.firstname }} {{ child.lastname }}
                    </label>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <hr class="w-25 mb-5">

          <div class="row">
            <div class="col-12">
              <div class="klk-form-group rate-input">
                <input type="number" min="0" class="form-control" id="rate" name="rate" v-model="post.rate">
                <label for="rate"><i class="fal fa-greater-than-equal mr-2 fa-xs"></i>Taux horaire</label>
              </div>
            </div>
          </div>


          <div class="row">
            <div class="col-12">
              <div class="klk-form-group">
                <input type="text" class="form-control" name="note" id="note" v-model="post.note">
                <label for="note"><i class="fal fa-info-circle mr-2 fa-xs"></i>Informations complémentaires</label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="klk-form-group">
                <button class="btn btn-block bg-color-1" type="submit">Poster l'annonce <i
                  class="far fa-layer-plus"></i></button>
              </div>
            </div>
          </div>

        </form>
      </div>

    </modal>

    <home/>

  </div>
</template>

<script>

  import DatePicker from 'vuejs-datepicker'
  import TimePicker from 'vuejs-timepicker'
  import { fr }     from 'vuejs-datepicker/dist/locale'
  import Home       from '../Index'

  import moment from 'moment'

  export default {
    name: "Create",

    components: {
      DatePicker,
      TimePicker,
      Home,
    },

    data() {
      return {
        children: [{
          id       : 1,
          firstname: "Enfant",
          lastname : "Numéro 1",
          birthday : "02/04/2014",
          notes    : "Aucune note particulière",
          parent_id: 1,
        }, {
          id       : 2,
          firstname: "Enfant",
          lastname : "Numéro 2",
          birthday : "01/09/2013",
          notes    : "Aucune note particulière",
          parent_id: 1,
        }],
        start   : { date: null, time: { HH: "HH", mm: "mm" } },
        end     : { date: null, time: { HH: "HH", mm: "mm" } },
        post    : {
          title      : "Un titre bidon",
          description: "Une description bidon",
          start      : null,
          end        : null,
          rate       : 9,
          note       : "Une note particulière",
          longitude  : null,
          latitude   : null,
          children   : []
        }/*
        post    : {
          title      : null,
          description: null,
          start      : null,
          end        : null,
          rate       : null,
          note       : null,
          longitude  : null,
          latitude   : null,
          children   : []
        }*/,
        fr      : fr,
      }
    },

    created() {
      this.setStart()
      this.setEnd()

      setTimeout(() => {
        this.$modal.show('modal-create-post');
      }, 1000)
    },

    methods: {

      hideModal() {
        this.$modal.hide('modal-create-post')
        this.$router.push({ name: 'home' })
      },

      setStart() {
        this.setStartTime(this.helpers.moment())
        this.setStartDate(new Date())
      },

      setStartTime(date) {
        if (date.minute() <= 55) {
          this.start.time.HH = `${this.helpers.twoDigits(date.hour())}`
          this.start.time.mm = `${this.helpers.twoDigits(Math.ceil(date.minute() / 5) * 5)}`
        } else {
          this.start.time.HH = `${this.helpers.twoDigits(date.hour() + 1)}`
          this.start.time.mm = `${this.helpers.twoDigits(0)}`
        }
      },

      setStartDate(date) {
        this.start.date = date
      },

      setEnd() {
        this.setEndTime(this.helpers.moment())
        this.setEndDate(new Date())
      },

      setEndTime(date) {
        if (date.minute() <= 55) {
          this.end.time.HH = `${this.helpers.twoDigits(date.hour() + 1)}`
          this.end.time.mm = `${this.helpers.twoDigits(Math.ceil(date.minute() / 5) * 5)}`
        } else {
          this.end.time.HH = `${this.helpers.twoDigits(date.hour() + 2)}`
          this.end.time.mm = `${this.helpers.twoDigits(0)}`
        }
      },

      setEndDate(date) {
        this.end.date = date
      },

      setChildren(nb) {
        this.post.children = nb
      },

      toggleChildren(id) {
        if (this.post.children.includes(id)) {
          // let tmp = this.post.children.indexOf(id)
          this.post.children.splice(this.post.children.indexOf(id), 1)
        }
        else this.post.children.push(id)
      },

      save() {
        let data = {
          title      : this.post.title,
          description: this.post.description,
          start      : moment(`${moment(this.start.date).format('L')} ${this.start.time.HH}:${this.start.time.mm}:00`, 'DD/MM/YYYY HH:mm:ss'),
          end        : moment(`${moment(this.end.date).format('L')} ${this.end.time.HH}:${this.end.time.mm}:00`, 'DD/MM/YYYY HH:mm:ss'),
          rate       : this.post.rate,
          note       : this.post.note,
          longitude  : this.post.longitude,
          latitude   : this.post.latitude,
          children   : this.post.children,
        }
        // this.post.start = moment(`${moment(this.start.date).format('L')} ${this.start.time.HH}:${this.start.time.mm}:00`)
        // this.post.end = moment(`${moment(this.end.date).format('L')} ${this.end.time.HH}:${this.end.time.mm}:00`)
        // this.$forceUpdate()
        // this.post = this.helpers.clone(this.post)
        console.log(data)
        // return
        this.api.post('/koop', data).then(r => this.hideModal())
      }

    }
  }
</script>

<style scoped>

  .rate-input:after {
    content: '\f153';
    position: absolute;
    top: 0;
    right: 40px;
    bottom: 0;
    height: 15px;
    /*font-style: italic;*/
    font-size: 12px;
    font-weight: 300;
    font-family: "Font Awesome 5 Pro", sans-serif;
    margin: auto;
  }

</style>
