<template>
  <div class="crud_form_wrapper add_veh">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.Add_new_vehicle") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <h5>{{ $t("PLACEHOLDERS.boat_data") }}</h5>

          <base-image-upload-input col="12" identifier="boat_image" :placeholder="$t('PLACEHOLDERS.boat_image')"
            :preSelectedImage="data.boat_image.path" @selectImage="selectImage" />

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.name_ar" />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.name_en" />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.plate_number')"
            v-model.trim="data.plate_number" />
          <!-- End:: Name Input -->

          <base-select-input col="6" :optionsList="allVehicleTypes" :placeholder="$t('PLACEHOLDERS.vechiles_type')"
            v-model="data.type_vechile" @input="getAllAdditionalFields" />

          <base-select-input col="6" v-if="data.AdditionalFields && data.AdditionalFields.length > 0"
            :optionsList="data.AdditionalFields" :placeholder="$t('PLACEHOLDERS.additional_fields')"
            v-model.trim="data.additional_field" multiple required />

          <!-- Additional Fields -->

          <div class="row" v-if="data.additional_field">
            <div class="col-lg-6 col-12" v-for="(item_additional, index) in data.additional_field" :key="'l' + index">

              <div v-if="item_additional.type == 'checkbox'">
                <base-select-input :optionsList="item_additional.values" :placeholder="item_additional.name"
                  v-model.trim="data.additional_field_checkbox" multiple />
              </div>

              <div v-if="item_additional.type == 'dropdown'">
                <base-select-input :optionsList="item_additional.values" :placeholder="item_additional.name"
                  v-model.trim="data.additional_field_dropdown" multiple />
              </div>

              <div v-if="item_additional.type == 'radio'">
                <base-select-input :optionsList="item_additional.values" :placeholder="item_additional.name"
                  v-model.trim="data.additional_field_radio" />
              </div>

              <div v-if="item_additional.type == 'textbox'">
                <base-input type="text" :placeholder="item_additional.name"
                  v-model.trim="data.additional_field_textbox" />
              </div>

              <div v-if="item_additional.type == 'textarea'">
                <base-input type="text" :placeholder="item_additional.name"
                  v-model.trim="data.additional_field_textarea" />
              </div>

              <div v-if="item_additional.type == 'number'">
                <base-input type="text" :placeholder="item_additional.name" v-model.trim="data.additional_field_number" />
              </div>

            </div>
          </div>


          <base-input col="6" type="date" :placeholder="$t('PLACEHOLDERS.vehicle_license_expiry_date')"
            v-model.trim="data.vehicle_license_expiry_date" />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.number_of_individuals')"
            v-model.trim="data.n_of_passengers" />
          <!-- End:: Name Input -->

          <div class="input_wrapper top_label mb-3">
            <label class="form-label">
              {{ $t('PLACEHOLDERS.video') }}
            </label>
            <input col="6" ref="fileInput" type="file" class="form-control" :placeholder="$t('PLACEHOLDERS.video')"
              @change="handleFileChange" accept="video/*" />
          </div>

          <div v-if="data.uploadProgress > 0" class="w-100">
            <progress class="w-100" :value="data.uploadProgress" max="100"></progress>
            <p>{{ Math.round(data.uploadProgress) }}% uploaded</p>
          </div>

          <base-select-input col="6" :optionsList="trip_type" :placeholder="$t('PLACEHOLDERS.trip_type')"
            v-model.trim="data.trip_type" required />

          <base-select-input col="6" v-if="data.trip_type && data.trip_type.value == 'rent'" :optionsList="booking_type"
            :placeholder="$t('PLACEHOLDERS.booking_type')" v-model.trim="data.booking_type" required />


          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.departure_from') }}</h4>
          </div>

          <base-select-input col="6" :optionsList="allCountries" :placeholder="$t('PLACEHOLDERS.country')"
            v-model.trim="data.country_name" required />
          <base-select-input col="6" :optionsList="allDistricts" :placeholder="$t('TABLES.Addresses.area')"
            v-model.trim="data.district_name" required />
          <base-select-input col="6" :optionsList="allMarins" :placeholder="$t('PLACEHOLDERS.marina')"
            v-model.trim="data.marina" required />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.distinctive_mark')"
            v-model.trim="data.distinctive_mark" />

          <div class="row">
            <div class="col-12">
              <div class="form-group">

                <GmapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 100%; height: 300px"
                  @click="handleMapClick">
                  <GmapMarker :position="marker.position" :clickable="true" :draggable="true" @click="markerClicked"
                    @dragend="markerDragged($event)" />
                </GmapMap>

              </div>
            </div>
          </div>

          <div class="row" v-if="data.trip_type && data.trip_type.value == 'delivery'">
            <div class="form_title_wrapper">
              <h4>{{ $t('PLACEHOLDERS.departure_to') }}</h4>
            </div>

            <base-select-input col="6" :optionsList="allCountries" :placeholder="$t('PLACEHOLDERS.country')"
              v-model.trim="data.country_name_to" required />
            <base-select-input col="6" :optionsList="allDistricts" :placeholder="$t('TABLES.Addresses.area')"
              v-model.trim="data.district_name_to" required />
            <base-select-input col="6" :optionsList="allMarins" :placeholder="$t('PLACEHOLDERS.marina')"
              v-model.trim="data.marina_to" required />

            <div class="row mb-4">
              <div class="col-12">
                <div class="form-group">

                  <GmapMap :center="center_2" :zoom="7" map-type-id="terrain" style="width: 100%; height: 300px"
                    @click="handleMapClick_2">
                    <GmapMarker :position="marker_2.position" :clickable="true" :draggable="true" @click="markerClicked_2"
                      @dragend="markerDragged_2($event)" />
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
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual')"
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
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_hour')"
                v-model.trim="data.price_per_hour" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_day')"
                v-model.trim="data.price_per_day" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_week')"
                v-model.trim="data.price_per_week" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_month')"
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
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_hour')"
                v-model.trim="data.price_per_individual_hour" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_day')"
                v-model.trim="data.price_per_individual_day" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_week')"
                v-model.trim="data.price_per_individual_week" />
            </div>
            <div class="col-lg-6 col-12">
              <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_month')"
                v-model.trim="data.price_per_individual_month" />
            </div>
          </div>

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.main_services') }}</h4>
          </div>

          <base-select-input col="6" :optionsList="data.mainServices" :placeholder="$t('PLACEHOLDERS.main_services')"
            v-model="data.main_service" multiple />

          <div class="form_title_wrapper" v-if="data.trip_type">
            <h4>{{ $t('PLACEHOLDERS.companion_services') }}</h4>
          </div>

          <div class="col-l2" v-if="data.trip_type">
            <div class=" add_another" @click="addRow()">
              <i class="fas fa-plus"></i>
            </div>
          </div>

          <div class="row align-items-center" v-for="( item, index ) in  data.companion_service " :key="'p' + index">

            <div class="row align-items-center" v-if="data.trip_type && data.trip_type.value == 'delivery'">

              <div class="col-lg-5 col-12">
                <base-select-input col="12" :optionsList="additionalServices"
                  :placeholder="$t('PLACEHOLDERS.companion_service_name')" v-model.trim="item.name" />
              </div>

              <div class="col-lg-5 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.companion_service_price')"
                  v-model.trim="item.price" />
              </div>
              <div class="col-lg-2 col-12">
                <div class="all_actions">
                  <span class="add_another" @click="removeRow(index)">
                    <i class="fas fa-minus"></i>
                  </span>
                </div>
              </div>
            </div>

            <div class="row align-items-center"
              v-if="(data.trip_type && data.trip_type.value == 'rent') && (data.booking_type && data.booking_type.value == 'private')">

              <div class="col-lg-4 col-12">
                <base-select-input col="12" :optionsList="additionalServices"
                  :placeholder="$t('PLACEHOLDERS.companion_service_name')" v-model.trim="item.name" />
              </div>

              <div class="col-lg-4 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_hour')"
                  v-model.trim="item.price_per_hour" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_day')"
                  v-model.trim="item.price_per_day" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_week')"
                  v-model.trim="item.price_per_week" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_month')"
                  v-model.trim="item.price_per_month" />
              </div>
              <div class="col-lg-2 col-12">
                <div class="all_actions">
                  <span class="add_another" @click="removeRow(index)">
                    <i class="fas fa-minus"></i>
                  </span>
                </div>
              </div>
            </div>

            <div class="row align-items-center"
              v-if="(data.trip_type && data.trip_type.value == 'rent') && (data.booking_type && data.booking_type.value == 'individual')">

              <div class="col-lg-4 col-12">
                <base-select-input col="12" :optionsList="additionalServices"
                  :placeholder="$t('PLACEHOLDERS.companion_service_name')" v-model.trim="item.name" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_hour')"
                  v-model.trim="item.price_per_hour" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_day')"
                  v-model.trim="item.price_per_day" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_week')"
                  v-model.trim="item.price_per_week" />
              </div>
              <div class="col-lg-4 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.price_per_individual_month')"
                  v-model.trim="item.price_per_month" />
              </div>
              <div class="col-lg-2 col-12">
                <div class="all_actions">
                  <span class="add_another" @click="removeRow(index)">
                    <i class="fas fa-minus"></i>
                  </span>
                </div>
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
                  <input type="checkbox" :value="day.id" :id="day.name" v-model="day.isChecked" />
                  <label :for="day.name">{{ day.name }}</label>
                </div>
              </v-container>

              <div class="all_row_input w-100" v-for="(day, index) in data.days" :key="'day' + index">
                <div v-if="day.isChecked" class="w-100">
                  <h3 class="text-center head_section">{{ $t('TABS.work_times') }} {{ day.name }}</h3>

                  <div class="w-100  d-flex loop_working" v-for="(item, hourIndex) in  day.times" :key="hourIndex">

                    <div class="row align-items-center">

                      <div class="col-lg-3 col-12">
                        <base-input col="12" type="time" :placeholder="$t('PLACEHOLDERS.arrival_time')"
                          v-model.trim="item.attendance_time" />
                      </div>

                      <div class="col-lg-3 col-12">
                        <base-input col="12" type="time" :placeholder="$t('PLACEHOLDERS.departure_time')"
                          v-model.trim="item.departure_time" />
                      </div>

                      <div class="col-lg-3 col-12">
                        <base-input col="12" type="time" :placeholder="$t('PLACEHOLDERS.return_time')"
                          v-model.trim="item.arrival_time" />
                      </div>

                      <div class="col-lg-3 col-12">
                        <div class="all_actions">
                          <span @click="removeWorkingHour(day, hourIndex)" class="add_another"
                            :class="{ 'disabled': day.times.length === 1 }">
                            <i class="fas fa-minus"></i>
                          </span>

                          <span @click="addWorkingHour(day)" class="add_another">
                            <i class="fas fa-plus"></i>
                          </span>
                        </div>
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
                <input type="checkbox" :value="day.id" :id="day.name" v-model="day.isChecked" />
                <label :for="day.name">{{ day.name }}</label>
              </div>
            </v-container>

            <div class="all_row_input w-100" v-for="(day, index) in data.days" :key="'day' + index">
              <div v-if="day.isChecked" class="w-100">
                <h3 class="text-center head_section">{{ $t('TABS.work_times') }} {{ day.name }}</h3>

                <div class="row">
                  <div class="col-lg-4 col-12">
                    <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.duration')"
                      v-model.trim="day.duration" />
                  </div>

                  <div class="col-lg-4 col-12">
                    <base-select-input col="12" :optionsList="durationType"
                      :placeholder="$t('PLACEHOLDERS.duration_type')" v-model.trim="day.duration_type" />
                  </div>
                </div>

                <div class="w-100  d-flex loop_working" v-for="(item, hourIndex) in  day.times" :key="hourIndex">

                  <div class="row align-items-center">

                    <div class="col-lg-4 col-12">
                      <base-input col="12" type="time" :placeholder="$t('PLACEHOLDERS.arrival_time')"
                        v-model.trim="item.attendance_time" />
                    </div>

                    <div class="col-lg-4 col-12">
                      <base-input col="12" type="time" :placeholder="$t('PLACEHOLDERS.departure_time')"
                        v-model.trim="item.departure_time" />
                    </div>

                    <div class="col-lg-4 col-12">
                      <div class="all_actions">
                        <span @click="removeWorkingHour(day, hourIndex)" class="add_another"
                          :class="{ 'disabled': day.times.length === 1 }">
                          <i class="fas fa-minus"></i>
                        </span>

                        <span @click="addWorkingHour(day)" class="add_another">
                          <i class="fas fa-plus"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          <base-input col="6" cols="5" rows="5" type="textarea" :placeholder="$t('PLACEHOLDERS.trip_description')"
            v-model="data.trip_description" />

          <base-input col="6" cols="5" rows="5" type="textarea" :placeholder="$t('PLACEHOLDERS.guidelines')"
            v-model="data.guidelines" />

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
          { id: 1, value: 'Saturday', name: `${this.$t("days.Saturday")}`, isChecked: true, times: [{ attendance_time: '', departure_time: '', arrival_time: '', duration: '', duration_type: '' }] },
          { id: 2, value: 'Sunday', name: `${this.$t("days.Sunday")}`, isChecked: false, times: [{ attendance_time: '', departure_time: '', arrival_time: '', duration: '', duration_type: '' }] },
          { id: 3, value: 'Monday', name: `${this.$t("days.Monday")}`, isChecked: false, times: [{ attendance_time: '', departure_time: '', arrival_time: '', duration: '', duration_type: '' }] },
          { id: 4, value: 'Tuesday', name: `${this.$t("days.Tuesday")}`, isChecked: false, times: [{ attendance_time: '', departure_time: '', arrival_time: '', duration: '', duration_type: '' }] },
          { id: 5, value: 'Wednesday', name: `${this.$t("days.Wednesday")}`, isChecked: false, times: [{ attendance_time: '', departure_time: '', arrival_time: '', duration: '', duration_type: '' }] },
          { id: 6, value: 'Thursday', name: `${this.$t("days.Thursday")}`, isChecked: false, times: [{ attendance_time: '', departure_time: '', arrival_time: '', duration: '', duration_type: '' }] },
          { id: 7, value: 'Friday', name: `${this.$t("days.Friday")}`, isChecked: false, times: [{ attendance_time: '', departure_time: '', arrival_time: '', duration: '', duration_type: '' }] }
        ],

        times: [
          {
            day: null,
            attendance_time: null,
            departure_time: null,
            arrival_time: null,

            day_rent: null,
            duration_rent: null,
            duration_type_rent: null,
            attendance_time_rent: null,
            departure_time_rent: null,
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
      additionalServices: []

    };
  },

  methods: {

    addRow() {

      if (this.data.trip_type && this.data.trip_type.value == 'delivery') {

        this.data.companion_service.push({
          name: '',
          price: '',
        })

      } else if ((this.data.trip_type && this.data.trip_type.value == 'rent') && (this.data.booking_type && this.data.booking_type.value == 'private')) {

        this.data.companion_service.push({
          name: '',
          price_per_hour: null,
          price_per_day: null,
          price_per_week: null,
          price_per_month: null
        })

      } else if ((this.data.trip_type && this.data.trip_type.value == 'rent') && (this.data.booking_type && this.data.booking_type.value == 'individual')) {

        this.data.companion_service.push({
          price_per_hour: null,
          price_per_day: null,
          price_per_week: null,
          price_per_month: null
        })
      }

    },

    removeRow(index) {
      this.data.companion_service.splice(index, 1)
    },

    // add times

    addWorkingHour(day) {
      day.times.push({ attendance_time: '', departure_time: '', arrival_time: '' });
    },

    removeWorkingHour(day, index) {
      if (day.times.length > 1) {
        day.times.splice(index, 1);
      }
    },

    selectImage(selectedImage) {
      if (selectedImage.identifier === "boat_image") {
        this.data.boat_image = selectedImage;
      }
    },

    validateWorkingHours() {
      const selectedTimes = {}; // Object to store the selected times for each day

      for (const day of this.data.days) {
        if (day.isChecked) {
          selectedTimes[day.id] = []; // Initialize the array for the day's selected times

          for (const time of day.times) {
            const startTime = time.attendance_time;
            const endTime = time.departure_time;

            // Check if the attendance_time is provided without the departure_time
            if (startTime && !endTime) {
              this.isWaitingRequest = false;
              this.$message.error(this.$t("VALIDATION.departureTimeMissing"));
              return false;
            }

            // Check if the selected times intersect with any previously selected times for the same day
            for (const selectedTime of selectedTimes[day.id]) {
              const selectedStartTime = selectedTime.startTime;
              const selectedEndTime = selectedTime.endTime;

              if (
                (startTime >= selectedStartTime && startTime <= selectedEndTime) ||
                (endTime >= selectedStartTime && endTime <= selectedEndTime) ||
                (startTime <= selectedStartTime && endTime >= selectedEndTime)
              ) {
                // Intersecting times found, display an error message and return false
                this.isWaitingRequest = false;
                this.$message.error(this.$t("VALIDATION.timeIntersect"));
                return false;
              }
            }

            // Add the selected time to the array for the day
            selectedTimes[day.id].push({
              startTime,
              endTime
            });
          }
        }
      }

      // No intersecting times found, return true
      return true;
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      // Validate additional fields if they are present
      if (this.data.additional_field) {
        for (let i = 0; i < this.data.additional_field.length; i++) {
          const additionalField = this.data.additional_field[i];

          // Check if the additional field is required
          if (additionalField.is_required) {
            switch (additionalField.type) {
              case 'textbox':
                if (!this.data.additional_field_textbox) {
                  missingRequiredField = true;
                  this.isWaitingRequest = false;
                  this.$message.error(this.$t("VALIDATION.fill_required_field", { name: additionalField.name }));
                  return; // Stop validation and return
                }
                break;
              case 'number':
                if (!this.data.additional_field_number) {
                  missingRequiredField = true;
                  this.isWaitingRequest = false;
                  this.$message.error(this.$t("VALIDATION.fill_required_field", { name: additionalField.name }));
                  return; // Stop validation and return
                }
                break;
              case 'textarea':
                if (!this.data.additional_field_textarea) {
                  missingRequiredField = true;
                  this.isWaitingRequest = false;
                  this.$message.error(this.$t("VALIDATION.fill_required_field", { name: additionalField.name }));
                  return; // Stop validation and return
                }
                break;
              case 'checkbox':
                if (!this.data.additional_field_checkbox || this.data.additional_field_checkbox.length === 0) {
                  missingRequiredField = true;
                  this.isWaitingRequest = false;
                  this.$message.error(this.$t("VALIDATION.fill_required_field", { name: additionalField.name }));
                  return; // Stop validation and return
                }
                break;
              case 'radio':
                if (!this.data.additional_field_radio) {
                  missingRequiredField = true;
                  this.isWaitingRequest = false;
                  this.$message.error(this.$t("VALIDATION.fill_required_field", { name: additionalField.name }));
                  return; // Stop validation and return
                }
                break;
              case 'dropdown':
                if (!this.data.additional_field_dropdown || this.data.additional_field_dropdown.length === 0) {
                  missingRequiredField = true;
                  this.isWaitingRequest = false;
                  this.$message.error(this.$t("VALIDATION.fill_required_field", { name: additionalField.name }));
                  return; // Stop validation and return
                }
                break;
              default:
                // Handle any other types of additional fields
                this.isWaitingRequest = false;
                return; // Stop validation and return
            }
          }
        }
      }
      else if (!this.validateWorkingHours()) {
        this.isWaitingRequest = false;
        return;
      }

      else if (!this.data.name_en) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("main_image", this.data.boat_image.file);
      REQUEST_DATA.append("name[ar]", this.data.name_ar);
      REQUEST_DATA.append("name[en]", this.data.name_en);
      REQUEST_DATA.append("license_plate", this.data.plate_number);
      REQUEST_DATA.append("vehicle_type_id", this.data.type_vechile?.id);
      REQUEST_DATA.append("license_expiry_date", this.data.vehicle_license_expiry_date);
      REQUEST_DATA.append("capacity", this.data.n_of_passengers);

      if (this.file) {
        REQUEST_DATA.append("video", this.file);
      }

      REQUEST_DATA.append("trip_type", this.data.trip_type?.value);
      if (this.data.trip_type.value == 'rent') {
        REQUEST_DATA.append("booking_type", this.data.booking_type?.value);
      }
      REQUEST_DATA.append("trip_instructions", this.data.guidelines);
      REQUEST_DATA.append("trip_description", this.data.trip_description);

      // trip from to

      REQUEST_DATA.append("from_country_id", this.data.country_name?.id);
      REQUEST_DATA.append("from_district_id", this.data.district_name?.id);
      REQUEST_DATA.append("from_anchor_id", this.data.marina?.id);
      REQUEST_DATA.append("from_address", this.place);
      REQUEST_DATA.append("from_lat", this.Latitude);
      REQUEST_DATA.append("from_long", this.Longitude);
      REQUEST_DATA.append("from_special_note", this.data.distinctive_mark);

      if (this.data.trip_type && this.data.trip_type.value == 'delivery') {
        REQUEST_DATA.append("to_country_id", this.data.country_name_to?.id);
        REQUEST_DATA.append("to_district_id", this.data.district_name_to?.id);
        REQUEST_DATA.append("to_anchor_id", this.data.marina_to?.id);
        REQUEST_DATA.append("to_address", this.place_2);
        REQUEST_DATA.append("to_lat", this.Latitude_2);
        REQUEST_DATA.append("to_long", this.Longitude_2);
      }

      // additional fields

      if (this.data.additional_field) {
        // Create arrays based on type
        const inputTypes = this.data.additional_field.filter(item => ['textbox', 'number', 'textarea'].includes(item.type));
        const selectionTypes = this.data.additional_field.filter(item => !['textbox', 'number', 'textarea'].includes(item.type));

        // First loop for input types (textarea, textbox, number)
        inputTypes.forEach((item, index_input) => {
          REQUEST_DATA.append(`additional_field_input_type_ids[${index_input}]`, item.id);

          if (item.type === 'textbox') {
            REQUEST_DATA.append(`additional_field_input_type_values[${index_input}]`, this.data.additional_field_textbox);
          } else if (item.type === 'number') {
            REQUEST_DATA.append(`additional_field_input_type_values[${index_input}]`, this.data.additional_field_number);
          } else if (item.type === 'textarea') {
            REQUEST_DATA.append(`additional_field_input_type_values[${index_input}]`, this.data.additional_field_textarea);
          }
        });

        // Second loop for selection types (dropdown, checkbox, radio)
        selectionTypes.forEach((item, index_selection) => {
          console.log("index_selection", index_selection);

          if (item.type === 'dropdown') {
            this.data.additional_field_dropdown.forEach((inner_item, index_inner) => {
              REQUEST_DATA.append(`additional_field_selected_type_ids[${index_selection}]`, item.id);
              REQUEST_DATA.append(`additional_field_selected_type_value_ids[${index_selection}][${index_inner}]`, inner_item.id);
            });
          }

          if (item.type === 'checkbox') {
            this.data.additional_field_checkbox.forEach((inner_item, index_inner) => {
              REQUEST_DATA.append(`additional_field_selected_type_ids[${index_selection}]`, item.id);
              REQUEST_DATA.append(`additional_field_selected_type_value_ids[${index_selection}][${index_inner}]`, inner_item.id);
            });
          }

          if (item.type === 'radio') {
            const radioIndex = item.values.findIndex((value) => value.id === this.data.additional_field_radio.id);
            REQUEST_DATA.append(`additional_field_selected_type_ids[${index_selection}]`, item.id);
            REQUEST_DATA.append(`additional_field_selected_type_value_ids[${index_selection}][${radioIndex}]`, this.data.additional_field_radio.id);
          }
        });

      }

      // times and prices

      if (this.data.trip_type && this.data.trip_type.value == 'delivery') {

        REQUEST_DATA.append("delivery_trip_price_per_person", this.data.price_per_individual);

        this.data.companion_service.forEach((item, index) => {
          REQUEST_DATA.append(`additional_service_id[${index}]`, item.name.id);
          REQUEST_DATA.append(`price_per_person[${index}]`, item.price);
        });

        this.data.days.forEach((day, main_index) => {
          if (day.isChecked) {
            // Append day's ID
            REQUEST_DATA.append(`day[${main_index}]`, day.value);

            // Iterate through the working hours for the current day
            day.times.forEach((workingHour, inner_index) => {
              REQUEST_DATA.append(`attendance_time[${main_index}][]`, workingHour.attendance_time);
              REQUEST_DATA.append(`departure_time[${main_index}][]`, workingHour.departure_time);
              REQUEST_DATA.append(`arrival_time[${main_index}][]`, workingHour.arrival_time);
            });
          }
        });

      } else if ((this.data.trip_type && this.data.trip_type.value == 'rent') && (this.data.booking_type && this.data.booking_type.value == 'private')) {

        REQUEST_DATA.append("rental_hourly_price", this.data.price_per_hour);
        REQUEST_DATA.append("rental_daily_price", this.data.price_per_day);
        REQUEST_DATA.append("rental_weekly_price", this.data.price_per_week);
        REQUEST_DATA.append("rental_monthly_price", this.data.price_per_month);

        this.data.companion_service.forEach((item, index) => {
          REQUEST_DATA.append(`additional_service_id[${index}]`, item.name.id);
          REQUEST_DATA.append(`price_per_hour[${index}]`, item.price_per_hour);
          REQUEST_DATA.append(`price_per_day[${index}]`, item.price_per_day);
          REQUEST_DATA.append(`price_per_week[${index}]`, item.price_per_week);
          REQUEST_DATA.append(`price_per_month[${index}]`, item.price_per_month);
        });

      } else if ((this.data.trip_type && this.data.trip_type.value == 'rent') && (this.data.booking_type && this.data.booking_type.value == 'individual')) {
        REQUEST_DATA.append("rental_hourly_price", this.data.price_per_individual_hour);
        REQUEST_DATA.append("rental_daily_price", this.data.price_per_individual_day);
        REQUEST_DATA.append("rental_weekly_price", this.data.price_per_individual_week);
        REQUEST_DATA.append("rental_monthly_price", this.data.price_per_individual_month);

        this.data.companion_service.forEach((item, index) => {
          REQUEST_DATA.append(`additional_service_id[${index}]`, item.name.id);
          REQUEST_DATA.append(`price_per_hour[${index}]`, item.price_per_hour);
          REQUEST_DATA.append(`price_per_day[${index}]`, item.price_per_day);
          REQUEST_DATA.append(`price_per_week[${index}]`, item.price_per_week);
          REQUEST_DATA.append(`price_per_month[${index}]`, item.price_per_month);
        });

        this.data.days.forEach((day, main_index) => {
          if (day.isChecked) {
            // Append day's ID
            REQUEST_DATA.append(`day[${main_index}]`, day.value);

            // Iterate through the working hours for the current day
            REQUEST_DATA.append(`duration[${main_index}]`, day.duration);
            REQUEST_DATA.append(`duration_type[${main_index}]`, day.duration_type.value);
            day.times.forEach((workingHour, inner_index) => {
              REQUEST_DATA.append(`attendance_time[${main_index}][]`, workingHour.attendance_time);
              REQUEST_DATA.append(`departure_time[${main_index}][]`, workingHour.departure_time);
            });
          }
        });

      }

      if (this.data.main_service) {
        this.data.main_service.forEach((element, index) => {
          REQUEST_DATA.append(`service_id[${index}]`, element.id);
        });

      }

      try {
        await this.$axios({
          method: "POST",
          url: `vehicles`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/vehicles/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form


    //  handle upload video

    handleFileChange(event) {
      this.file = event.target.files[0];
      this.uploadVideo();
    },
    async uploadVideo() {
      if (!this.file) return;

      // Load the video to get its duration
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(this.file);

      videoElement.onloadedmetadata = async () => {
        const duration = videoElement.duration;

        if (duration < 20 || duration > 30) {
          // alert('Video duration should be between 20 and 30 seconds.');
          this.$message.error(this.$t("VALIDATION.vide_du"));
          this.$refs.fileInput.value = '';
          return;
        }

        this.uploading = true;

        // Simulate an asynchronous upload process
        const totalSize = this.file.size;
        let uploadedSize = 0;

        while (uploadedSize < totalSize) {
          // Simulate uploading a chunk of data
          const chunkSize = 100000; // Adjust the chunk size as needed
          uploadedSize += chunkSize;
          this.data.uploadProgress = (uploadedSize / totalSize) * 100;
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        }

        this.uploading = false;
        this.data.uploadProgress = 0;
        this.$message.success(this.$t("VALIDATION.upload_complete"));
      };
    },

    // google maps 1

    handleMapClick(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);

      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(lat, lng);

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          this.Latitude = lat;
          this.Longitude = lng;
          this.Radius = radius;
          this.place = results[0].formatted_address;

          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          // console.log('Radius:', radius);
          console.log('Place:', results[0].formatted_address);

          this.marker.position = { lat, lng }; // Update the marker's position
        }
      });
    },

    calculateDistance(lat1, lng1, lat2, lng2) {
      const R = 6371; // Radius of the earth in kilometers
      const dLat = this.deg2rad(lat2 - lat1);
      const dLng = this.deg2rad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // Convert to meters
      return distance;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    handleMarkerClick(index) {
      console.log('Marker clicked:', index);
    },

    setPlace(place) {
      this.currentPlace = place;
    },

    markerClicked() {
      // Handle marker click event
      const lat = this.marker.position.lat;
      const lng = this.marker.position.lng;
      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);
      console.log('Marker clicked:', lat, lng);
      console.log(radius);
    },

    async markerDragged(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);

      try {
        const geocoder = new google.maps.Geocoder();
        const latLng = new google.maps.LatLng(lat, lng);
        const results = await this.reverseGeocode(lat, lng, geocoder);

        if (results.length > 0) {
          this.Latitude = lat;
          this.Longitude = lng;
          this.Radius = radius;
          this.place = results[0].formatted_address;

          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          // console.log('Radius:', radius);
          console.log('Place:', results[0].formatted_address);

          this.marker.position = { lat, lng }; // Update the marker's position
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    },

    reverseGeocode(lat, lng, geocoder) {
      return new Promise((resolve, reject) => {
        const latLng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === 'OK') {
            resolve(results);
          } else {
            reject(new Error('Geocoder failed'));
          }
        });
      });
    },

    // google maps 2

    handleMapClick_2(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const radius = this.calculateDistance(lat, lng, this.center_2.lat, this.center_2.lng);

      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(lat, lng);

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          this.Latitude_2 = lat;
          this.Longitude_2 = lng;
          this.place_2 = results[0].formatted_address;

          console.log('Latitude_2:', lat);
          console.log('Longitude_2:', lng);
          console.log('Radius:', radius);
          console.log('Place_2:', this.place_2);

          this.marker_2.position = { lat, lng }; // Update the marker's position
        }
      });
    },


    handleMarkerClick_2(index) {
      console.log('Marker clicked:', index);
    },

    setPlace(place) {
      this.currentPlace = place;
    },

    markerClicked_2() {
      // Handle marker click event
      const lat = this.marker_2.position.lat;
      const lng = this.marker_2.position.lng;
      const radius = this.calculateDistance(lat, lng, this.center_2.lat, this.center_2.lng);
      console.log('Marker clicked:', lat, lng);
      console.log(radius);
    },

    async markerDragged_2(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const radius = this.calculateDistance(lat, lng, this.center_2.lat, this.center_2.lng);

      try {
        const geocoder = new google.maps.Geocoder();
        const latLng = new google.maps.LatLng(lat, lng);
        const results = await this.reverseGeocode(lat, lng, geocoder);

        if (results.length > 0) {
          this.Latitude_2 = lat;
          this.Longitude_2 = lng;
          this.place_2 = results[0].formatted_address;

          console.log('Latitude_2:', lat);
          console.log('Longitude_2:', lng);
          console.log('Radius:', radius);
          console.log('Place_2:', this.place_2);

          this.marker_2.position = { lat, lng }; // Update the marker's position
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    },

    //  all vehicle types

    async getAllVehicleTypes() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "vehicleTypes",
        });
        this.allVehicleTypes = res.data.data.vehicleTypes;
        // console.log(res.data.data)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getAllCountries() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "countries",
        });
        this.allCountries = res.data.data;
        // console.log(res.data.data)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getAllDistricts() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "districts",
        });
        this.allDistricts = res.data.data;
        // console.log(res.data.data)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getAllMarins() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "anchors",
        });
        this.allMarins = res.data.data;
        // console.log(res.data.data)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getAllMainSections() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "services",
        });
        this.data.mainServices = res.data.data;
        // console.log(res.data.data)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getAllAdditionalServices() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "additionalServices",
        });
        this.additionalServices = res.data.data;
        // console.log(res.data.data)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getAllAdditionalFields() {
      try {
        this.data.additional_field = null;
        let res = await this.$axios({
          method: "POST",
          url: `vehicles/getAdditionalFields`,
          data:
          {
            "vehicle_type_id": `${this.data.type_vechile.id}`
          }
        });
        this.data.AdditionalFields = res.data.data.Vehicle_Additional_Fields;
        console.log(res.data.data.Vehicle_Additional_Fields)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    this.getAllVehicleTypes();
    this.getAllCountries();
    this.getAllDistricts();
    this.getAllMarins();
    this.getAllMainSections();
    this.getAllAdditionalServices();
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



