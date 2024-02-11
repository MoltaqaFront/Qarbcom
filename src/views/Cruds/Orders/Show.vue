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
        <div class="row">

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.order_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.orderNumber')" v-model.trim="data.id"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.status')" v-model.trim="data.status" disabled />

          <base-input col="6" type="text" :placeholder="$t('TABLES.Products.created_at')" v-model.trim="data.orderDate"
            disabled />

          <div class="row">

            <h5>{{ $t("PLACEHOLDERS.provider_info") }}</h5>

            <base-image-upload-input col="12" identifier="provider" :placeholder="$t('PLACEHOLDERS.image')"
              :preSelectedImage="data.provider_image.path" disabled class="disabled_input" />

            <!-- Start:: Name Input -->
            <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.name_provider')"
              v-model.trim="data.provider_name" />
            <!-- End:: Name Input -->

            <!-- Start:: Name Input -->
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.provider_code')"
              v-model.trim="data.provider_code" disabled />
            <!-- End:: Name Input -->

            <h5>{{ $t("PLACEHOLDERS.boat_data") }}</h5>

            <base-image-upload-input col="12" identifier="boat_image" :placeholder="$t('PLACEHOLDERS.boat_image')"
              :preSelectedImage="data.boat_image.path" disabled />

            <!-- Start:: Name Input -->
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.plate_number')"
              v-model.trim="data.plate_number" disabled />
            <!-- End:: Name Input -->
            <!-- Start:: Name Input -->
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.vechile_name')"
              v-model.trim="data.vechile_name" disabled />
            <!-- End:: Name Input -->
            <!-- Start:: Name Input -->
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.type_vechile')"
              v-model.trim="data.type_vechile" disabled />
            <!-- End:: Name Input -->

          </div>

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.departure_from') }}</h4>
          </div>

          <base-input col="6" type="text" disabled :placeholder="$t('TABLES.Cities.name')"
            v-model.trim="data.country_name" />
          <base-input col="6" type="text" disabled :placeholder="$t('TABLES.Addresses.area')"
            v-model.trim="data.district_name" />
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.marina')" v-model.trim="data.marina" />
          <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.distinctive_mark')"
            v-model.trim="data.distinctive_mark" />

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.location_icon') }}</h4>
            <div class="map_icon">
              <i class="fas fa-map"></i>
            </div>
          </div>


          <div class="row">
            <div class="form_title_wrapper">
              <h4>{{ $t('PLACEHOLDERS.departure_to') }}</h4>
            </div>

            <base-input col="6" type="text" :placeholder="$t('TABLES.Cities.name')" v-model.trim="data.country_name_to"
              disabled />
            <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.area')"
              v-model.trim="data.district_name_to" disabled />
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.marina')" v-model.trim="data.marina_to"
              disabled />
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.distinctive_mark')"
              v-model.trim="data.distinctive_mark_to" disabled />

            <div class="form_title_wrapper">
              <h4>{{ $t('PLACEHOLDERS.location_icon') }}</h4>
              <div class="map_icon">
                <i class="fas fa-map"></i>
              </div>
            </div>
          </div>

          <div class="row" v-if="data.trip_type == 'delivery'">
            <div class="col-12">
              <div class="form_title_wrapper">
                <h4>{{ $t('PLACEHOLDERS.pricing') }}</h4>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual')"
                v-model.trim="data.price_per_individual" />
            </div>
          </div>

          <div class="row" v-if="(data.trip_type == 'rent') && (data.booking_type && data.booking_type == 'private')">
            <div class="col-12">
              <div class="form_title_wrapper">
                <h4>{{ $t('PLACEHOLDERS.pricing') }}</h4>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_hour')"
                v-model.trim="data.price_per_hour" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_day')"
                v-model.trim="data.price_per_day" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_week')"
                v-model.trim="data.price_per_week" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_month')"
                v-model.trim="data.price_per_month" />
            </div>
          </div>

          <div class="row" v-if="(data.trip_type == 'rent') && (data.booking_type && data.booking_type == 'individual')">
            <div class="col-12">
              <div class="form_title_wrapper">
                <h4>{{ $t('PLACEHOLDERS.pricing') }}</h4>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_hour')"
                v-model.trim="data.price_per_hour" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_day')"
                v-model.trim="data.price_per_day" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_week')"
                v-model.trim="data.price_per_week" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_month')"
                v-model.trim="data.price_per_month" />
            </div>
          </div>


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


          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.total_companion_service_price')"
            v-model.trim="data.total_companion_service_price" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.value_added_tax')"
            v-model.trim="data.value_added_tax" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.total_trip_price')"
            v-model.trim="data.total_trip_price" disabled />

          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.totalPrice')" v-model.trim="data.totalPrice"
            disabled />

          <div v-if="data.companion_service.length">
            <div class="form_title_wrapper">
              <h4>{{ $t('PLACEHOLDERS.companion_services') }}</h4>
            </div>

            <div class="row" v-for="(item, index) in data.companion_service" :key="'p' + index">
              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.companion_service_name')"
                  v-model.trim="item.name" disabled />
              </div>
              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.companion_service_price')"
                  v-model.trim="item.price" disabled />
              </div>
            </div>
          </div>

          <div class="form_title_wrapper" v-if="data.trip_description !== 'null'">
            <h4>{{ $t('PLACEHOLDERS.trip_description') }}</h4>
          </div>

          <base-input v-if="data.trip_description !== 'null'" col="6" rows="6" type="textarea" disabled
            :placeholder="$t('PLACEHOLDERS.trip_description')" v-model="data.trip_description" />

          <div class="form_title_wrapper" v-if="data.guidelines !== 'null'">
            <h4>{{ $t('PLACEHOLDERS.guidelines') }}</h4>
          </div>

          <base-input v-if="data.guidelines !== 'null'" col="7" rows="6" type="textarea" disabled
            :placeholder="$t('PLACEHOLDERS.guidelines')" v-model="data.guidelines" />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.payment_method_brand')"
            v-model="data.payment_method_brand" disabled />

          <div class="row" v-if="data.status_key == 'cancelled' || data.status_key == 'rejected'">
            <div class="form_title_wrapper">
              <h4>{{ $t('PLACEHOLDERS.cancel_reject_request') }}</h4>
            </div>

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.customer_refund_amount')"
              v-model="data.total_price_after_commission" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.cancel_reject_commission')"
              v-model="data.commission" disabled />

            <base-input col="6" rows="6" type="textarea" disabled :placeholder="$t('PLACEHOLDERS.reason')"
              v-model="data.status_reason" required />

          </div>

          <div class="row" v-if="data.rates.length > 0">
            <div class="form_title_wrapper">
              <h4>{{ $t('PLACEHOLDERS.order_rating') }}</h4>
            </div>

            <div class="row align-items-center" v-for="(rate, index) in data.rates" :key="'p' + index">

              <div class="d-flex justify-content-start">
                <RatingPreview :rate="+rate.rate" :size="15" />
              </div>


              <base-input col="3" rows="3" type="textarea" disabled :placeholder="$t('PLACEHOLDERS.comment')"
                v-model="rate.comment" required />

            </div>
          </div>

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

        order_type_id: null,

        total_companion_service_price: null,
        value_added_tax: null,
        total_trip_price: null,
        totalPrice: null,

        price_per_hour: null,
        price_per_day: null,
        price_per_week: null,
        price_per_month: null,

        price_per_individual: null,

        // order info

        id: null,
        status: null,
        status_key: null,
        orderDate: null,

        rates: [],
        status_reason: '',
        commission: '',
        total_price_after_commission: '',

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
        duration_type: null,
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

      },



    };
  },

  methods: {

    async getDataToEdit() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `orders/${this.$route.params.id}`,
        });
        // order info

        this.data.id = res.data.data.Order.id;

        this.data.status = res.data.data.Order.status;
        this.data.status_key = res.data.data.Order.status_key;
        this.data.orderDate = res.data.data.Order.created_at;

        this.data.provider_image.path = res.data.data.Order.provider.image;
        this.data.provider_name = res.data.data.Order.provider.name;
        this.data.provider_code = res.data.data.Order.provider.code;

        this.data.boat_image.path = res.data.data.Order.vehicle.image;
        this.data.plate_number = res.data.data.Order.vehicle.license_plate;
        this.data.vechile_name = res.data.data.Order.vehicle.name;
        this.data.type_vechile = res.data.data.Order.vehicle.type;
        this.data.companion_service = res.data.data.Order.additional_services_name;

        this.data.country_name = res.data.data.Order.from_country_name;
        this.data.district_name = res.data.data.Order.from_district_name;
        this.data.marina = res.data.data.Order.from_anchor_name;
        // this.data.distinctive_mark = res.data.data.Order.vehicle.type;

        this.data.country_name_to = res.data.data.Order.to_country_name;
        this.data.district_name_to = res.data.data.Order.to_district_name;
        this.data.marina_to = res.data.data.Order.to_anchor_name;
        // this.data.distinctive_mark_to = res.data.data.Order.vehicle.type;


        this.data.trip_type = res.data.data.Order.trip_type;
        this.data.booking_type = res.data.data.Order.booking_type;
        this.data.trip_date = res.data.data.Order.trip_date;
        this.data.n_of_passengers = res.data.data.Order.n_of_passengers;

        this.data.duration = res.data.data.Order.duration + res.data.data.Order.duration_type;
        this.data.duration_type = res.data.data.Order.duration_type;
        this.data.return_time = res.data.data.Order.return_time;
        this.data.return_date = res.data.data.Order.return_date;
        this.data.trip_description = res.data.data.Order.vehicle.trip_description;
        this.data.guidelines = res.data.data.Order.vehicle.trip_instructions;
        this.data.payment_method_brand = res.data.data.Order.payment_method;

        this.data.arrival_time = res.data.data.Order.attendance_time;
        this.data.departure_time = res.data.data.Order.departure_time;

        this.data.rates = res.data.data.Order.rates;
        this.data.status_reason = res.data.data.Order.status_reason;
        this.data.commission = res.data.data.Order.commission;
        this.data.total_price_after_commission = res.data.data.Order.total_price_after_commission;

        this.data.price_per_individual = res.data.data.Order.vehicle_price.delivery_trip_price_per_person;
        this.data.price_per_hour = res.data.data.Order.vehicle_price.rental_hourly_price;
        this.data.price_per_day = res.data.data.Order.vehicle_price.rental_daily_price;
        this.data.price_per_week = res.data.data.Order.vehicle_price.rental_weekly_price;
        this.data.price_per_month = res.data.data.Order.vehicle_price.rental_monthly_price;

        this.data.total_companion_service_price = res.data.data.Order.additional_services_price;
        this.data.value_added_tax = res.data.data.Order.tax_rate;
        this.data.total_trip_price = res.data.data.Order.total_trip_price;
        this.data.totalPrice = res.data.data.Order.total_price;

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
</style>