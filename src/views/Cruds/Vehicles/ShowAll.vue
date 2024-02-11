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
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.name_provider')"
                v-model.trim="filterOptions.providerName" />
              <!-- End:: Name Input -->

              <!-- Start:: Name Input -->
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.provider_code')"
                v-model.trim="filterOptions.providerCode" />
              <!-- End:: Name Input -->

              <!-- Start:: Phone Input -->
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.vechile_name')"
                v-model.trim="filterOptions.name" />
              <!-- End:: Phone Input -->

              <!-- Start:: email Input -->
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.vechile_code')"
                v-model.trim="filterOptions.vechile_code" />
              <!-- End:: email Input -->

              <!-- Start:: Name Input -->
              <base-select-input col="3" :optionsList="allVehicleTypes" :placeholder="$t('PLACEHOLDERS.type_vechile')"
                v-model.trim="filterOptions.vehicleType" />
              <!-- End:: Name Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="3" :optionsList="Types" :placeholder="$t('PLACEHOLDERS.distinctive_vehicle')"
                v-model="filterOptions.type" />
              <!-- End:: Status Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="3" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.isActive" />
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
          <h5>{{ $t("PLACEHOLDERS.service_provider_vehicles") }}</h5>
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
        <template v-slot:[`item.provider.code`]="{ item }">
          <h6 class="text-danger" v-if="!item.provider.code"> - </h6>
          <h6 v-else> {{ item.provider.code }} </h6>
        </template>
        <!-- End:: Name -->

        <template v-slot:[`item.provider.company_name`]="{ item }">
          <h6 class="text-danger" v-if="!item.provider.company_name"> - </h6>
          <h6 v-else> {{ item.provider.company_name }} </h6>
        </template>

        <!-- Start:: Activation -->
        <template v-slot:[`item.is_special`]="{ item }">
          <!-- v-if="permissions.activate" -->
          <div class="activation" dir="ltr" style="z-index: 1" v-if="$can('countries activate', 'countries')">
            <v-switch class="mt-2" color="success" v-model="item.is_special" hide-details
              @change="changeActivationStatus(item)"></v-switch>
          </div>
        </template>
        <!-- End:: Activation -->

        <template v-slot:[`item.vehicle_status`]="{ item }">
          <v-chip v-if="item.vehicle_status === 'waitedForReview'" color="deep-purple darken-1" text-color="white" small>
            {{ $t("PLACEHOLDERS.awaiting_review") }}
          </v-chip>
          <v-chip v-else-if="item.vehicle_status === 'accepted'" color="blue-grey darken-1" text-color="white" small>
            {{ $t("STATUS.accepted") }}
          </v-chip>
          <v-chip v-else-if="item.vehicle_status === 'admin'" color="info" text-color="white" small>
            {{ $t("STATUS.rejected") }}
          </v-chip>
        </template>

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">

            <a-tooltip placement="bottom" v-if="$can('vehicles show', 'vehicles')">
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

            <a-tooltip placement="bottom" v-if="item.vehicle_status === 'waitedForReview'">
              <template slot="title">
                <span>{{ $t("MESSAGES.accept_provider") }}</span>
              </template>
              <button class="btn_activate" @click="confirmAcceptItem(item)">
                <i class="fad fa-check-circle"></i>
              </button>
            </a-tooltip>

            <template>
              <a-tooltip placement="bottom" v-if="item.vehicle_status === 'waitedForReview'">
                <template slot="title">
                  <span>{{ $t("MESSAGES.reject_provider") }}</span>
                </template>
                <button class="btn_deactivate" @click="selectDeactivateItem(item)">
                  <i class="fad fa-times-circle"></i>
                </button>
              </a-tooltip>
            </template>

          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>

          <!-- Start:: Deactivate Modal -->
          <v-dialog v-model="dialogDeactivate">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToChangeActivationStatus">
                {{ $t("TITLES.rejectConfirmingMessage", { name: itemToChangeActivationStatus.name }) }}
              </v-card-title>

              <form class="w-100">
                <base-input col="12" rows="3" type="textarea" :placeholder="$t('PLACEHOLDERS.deactivateReason')"
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
          <!-- End:: Deactivate Modal -->

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

    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: 0,
        },
        {
          id: 3,
          name: this.$t("STATUS.all"),
          value: null,
        },
      ];
    },

    Types() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
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
        name: null,
        providerName: null,
        providerCode: null,
        vehicleType: null,
        vechile_code: null,
        type: null,
        isActive: null,
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
          text: this.$t("PLACEHOLDERS.vechile_name"),
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.vechile_code"),
          value: "code",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.type_vechile"),
          value: "vehicle_type.name",
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
          text: this.$t("PLACEHOLDERS.status"),
          value: "vehicle_status",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.distinctive_vehicle"),
          value: "is_special",
          align: "center",
          width: "120",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.actions"),
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

      dialogDeactivate: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,
      dialogDelete: false,
      itemToDelete: null,

      allVehicleTypes: []

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
        await this.$router.push({ path: '/vehicles/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {

      this.filterOptions.name = null;
      this.filterOptions.providerName = null;
      this.filterOptions.providerCode = null;
      this.filterOptions.vehicleType = null;
      this.filterOptions.vechile_code = null;
      this.filterOptions.type = null;
      this.filterOptions.isActive = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/vehicles/all', query: { page: 1 } });
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
          url: "vehicles",

          params: {
            page: this.paginations.current_page,
            name: nameParam,
            providerName: this.filterOptions.providerName,
            providerCode: this.filterOptions.providerCode,
            vehicleType: this.filterOptions.vehicleType?.id,
            vehicleCode: this.filterOptions.vechile_code,
            special: this.filterOptions.type?.value,
            status: this.filterOptions.isActive?.value,
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
      this.$router.push({ path: `/vehicles/show/${item.id}` });
    },
    // ===== End:: Show

    // Start:: Change Activation Status
    async changeActivationStatus(item) {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `vehicles/specialProcess/${item.id}`,
        });
        this.setTableRows();
        this.$message.success(res.data.message);
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Change Activation Status

    async showVehicleTypes() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `vehicleTypes`,
        });
        this.allVehicleTypes = res.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // ===== Start:: Handling Activation & Deactivation
    selectDeactivateItem(item) {
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },
    async HandlingItemActivationStatus(selectedItem) {
      this.dialogDeactivate = false;
      let targetItem = this.itemToChangeActivationStatus ? this.itemToChangeActivationStatus : selectedItem;
      const REQUEST_DATA = {};
      // Start:: Append Request Data
      REQUEST_DATA.reject_reason = this.deactivateReason;
      REQUEST_DATA.status = "rejected";
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `vehicles/change-vehicle-status/${targetItem.id}`,
          data: REQUEST_DATA,
        });
        this.$message.error(this.$t("MESSAGES.reject_join_request"));
        this.setTableRows();
        this.itemToChangeActivationStatus = null;
        this.deactivateReason = null;
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },

    async confirmAcceptItem(item) {
      try {
        await this.$axios({
          method: "POST",
          url: `vehicles/change-vehicle-status/${item.id}`,
          data: {
            "status": "accepted"
          }
        });

        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.accept_join"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Handling Activation & Deactivation

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
    this.showVehicleTypes();
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