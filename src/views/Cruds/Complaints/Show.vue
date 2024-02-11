<template>
  <div class="crud_form_wrapper single_show_content_wrapper">

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">

      <!-- ==== Start:: Client Main Data ==== -->
      <form>
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.client_name')"
            v-model.trim="data.name" />
          <!-- End:: Name Input -->

          <!-- Start:: Phone Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" />
          <!-- End:: Phone Input -->

          <!-- Start:: email Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.orderNumber')"
            v-model.trim="data.orderNumber" />
          <!-- End:: email Input -->

          <!-- Start:: email Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.vechile_code')"
            v-model.trim="data.vechile_code" />
          <!-- End:: email Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.vechile_name')"
            v-model.trim="data.vechile_name" />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.provider_code')"
            v-model.trim="data.provider_code" />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.name_provider')"
            v-model.trim="data.provider_name" />
          <!-- End:: Name Input -->


          <!-- Start:: Name Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.company_name')"
            v-model.trim="data.company_name" />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.complaint')"
            v-model.trim="data.complaint" />
          <!-- End:: Name Input -->


          <!-- Start:: Name Input -->
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.complaint_date')"
            v-model.trim="data.complaint_date" />
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
        name: null,
        phone: null,
        orderNumber: null,
        company_name: null,
        provider_code: null,
        vechile_code: null,
        vechile_name: null,
        provider_name: null,
        complaint: null,
        complaint_date: null,
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
          url: `complaints/${this.$route.params.id}`,
        });
        // console.log("DATA =>", res.data.data);
        this.data.name = res.data.data.Complaint.client.name;
        this.data.phone = res.data.data.Complaint.client.mobile;
        this.data.orderNumber = res.data.data.Complaint.order_id;
        this.data.company_name = res.data.data.Complaint.provider.company_name;
        this.data.provider_code = res.data.data.Complaint.provider.id;
        this.data.vechile_code = res.data.data.Complaint.vehicle.id;
        this.data.vechile_name = res.data.data.Complaint.vehicle.name;
        this.data.provider_name = res.data.data.Complaint.provider.name;
        this.data.complaint = res.data.data.Complaint.reason;
        this.data.complaint_date = res.data.data.Complaint.created_at;

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
