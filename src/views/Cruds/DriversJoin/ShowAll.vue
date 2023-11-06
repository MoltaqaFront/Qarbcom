<template>
  <div class="show_all_content_wrapper" v-if="permissions">
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
              <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.driverName')"
                v-model.trim="filterOptions.name" />
              <!-- End:: Name Input -->

              <!-- Start:: Phone Number Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.phoneNumber')"
                v-model.trim="filterOptions.phone" />

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
          <h5>{{ $t("TITLES.drivers") }}</h5>
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

        <template v-slot:[`item.id`]="{ item, index }">
          <h6 class="text-danger" v-if="!item.id"> {{ $t("TABLES.noData") }} </h6>
          <span v-else> {{ index + 1 }} </span>
        </template>

        <!-- Start:: Item Image -->
        <template v-slot:[`item.image`]="{ item }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.image"> {{ $t("TABLES.noData") }} </h6>

            <button class="my-1" @click="showImageModal(item.image)" v-else>
              <img class="rounded" :src="item.image" :alt="item.name_ar" width="60" height="60" />
            </button>
          </div>
        </template>
        <!-- End:: Item Image -->

        <!-- Start:: Item Name -->
        <template v-slot:[`item.name`]="{ item }">
          <h6 class="text-danger" v-if="!item.name"> {{ $t("TABLES.noData") }} </h6>
          <span v-else> {{ item.name }} </span>
        </template>
        <!-- End:: Item Name -->

        <!-- Start:: Item Phone -->
        <template v-slot:[`item.phone`]="{ item }">
          <h6 class="text-danger" v-if="!item.phone"> {{ $t("TABLES.noData") }} </h6>
          <span v-else> {{ item.phone }} </span>
        </template>
        <!-- End:: Item Phone -->

        <!-- Start:: Item Email -->
        <template v-slot:[`item.email`]="{ item }">
          <h6 class="text-danger" v-if="!item.email">-</h6>
          <h6 class="text-danger" v-else-if="item.email == 'null' || item.email == ''">-</h6>
          <span v-else> {{ item.email }} </span>
        </template>
        <!-- End:: Item Email -->

        <!-- Start:: Item Address -->
        <template v-slot:[`item.address`]="{ item }">
          <h6 class="text-danger" v-if="!item.address"> {{ $t("TABLES.noData") }} </h6>
          <span v-else> {{ item.address }} </span>
        </template>
        <!-- End:: Item Address -->

        <!-- Start:: Item Driver Type -->
        <template v-slot:[`item.driver_type`]="{ item }">
          <h6 class="text-danger" v-if="!item.driver_type"> {{ $t("TABLES.noData") }} </h6>
          <v-chip v-else color="light-blue darken-2" text-color="white" small>
            <span v-if="item.driver_type == 'washing_polishing'">{{ $t("PLACEHOLDERS.washing_polishing") }}</span>
            <span v-else-if="item.driver_type == 'washing'">{{ $t("PLACEHOLDERS.normal_wash") }}</span>
            <span v-else-if="item.driver_type == 'delivery'">{{ $t("PLACEHOLDERS.delivery") }}</span>
          </v-chip>
        </template>
        <!-- End:: Item Driver Type -->

        <!-- Start:: Item Availability -->
        <template v-slot:[`item.online`]="{ item }">
          <div class="activation" dir="ltr" style="z-index: 1">
            <v-switch class="mt-2" color="success" v-model="item.online" hide-details
              @change="changeAvailabilityStatus(item)"></v-switch>
          </div>
        </template>
        <!-- End:: Item Availability -->

        <!-- Start:: Activation Status -->
        <template v-slot:[`item.is_active`]="{ item }">
          <span class="text-success text-h5" v-if="item.is_active">
            <i class="far fa-check"></i>
          </span>
          <span class="text-danger text-h5" v-else>
            <i class="far fa-times"></i>
          </span>
        </template>
        <!-- End:: Activation Status -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <a-tooltip placement="bottom" v-if="permissions.show">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>



            <template v-if="permissions.activate">
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("MESSAGES.accept_join") }}</span>
                </template>
                <!-- @click="confirmAcceptItem" -->
                <!-- @click="selectAcceptItem(item)" -->
                <button class="btn_activate" @click="confirmAcceptItem(item)">
                  <i class="fad fa-check-circle"></i>
                </button>
              </a-tooltip>

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("MESSAGES.reject_join") }}</span>
                </template>
                <button class="btn_deactivate" @click="selectDeactivateItem(item)">
                  <i class="fad fa-times-circle"></i>
                </button>
              </a-tooltip>
            </template>

            <template v-if="!permissions.show && !permissions.edit && !permissions.delete && !permissions.activate">
              <i class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"></i>
            </template>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Image Modal -->
          <image-modal v-if="dialogImage" :modalIsOpen="dialogImage" :modalImage="selectedItemImage"
            @toggleModal="dialogImage = !dialogImage" />
          <!-- End:: Image Modal -->

          <!-- Start:: Deactivate Modal -->
          <v-dialog v-model="dialogDeactivate">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToChangeActivationStatus">
                {{ $t("PLACEHOLDERS.change_status", { name: itemToChangeActivationStatus.name }) }}
              </v-card-title>

              <form class="w-100">
                <!-- <base-select-input col="12" :optionsList="availabilityStatuses" :placeholder="$t('PLACEHOLDERS.activate')"
                  v-model="filterOptions.isAvailable" /> -->
                <base-input col="12" rows="3" type="textarea" :placeholder="$t('PLACEHOLDERS.deactivateReason')"
                  v-model.trim="deactivateReason" required />
              </form>

              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="HandlingItemActivationStatus"
                  :disabled="(filterOptions.isAvailable && filterOptions.isAvailable.value == 0 && !(!!deactivateReason))">
                  {{ $t("BUTTONS.ok") }}
                </v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDeactivate = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Deactivate Modal -->

          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                {{ $t("TITLES.DeleteConfirmingMessage", { name: itemToDelete.name }) }}
              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmAcceptItem">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDelete = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Delete Modal -->
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
  name: "AllDrivers",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    driverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.normal_wash"),
          value: "washing",
        },
        // {
        //   id: 2,
        //   name: this.$t("PLACEHOLDERS.delivery"),
        //   value: "delivery",
        // },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.washing_polishing"),
          value: "washing_polishing",
        },
      ];
    },

    availabilityStatuses() {
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
      ];
    },

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
          id: null,
          name: this.$t("STATUS.all"),
          value: null,
        },
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
        phone: null,
        email: null,
        // driverType: null,
        // isAvailable: null,
        status: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Drivers.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Drivers.image"),
          value: "image",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Drivers.name"),
          value: "name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Drivers.phone"),
          value: "phone",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Drivers.email"),
          value: "email",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Drivers.createdAt"),
          value: "created_at",
          // width: "80",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Drivers.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogImage: false,
      selectedItemImage: null,
      dialogDeactivate: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,
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

      reasonActivate: null,

      changeStatus: null
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
        await this.$router.push({ path: '/drivers-join/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.phone = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/drivers-join/all', query: { page: 1 } });
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
          url: "admin/drivers-requests/index",
          params: {
            page: this.paginations.current_page,
            name: this.filterOptions.name,
            phone: this.filterOptions.phone,
          },
        });
        this.loading = false;
        console.log("All Data ==>", res.data.body);
        this.tableRows = res.data.body.drivers;
        this.paginations.last_page = res.data.body.meta.last_page;
        this.paginations.items_per_page = res.data.body.meta.per_page;
        this.permissions = res.data.body.permissions;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // Start:: Control Modals
    showImageModal(image) {
      this.dialogImage = true;
      this.selectedItemImage = image;
    },
    // Start:: Control Modals

    // ===== Start:: Handling Activation & Deactivation
    selectDeactivateItem(item) {
      console.log(item)
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
      this.changeStatus = item.id;
    },

    async HandlingItemActivationStatus(selectedItem) {
      this.dialogDeactivate = false;

      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("reason", this.deactivateReason);
      REQUEST_DATA.append("_method", "PUT");

      try {

        await this.$axios({
          method: "POST",
          url: `admin/drivers-requests/reject-request/${this.changeStatus}`,
          data: REQUEST_DATA,
        });
        this.$message.success(this.$t("MESSAGES.reject_join_message"));

        this.setTableRows();
        this.itemToChangeActivationStatus = null;
        this.deactivateReason = null;
        this.reasonActivate = null;
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Handling Activation & Deactivation

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/drivers-join/show/${item.id}` });
    },
    // ===== End:: Show

    // ===== Start:: Delete
    selectAcceptItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },
    async confirmAcceptItem(item) {
      try {
        await this.$axios({
          method: "PUT",
          url: `admin/drivers-requests/accept-request/${item.id}`
        });
        // this.dialogDelete = false;
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.verifiedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Delete
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
    // End:: Fire Methods
  },
};
</script>
