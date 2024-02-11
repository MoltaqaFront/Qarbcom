<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Filter Form =========== -->
      <div class="filter_content_wrapper" :class="{ active: filterFormIsActive }">
        <button class="filter_toggler" @click="filterFormIsActive = !filterFormIsActive">
          <i class="fal fa-times"></i>
        </button>
        <div class="filter_title_wrapper">
          <h5>{{ $t("TITLES.searchBy") }}</h5>
        </div>
        <div class="filter_form_wrapper">
          <form @submit.prevent="submitFilterForm">
            <div class="row justify-content-center align-items-center w-100">

              <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.offer_name')"
                v-model="filterOptions.offer_name" required />

              <base-select-input col="4" :optionsList="vehicle_types" :placeholder="$t('PLACEHOLDERS.type_vechile')"
                v-model="filterOptions.vehicle_type" required />

              <base-select-input col="4" :optionsList="Vehicles" :placeholder="$t('PLACEHOLDERS.Vehicle')"
                v-model="filterOptions.vehicle" required />

              <base-select-input col="4" :optionsList="providers" :placeholder="$t('PLACEHOLDERS.name_provider')"
                v-model="filterOptions.provider_name" required />

              <!-- Start:: Status Input -->
              <base-select-input col="4" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.status" />
              <!-- End:: Status Input -->
            </div>

            <div class="btns_wrapper">
              <button class="submit_btn" :disabled="isWaitingRequest">
                <i class="fal fa-search"></i>
              </button>
              <button class="reset_btn" type="button" :disabled="isWaitingRequest" @click="resetFilter">
                <i class="fal fa-redo"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("BUTTONS.offers") }}</h5>

          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <v-data-table class="thumb" :loading="loading" :loading-text="$t('TABLES.loadingData')" :search="searchValue"
        :headers="tableHeaders" :items="tableRows" item-class="ltr" :items-per-page="paginations.items_per_page"
        hide-default-footer>
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>

        <template v-slot:[`item.serialNumber`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.serialNumber">-</p>
          <p v-else>{{ item.serialNumber }}</p>
        </template>

        <template v-slot:[`item.is_active`]="{ item }">
          <v-chip v-if="item.is_active" color="light-blue darken-2" text-color="white">
            {{ $t("STATUS.active") }}
          </v-chip>
          <v-chip v-else color="deep-purple darken-1" text-color="white">
            {{ $t("STATUS.notActive") }}
          </v-chip>
        </template>
        <!-- Start:: No Data State -->
      </v-data-table>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->

    <!-- Start:: Pagination -->
    <template>
      <div class="pagination_container text-center mt-3 mb-0">
        <v-pagination class="py-0" square v-model="paginations.current_page" :length="paginations.last_page"
          :total-visible="6" @input="updateRouterQueryParam($event)" :prev-icon="getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
            " :next-icon="getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
    " />
      </div>
    </template>
    <!-- End:: Pagination -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllOffers",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    activeStatuses() {
      return [
        {
          id: null,
          name: this.$t("STATUS.all"),
          value: null,
        },
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: 0,
        }

      ];
    },
  },

  data() {
    return {
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        offer_name: null,
        vehicle: null,
        vehicle_type: null,
        provider_name: null,
        status: null,
      },

      vehicle_types: [],
      Vehicles: [],
      providers: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Offers.serialNumber"),
          value: "serialNumber",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.offer_name"),
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.vechile_name"),
          value: "vehicle.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.discount_percentage"),
          value: "offer_value",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Offers.startDate"),
          value: "offer_date_from",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Offers.endDate"),
          value: "offer_date_to",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.name_provider"),
          value: "provider.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Products.created_at"),
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.status"),
          value: "is_active",
          align: "center",
          width: "120",
          sortable: false,
        },
      ],

      tableRows: [],

      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogDelete: false,
      itemToDelete: null,
      // End:: Dialogs Control Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      // Start:: Page Permissions
      permissions: null,
      // Start:: Page Permissions
    };
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.setTableRows();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {

    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/offers/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.offer_name = null;
      this.filterOptions.vehicle = null;
      this.filterOptions.vehicle_type = null;
      this.filterOptions.provider_name = null;
      this.filterOptions.status = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/offers/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    // End:: Handel Filter

    // Start:: Set Table Rows
    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      });

      // Scroll To Screen's Top After Get Products
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    async setTableRows() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "offers",
          params: {
            page: this.paginations.current_page,
            name: this.filterOptions.offer_name,
            vehicle_id: this.filterOptions.vehicle?.id,
            vehicle_type_id: this.filterOptions.vehicle_type?.id,
            provider_id: this.filterOptions.provider_name?.id,
            status: this.filterOptions.status?.value,
          },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data);
        res.data.data.forEach((item, index) => {
          item.serialNumber = (this.paginations.current_page - 1) * this.paginations.items_per_page + index + 1;
        });
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // ==================== Start:: Crud ====================

    // all vehicle types

    async vehicleTypes() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "vehicleTypes",
        });
        this.vehicle_types = res.data.data;
        // this.vehicle_types.unshift({ name: this.$t("STATUS.all"), id: null, value: null });
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // all providers

    async AllProviders() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "allProviders",
        });
        this.providers = res.data.data;
        // this.providers.unshift({ name: this.$t("STATUS.all"), id: null, value: null });
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // all vehicles

    async getAllVehicles() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "vehicles",
        });
        this.Vehicles = res.data.data;
        // this.Vehicles.unshift({ name: this.$t("STATUS.all"), id: null, value: null });
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
    this.vehicleTypes();
    this.AllProviders();
    this.getAllVehicles();
    // End:: Fire Methods
  },
};
</script>
