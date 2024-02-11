<template>
  <div class="crud_form_wrapper single_show_content_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.employee_detail") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">

      <!-- ==== Start:: Client Main Data ==== -->
      <form>
        <div class="row">

          <!-- <h5>{{ $t("PLACEHOLDERS.provider_info") }}</h5> -->

          <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.user_image')" @selectImage="selectImage" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.user_name')" v-model="data.name" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.user_status')" v-model="data.active" disabled />

          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="client_image" :placeholder="$t('PLACEHOLDERS.provider_image')"
            :preSelectedImage="data.image" disabled class="disabled_input" v-if="data.type == 'individual'" />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name_provider')" v-model.trim="data.parent_name"
            disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Phone Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" />
          <!-- End:: Phone Input -->

          <!-- Start:: email Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" />
          <!-- End:: email Input -->

          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.employee_permissions')"
            v-model.trim="data.user_type" />

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
        image: {
          path: null,
          file: null,
        },
        name: null,
        parent_name: null,
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
        active: false,
        user_type: null
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
          url: `providerEmployees/${this.$route.params.id}`,
        });
        // console.log("DATA =>", res.data.data);
        this.data.image.path = res.data.data.user.image;
        this.data.License_number = res.data.data.user.license_number;
        this.data.Commercial_register = res.data.data.user.commercial_register;
        this.data.Company_logo = res.data.data.user.company_logo;
        this.data.Tax_registration = res.data.data.user.tax_register;
        this.data.name = res.data.data.user.name;
        this.data.parent_name = res.data.data.user.parent_name;
        this.data.phone = res.data.data.user.mobile;
        this.data.email = res.data.data.user.email;
        this.data.user_type = res.data.data.user.roles_name[0];
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
