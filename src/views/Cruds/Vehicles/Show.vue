<template>
  <div class="crud_form_wrapper add_veh">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_vehicle_data") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <h5>{{ $t("PLACEHOLDERS.boat_data") }}</h5>

          <base-image-upload-input col="12" identifier="boat_image" :placeholder="$t('PLACEHOLDERS.boat_image')"
            :preSelectedImage="data.boat_image.path" disabled />

          <!-- Start:: Name Input -->
          <base-input disabled col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.name_ar" />
          <base-input disabled col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.name_en" />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input disabled col="6" type="text" :placeholder="$t('PLACEHOLDERS.plate_number')"
            v-model.trim="data.plate_number" />
          <!-- End:: Name Input -->

          <base-select-input disabled col="6" :optionsList="allVehicleTypes"
            :placeholder="$t('PLACEHOLDERS.type_vechile')" v-model="data.type_vechile" @input="getAllAdditionalFields" />

          <base-select-input disabled col="6" v-if="data.AdditionalFields && data.AdditionalFields.length > 0"
            :optionsList="data.AdditionalFields" :placeholder="$t('PLACEHOLDERS.additional_fields')"
            v-model.trim="data.additional_field" multiple required />

          <!-- Additional Fields -->

          <div class="row" v-if="data.additional_field">
            <div class="col-lg-6 col-12" v-for="(item_additional, index) in data.additional_field" :key="'l' + index">

              <div v-if="item_additional.type == 'checkbox'">
                <base-select-input disabled :optionsList="item_additional.values" :placeholder="item_additional.name"
                  v-model.trim="item_additional.value" multiple />
              </div>

              <div v-if="item_additional.type == 'dropdown'">
                <base-select-input disabled :optionsList="item_additional.values" :placeholder="item_additional.name"
                  v-model.trim="item_additional.value" multiple />
              </div>

              <div v-if="item_additional.type == 'radio'">
                <base-select-input disabled :optionsList="item_additional.values" :placeholder="item_additional.name"
                  v-model.trim="item_additional.value" />
              </div>

              <div v-if="item_additional.type == 'textbox'">
                <base-input disabled type="text" :placeholder="item_additional.name"
                  v-model.trim="item_additional.value" />
              </div>

              <div v-if="item_additional.type == 'textarea'">
                <base-input disabled type="text" :placeholder="item_additional.name"
                  v-model.trim="item_additional.value" />
              </div>

              <div v-if="item_additional.type == 'number'">
                <base-input disabled type="text" :placeholder="item_additional.name"
                  v-model.trim="item_additional.value" />
              </div>

            </div>
          </div>

          <base-input disabled col="6" type="date" :placeholder="$t('PLACEHOLDERS.vehicle_license_expiry_date')"
            v-model.trim="data.vehicle_license_expiry_date" />

          <base-input disabled col="6" type="text" :placeholder="$t('PLACEHOLDERS.number_of_individuals')"
            v-model.trim="data.n_of_passengers" />
          <!-- End:: Name Input -->

          <div class="input_wrapper top_label mb-3">
            <label class="form-label">
              {{ $t('PLACEHOLDERS.video') }}
            </label>
          </div>

          <video class="mt-4" width="100%" height="240" controls v-if="video">
            <source :src="video" type="video/mp4">
            <source :src="video" type="video/ogg">
            Your browser does not support the video tag.
          </video>

          <base-select-input disabled col="6" :optionsList="trip_type" :placeholder="$t('PLACEHOLDERS.trip_type')"
            v-model.trim="data.trip_type" required />

          <base-select-input disabled col="6" :optionsList="booking_type" :placeholder="$t('PLACEHOLDERS.booking_type')"
            v-model.trim="data.booking_type" required />


          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.departure_from') }}</h4>
          </div>

          <base-select-input disabled col="6" :optionsList="allCountries" :placeholder="$t('PLACEHOLDERS.country')"
            v-model.trim="data.country_name" required />
          <base-select-input disabled col="6" :optionsList="allDistricts" :placeholder="$t('TABLES.Addresses.area')"
            v-model.trim="data.district_name" required />
          <base-select-input disabled col="6" :optionsList="allMarins" :placeholder="$t('PLACEHOLDERS.marina')"
            v-model.trim="data.marina" required />

          <base-input v-if="data.distinctive_mark !== 'null'" disabled col="6" type="text"
            :placeholder="$t('PLACEHOLDERS.distinctive_mark')" v-model.trim="data.distinctive_mark" />

          <div class="row">
            <div class="col-12">
              <div class="form-group">

                <GmapMap :center="center" :zoom="7" map-type-id="terrain" :options="mapOptions"
                  style="width: 100%; height: 300px">
                  <GmapMarker :position="marker.position" :clickable="false" :draggable="false" />
                </GmapMap>

              </div>
            </div>
          </div>

          <div class="row" v-if="data.trip_type && data.trip_type.value == 'delivery'">
            <div class="form_title_wrapper">
              <h4>{{ $t('PLACEHOLDERS.departure_to') }}</h4>
            </div>

            <base-select-input disabled col="6" :optionsList="allCountries" :placeholder="$t('PLACEHOLDERS.country')"
              v-model.trim="data.country_name_to" required />
            <base-select-input disabled col="6" :optionsList="allDistricts" :placeholder="$t('TABLES.Addresses.area')"
              v-model.trim="data.district_name_to" required />
            <base-select-input disabled col="6" :optionsList="allMarins" :placeholder="$t('PLACEHOLDERS.marina')"
              v-model.trim="data.marina_to" required />

            <div class="row mb-4">
              <div class="col-12">
                <div class="form-group">

                  <GmapMap :center="center_2" :zoom="7" map-type-id="terrain" :options="mapOptions"
                    style="width: 100%; height: 300px">
                    <GmapMarker :position="marker_2.position" :clickable="false" :draggable="false" />
                  </GmapMap>

                </div>
              </div>
            </div>

          </div>

          <div class="row" v-if="data.trip_type && data.trip_type.value == 'delivery'">
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

          <div class="row"
            v-if="(data.trip_type && data.trip_type.value == 'rent') && (data.booking_type && data.booking_type.value == 'private')">
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

          <div class="row"
            v-if="(data.trip_type && data.trip_type.value == 'rent') && (data.booking_type && data.booking_type.value == 'individual')">
            <div class="col-12">
              <div class="form_title_wrapper">
                <h4>{{ $t('PLACEHOLDERS.pricing') }}</h4>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_hour')"
                v-model.trim="data.price_per_individual_hour" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_day')"
                v-model.trim="data.price_per_individual_day" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_week')"
                v-model.trim="data.price_per_individual_week" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_month')"
                v-model.trim="data.price_per_individual_month" />
            </div>
          </div>

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.main_services') }}</h4>
          </div>

          <base-select-input disabled col="6" :optionsList="data.mainServices"
            :placeholder="$t('PLACEHOLDERS.main_services')" v-model="data.main_service" multiple />

          <div class="form_title_wrapper" v-if="data.trip_type">
            <h4>{{ $t('PLACEHOLDERS.companion_services') }}</h4>
          </div>

          <div class="row align-items-center" v-for="( item, index ) in  data.companion_service " :key="'p' + index">

            <div class="row align-items-center" v-if="data.trip_type && data.trip_type.value == 'delivery'">

              <div class="col-lg-5 col-12">
                <base-select-input disabled col="12" :optionsList="additionalServices"
                  :placeholder="$t('PLACEHOLDERS.companion_service_name')" v-model.trim="item.data" />
              </div>

              <div class="col-lg-5 col-12">
                <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.companion_service_price')"
                  v-model.trim="item.pivot.price_per_person" />
              </div>

            </div>

            <div class="row align-items-center"
              v-if="(data.trip_type && data.trip_type.value == 'rent') && (data.booking_type && data.booking_type.value == 'private')">

              <div class="col-lg-4 col-12">
                <base-select-input disabled col="12" :optionsList="additionalServices"
                  :placeholder="$t('PLACEHOLDERS.companion_service_name')" v-model.trim="item.data" />
              </div>

              <div class="col-lg-4 col-12">
                <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_hour')"
                  v-model.trim="item.pivot.price_per_hour" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_day')"
                  v-model.trim="item.pivot.price_per_day" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_week')"
                  v-model.trim="item.pivot.price_per_week" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_month')"
                  v-model.trim="item.pivot.price_per_month" />
              </div>

            </div>

            <div class="row align-items-center"
              v-if="(data.trip_type && data.trip_type.value == 'rent') && (data.booking_type && data.booking_type.value == 'individual')">

              <div class="col-lg-4 col-12">
                <base-select-input disabled col="12" :optionsList="additionalServices"
                  :placeholder="$t('PLACEHOLDERS.companion_service_name')" v-model.trim="item.data" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_hour')"
                  v-model.trim="item.pivot.price_per_hour" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_day')"
                  v-model.trim="item.pivot.price_per_day" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_week')"
                  v-model.trim="item.pivot.price_per_week" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input disabled col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_month')"
                  v-model.trim="item.pivot.price_per_month" />
              </div>

            </div>

          </div>

          <div class="form_title_wrapper" v-if="data.trip_type && data.trip_type.value == 'delivery'">
            <h4>{{ $t('PLACEHOLDERS.delivery_schedule') }}</h4>
          </div>

          <div class="form_title_wrapper"
            v-if="(data.trip_type && data.trip_type.value == 'rent') && (data.booking_type && data.booking_type.value == 'individual')">
            <h4>{{ $t('PLACEHOLDERS.individual_rental_schedule') }}</h4>
          </div>

          <div v-if="data.trip_type && data.trip_type.value == 'delivery'">

            <div class="row">

              <v-container class="px-0 custom_labels">
                <div class="form-group" v-for="(day, index) in data.days" :key="'w' + index">
                  <input type="checkbox" :value="day.data.id" :id="day.data.name" v-model="day.data.is_checked" />
                  <label :for="day.data.name">{{ day.data.name }}</label>
                </div>
              </v-container>

              <div class="all_row_input w-100" v-for="(day, index) in data.days" :key="'day' + index">
                <div v-if="day.data.is_checked" class="w-100">
                  <h3 class="text-center head_section">{{ $t('TABS.work_times') }} {{ day.data.name }}</h3>

                  <div class="w-100  d-flex loop_working" v-for="(item, hourIndex) in  day.times" :key="hourIndex">

                    <div class="row align-items-center">

                      <div class="col-lg-4 col-12">
                        <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.arrival_time')"
                          v-model.trim="item.attendance_time" disabled />
                      </div>

                      <div class="col-lg-4 col-12">
                        <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.departure_time')"
                          v-model.trim="item.departure_time" disabled />
                      </div>

                      <div class="col-lg-4 col-12">
                        <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.return_time')"
                          v-model.trim="item.arrival_time" disabled />
                      </div>

                    </div>


                  </div>

                </div>
              </div>

            </div>

          </div>

          <div
            v-if="(data.trip_type && data.trip_type.value == 'rent') && (data.booking_type && data.booking_type.value == 'individual')">

            <v-container class="px-0 custom_labels">
              <div class="form-group" v-for="(day, index) in data.days" :key="'w' + index">
                <input type="checkbox" :value="day.data.id" :id="day.data.name" v-model="day.data.is_checked" />
                <label :for="day.data.name">{{ day.data.name }}</label>
              </div>
            </v-container>

            <div class="all_row_input w-100" v-for="(day, index) in data.days" :key="'day' + index">
              <div v-if="day.data.is_checked" class="w-100">

                <h3 class="text-center head_section">{{ $t('TABS.work_times') }} {{ day.data.name }}</h3>

                <div class="row">
                  <div class="col-lg-4 col-12">
                    <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.duration')"
                      v-model.trim="day.duration" disabled />
                  </div>

                  <div class="col-lg-4 col-12">
                    <base-select-input col="12" :optionsList="durationType"
                      :placeholder="$t('PLACEHOLDERS.duration_type')" v-model.trim="day.duration_type_data" disabled />
                  </div>
                </div>

                <div class="w-100  d-flex loop_working" v-for="(item, hourIndex) in  day.times" :key="hourIndex">

                  <div class="row align-items-center">

                    <div class="col-lg-4 col-12">
                      <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.arrival_time')"
                        v-model.trim="item.attendance_time" disabled />
                    </div>

                    <div class="col-lg-4 col-12">
                      <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.departure_time')"
                        v-model.trim="item.departure_time" disabled />
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>

          <base-input v-if="data.trip_description !== 'null'" disabled col="6" cols="5" rows="5" type="textarea"
            :placeholder="$t('PLACEHOLDERS.trip_description')" v-model="data.trip_description" />

          <base-input v-if="data.guidelines !== 'null'" disabled col="6" cols="5" rows="5" type="textarea"
            :placeholder="$t('PLACEHOLDERS.guidelines')" v-model="data.guidelines" />

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

  computed: {
    trip_type() {
      return [
        {
          id: 0,
          name: this.$t('PLACEHOLDERS.rental'),
          value: "rent"
        },
        {
          id: 1,
          name: this.$t('PLACEHOLDERS.typeProduct'),
          value: "delivery"
        }
      ]
    },

    booking_type() {
      return [
        {
          id: 0,
          name: this.$t('PLACEHOLDERS.book_private_boat'),
          value: "private"
        },
        {
          id: 1,
          name: this.$t('PLACEHOLDERS.individuals'),
          value: "individual"
        },
        {
          id: 1,
          name: this.$t('STATUS.all'),
          value: "all"
        }
      ]
    },

    durationType() {
      const options = [
        {
          id: 0,
          name: this.$t('PLACEHOLDERS.per_hour'),
          value: "Hour",
          condition: this.data.price_per_individual_hour
        },
        {
          id: 1,
          name: this.$t('PLACEHOLDERS.per_day'),
          value: "Day",
          condition: this.data.price_per_individual_day
        },
        {
          id: 2,
          name: this.$t('PLACEHOLDERS.per_week'),
          value: "Week",
          condition: this.data.price_per_individual_week
        },
        {
          id: 3,
          name: this.$t('PLACEHOLDERS.per_month'),
          value: "Month",
          condition: this.data.price_per_individual_month
        },
      ];

      return options.filter(option => option.condition);
    }
  },

  data() {
    return {

      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send

      data: {

        // boat info

        boat_image: {
          path: null,
          file: null,
        },
        plate_number: null,
        name_ar: null,
        name_en: null,
        type_vechile: null,
        type_vechile_id: null,
        vehicle_license_expiry_date: null,
        file: null,
        uploading: false,
        uploadProgress: 0,

        n_of_passengers: null,

        // getAdditionalFields
        AdditionalFields: [],
        additional_field: null,

        additional_field_checkbox: [],
        additional_field_dropdown: [],
        additional_field_radio: null,
        additional_field_number: null,
        additional_field_textbox: null,
        additional_field_textarea: null,

        // prices

        price_per_individual: null,

        price_per_hour: null,
        price_per_day: null,
        price_per_week: null,
        price_per_month: null,

        price_per_individual_hour: null,
        price_per_individual_day: null,
        price_per_individual_week: null,
        price_per_individual_month: null,

        companion_service: [
          {
            name: '',
            price: '',

            price_per_hour: null,
            price_per_day: null,
            price_per_week: null,
            price_per_month: null,
          }
        ],

        // from and to

        trip_type: null,
        booking_type: null,

        country_name: null,
        district_name: null,
        marina: null,
        distinctive_mark: null,

        country_name_to: null,
        district_name_to: null,
        marina_to: null,

        //  services

        mainServices: [],
        main_service: null,

        // times

        days: [
          { id: 1, value: 'Saturday', name: `${this.$t("days.Saturday")}` },
          { id: 2, value: 'Sunday', name: `${this.$t("days.Sunday")}` },
          { id: 3, value: 'Monday', name: `${this.$t("days.Monday")}` },
          { id: 4, value: 'Tuesday', name: `${this.$t("days.Tuesday")}` },
          { id: 5, value: 'Wednesday', name: `${this.$t("days.Wednesday")}` },
          { id: 6, value: 'Thursday', name: `${this.$t("days.Thursday")}` },
          { id: 7, value: 'Friday', name: `${this.$t("days.Friday")}` }
        ],

        times: [
          {
            day: null,
            attendance_time: null,
            departure_time: null,
            arrival_time: null,

            duration: null,
            duration_type: null
          }
        ],

        trip_description: null,
        guidelines: null,


      },

      // google maps

      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 10,
      currentPlace: null,
      markers: [],
      AllCategories: [],
      marker: {
        position: { lat: 24.7136, lng: 46.6753 }, // Initial marker position (Riyadh)
      },

      center_2: { lat: 24.7136, lng: 46.6753 },
      marker_2: {
        position: { lat: 24.7136, lng: 46.6753 }, // Initial marker position (Riyadh)
      },

      Latitude: '',
      Longitude: '',
      Radius: '',
      place: '',


      Latitude_2: '',
      Longitude_2: '',
      place_2: '',
      //  all types

      allVehicleTypes: [],
      allCountries: [],
      allDistricts: [],
      allMarins: [],
      additionalServices: [],
      video: "",

      mapOptions: {
        zoomControl: false, // Disable the default zoom control
        disableDoubleClickZoom: true, // Disable zooming on double-click
        draggable: false, // Disable dragging the map
        clickableIcons: false, // Disable clickable icons on the map
        // More options can be added if required
      },

    };
  },

  methods: {

    async getAllAdditionalFields() {
      try {
        // this.data.additional_field = null;
        let res = await this.$axios({
          method: "POST",
          url: `vehicles/getAdditionalFields`,
          data:
          {
            "vehicle_type_id": `${this.data.type_vechile.id}` ? `${this.data.type_vechile.id}` : this.data.type_vechile_id
          }
        });
        this.data.AdditionalFields = res.data.data.Vehicle_Additional_Fields;
        console.log(res.data.data.Vehicle_Additional_Fields)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // Start:: Get Data To Show
    async getDataToShow() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `vehicles/specialProcess/${this.$route.params.id}`,
        });
        this.data.boat_image.path = res.data.data.vehicle.main_image;
        this.data.name_ar = res.data.data.vehicle.name_ar;
        this.data.name_en = res.data.data.vehicle.name_en;
        this.data.plate_number = res.data.data.vehicle.license_plate;
        this.data.type_vechile = res.data.data.vehicle.vehicle_type;
        this.data.type_vechile_id = res.data.data.vehicle.vehicle_type.id;
        this.data.vehicle_license_expiry_date = res.data.data.vehicle.license_expiry_date;
        this.video = res.data.data.vehicle.vehicle_video;
        this.data.n_of_passengers = res.data.data.vehicle.capacity;
        this.data.trip_type = { value: res.data.data.vehicle.trip_type, name: res.data.data.vehicle.trip_type, id: 0 };
        this.data.booking_type = { value: res.data.data.vehicle.booking_type, name: res.data.data.vehicle.booking_type, id: 0 };

        this.data.country_name = res.data.data.vehicle.destination.from_country;
        this.data.district_name = res.data.data.vehicle.destination.from_district;
        this.data.marina = res.data.data.vehicle.destination.from_anchor;
        this.data.distinctive_mark = res.data.data.vehicle.destination.from_special_note;
        this.Latitude = +res.data.data.vehicle.destination.from_lat;
        this.Longitude = +res.data.data.vehicle.destination.from_long;
        this.place = res.data.data.vehicle.destination.from_address;

        this.data.country_name_to = res.data.data.vehicle.destination.to_country;
        this.data.district_name_to = res.data.data.vehicle.destination.to_district;
        this.data.marina_to = res.data.data.vehicle.destination.to_anchor;
        this.Latitude_2 = +res.data.data.vehicle.destination.to_lat;
        this.Longitude_2 = +res.data.data.vehicle.destination.to_long;
        this.place_2 = res.data.data.vehicle.destination.to_address;

        this.data.main_service = res.data.data.vehicle.services;
        // this.data.times = res.data.data.vehicle.trip_schedules;
        this.data.companion_service = res.data.data.vehicle.additional_services;
        this.data.days = res.data.data.vehicle.trip_schedules;

        const firstDayWithWorkingHours = this.data.days.find(day =>
          day.times.length > 0
        );

        if (firstDayWithWorkingHours) {
          console.log("firstDayWithWorkingHours", firstDayWithWorkingHours)
          firstDayWithWorkingHours.data.is_checked = true;
        }


        this.data.additional_field = res.data.data.vehicle.vehicle_additional_fields;

        this.data.price_per_individual = res.data.data.vehicle.vehicle_price.delivery_trip_price_per_person;

        this.data.price_per_individual_hour = this.data.price_per_hour = res.data.data.vehicle.vehicle_price.rental_hourly_price;
        this.data.price_per_individual_day = this.data.price_per_day = res.data.data.vehicle.vehicle_price.rental_daily_price;
        this.data.price_per_individual_week = this.data.price_per_week = res.data.data.vehicle.vehicle_price.rental_weekly_price;
        this.data.price_per_individual_month = this.data.price_per_month = res.data.data.vehicle.vehicle_price.rental_monthly_price;

        this.data.guidelines = res.data.data.vehicle.trip_instructions;
        this.data.trip_description = res.data.data.vehicle.trip_description;


        console.log("DATA =>", this.data.times);

      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Show

  },

  async created() {
    await this.getDataToShow();
  },
};
</script>

<style lang="scss" scoped>
.add_veh.crud_form_wrapper .form_title_wrapper {
  margin-bottom: 0 !important;
}

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

.item {
  gap: 10px
}

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

.custom_labels {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  .form-group {
    flex: 13%;
    max-width: 13%;
    min-width: 80px;
  }

  input {
    display: none;

    +label {
      width: 100%;
      height: 80px;
      min-width: 80px;
      border-radius: 8px;
      max-width: 100%;
      background: #FFF;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer
    }

    &:checked {
      +label {
        background: #017ccb;
        color: #FFF
      }
    }

  }
}


.all_row_input {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  // margin-bottom: 20px;

  .inpts {
    width: 100%;
    display: flex;
    gap: 20px;
  }


  >.hours_dates {
    width: 90%;
    display: flex;
    gap: 20px;
  }

  .form-group {
    // flex: 48%;
    // max-width: 48%;
    margin-bottom: 20px;

    label {
      position: absolute;
      top: -15px;
      right: 20px;
      padding-inline: 8px;
      font-size: 16px;
      background: #f2f2f2;
      color: #017ccb;

    }

  }

  input {
    width: 100%;
    padding: 20px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #017ccb;
  }
}


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

  .fa-trash {
    color: #ff2159;
    cursor: pointer
  }
}

.head_section {
  color: #017ccb;
  font-size: 18px;
  font-weight: bold;
  margin: 40px 0;
}


.disabled {
  pointer-events: none;
  user-select: none;
  opacity: 0.5;
}


.loop_working {
  gap: 10px;

  .all_actions {
    display: flex;
    gap: 11px;
  }
}

@media(max-width:575px) {
  .all_row_input {
    flex-direction: column;

    .form-group {
      flex: 100%;
      max-width: 100%;
    }
  }

  .loop_working {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
}
</style>



