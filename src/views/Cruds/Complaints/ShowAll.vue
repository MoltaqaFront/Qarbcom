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
              <!-- Start:: Name Input -->
              <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.client_name')"
                v-model.trim="filterOptions.name" />
              <!-- End:: Name Input -->

              <!-- Start:: Phone Input -->
              <base-input col="4" type="tel" :placeholder="$t('PLACEHOLDERS.clientPhone')"
                v-model.trim="filterOptions.phone" />
              <!-- End:: Phone Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="4" :optionsList="AllProviders" :placeholder="$t('PLACEHOLDERS.provider_type_2')"
                v-model="filterOptions.type" />
              <!-- End:: Status Input -->

            </div>

            <div class="btns_wrapper">

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.search") }}</span>
                </template>
                <span class="submit_btn" @click="submitFilterForm" :disabled="isWaitingRequest">
                  <i class="fal fa-search"></i>
                </span>
              </a-tooltip>

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.rseet_search") }}</span>
                </template>
                <span class="reset_btn" :disabled="isWaitingRequest" @click="resetFilter">
                  <i class="fal fa-redo"></i>
                </span>
              </a-tooltip>

            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("PLACEHOLDERS.complaints") }}</h5>
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

        <!-- Start:: Name -->
        <template v-slot:[`item.client.name`]="{ item }">
          <h6 class="text-danger" v-if="!item.client.name"> {{ $t("TABLES.noData") }} </h6>
          <h6 v-else> {{ item.client.name }} </h6>
        </template>

        <template v-slot:[`item.provider.company_name`]="{ item }">
          <h6 class="text-danger" v-if="!item.provider.company_name"> - </h6>
          <h6 v-else> {{ item.provider.company_name }} </h6>
        </template>
        <!-- End:: Name -->

        <!-- Start:: Complaint Content -->
        <template v-slot:[`item.reason`]="{ item }">
          <span class="text-danger" v-if="!item.reason"> {{ $t("TABLES.noData") }} </span>
          <div class="actions" v-else>
            <button class="btn_show" @click="showComplaintModal(item.reason)">
              <i class="fal fa-file-alt"></i>
            </button>
          </div>
        </template>
        <!-- End:: Complaint Content -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">

            <a-tooltip placement="bottom" v-if="$can('complaints show', 'complaints')">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>


            <!-- v-if="$can('complaints accept', 'complaints')" -->
            <a-tooltip placement="bottom" v-if="item.vehicle.status == 1">
              <template slot="title">
                <span>{{ $t("PLACEHOLDERS.disable_boat") }}</span>
              </template>
              <button class="btn_deactivate" @click="selectDeactivateItemVehicle(item)">
                <i class="fas fa-car-crash"></i>
              </button>
            </a-tooltip>

            <!-- v-if="$can('complaints reject', 'complaints')" -->

            <a-tooltip placement="bottom" v-if="item.provider.status == 1">
              <template slot="title">
                <span>{{ $t("PLACEHOLDERS.disable_service_provider") }}</span>
              </template>
              <button class="btn_deactivate" @click="selectDeactivateItem(item)">
                <i class="fas fa-user-times"></i>
              </button>
            </a-tooltip>

          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>

          <!-- Start:: Complaint Modal -->
          <description-modal v-if="dialogComplaint" :modalIsOpen="dialogComplaint"
            :modalDesc="selectedComplaintTextToShow" @toggleModal="dialogComplaint = !dialogComplaint" />
          <!-- End:: Complaint Modal -->

          <!-- Start:: Deactivate provider Modal -->
          <v-dialog v-model="dialogDeactivate">
            <v-card>

              <form class="w-100">
                <base-input col="12" rows="3" type="textarea" :placeholder="$t('PLACEHOLDERS.disable_reason')"
                  v-model.trim="deactivateReason" required />
              </form>

              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="HandlingItemActivationStatus" :disabled="!(!!deactivateReason)">
                  {{ $t("BUTTONS.ok") }}
                </v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDeactivate = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Deactivate provider Modal -->

          <!-- Start:: Deactivate vehicle Modal -->
          <v-dialog v-model="dialogDeactivateVehicle">
            <v-card>

              <form class="w-100">
                <base-input col="12" rows="3" type="textarea" :placeholder="$t('PLACEHOLDERS.disable_reason')"
                  v-model.trim="deactivateReason" required />
              </form>

              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="HandlingVehicleDisabled" :disabled="!(!!deactivateReason)">
                  {{ $t("BUTTONS.ok") }}
                </v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDeactivateVehicle = false">{{ $t("BUTTONS.cancel")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Deactivate  vehicle Modal -->

        </template>
        <!-- ======================== End:: Dialogs ======================== -->


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
import { mapGetters } from "vuex";

export default {
  name: "AllClients",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
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
        name: null,
        phone: null,
        type: null,
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
          text: this.$t("PLACEHOLDERS.client_name"),
          value: "client.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.orderNumber"),
          value: "order_id",
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
          text: this.$t("PLACEHOLDERS.name_provider"),
          value: "provider.name",
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
          text: this.$t("PLACEHOLDERS.complaint"),
          value: "reason",
          align: "center",
          width: "120",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.complaint_date"),
          value: "created_at",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.StoresTypes.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
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

      // Start:: Dialogs Control Data
      dialogComplaint: false,
      selectedComplaintTextToShow: "",
      // End:: Dialogs Control Data

      dialogDeactivate: false,
      dialogDeactivateVehicle: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,

      Vehicle: false,
      dialogDelete: false,
      itemToDelete: null,

      AllProviders: []

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
        await this.$router.push({ path: '/complaints/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.phone = null;
      this.filterOptions.type = null;

      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/complaints/all', query: { page: 1 } });
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

        let nameParam = this.filterOptions.name;
        if (!nameParam) {
          nameParam = null;
        }

        let res = await this.$axios({
          method: "GET",
          url: "complaints",
          params: {
            page: this.paginations.current_page,
            client_name: nameParam,
            client_mobile: this.filterOptions.phone,
            provider_id: this.filterOptions.type?.id
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

    // ===== Start:: Handling Deactivation vehicle

    selectDeactivateItem(item) {
      console.log(item)
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },

    selectDeactivateItemVehicle(item) {
      console.log(item)
      this.dialogDeactivateVehicle = true;
      this.itemToChangeActivationStatus = item;
    },

    async HandlingItemActivationStatus() {
      this.dialogDeactivate = false;

      const REQUEST_DATA = {};
      // Start:: Append Request Data
      REQUEST_DATA.provider_id = this.itemToChangeActivationStatus.provider.id;
      REQUEST_DATA.reason = this.deactivateReason;
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `complaints/disActive-provider`,
          data: REQUEST_DATA,
        });
        this.$message.error(this.$t("PLACEHOLDERS.service_provider_disabled"));
        this.setTableRows();
        this.itemToChangeActivationStatus = null;
        this.deactivateReason = null;
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },

    async HandlingVehicleDisabled() {
      this.dialogDeactivateVehicle = false;

      const REQUEST_DATA = {};
      // Start:: Append Request Data
      REQUEST_DATA.vehicle_id = this.itemToChangeActivationStatus.vehicle.id;
      REQUEST_DATA.reason = this.deactivateReason;
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `complaints/disActive-vehicle`,
          data: REQUEST_DATA,
        });
        this.$message.error(this.$t("PLACEHOLDERS.boat_disabled"));
        this.setTableRows();
        this.itemToChangeActivationStatus = null;
        this.deactivateReason = null;
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },

    // ===== End:: Handling Deactivation vehicle

    // ==================== Start:: Crud ====================

    // Start:: Control Modals
    showComplaintModal(Complaint) {
      this.dialogComplaint = true;
      this.selectedComplaintTextToShow = Complaint;
    },
    // End:: Control Modal

    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/complaints/show/${item.id}` });
    },
    // ===== End:: Show

    // ===== Start:: deActive provider

    async confirmAcceptItem(item) {
      try {
        await this.$axios({
          method: "GET",
          url: `joinProviders/accept/${item.id}`,
        });

        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.accept_join_request"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },

    // ===== End:: deActive provider

    async getProviders() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "allProviders",
        });
        this.loading = false;
        this.AllProviders = res.data.data;
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
<style>
span.submit_btn {
  width: 45px;
  height: 45px;
  font-size: 16px;
  border-radius: 10px;
  color: var(--white_clr);
  transition: all 0.3s linear;
  background-color: #F6A513;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>