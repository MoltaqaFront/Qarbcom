<template>
  <div class="side_nav_wrapper" :class="{ active: navIsActive }">
    <!-- Start:: Toggle Btn -->
    <button class="close_btn" @click="$emit('fireToggleNavDrawerEmit')">
      <i class="fal fa-times"></i>
    </button>
    <!-- End:: Toggle Btn -->

    <!-- Start:: Logo -->
    <div class="logo_wrapper">
      <router-link class="logo" to="/home">
        <img src="@/assets/media/logo/logo.png" alt="Logo" width="170" height="125" />
      </router-link>
    </div>
    <!-- End:: Logo -->

    <!-- Start:: Side Nav Links -->
    <div class="side_nav_links_wrapper">
      <!-- Start:: Home Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')">
        <router-link to="/home">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/home.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.dashboard") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Home Route -->

      <!-- Start:: notifications Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('notifications index', 'notifications')">
        <router-link to="/all-notifications/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/notifications.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.notifications.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: notifications Route -->

      <!-- Start:: clients Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('clients index', 'clients')">
        <router-link to="/clients/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/clients.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Clients.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: clients Route -->

      <!-- Start:: orders Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('orders index', 'orders')">
        <router-link to="/orders/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/booking.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("CHARTS.orders") }}
          </span>
        </router-link>
      </div>
      <!-- End:: clients Route -->

      <!-- Start:: postponeorders Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('postponeOrders index', 'postponeOrders')">
        <router-link to="/postponeorders/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/booking.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.trip_postponement_requests") }}
          </span>
        </router-link>
      </div>
      <!-- End:: clients Route -->

      <!-- Start:: Side Nav Routes -->
      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="vertical" :open-keys="openKeys" @openChange="onOpenChange">
          <!-- Start:: Side Nav Tab -->
          <a-sub-menu v-for="item in sideNavbarList_provider" :key="item.key"
            :data-type="!item.children ? 'single_route' : ''" v-if="item.children">
            <template>
              <!-- ========= Start:: Main Tab -->
              <span slot="title" v-if="item.hasPermission">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>
              <!-- ========= End:: Main Tab -->

              <!-- ========= Start:: Nested Tabs -->
              <!--  -->
              <a-menu-item v-for="childItem in item.children" :key="childItem.key" v-if="childItem.hasPermission">
                <button class="text-start w-100" @click="$emit('fireToggleNavDrawerEmit')">
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
              <!-- ========= End:: Nested Tabs -->
            </template>

          </a-sub-menu>
          <!-- End:: Side Nav Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: Side Nav reports Routes -->
      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="vertical" :open-keys="openKeys" @openChange="onOpenChange">
          <!-- Start:: Side Nav Tab -->
          <a-sub-menu v-for="item in sideNavbarList_reports" :key="item.key"
            :data-type="!item.children ? 'single_route' : ''" v-if="item.children">
            <template>
              <!-- ========= Start:: Main Tab -->
              <span slot="title" v-if="item.hasPermission">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>
              <!-- ========= End:: Main Tab -->

              <!-- ========= Start:: Nested Tabs -->
              <!--  -->
              <a-menu-item v-for="childItem in item.children" :key="childItem.key" v-if="childItem.hasPermission">
                <button class="text-start w-100" @click="$emit('fireToggleNavDrawerEmit')">
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
              <!-- ========= End:: Nested Tabs -->
            </template>

          </a-sub-menu>
          <!-- End:: Side Nav Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav reports Routes -->

      <!-- Start:: countries Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('countries index', 'countries')">
        <router-link to="/countries/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/areas.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Cities.showAll") }}
          </span>
        </router-link>
      </div>
      <!-- End:: countries Route -->

      <!-- Start:: districts Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('districts index', 'districts')">
        <router-link to="/states/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/addresses.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("BUTTONS.allStates") }}
          </span>
        </router-link>
      </div>
      <!-- End:: districts Route -->

      <!-- Start:: contactuses Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('contactuses index', 'contactuses')">
        <router-link to="/contact-messages/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/messages.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.ContactMessages.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: contactuses Route -->

      <!-- Start:: ads Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('sliders index', 'sliders')">
        <router-link to="/ads/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/image.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.ads") }}
          </span>
        </router-link>
      </div>
      <!-- End:: ads Route -->

      <!-- Start:: offers Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('offers index', 'offers')">
        <router-link to="/offers/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/offers.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Offers.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: offers Route -->

      <!-- Start:: complaints Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('complaints index', 'complaints')">
        <router-link to="/complaints/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/service.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.complaints") }}
          </span>
        </router-link>
      </div>
      <!-- End:: complaints Route -->

      <!-- Start:: rates Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('rates index', 'rates')">
        <router-link to="/rates/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/star.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.rates") }}
          </span>
        </router-link>
      </div>
      <!-- End:: rates Route -->

      <!-- Start:: vehicleTypes Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('vehicleTypes index', 'vehicleTypes')">
        <router-link to="/vehicleTypes/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/car.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.vechile_type") }}
          </span>
        </router-link>
      </div>
      <!-- End:: vehicleTypes Route -->

      <!-- Start:: vehicles Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('vehicles index', 'vehicles')">
        <router-link to="/vehicles/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/car.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.service_provider_vehicles") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Home Route -->

      <!-- Start:: anchors Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('anchors index', 'anchors')">
        <router-link to="/anchors/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/car.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.anchors") }}
          </span>
        </router-link>
      </div>
      <!-- End:: anchors Route -->

      <!-- Start:: services Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('services index', 'services')">
        <router-link to="/services/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/offers.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("TITLES.services") }}
          </span>
        </router-link>
      </div>
      <!-- End:: services Route -->

      <!-- Start:: additionalServices Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('additionalServices index', 'additionalServices')">
        <router-link to="/additionalServices/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/service.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.additional_services") }}
          </span>
        </router-link>
      </div>
      <!-- End:: additionalServices Route -->

      <!-- Start:: additionalFields Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('additionalFields index', 'additionalFields')">
        <router-link to="/additionalFields/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/service.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.additional_fields") }}
          </span>
        </router-link>
      </div>
      <!-- End:: additionalServices Route -->

      <!-- Start:: Side Nav Routes -->
      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="vertical" :open-keys="openKeys" @openChange="onOpenChange">
          <!-- Start:: Side Nav Tab -->
          <a-sub-menu v-for="item in sideNavbarList" :key="item.key" :data-type="!item.children ? 'single_route' : ''">
            <template v-if="item.children">
              <!-- ========= Start:: Main Tab -->
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>
              <!-- ========= End:: Main Tab -->

              <!-- ========= Start:: Nested Tabs -->
              <!-- v-if="childItem.hasPermission" -->
              <a-menu-item v-for="childItem in item.children" :key="childItem.hey">
                <button class="text-start w-100" @click="$emit('fireToggleNavDrawerEmit')">
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
              <!-- ========= End:: Nested Tabs -->
            </template>

          </a-sub-menu>
          <!-- End:: Side Nav Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: settings Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('settings index', 'settings')">
        <router-link to="/settings">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/settings.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.settings.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: settings Route -->

      <!-- Start:: users Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('users index', 'users')">
        <router-link to="/admins/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/admins.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Admins.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Users Route -->

      <!-- Start:: roles Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('roles index', 'roles')">
        <router-link to="/roles/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/roles.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Roles.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: roles Route -->

      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="inline">
          <!-- Start:: Logout Tab -->
          <a-sub-menu key="logout" @titleClick="logoutConfirmationModalIsOpen = true">
            <!-- ========= Start:: Main Tab -->
            <span slot="title" class="logout_btn">
              <img src="../../assets/media/icons/ui_icons/logout.svg" alt="icon" width="35" height="35" />
              <span>
                {{ $t("SIDENAV.Logout.title") }}
              </span>
            </span>
            <!-- ========= End:: Main Tab -->
          </a-sub-menu>
          <!-- End:: Logout Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: Logout Confirmation Modal -->
      <v-dialog v-model="logoutConfirmationModalIsOpen">
        <v-card>
          <v-card-title class="text-h5 justify-center">
            {{ $t("TITLES.logoutConfirmingMessage") }}
          </v-card-title>
          <v-card-actions>
            <v-btn class="modal_confirm_btn" @click="logout">{{
              $t("BUTTONS.logout")
            }}</v-btn>

            <v-btn class="modal_cancel_btn" @click="logoutConfirmationModalIsOpen = false">{{ $t("BUTTONS.cancel")
            }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End:: Logout Confirmation Modal -->
    </div>
    <!-- End:: Side Nav Links -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SideNav",

  emits: ["fireToggleNavDrawerEmit"],

  props: {
    navIsActive: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    // Start:: Vuex Get Authenticated User Data
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData"
    }),
    // End:: Vuex Get Authenticated User Data

    // Start:: Extract Side Nav Keys
    extractSideNavItemsKeys() {
      let extractedKeys = [];
      this.sideNavbarList.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      return extractedKeys;
    },
    // End:: Extract Side Nav Keys

    // Start:: Extract Side Nav Keys
    extractSideNavItemsKeys2() {
      let extractedKeys = [];
      this.sideNavbarList_provider.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      return extractedKeys;
    },
    // End:: Extract Side Nav Keys

  },

  data() {
    return {
      // Start:: Controle Open Tabs Data
      openKeys: [],
      // End:: Controle Open Tabs Data

      // Start:: Side Navbar List
      sideNavbarList: [
        {
          key: "appContent",
          title: this.$t("SIDENAV.AppContent.title"),
          icon: require("@/assets/media/icons/ui_icons/book_mark.svg"),
          children: [
            {
              key: "aboutUs",
              title: this.$t("SIDENAV.AppContent.aboutUs"),
              route: "/app-content/about-us",
              hasPermission: this.$can('staticPages index', 'staticPages'),
            },
            {
              key: "termsAndConditions",
              title: this.$t("SIDENAV.AppContent.termsAndConditions"),
              route: "/app-content/terms",
              hasPermission: this.$can('staticPages index', 'staticPages'),
            },
            {
              key: "privacyPolicy",
              title: this.$t("SIDENAV.AppContent.privacyPolicy"),
              route: "/app-content/policy",
              hasPermission: this.$can('staticPages index', 'staticPages'),
            },
            {
              key: "contact",
              title: this.$t("PLACEHOLDERS.contact_admins"),
              route: "/contact_settings",
              hasPermission: this.$can('staticPages index', 'staticPages'),
            },
          ],
        },

      ],
      // End:: Side Navbar List
      sideNavbarList_provider: [
        {
          key: "main",
          title: this.$t("PLACEHOLDERS.control_Providers"),
          icon: require("@/assets/media/icons/ui_icons/users.svg"),
          hasPermission: this.$can('providers index', 'providers'),
          children: [
            {
              key: "providers",
              title: this.$t("PLACEHOLDERS.providers"),
              route: "/providers/all",
              hasPermission: this.$can('providers index', 'providers'),
            },
            {
              key: "providers-join-request",
              title: this.$t("PLACEHOLDERS.providers-join-request"),
              route: "/providers-join-request/all",
              hasPermission: this.$can('providers index', 'providers'),
            },
            {
              key: "providers-employee",
              title: this.$t("PLACEHOLDERS.providers-employee"),
              route: "/providers-employee/all",
              hasPermission: this.$can('providers index', 'providers'),
            },
            {
              key: "service_provider_edit_requests",
              title: this.$t("PLACEHOLDERS.service_provider_edit_requests"),
              route: "/service_provider_edit_requests/all",
              hasPermission: this.$can('providers index', 'providers'),
            },
          ],
        },

      ],
      sideNavbarList_reports: [
        {
          key: "reports",
          title: this.$t("PLACEHOLDERS.reports"),
          icon: require("@/assets/media/icons/ui_icons/bill.svg"),
          hasPermission: this.$can('reports index', 'reports'),
          children: [
            {
              key: "customer-report",
              title: this.$t("PLACEHOLDERS.customer_reports"),
              route: "/customer-reports/all",
              hasPermission: this.$can('reports index', 'reports'),
            },
            {
              key: "boat_reports",
              title: this.$t("PLACEHOLDERS.boat_reports"),
              route: "/boat-reports/all",
              hasPermission: this.$can('reports index', 'reports'),
            },
            {
              key: "completed_orders_reports",
              title: this.$t("PLACEHOLDERS.completed_orders_reports"),
              route: "/completed-orders-report/all",
              hasPermission: this.$can('reports index', 'reports'),
            },
            {
              key: "incomplete_orders_reports",
              title: this.$t("PLACEHOLDERS.incomplete_orders_reports"),
              route: "/incomplete-orders-report/all",
              hasPermission: this.$can('reports index', 'reports'),
            },
          ],
        },

      ],
      // Start:: Modal Controlling Data
      logoutConfirmationModalIsOpen: false,
      // End:: Modal Controlling Data
    };
  },

  methods: {
    // Start:: Vuex Auth Actions
    ...mapActions({
      logout: "AuthenticationModule/logout"
    }),
    // End:: Vuex Auth Actions

    // Start:: Controle Open Tabs
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.extractSideNavItemsKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    // End:: Controle Open Tabs
  },

  created() {
  },
};
</script>
