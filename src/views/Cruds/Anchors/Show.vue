<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.add_anchor") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" disabled />


          <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.area')" v-model.trim="data.district_id"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('SIDENAV.Cities.name')" v-model.trim="data.city_id" disabled />

          <!-- End:: Name Input -->

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
  name: "CreateAds",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        nameAr: null,
        nameEn: null,
        active: true,
        city_id: null,
        district_id: null
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
  },

  methods: {

    // start get data

    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `anchors/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.data.anchor.name_ar;
        this.data.nameEn = res.data.data.anchor.name_en;
        this.data.city_id = res.data.data.anchor.city;
        this.data.district_id = res.data.data.anchor.district;
        this.data.active = res.data.data.anchor.is_active;
        // console.log(res.data.body.add_space)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end get data

  },

  created() {
    this.getDataToEdit();
  },
};
</script>
