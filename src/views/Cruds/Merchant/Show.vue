<template>
  <div class="crud_form_wrapper single_show_content_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_provider") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">

      <!-- ==== Start:: Client Main Data ==== -->
      <form>
        <div class="row">

          <h5>{{ $t("PLACEHOLDERS.provider_info") }}</h5>

          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="client_image" :placeholder="$t('PLACEHOLDERS.provider_image')"
            :preSelectedImage="data.image" disabled class="disabled_input" v-if="data.type == 'individual'" />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name_provider')" v-model.trim="data.name" />
          <!-- End:: Name Input -->

          <!-- Start:: Status Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.provider_type')" v-model="data.type" />
          <!-- End:: Status Input -->

          <!-- Start:: Phone Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" />
          <!-- End:: Phone Input -->

          <!-- Start:: email Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" />
          <!-- End:: email Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.provider_code')"
            v-model.trim="data.provider_code" />
          <!-- End:: Name Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.status')" v-model="data.active" />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.License_number')"
            v-model.trim="data.License_number" />


          <!-- v-if="data.type == 'company'" -->
          <div class="row" v-if="data.type == 'company'">
            <h5>{{ $t("PLACEHOLDERS.company_info") }}</h5>

            <div class="col-lg-4 col-md-6 col-12">

              <base-image-upload-input col="12" identifier="Commercial_register"
                :placeholder="$t('PLACEHOLDERS.Commercial_register')" :preSelectedImage="data.Commercial_register"
                disabled class="disabled_input" />

            </div>

            <div class="col-lg-4 col-md-6 col-12">

              <base-image-upload-input col="12" identifier="Tax_registration"
                :placeholder="$t('PLACEHOLDERS.Tax_registration')" :preSelectedImage="data.Tax_registration" disabled
                class="disabled_input" />

            </div>

            <div class="col-lg-4 col-md-6 col-12">

              <base-image-upload-input col="12" identifier="Company_logo" :placeholder="$t('PLACEHOLDERS.Company_logo')"
                :preSelectedImage="data.Company_logo" disabled class="disabled_input" />

            </div>

            <div class="col-lg-6 col-12">
              <!-- Start:: Name Input -->
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.company_name')"
                v-model.trim="data.company_name" />
              <!-- End:: Name Input -->
            </div>

          </div>

          <!-- <h5>{{ $t("PLACEHOLDERS.address_info") }}</h5> -->

          <!-- Start:: Name Input -->
          <!-- <base-input col="6" type="text" :placeholder="$t('SIDENAV.Cities.name')" v-model.trim="data.country" /> -->
          <!-- End:: Name Input -->
          <!-- Start:: Name Input -->
          <!-- <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.area')" v-model.trim="data.region" /> -->
          <!-- End:: Name Input -->
          <!-- Start:: Name Input -->
          <!-- <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.address')" v-model.trim="data.address" /> -->
          <!-- End:: Name Input -->

          <h5>{{ $t("PLACEHOLDERS.contact_provider") }}</h5>

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.phone_call')" v-model.trim="data.phone_call" />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.WhatsApp_contact')"
            v-model.trim="data.WhatsApp_contact" />
          <!-- End:: Name Input -->

        </div>
      </form>
      <!-- ==== End:: Client Main Data ==== -->

    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "SingleMerchant",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loading Data
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Data
      data: {
        image: null,
        name: null,
        phone: null,
        email: null,
        company_name: null,
        provider_code: null,
        type: null,
        License_number: null,
        Commercial_register: null,
        Company_logo: null,
        Tax_registration: null,
        WhatsApp_contact: null,
        phone_call: null,
        country: null,
        region: null,
        address: null,
        active: false
      },
      // End:: Data
    };
  },

  methods: {
    // Start:: Get Data To Show
    async getDataToShow() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `allProviders/${this.$route.params.id}`,
        });
        // console.log("DATA =>", res.data.data);
        this.data.image = res.data.data.user.image;
        this.data.License_number = res.data.data.user.license_number;
        this.data.Commercial_register = res.data.data.user.commercial_register;
        this.data.Company_logo = res.data.data.user.company_logo;
        this.data.Tax_registration = res.data.data.user.tax_register;
        this.data.name = res.data.data.user.name;
        this.data.phone = res.data.data.user.mobile;
        this.data.email = res.data.data.user.email;
        this.data.company_name = res.data.data.user.company_name;
        this.data.active = res.data.data.user.is_active;
        this.data.provider_code = res.data.data.user.code;
        this.data.type = res.data.data.user.type;
        this.data.WhatsApp_contact = res.data.data.user.WhatsApp_contact;
        this.data.phone_call = res.data.data.user.phone_call;
        this.data.country = res.data.data.user.country;
        this.data.region = res.data.data.user.region;
        this.data.address = res.data.data.user.address;

      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Show
  },

  created() {
    // Start:: Fire Methods
    this.getDataToShow();
    // End:: Fire Methods
  },
};
</script>
