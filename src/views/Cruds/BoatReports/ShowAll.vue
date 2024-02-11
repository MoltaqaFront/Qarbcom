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

              <!-- Start:: Status Input -->
              <base-select-input col="3" :optionsList="clients_list" :placeholder="$t('PLACEHOLDERS.Vehicle')"
                v-model="filterOptions.boats_requested" />
              <!-- End:: Status Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="3" :optionsList="providers_list" :placeholder="$t('PLACEHOLDERS.name_provider')"
                v-model="filterOptions.name" />
              <!-- End:: Status Input -->

              <!-- Start:: Name Input -->
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.service_provider_code')"
                v-model.trim="filterOptions.service_provider_code" />
              <!-- End:: Name Input -->

              <!-- Start:: Start Date Input -->
              <base-picker-input col="3" type="date" :placeholder="$t('PLACEHOLDERS.startDate')"
                v-model.trim="filterOptions.from_date" />
              <!-- End:: Start Date Input -->

              <!-- Start:: End Date Input -->
              <base-picker-input col="3" type="date" :placeholder="$t('PLACEHOLDERS.endDate')"
                v-model.trim="filterOptions.to_date" />
              <!-- End:: End Date Input -->

              <div class="col-5">

                <!-- Start:: Deactivate Switch Input -->
                <div class="input_wrapper switch_wrapper my-5">
                  <v-switch color="green" :label="$t('PLACEHOLDERS.boats_most_complaints')"
                    v-model="filterOptions.most_complaints" hide-details></v-switch>
                </div>
                <!-- End:: Deactivate Switch Input -->

              </div>


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
          <h5>{{ $t("PLACEHOLDERS.boat_reports") }}</h5>
          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div class="title_route_wrapper">
          <base-button class="mt-0 pdf_btn" styleType="solid_btn" :btnText="$t('BUTTONS.downloadPdf')"
            @fireClick="downloadPdf" :disabled="pdfDownloadBtnIsLoading">
            <template v-slot:btn_icon>
              <i class="fal fa-file-pdf"></i>
            </template>
          </base-button>
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
        <!-- Start:: No Data State -->

        <template v-slot:[`item.serialNumber`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.serialNumber">-</p>
          <p v-else>{{ item.serialNumber }}</p>
        </template>

        <template v-slot:[`item.provider.code`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.provider.code">-</p>
          <p v-else>{{ item.provider.code }}</p>
        </template>

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

    <!-- Start:: Generate PDF Template Content -->
    <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
      :filename="$t('PLACEHOLDERS.boat_reports')" :pdf-quality="2" pdf-format="a4" :manual-pagination="false"
      :paginate-elements-by-height="1400" pdf-content-width="100%" @progress="bdfDownloadBtnIsLoading = true"
      @hasGenerated="$message.success($t('MESSAGES.generatedSuccessfully'))" ref="html2Pdf">
      <section slot="pdf-content">
        <div class="pdf_file_content">
          <h1 class="file_title"> {{ $t('PLACEHOLDERS.boat_reports') }} </h1>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th v-for="header in tableHeaders" :key="header.value">
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableRows" :key="row.id">
                  <td>{{ row.serialNumber ? row.serialNumber : '-' }}</td>
                  <td>{{ row.name ? row.name : '-' }}</td>
                  <td>{{ row.id ? row.id : '-' }}</td>
                  <td>{{ row.provider.name ? row.provider.name : '-' }}</td>
                  <td>{{ row.provider.code ? row.provider.code : '-' }}</td>
                  <td>{{ row.provider.company_name ? row.provider.company_name : '-' }}</td>
                  <td>{{ row.number_of_orders ? row.number_of_orders : '-' }}</td>
                  <td>{{ row.number_of_complaints ? row.number_of_complaints : '-' }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </section>
    </vue-html2pdf>
    <!-- End:: Generate PDF Template Content -->
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import { mapGetters } from "vuex";

export default {
  name: "AllFinancialReports",

  components: {
    VueHtml2pdf
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    clients_list() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.boats_most_requested"),
          value: "most",
        },
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.boats_least_requested"),
          value: "min",
        },
      ]
    },

    tableItemKey() {
      return this.tableHeaders.find(header => header.value === 'id').value;
    },

  },

  data() {
    return {
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      pdfDownloadBtnIsLoading: false,
      excelDownloadBtnIsLoading: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
        boats_requested: null,
        most_complaints: null,
        service_provider_code: null,
        from_date: null,
        to_date: null
      },
      providers_list: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.FinancialReports.serialNumber"),
          value: "serialNumber",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.vechile_name"),
          value: "name",
          align: "center",
          sortable: false,
        },
        // {
        //   text: this.$t("PLACEHOLDERS.service_provider_code"),
        //   value: "code",
        //   align: "center",
        //   sortable: false,
        // },
        {
          text: this.$t("PLACEHOLDERS.name_provider"),
          value: "provider.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.provider_code"),
          value: "provider.code",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.company_name"),
          value: "provider.company_name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.number_of_requests"),
          value: "number_of_orders",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.number_of_complaints"),
          value: "number_of_complaints",
          align: "center",
          sortable: false,
        }
      ],
      tableRows: [],
      // End:: Table Data

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
        await this.$router.push({ path: '/boat-reports/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {

      this.filterOptions.name = null;
      this.filterOptions.boats_requested = null;
      this.filterOptions.most_complaints = null;
      this.filterOptions.service_provider_code = null;
      this.filterOptions.from_date = null;
      this.filterOptions.to_date = null;

      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/boat-reports/all', query: { page: 1 } });
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
          url: "vehicles/vehicle-reports",
          params: {
            page: this.paginations.current_page,
            providerName: this.filterOptions.name?.name,
            popularVehicles: this.filterOptions.boats_requested?.value,
            mostVehicleComplaints: +this.filterOptions.most_complaints,
            providerCode: this.filterOptions.service_provider_code,
            start_date: this.filterOptions.from_date,
            end_date: this.filterOptions.to_date,
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

    // Start:: Handling Download Files
    async downloadPdf() {
      await this.$refs.html2Pdf.generatePdf();
      this.pdfDownloadBtnIsLoading = false;
    },
    // End:: Handling Download Files

    // ==================== Start:: Crud ====================

    async AllProviders() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "allProviders",
        });
        this.loading = false;

        this.providers_list = res.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/boat-reports/show/${item.id}` });
    },
    // ===== End:: Show
    // ==================== End:: Crud ====================
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
    this.AllProviders();
    // End:: Fire Methods
  },
};
</script>
