<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Tax Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.VAT_percentage')"
            v-model.trim="data.VAT_percentage" />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Tax Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Application_commission_percentage')"
            v-model.trim="data.Application_commission_percentage" />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Delivery Price Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Cancellation_Rejection_percentage')"
            v-model.trim="data.Cancellation_Rejection_percentage" />
          <!-- End:: Delivery Price Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Reminder_before_the_trip_date_by_duration')"
            v-model.trim="data.Reminder_before_the_trip_date_by_duration" />
          <!-- End:: Driver's Daily Orders Amount Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Reminder_before_the_vehicle_license')"
            v-model.trim="data.Reminder_before_the_vehicle_license" />
          <!-- End:: Driver's Daily Orders Amount Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Completed_order_points')"
            v-model.trim="data.Completed_order_points" />
          <!-- End:: Driver's Daily Orders Amount Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.One_riyal_equals_points')"
            v-model.trim="data.One_riyal_equals_points" />
          <!-- End:: Driver's Daily Orders Amount Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "GeneralSettings",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        VAT_percentage: null,
        Application_commission_percentage: null,
        Cancellation_Rejection_percentage: null,
        Reminder_before_the_trip_date_by_duration: null,
        Reminder_before_the_vehicle_license: null,
        Completed_order_points: null,
        One_riyal_equals_points: null,
      },
      // End:: Data Collection To Send

    };
  },

  methods: {

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings/dash-admin-setting`,
        });
        // Start:: Set Data
        this.data.VAT_percentage = res.data.data.setting.value.Value_added_tax_rate;
        this.data.Application_commission_percentage = res.data.data.setting.value.Application_commission_percentage;
        this.data.Cancellation_Rejection_percentage = res.data.data.setting.value.cancellation_or_rejection_rate;
        this.data.Reminder_before_the_trip_date_by_duration = res.data.data.setting.value.A_reminder_several_days_before_the_vehicle_license_expiration_date;
        this.data.Reminder_before_the_vehicle_license = res.data.data.setting.value.A_reminder_shortly_before_the_trip;
        this.data.Completed_order_points = res.data.data.setting.value.Points_for_completed_orders;
        this.data.One_riyal_equals_points = res.data.data.setting.value.One_riyal_number_equal_number_point;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = !this.isWaitingRequest;

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("key", "dashboard-admin-setting");
      REQUEST_DATA.append("value[Value_added_tax_rate]", this.data.VAT_percentage);

      REQUEST_DATA.append("value[Application_commission_percentage]", this.data.Application_commission_percentage);
      REQUEST_DATA.append("value[cancellation_or_rejection_rate]", this.data.Cancellation_Rejection_percentage);
      REQUEST_DATA.append("value[A_reminder_several_days_before_the_vehicle_license_expiration_date]", this.data.Reminder_before_the_trip_date_by_duration);
      REQUEST_DATA.append("value[A_reminder_shortly_before_the_trip]", this.data.Reminder_before_the_vehicle_license);
      REQUEST_DATA.append("value[Points_for_completed_orders]", this.data.Completed_order_points);
      REQUEST_DATA.append("value[One_riyal_number_equal_number_point]", this.data.One_riyal_equals_points);

      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `settings`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.errors);
      }
    },
    // End:: Submit Form

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.submitForm();
      // this.isWaitingRequest = true;

      // if (!this.data.fast_order_cancel_time) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.fast_order_cancel_time"));
      //   return;
      // } else if (!this.data.reservation_cancel_time) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.reservation_cancel_time"));
      //   return;
      // } else {
      //   this.submitForm();
      //   return;
      // }
    },
    // End:: validate Form Inputs
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>


<style lang="scss" scoped>
.all_action {
  display: flex;
  gap: 15px
}

.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--light_gray_clr);
  border-radius: 50%;
  font-size: 18px;
  color: var(--light_gray_clr);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: auto;

  .fa-trash {
    color: #ff2159;
    cursor: pointer
  }
}
</style>