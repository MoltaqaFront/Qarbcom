<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.showOrder") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row align-items-center">

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.order_data') }}</h4>
          </div>

          <div class="col-lg-6 col-12 link_order">
            <router-link :to="'/orders/show/' + data.order_id">
              <span>{{ $t('TABLES.Orders.orderNumber') }}</span>
              <span>{{ data.id }}</span>
            </router-link>
          </div>

          <!-- <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.status')" v-model.trim="data.status" disabled /> -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.postponement_request_date')"
            v-model.trim="data.orderDate" disabled />


          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.trip_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.trip_type')" v-model.trim="data.trip_type"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.booking_type')" v-model.trim="data.booking_type"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.trip_date')" v-model.trim="data.trip_date"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.duration')" v-model.trim="data.duration"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.arrival_time')" v-model.trim="data.arrival_time"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.departure_time')"
            v-model.trim="data.departure_time" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.return_time')" v-model.trim="data.return_time"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.return_date')" v-model.trim="data.return_date"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.number_of_individuals')"
            v-model.trim="data.n_of_passengers" disabled />

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.postponement_reason') }}</h4>
          </div>

          <base-input col="6" rows="6" type="textarea" disabled :placeholder="$t('PLACEHOLDERS.postponement_reason')"
            v-model="data.postponement_reason" />

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import RatingPreview from "@/components/ui/RatingPreview.vue";
export default {
  name: "CreateProduct",

  components: {
    RatingPreview,
  },

  data() {
    return {

      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send

      data: {

        order_id: null,
        order_type_id: null,

        // order info

        id: null,
        status: null,
        orderDate: null,

        // store info

        provider_image: {
          path: null,
          file: null,
        },
        boat_image: {
          path: null,
          file: null,
        },

        provider_name: null,
        provider_code: null,

        n_of_passengers: null,

        companion_service: [],

        plate_number: null,
        vechile_name: null,
        type_vechile: null,
        country_name: null,
        district_name: null,
        marina: null,
        distinctive_mark: null,
        country_name_to: null,
        district_name_to: null,
        marina_to: null,
        distinctive_mark_to: null,

        trip_type: null,
        booking_type: null,
        trip_date: null,
        duration: null,
        arrival_time: null,
        departure_time: null,
        return_time: null,
        return_date: null,
        trip_description: null,
        guidelines: null,
        payment_method_brand: null,
        customer_refund_amount: null,
        cancel_reject_commission: null,
        review_rate: null,
        comment: null,

        postponement_reason: null

      },



    };
  },

  methods: {

    async getDataToEdit() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `postpone-orders/${this.$route.params.id}`,
        });
        // order info

        this.data.id = res.data.data.PostponeOrder.id;
        this.data.order_id = res.data.data.PostponeOrder.order.id;

        this.data.orderDate = res.data.data.PostponeOrder.postpone_order.created_at;

        this.data.trip_type = res.data.data.PostponeOrder.order.trip_type;
        this.data.booking_type = res.data.data.PostponeOrder.order.booking_type;
        this.data.trip_date = res.data.data.PostponeOrder.order.trip_date;
        this.data.n_of_passengers = res.data.data.PostponeOrder.order.n_of_passengers;

        this.data.duration = res.data.data.PostponeOrder.order.duration + res.data.data.PostponeOrder.order.duration_type;

        this.data.return_time = res.data.data.PostponeOrder.order.return_time;
        this.data.return_date = res.data.data.PostponeOrder.order.return_date;
        this.data.trip_description = res.data.data.PostponeOrder.order.trip_description;
        this.data.guidelines = res.data.data.PostponeOrder.order.trip_instructions;
        this.data.payment_method_brand = res.data.data.PostponeOrder.payment_method;

        this.data.arrival_time = res.data.data.PostponeOrder.order.attendance_time;
        this.data.departure_time = res.data.data.PostponeOrder.order.departure_time;
        this.data.postponement_reason = res.data.data.PostponeOrder.order.status_reason;


      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    this.getDataToEdit()
  },
};
</script>

<style lang="scss" scoped>
.add_parent {
  text-align: center;

  i {
    font-size: 25px;
    cursor: pointer;

    color: #4CAF50
  }
}

.remove_minus {
  text-align: center;

  i {
    font-size: 25px;
    color: red;
    cursor: pointer;
  }
}

.remove_minus_parent {
  i {
    font-size: 25px;
    color: red;
    cursor: pointer;
  }
}

.map_icon {
  i {
    font-size: 30px;
  }
}

.link_order {
  a {
    display: flex;
    gap: 30px;
    font-weight: 800;
    text-decoration: underline;
    font-size: 20px;
  }
}
</style>