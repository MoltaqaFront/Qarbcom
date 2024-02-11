<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_notification_details") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row justify-content-center">
          <!-- Start:: Receiver Type Input -->
          <base-input col="12" type="text" :placeholder="$t('TABLES.Notifications.date')" v-model.trim="data.created_at"
            required readonly />

          <base-input col="6" type="text" :placeholder="$t('TABLES.Notifications.receiverType')"
            v-model.trim="data.sender_type" required readonly />
          <!-- End:: Receiver Type Input -->
          <!-- Start:: Title Ar Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.Notifications.title')" v-model.trim="data.title"
            required readonly />
          <!-- End:: Title Ar Input -->

          <div class="col-12">
            <div class="row">
              <!-- Start:: Content Ar Input -->
              <base-input col="12" rows="5" type="textarea" :placeholder="$t('TABLES.Notifications.notification')"
                v-model.trim="data.body" required readonly />
              <!-- End:: Content Ar Input -->

            </div>
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
    // Start:: Vuex Getters
    ...mapGetters({
      allClientsData: "ApiGetsModule/allClientsData",
      allDriversData: "ApiGetsModule/allDriversData",
    }),
    // End:: Vuex Getters

    receiverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.clients"),
          value: "clients",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.drivers"),
          value: "drivers",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.both"),
          value: "both",
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
      // data: {
      //   receiverType: {
      //     id: 1,
      //     name: this.$t("PLACEHOLDERS.clients"),
      //     value: "clients",
      //   },

      // },

      data: {
        sender_type: null,
        title: null,
        body: null,
        created_at: null
      }
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Vuex Actions
    ...mapActions({
      getClients: "ApiGetsModule/getClients",
      getDrivers: "ApiGetsModule/getDrivers",
    }),
    // End:: Vuex Actions

    // get notification with id
    async getNotificationData() {
      try {
        let res = await this.$axios({
          method: "POST",
          url: `notification/show`,
          data: { notification_id: `${this.$route.params.id}` }
        });


        console.log(res.data.data.notification.data.type)
        this.data.sender_type = res.data.data.notification.receiver_type;
        this.data.title = res.data.data.notification.data.title;
        this.data.body = res.data.data.notification.data.body;
        this.data.created_at = res.data.data.notification.created_at;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.getNotificationData()
    // End:: Fire Methods
  },
};
</script>
