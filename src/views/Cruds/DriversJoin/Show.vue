<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showDriver") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="image" :placeholder="$t('PLACEHOLDERS.personalImage')"
            @selectImage="selectImage" :preSelectedImage="data.image.path" disabled />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" disabled />
          <!-- End:: Name Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.identity')" v-model.trim="data.identity"
            disabled />

          <!-- Start:: Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.phoneNumber')" v-model.trim="data.phone"
            disabled />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" disabled />
          <!-- End:: Email Input -->

          <base-select-input col="6" :optionsList="AllNationalities" :placeholder="$t('PLACEHOLDERS.nationality')"
            v-model="data.nationality" disabled />

          <!-- Start:: Address Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.iban')" v-model.trim="data.iban" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Account_Holders')"
            v-model.trim="data.Account_Holders" disabled />

          <base-select-input col="6" :optionsList="AllCarTypes" :placeholder="$t('PLACEHOLDERS.car_type')"
            v-model="data.car_type" disabled />

          <base-select-input col="6" :optionsList="AllCarModal" :placeholder="$t('PLACEHOLDERS.car_modal')"
            v-model="data.car_model" disabled />


          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.year_made')" v-model.trim="data.year_made"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_plate')" v-model.trim="data.car_plate"
            disabled />
          <!-- End:: Address Input -->

          <!-- <div class="col-12">
            <div class="row">

              <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.password')" v-model.trim="data.password"
                required />

              <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.confirmPassword')"
                v-model.trim="data.passwordConfirmation" disabled />

            </div>
          </div> -->

          <div class="row">
            <base-image-upload-input col="3" identifier="id_imge" :preSelectedImage="data.id_imge.path"
              :placeholder="$t('PLACEHOLDERS.id_imge')" @selectImage="selectImage" disabled />
            <!-- End:: Logo Input -->

            <!-- Start:: Cover Input -->
            <base-image-upload-input col="3" identifier="liecence_image" :placeholder="$t('PLACEHOLDERS.liecence_image')"
              @selectImage="selectImage" :preSelectedImage="data.liecence_image.path" disabled />
            <!-- End:: Cover Input -->

            <!-- Start:: Commerical Profile Image Input -->
            <base-image-upload-input col="3" identifier="front_image" :placeholder="$t('PLACEHOLDERS.front_image')"
              @selectImage="selectImage" :preSelectedImage="data.front_image.path" disabled />
            <!-- End:: Commerical Profile Image Input -->

            <!-- Start:: Tax Profile Image Input -->
            <base-image-upload-input col="3" identifier="back_image" :placeholder="$t('PLACEHOLDERS.back_image')"
              @selectImage="selectImage" :preSelectedImage="data.back_image.path" disabled />
            <!-- End:: Tax Profile Image Input -->
          </div>

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateDriver",

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allAreasData: "ApiGetsModule/allAreasData",
      allCitiesByAreaIdData: "ApiGetsModule/allCitiesByAreaIdData",
      allDistrictsByCityIdData: "ApiGetsModule/allDistrictsByCityIdData",
    }),
    // End:: Vuex Getters

    driverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.normal_wash"),
          value: "washing",
        },
        // {
        //   id: 2,
        //   name: this.$t("PLACEHOLDERS.delivery"),
        //   value: "delivery",
        // },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.washing_polishing"),
          value: "washing_polishing",
        },
      ];
    },
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        id_imge: {
          path: null,
          file: null,
        },
        liecence_image: {
          path: null,
          file: null,
        },
        front_image: {
          path: null,
          file: null,
        },
        back_image: {
          path: null,
          file: null,
        },
        image: {
          path: null,
          file: null,
        },
        name: null,
        phone: null,
        email: '',
        car_model: null,
        car_type: null,
        year_made: null,
        car_plate: null,
        nationality: null,
        iban: null,
        Account_Holders: null,
        identity: null,

        password: null,
        passwordConfirmation: null,
        available: true,
        active: true,
      },
      // End:: Data Collection To Send

      AllNationalities: [],
      AllCarModal: [],
      AllCarTypes: [],

    };
  },

  methods: {
    // Start:: Vuex Actions
    ...mapActions({
      getAreas: "ApiGetsModule/getAreas",
      getCitiesByAreaId: "ApiGetsModule/getCitiesByAreaId",
      getDistrictsByCityId: "ApiGetsModule/getDistrictsByCityId",
    }),
    // End:: Vuex Actions

    // Start:: Select Upload Image
    selectImage(selectedImage) {
      if (selectedImage.identifier === "image") {
        this.data.image = selectedImage;
        console.log(this.data.logo)
      } else if (selectedImage.identifier === "id_imge") {
        this.data.id_imge = selectedImage;
      } else if (selectedImage.identifier === "liecence_image") {
        this.data.liecence_image = selectedImage;
      } else if (selectedImage.identifier === "front_image") {
        this.data.front_image = selectedImage;
      } else if (selectedImage.identifier === "back_image") {
        this.data.back_image = selectedImage;
      }
    },
    // End:: Select Upload Image



    async getDataToEdit() {
      this.loading = true;
      try {
        let response = await this.$axios({
          method: "GET",
          url: `admin/driver-request/show/${this.$route.params.id}`,
        });
        this.loading = false;
        // this.data.id_imge = response.data.body.driver.
        this.data.image.path = response.data.body.driver.image;
        this.data.name = response.data.body.driver.name;
        this.data.email = response.data.body.driver.email;
        this.data.phone = response.data.body.driver.phone;
        this.data.identity = response.data.body.driver.id_number;
        this.data.Account_Holders = response.data.body.driver.account_username;
        this.data.iban = response.data.body.driver.iban;
        this.data.car_plate = response.data.body.driver.car_number;
        this.data.year_made = response.data.body.driver.car_made_year;
        this.data.nationality = response.data.body.driver.nationality;
        this.data.car_model = response.data.body.driver.car_model;
        this.data.car_type = response.data.body.driver.car_type;

        this.data.id_imge.path = response.data.body.driver.id_image;
        this.data.liecence_image.path = response.data.body.driver.licence_image;
        this.data.front_image.path = response.data.body.driver.front_car_image;
        this.data.back_image.path = response.data.body.driver.back_car_image;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "drivers show");
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
