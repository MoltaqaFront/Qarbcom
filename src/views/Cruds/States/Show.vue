<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.showStates") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: city Input -->
          <base-select-input col="4" :optionsList="allCities" :placeholder="$t('SIDENAV.Cities.name')"
            v-model="data.city_id" disabled />
          <!-- End:: city Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details disabled></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>

export default {
  name: "showState",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        nameAr: null,
        nameEn: null,
        city_id: null,
        active: null
      },

      allCities: []
      // End:: Data Collection To Send
    };
  },

  computed: {
  },

  methods: {

    // start show data
    async dataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `districts/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.data.district.name_ar;
        this.data.nameEn = res.data.data.district.name_en;
        this.data.city_id = res.data.data.district.city;
        this.data.active = res.data.data.district.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data

  },

  created() {
    // Start:: Fire Methods
    this.dataToEdit();
    // End:: Fire Methods
  },
};
</script>
