<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_ads") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')" @selectImage="selectImage" disabled />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" disabled />

          <base-input col="6" type="date" :placeholder="$t('PLACEHOLDERS.start_date')"
            v-model.trim="data.publish_start_date" disabled />

          <base-input col="6" type="date" :placeholder="$t('PLACEHOLDERS.end_date')" v-model.trim="data.publish_end_date"
            disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details :disabled="true"></v-switch>
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
  name: "CreateStore",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        active: true,
        publish_start_date: null,
        publish_end_date: null
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
  },

  methods: {

    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    // start all ads data

    async getAdsData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `sliders/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.data.slider.slider_image;
        this.data.nameAr = res.data.data.slider.name_ar;
        this.data.nameEn = res.data.data.slider.name_en;
        this.data.publish_start_date = res.data.data.slider.start_publish_date;
        this.data.publish_end_date = res.data.data.slider.end_publish_date;
        this.data.active = res.data.data.slider.is_active;
        // console.log(res.data.body.add_space)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all ads data


  },

  created() {
    // Start:: Fire Methods
    this.getAdsData()
    // End:: Fire Methods
  },
};
</script>
