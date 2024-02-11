<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.add_notification") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row align-items-center">

          <!-- Start:: Receiver Type Input -->
          <base-select-input col="6" :optionsList="receiverTypes" :placeholder="$t('TABLES.Notifications.receiverType')"
            v-model="data.receiverType" required @input="getMethods" multiple />
          <!-- End:: Receiver Type Input -->

          <div class="col-6" v-for="(item, index) in data.receiverType" :key="'k' + index">

            <div class="row">
              <base-select-input v-if="(item && item.value === 'clients' && clients.length)" class="col-12"
                :optionsList="clients" :placeholder="$t('PLACEHOLDERS.service_requester')" v-model="data.clients" required
                multiple @input="handleClientSelectionChange" />

              <base-select-input v-if="(item && item.value === 'providers' && providers.length)" class="col-12"
                :optionsList="providers" :placeholder="$t('PLACEHOLDERS.service_provider')" v-model="data.providers"
                required multiple @input="handleProviderSelectionChange" />
            </div>

          </div>

          <div class="col-12">
            <div class="row">
              <!-- Start:: Title Ar Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleAr')" v-model.trim="data.titleAr"
                required />
              <!-- End:: Title Ar Input -->

              <!-- Start:: Title En Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleEn')" v-model.trim="data.titleEn"
                required />
              <!-- End:: Title En Input -->

              <!-- Start:: Content Ar Input -->
              <base-input col="6" rows="7" type="textarea" :placeholder="$t('PLACEHOLDERS.contentAr')"
                v-model.trim="data.contentAr" required />
              <!-- End:: Content Ar Input -->

              <!-- Start:: Content En Input -->
              <base-input col="6" rows="7" type="textarea" :placeholder="$t('PLACEHOLDERS.contentEn')"
                v-model.trim="data.contentEn" required />
              <!-- End:: Content En Input -->
            </div>
          </div>

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateNotification",

  computed: {

    receiverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.service_requester"),
          value: "clients",
        },
        // {
        //   id: 2,
        //   name: this.$t("PLACEHOLDERS.all_service_requester"),
        //   value: "all_clients",
        // },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.service_provider"),
          value: "providers",
        },
        // {
        //   id: 4,
        //   name: this.$t("PLACEHOLDERS.all_service_provider"),
        //   value: "all_providers",
        // },
        // {
        //   id: 5,
        //   name: this.$t("STATUS.all"),
        //   value: "all",
        // },
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
        receiverType: null,
        clients: null,
        providers: null,
        titleAr: null,
        titleEn: null,
        contentAr: null,
        contentEn: null,
      },
      clients: [],
      providers: [],
      stores: [],
      // End:: Data Collection To Send

    };
  },

  methods: {

    // Start:: validate Form Inputs
    validateFormInputs() {
      // this.isWaitingRequest = true;

      // if (!this.data.receiverType) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.receiverType"));
      //   return;
      // } else if (
      //   this.data.receiverType?.value === "clients" &&
      //   this.data.clients.length === 0
      // ) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.clientAtLeast"));
      //   return;
      // } else if (
      //   this.data.receiverType?.value === "drivers" &&
      //   this.data.drivers.length === 0
      // ) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.driverAtLeast"));
      //   return;
      // } else if (
      //   this.data.receiverType?.value === "both" &&
      //   (this.data.clients.length === 0 || this.data.drivers.length === 0)
      // ) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.clientAndDriver"));
      //   return;
      // } 
      if (!this.data.titleAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.titleEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else if (!this.data.contentAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      } else if (!this.data.contentEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = true;

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data

      if (this.data.receiverType.length >= 2) {
        REQUEST_DATA.append(`receiver_type`, "all");
        this.data.receiverType.forEach((main) => {

          if (main.value == "clients") {

            this.data.clients.forEach((element, index) => {

              if (element.value == 'all') {
                REQUEST_DATA.append(`roles[]`, "client");
              } else {
                REQUEST_DATA.append(`client_ids[${index}]`, element.id);
              }
            });

          }

          else if (main.value == "providers") {
            this.data.providers.forEach((element, index) => {

              if (element.value == 'all') {
                REQUEST_DATA.append(`roles[]`, "provider");
              } else {
                REQUEST_DATA.append(`provider_ids[${index}]`, element.id);
              }
            });
          }

        })

      } else {
        this.data.receiverType.forEach((main) => {

          if (main.value == "clients") {

            this.data.clients.forEach((element, index) => {

              if (element.value == 'all') {
                REQUEST_DATA.append(`roles[]`, "client");
                REQUEST_DATA.append(`receiver_type`, "client");
              } else {
                REQUEST_DATA.append(`client_ids[${index}]`, element.id);
                REQUEST_DATA.append(`receiver_type`, "client");
              }
            });

          }

          else if (main.value == "providers") {
            this.data.providers.forEach((element, index) => {

              if (element.value == 'all') {
                REQUEST_DATA.append(`roles[]`, "provider");
                REQUEST_DATA.append(`receiver_type`, "provider");
              } else {
                REQUEST_DATA.append(`provider_ids[${index}]`, element.id);
                REQUEST_DATA.append(`receiver_type`, "provider");
              }
            });
          }

        })
      }

      REQUEST_DATA.append("title[ar]", this.data.titleAr);
      REQUEST_DATA.append("title[en]", this.data.titleEn);
      REQUEST_DATA.append("body[ar]", this.data.contentAr);
      REQUEST_DATA.append("body[en]", this.data.contentEn);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `notification/store`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
        this.$router.push({ path: "/all-notifications/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    async getClients() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "clients",
          params: {
            "status": 1
          }
        });
        this.loading = false;
        this.clients = res.data.data;
        this.clients.unshift({ name: this.$t('STATUS.all'), value: 'all' })

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getProviders() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "allProviders",
          params: {
            "status": 1
          }
        });
        this.loading = false;
        this.providers = res.data.data;
        this.providers.unshift({ name: this.$t('STATUS.all'), value: 'all' })
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    handleClientSelectionChange() {
      // Check if "all" is selected, and if so, clear other selections
      this.data.clients.forEach((item) => {
        if (item.value == 'all') {
          this.data.clients = [{ name: this.$t('STATUS.all'), value: 'all' }];
        } else {
          this.getClients();
        }
      })

    },

    handleProviderSelectionChange() {
      this.data.providers.forEach((item) => {
        if (item.value == 'all') {
          this.data.providers = [{ name: this.$t('STATUS.all'), value: 'all' }];
        } else {
          this.getProviders();
        }
      })
    },

    getMethods() {

      // this.data.clients = null;
      // this.data.providers = null;

      this.data.receiverType.forEach((item) => {

        if (item.value === "clients") {
          // this.data.users = [];
          this.getClients();
        } else if (item.value === "providers") {
          // this.data.drivers = [];
          this.getProviders();
        }

      })

    },

    // End:: Set Table Rows
  },

  created() {
    this.getClients();
    this.getProviders();
  },
};
</script>
