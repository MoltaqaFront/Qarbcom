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
              <!-- Start:: Order Number Input -->
              <base-input col="3" type="number" :placeholder="$t('PLACEHOLDERS.orderNumber')"
                v-model="filterOptions.orderNumber" />
              <!-- End:: Order Number Input -->

              <!-- Start:: Client Name Input -->
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.clientName')"
                v-model="filterOptions.clientName" />
              <!-- End:: Client Name Input -->

              <!-- Start:: Driver Name Input -->
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.clientPhone')"
                v-model="filterOptions.clientPhone" />
              <!-- End:: Driver Name Input -->
              <!-- Start:: Name Input -->
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.company_name')"
                v-model.trim="filterOptions.company_name" />
              <!-- End:: Name Input -->

              <base-select-input col="3" :optionsList="providers" :placeholder="$t('PLACEHOLDERS.name_provider')"
                v-model="filterOptions.name" />

              <!-- Start:: Name Input -->
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.provider_code')"
                v-model.trim="filterOptions.provider_code" />
              <!-- End:: Name Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="3" :optionsList="Types" :placeholder="$t('PLACEHOLDERS.provider_type')"
                v-model="filterOptions.type" />
              <!-- End:: Status Input -->

              <!-- Start:: Status Input -->
              <!-- <base-select-input col="3" :optionsList="allStatus" :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.status" /> -->
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
          <h5>{{ $t("PLACEHOLDERS.trip_postponement_requests") }}</h5>

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
        <!-- Start:: No Data State -->

        <template v-slot:[`item.serialNumber`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.serialNumber">-</p>
          <p v-else>{{ item.serialNumber }}</p>
        </template>

        <template v-slot:[`item.provider.code`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.provider.code">-</p>
          <p v-else>{{ item.provider.code }}</p>
        </template>

        <!-- Start:: Driver -->
        <template v-slot:[`item.provider.company_name`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.provider.company_name">-</p>
          <p v-else>{{ item.provider.company_name }}</p>
        </template>
        <!-- End:: Driver -->

        <!-- Start:: Order Status -->
        <template v-slot:[`item.status`]="{ item }">
          <v-chip color="secondary" text-color="white" small>
            {{ item.status }}
          </v-chip>
        </template>
        <!-- Start:: Order Status -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">

            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.download_invoice") }}</span>
              </template>
              <!-- @click="DownloadInvoice(item)" -->
              <button class="btn_show" @click="downloadPdf(item)">
                <i class="fal fa-download"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom" v-if="$can('orders create', 'orders')">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <template v-else>
              <i class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"></i>
            </template>
          </div>
        </template>
        <!-- End:: Actions -->

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
      filename="report" :pdf-quality="2" pdf-format="a4" :manual-pagination="false" :paginate-elements-by-height="1400"
      pdf-content-width="100%" @progress="bdfDownloadBtnIsLoading = true"
      @hasGenerated="$message.success($t('MESSAGES.generatedSuccessfully'))" ref="html2Pdf">
      <section slot="pdf-content">
        <div class="pdf_file_content">
          <!-- <tr v-for="(value, key) in itemReport" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr> -->

          <table class="table table-striped">
            <tbody>
              <tr class="text-center">
                <!-- <td>
                  <span>{{ $t("TABLES.Rates.serialNumber") }}</span>
                  <span>{{ $t("TABLES.Rates.serialNumber") }}</span>
                </td>
                <td>
                  <span>{{ $t("TABLES.Rates.serialNumber") }}</span>
                  <span>{{ $t("TABLES.Rates.serialNumber") }}</span>
                </td> -->
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.quick_response_code") }}</td>
                <!-- <td>{{ quick_response_code }}</td> -->
              </tr>

              <tr class="text-center">
                <td>{{ $t("TABLES.Rates.serialNumber") }}</td>
                <td>{{ serialNumber }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.invoice_issue_date") }}</td>
                <td>{{ invoice_issue_date }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.name_provider") }}</td>
                <td>{{ name_provider }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.company_name") }}</td>
                <td>{{ company_name }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.tax_number") }}</td>
                <td>{{ tax_number }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.boat_name") }}</td>
                <td>{{ boat_name }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.number_of_individuals") }}</td>
                <td>{{ number_of_individuals }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.total_trip_price") }}</td>
                <td>{{ total_trip_price }}</td>
              </tr>

              <tr class="text-center" v-for="(item, index) in companion_service" :key="'p' + index">

                <td>
                  <span>{{ $t("PLACEHOLDERS.companion_service_name") }} : </span>
                  <span>{{ item.name }}</span>
                </td>
                <td>
                  <span>{{ $t("PLACEHOLDERS.companion_service_price") }} : </span>
                  <span>{{ item.price }}</span>
                </td>

                <!-- <td>{{ $t("PLACEHOLDERS.companion_service_name") }}</td>
                <td>{{ companion_service_name }}</td> -->
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.total_companion_service_price") }}</td>
                <td>{{ total_companion_service_price }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.value_added_tax") }}</td>
                <td>{{ value_added_tax }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.total_booking_price") }}</td>
                <td>{{ total_booking_price }}</td>
              </tr>

            </tbody>
          </table>

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
  name: "AllOrders",

  components: {
    VueHtml2pdf
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    Types() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.individual"),
          value: "individual",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.company"),
          value: "company",
        }
      ];
    },

    allStatus() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.new"),
          value: "new",
        },
        {
          id: 2,
          name: this.$t("STATUS.accepted"),
          value: "accepted",
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
        orderNumber: null,
        clientName: null,
        name: null,
        company_name: null,
        clientPhone: null,
        type: null,
        provider_code: null,
        status: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Rates.serialNumber"),
          value: "serialNumber",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.orderNumber"),
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Orders.clientName"),
          value: "client.name",
          sortable: false,
          align: "center",
        },
        // {
        //   text: this.$t("PLACEHOLDERS.clientPhone"),
        //   value: "user.phone",
        //   sortable: false,
        //   align: "center",
        // },
        {
          text: this.$t("PLACEHOLDERS.name_provider"),
          value: "provider.name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.provider_code"),
          value: "provider.code",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.company_name"),
          value: "provider.company_name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.totalPrice"),
          value: "order.total_price",
          sortable: false,
          align: "center",
        },
        // {
        //   text: this.$t("TABLES.Orders.orderStatus"),
        //   value: "status",
        //   align: "center",
        //   sortable: false,
        //   width: "120",
        // },
        {
          text: this.$t("PLACEHOLDERS.postponement_request_date"),
          value: "postpone_order.created_at",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.actions"),
          value: "actions",
          sortable: false,
          align: "center",
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

      providers: [],

      status_modal: null,
      reason: '',

      serialNumber: null,
      quick_response_code: null,
      invoice_issue_date: null,
      name_provider: null,
      company_name: null,
      tax_number: null,
      service_provider_address: null,
      boat_name: null,
      number_of_individuals: null,
      total_trip_price: null,
      companion_service: [],
      companion_service_name: null,
      companion_service_price: null,
      total_companion_service_price: null,
      value_added_tax: null,
      total_booking_price: null,
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
      this.setTableRows();
    },

    async resetFilter() {

      this.filterOptions.orderNumber = null;
      this.filterOptions.clientName = null;
      this.filterOptions.clientPhone = null;
      this.filterOptions.name = null;
      this.filterOptions.company_name = null;
      this.filterOptions.type = null;
      this.filterOptions.provider_code = null;
      this.filterOptions.status = null;

      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/postponeorders/all', query: { page: 1 } });
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
          url: "/postpone-orders",

          params: {
            page: this.paginations.current_page,

            providerName: this.filterOptions.name?.name,
            id: this.filterOptions.orderNumber,
            userName: this.filterOptions.clientName,
            userMobile: this.filterOptions.clientPhone,
            orderStatus: this.filterOptions.status?.name,
            providerCode: this.filterOptions.provider_code,
            providerType: this.filterOptions.type?.value,
            companyName: this.filterOptions.company_name,

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
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/postponeorders/show/${item.id}` });
    },
    // ===== End:: Show

    // ===== End:: download pdf
    async DownloadInvoice(item) {

      try {
        await this.$axios({
          method: "GET",
          url: `admin/download-invoices/${item.id}`,
        });
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }

    },

    // ===== End:: download pdf
    // Start:: Handling Download Files
    async downloadPdf(item) {

      this.serialNumber = item.id;
      this.quick_response_code = item.qr_code;
      this.invoice_issue_date = item.postpone_order.created_at;
      this.name_provider = item.provider.name;
      this.company_name = item.provider.company_name;

      this.tax_number = item.vehicle.license_plate;

      this.boat_name = item.vehicle.name;

      this.number_of_individuals = item.order.n_of_passengers;
      this.total_trip_price = item.order.total_trip_price;

      this.total_companion_service_price = item.order.additional_services_price;

      this.value_added_tax = item.order.tax_rate;
      this.total_booking_price = item.order.total_price;
      this.companion_service = item.order.additional_services_name;


      await this.$refs.html2Pdf.generatePdf();
      this.pdfDownloadBtnIsLoading = false;

    },
    // End:: Handling Download Files
    async getProviders() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "allProviders",
        });
        this.loading = false;
        this.providers = res.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

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
    this.getProviders();

    // End:: Fire Methods
  },
};
</script>

<style lang="scss">
.table-striped {
  margin-top: 50px;

  tbody {

    tr {
      &:nth-child(odd) {
        background-color: #EEE !important;
      }
    }

  }
}
</style>