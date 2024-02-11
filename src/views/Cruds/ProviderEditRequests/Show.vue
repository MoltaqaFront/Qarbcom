<template>
  <div class="crud_form_wrapper single_show_content_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_edit_data") }}</h4>
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
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.name_provider')"
            v-model.trim="data.name" />
          <!-- End:: Name Input -->

          <!-- Start:: Status Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.provider_type')" v-model="data.type" />
          <!-- End:: Status Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.provider_code')"
            v-model.trim="data.provider_code" disabled />
          <!-- End:: Name Input -->

          <base-input col="6" disabled type="text" :placeholder="$t('PLACEHOLDERS.License_number')"
            v-model.trim="data.License_number" />


          <!-- v-if="data.type == 'company'" -->
          <div class="row">
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
                v-model.trim="data.company_name" disabled />
              <!-- End:: Name Input -->
            </div>

          </div>

          <h5>{{ $t("PLACEHOLDERS.address_info") }}</h5>

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('SIDENAV.Cities.name')" v-model.trim="data.country" />
          <!-- End:: Name Input -->
          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.area')" v-model.trim="data.region" />
          <!-- End:: Name Input -->
          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.address')" v-model.trim="data.address" />
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
          url: `providerUpdates/${this.$route.params.id}`,
        });
        // console.log("DATA =>", res.data.data);
        this.data.image = res.data.data.ProviderUpdate.image;

        this.data.Commercial_register = res.data.data.ProviderUpdate.commercial_register;

        this.data.Tax_registration = res.data.data.ProviderUpdate.tax_register;
        this.data.Company_logo = res.data.data.ProviderUpdate.company_logo;
        this.data.License_number = res.data.data.ProviderUpdate.provider.license_number;

        this.data.name = res.data.data.ProviderUpdate.provider.name;
        this.data.provider_code = res.data.data.ProviderUpdate.provider.code;
        this.data.company_name = res.data.data.ProviderUpdate.provider.company_name;
        this.data.type = res.data.data.ProviderUpdate.provider.user_type;

        this.data.country = res.data.data.ProviderUpdate.country;
        this.data.region = res.data.data.ProviderUpdate.district;
        this.data.address = res.data.data.ProviderUpdate.address;

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
