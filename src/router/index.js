import Vue from "vue";
import VueRouter from "vue-router";

// Start:: Importing Middleware
import auth from "../middleware/auth.js";
// End:: Importing Middleware

// Start:: Importing Router Components
import Authentication from "../pages/Authentication.vue";
import LoginForm from "../views/Auth/LoginForm.vue";
import ResetPasswordEmailForm from "../views/Auth/ResetPasswordEmailForm.vue";
import EmailVerificationForm from "../views/Auth/EmailVerificationForm.vue";
import ChangePhoneNumberForm from "../views/Auth/ChangePhoneNumber.vue";
import ResetPasswordForm from "../views/Auth/ResetPasswordForm.vue";
import AppContentWrapper from "../pages/AppContentWrapper.vue";

// ============== Start:: Home Page Route
import HomePage from "../pages/HomePage.vue";
// ============== End:: Home Page Route

// ============== Start:: Clients Routes
import ClientsHome from "../views/Cruds/Clients/Home.vue";
import AllClients from "../views/Cruds/Clients/ShowAll.vue";
import ShowClient from "../views/Cruds/Clients/Show.vue";
// ============== End:: Clients Routes

// ============== Start:: Regions  Routes
import RegionsHome from "../views/Cruds/Regions/Home.vue";
import AllRegions from "../views/Cruds/Regions/ShowAll.vue";
import CreateRegions from "../views/Cruds/Regions/Create.vue";
import EditRegions from "../views/Cruds/Regions/Edit.vue";
import ShowRegions from "../views/Cruds/Regions/Show.vue";
// ============== End:: Regions  Routes

// ============== Start:: States  Routes
import StatesHome from "../views/Cruds/States/Home.vue";
import AllStates from "../views/Cruds/States/ShowAll.vue";
import CreateStates from "../views/Cruds/States/Create.vue";
import EditStates from "../views/Cruds/States/Edit.vue";
import ShowStates from "../views/Cruds/States/Show.vue";
// ============== End:: Regions  Routes

// ============== Start:: Financial Reports Routes
import FinancialReportsHome from "../views/Cruds/FinancialReports/Home.vue";
import AllFinancialReports from "../views/Cruds/FinancialReports/ShowAll.vue";
import ShowFinancialReport from "../views/Cruds/FinancialReports/Show.vue";
// ============== End:: Financial Reports Routes

// ============== Start:: Financial Reports Routes
import PackageReportsHome from "../views/Cruds/PackageReports/Home.vue";
import AllPackageReports from "../views/Cruds/PackageReports/ShowAll.vue";
import ShowPackageReports from "../views/Cruds/PackageReports/Show.vue";
// ============== End:: Financial Reports Routes

// ============== Start:: States  Routes
import NationalitiesHome from "../views/Cruds/Nationalities/Home.vue";
import AllNationalities from "../views/Cruds/Nationalities/ShowAll.vue";
import CreateNationalities from "../views/Cruds/Nationalities/Create.vue";
import EditNationalities from "../views/Cruds/Nationalities/Edit.vue";
import ShowNationalities from "../views/Cruds/Nationalities/Show.vue";
// ============== End:: Regions  Routes

// ============== Start:: Employees  Routes
import EmployeesHome from "../views/Cruds/Employees/Home.vue";
import AllEmployees from "../views/Cruds/Employees/ShowAll.vue";
import CreateEmployees from "../views/Cruds/Employees/Create.vue";
import EditEmployees from "../views/Cruds/Employees/Edit.vue";
import ShowEmployees from "../views/Cruds/Employees/Show.vue";
// ============== End:: Employees  Routes

// ============== Start:: Drivers Routes
import DriversHome from "../views/Cruds/Drivers/Home.vue";
import AllDrivers from "../views/Cruds/Drivers/ShowAll.vue";
import CreateDriver from "../views/Cruds/Drivers/Create.vue";
import EditDriver from "../views/Cruds/Drivers/Edit.vue";
import ShowDriver from "../views/Cruds/Drivers/Show.vue";
// ============== End:: Drivers Routes

// ============== Start:: Drivers Routes
import DriversJoinHome from "../views/Cruds/DriversJoin/Home.vue";
import AllDriversJoin from "../views/Cruds/DriversJoin/ShowAll.vue";
import ShowDriverJoin from "../views/Cruds/DriversJoin/Show.vue";
// ============== End:: Drivers Routes

// ============== Start:: CarTypes Routes
import CarTypesHome from "../views/Cruds/CarTypes/Home.vue";
import AllCarTypes from "../views/Cruds/CarTypes/ShowAll.vue";
import CreateCarTypes from "../views/Cruds/CarTypes/Create.vue";
import ShowCarTypes from "../views/Cruds/CarTypes/Show.vue";
import EditCarTypes from "../views/Cruds/CarTypes/Edit.vue";
// ============== End:: CarTypes Routes

// ============== Start:: CarModals Routes
import CarModalsHome from "../views/Cruds/CarModals/Home.vue";
import AllCarModals from "../views/Cruds/CarModals/ShowAll.vue";
import CreateCarModals from "../views/Cruds/CarModals/Create.vue";
import ShowCarModals from "../views/Cruds/CarModals/Show.vue";
import EditCarModals from "../views/Cruds/CarModals/Edit.vue";
// ============== End:: CarModals Routes

// ============== Start:: Orders Routes
import OrdersHome from "../views/Cruds/Orders/Home.vue";
import AllOrders from "../views/Cruds/Orders/ShowAll.vue";
import ShowOrder from "../views/Cruds/Orders/Show.vue";
// ============== End:: Orders Routes

// ============== Start:: OrdersReservations
import OrdersReservationsHome from "../views/Cruds/OrdersReservations/Home.vue";
import AllOrdersReservations from "../views/Cruds/OrdersReservations/ShowAll.vue";
import ShowOrdersReservations from "../views/Cruds/OrdersReservations/Show.vue";
// ============== End:: OrdersReservations

// ============== Start:: Offers Routes
import OffersHome from "../views/Cruds/Offers/Home.vue";
import AllOffers from "../views/Cruds/Offers/ShowAll.vue";
import EditOffers from "../views/Cruds/Offers/Edit.vue";
import CreateOffers from "../views/Cruds/Offers/Create.vue";
import ShowOffer from "../views/Cruds/Offers/Show.vue";
// ============== End:: Offers Routes

// ============== Start:: Ads Routes
import AdsHome from "../views/Cruds/Ads/Home.vue";
import AllAds from "../views/Cruds/Ads/ShowAll.vue";
import CreateAds from "../views/Cruds/Ads/Create.vue";
import ShowAds from "../views/Cruds/Ads/Show.vue";
import EditAds from "../views/Cruds/Ads/Edit.vue";
// ============== End:: Ads Routes

// ============== Start:: Anchors Routes
import AnchorsHome from "../views/Cruds/Anchors/Home.vue";
import AllAnchors from "../views/Cruds/Anchors/ShowAll.vue";
import CreateAnchors from "../views/Cruds/Anchors/Create.vue";
import ShowAnchors from "../views/Cruds/Anchors/Show.vue";
import EditAnchors from "../views/Cruds/Anchors/Edit.vue";
// ============== End:: Anchors Routes

// ============== Start:: Services Routes
import ServicesHome from "../views/Cruds/Services/Home.vue";
import AllServices from "../views/Cruds/Services/ShowAll.vue";
import CreateServices from "../views/Cruds/Services/Create.vue";
import ShowServices from "../views/Cruds/Services/Show.vue";
import EditServices from "../views/Cruds/Services/Edit.vue";
// ============== End:: Services Routes

// ============== Start:: AdditionalServices Routes
import AdditionalServicesHome from "../views/Cruds/AdditionalServices/Home.vue";
import AllAdditionalServices from "../views/Cruds/AdditionalServices/ShowAll.vue";
import CreateAdditionalServices from "../views/Cruds/AdditionalServices/Create.vue";
import ShowAdditionalServices from "../views/Cruds/AdditionalServices/Show.vue";
import EditAdditionalServices from "../views/Cruds/AdditionalServices/Edit.vue";
// ============== End:: AdditionalServices Routes

// ============== Start:: additionalFields Routes
import AdditionalFieldsHome from "../views/Cruds/AdditionalFields/Home.vue";
import AllAdditionalFields from "../views/Cruds/AdditionalFields/ShowAll.vue";
import CreateAdditionalFields from "../views/Cruds/AdditionalFields/Create.vue";
import ShowAdditionalFields from "../views/Cruds/AdditionalFields/Show.vue";
import EditAdditionalFields from "../views/Cruds/AdditionalFields/Edit.vue";
// ============== End:: additionalFields Routes

// ============== Start:: Contact Messages Routes
import ContactMessagesHome from "../views/Cruds/ContactMessages/Home.vue";
import AllContactMessages from "../views/Cruds/ContactMessages/ShowAll.vue";
// ============== End:: Contact Messages Routes

// ============== Start:: App Content Routes
import AppContentHome from "../views/Cruds/AppContent/Home.vue";
import AboutUs from "../views/Cruds/AppContent/AboutUs.vue";
import Terms from "../views/Cruds/AppContent/Terms.vue";
import PrivacyPolicy from "../views/Cruds/AppContent/PrivacyPolicy.vue";
// ============== End:: App Content Routes

// ============== Start:: Merchant Routes
import ProvidersHome from "../views/Cruds/Merchant/Home.vue";
import AllProviders from "../views/Cruds/Merchant/ShowAll.vue";
import ShowProviders from "../views/Cruds/Merchant/Show.vue";
// ============== End:: Merchant Routes

// ============== Start:: ProvidersJoinRequest Routes
import ProvidersJoinRequestHome from "../views/Cruds/ProviderJoinRequest/Home.vue";
import AllProvidersJoinRequest from "../views/Cruds/ProviderJoinRequest/ShowAll.vue";
import ShowProvidersJoinRequest from "../views/Cruds/ProviderJoinRequest/Show.vue";
// ============== End:: ProvidersJoinRequest Routes

// ============== Start:: ProvidersEmployee Routes
import ProvidersEmployeeHome from "../views/Cruds/ProvidersEmployee/Home.vue";
import AllProvidersEmployee from "../views/Cruds/ProvidersEmployee/ShowAll.vue";
import ShowProvidersEmployee from "../views/Cruds/ProvidersEmployee/Show.vue";
// ============== End:: ProvidersEmployee Routes

// ============== Start:: App Settings Routes
import AppSettingsHome from "../views/Cruds/AppSettings/Home.vue";
import GeneralSettings from "../views/Cruds/AppSettings/GeneralSettings.vue";
import AppSettings from "../views/Cruds/AppSettings/AppSettings.vue";
// ============== End:: App Settings Routes

// ============== Start:: Roles Routes
import RolesHome from "../views/Cruds/Roles/Home.vue";
import AllRoles from "../views/Cruds/Roles/ShowAll.vue";
import CreateRole from "../views/Cruds/Roles/Create.vue";
import EditRole from "../views/Cruds/Roles/Edit.vue";
// ============== End:: Roles Routes

// ============== Start:: Admins Routes
import AdminsHome from "../views/Cruds/Admins/Home.vue";
import AllAdmins from "../views/Cruds/Admins/ShowAll.vue";
import CreateAdmin from "../views/Cruds/Admins/Create.vue";
import EditAdmin from "../views/Cruds/Admins/Edit.vue";
import ShowAdmin from "../views/Cruds/Admins/Show.vue";
// ============== End:: Admins Routes

// ============== Start:: All Notifications Routes
import NotificationsHome from "../views/Cruds/Notifications/Home.vue";
import AllNotifications from "../views/Cruds/Notifications/ShowAll.vue";
import CreateNotifications from "../views/Cruds/Notifications/Create.vue";
// ============== End:: All Notifications Routes

// ============== Start:: Forbidden Route
import ForbiddenPage from "../pages/ForbiddenPage.vue";
// ============== End:: Forbidden Route

// ============== Start:: Not Found Route
import NotFoundPage from "../pages/NotFound.vue";
// ============== End:: Not Found Route
// End:: Importing Router Components

Vue.use(VueRouter);
const routes = [
  // ***************** Start:: Auth Routes Config
  {
    path: "/",
    component: Authentication,
    children: [
      {
        path: "/",
        component: LoginForm,
        name: "LoginForm",
      },
      {
        path: "/reset-password-email",
        name: "ResetPasswordEmailForm",
        component: ResetPasswordEmailForm,
      },
      {
        path: "/email-verification/:verification_type",
        name: "EmailVerificationForm",
        component: EmailVerificationForm,
      },
      {
        path: "/chang-phone-number",
        name: "ChangePhoneNumberForm",
        component: ChangePhoneNumberForm,
      },
      {
        path: "/reset-password",
        name: "ResetPasswordForm",
        component: ResetPasswordForm,
      },
    ],
  },
  // ***************** End:: Auth Routes Config

  // ***************** Start:: Content Routes Config
  {
    path: "/home",
    component: AppContentWrapper,
    children: [
      // Start:: Home Route Config
      {
        path: "/home",
        component: HomePage,
        meta: {
          middleware: [auth],
        },
      },
      // End:: Home Route Config

      // Start:: Clients Routes Config
      {
        path: "/clients",
        name: "ClientsHome",
        component: ClientsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllClients",
            component: AllClients,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "clients index",
                subject: "clients",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowClient",
            component: ShowClient,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "clients show",
                subject: "clients",
              },
            },
          },
        ],
      },
      // End:: Clients Routes Config

      // Start:: providers Routes Config
      {
        path: "/providers",
        name: "ProvidersHome",
        component: ProvidersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllProviders",
            component: AllProviders,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers index",
                subject: "providers",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowProviders",
            component: ShowProviders,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers show",
                subject: "providers",
              },
            },
          },
        ],
      },
      // End:: providers Routes Config

      // Start:: ProvidersJoinRequestHome Routes Config
      {
        path: "/providers-join-request",
        name: "ProvidersJoinRequestHome",
        component: ProvidersJoinRequestHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllProvidersJoinRequest",
            component: AllProvidersJoinRequest,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers index",
                subject: "providers",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowProvidersJoinRequest",
            component: ShowProvidersJoinRequest,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers show",
                subject: "providers",
              },
            },
          },
        ],
      },
      // End:: ProvidersJoinRequest Routes Config

      // Start:: ProvidersEmployee Routes Config
      {
        path: "/providers-employee",
        name: "ProvidersEmployeeHome",
        component: ProvidersEmployeeHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllProvidersEmployee",
            component: AllProvidersEmployee,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers index",
                subject: "providers",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowProvidersEmployee",
            component: ShowProvidersEmployee,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers show",
                subject: "providers",
              },
            },
          },
        ],
      },
      // End:: ProvidersEmployee Routes Config

      // Start:: Drivers Routes Config
      {
        path: "/drivers",
        name: "DriversHome",
        component: DriversHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllDrivers",
            component: AllDrivers,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateDriver",
            component: CreateDriver,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditDriver",
            component: EditDriver,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowDriver",
            component: ShowDriver,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Drivers Routes Config

      // Start:: Drivers join Routes Config
      {
        path: "/drivers-join",
        name: "DriversJoinHome",
        component: DriversJoinHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllDriversJoin",
            component: AllDriversJoin,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowDriverJoin",
            component: ShowDriverJoin,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Drivers join Routes Config

      // Start:: Regions  Config
      {
        path: "/cities",
        name: "RegionsHome",
        component: RegionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRegions",
            component: AllRegions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities index",
                subject: "cities",
              },
            },
          },
          {
            path: "create",
            name: "CreateRegions",
            component: CreateRegions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities create",
                subject: "cities",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditRegions",
            component: EditRegions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities edit",
                subject: "cities",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowRegions",
            component: ShowRegions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities show",
                subject: "cities",
              },
            },
          },
        ],
      },
      // End:: Regions Config

      // Start:: States  Config
      {
        path: "/states",
        name: "StatesHome",
        component: StatesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllStates",
            component: AllStates,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts index",
                subject: "districts",
              },
            },
          },
          {
            path: "create",
            name: "CreateStates",
            component: CreateStates,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts create",
                subject: "districts",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditStates",
            component: EditStates,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts edit",
                subject: "districts",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowStates",
            component: ShowStates,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts show",
                subject: "districts",
              },
            },
          },
        ],
      },
      // End:: states Config

      // Start:: CarTypes  Config
      {
        path: "/vehicleTypes",
        name: "CarTypesHome",
        component: CarTypesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCarTypes",
            component: AllCarTypes,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "vehicleTypes index",
                subject: "vehicleTypes",
              },
            },
          },
          {
            path: "create",
            name: "CreateCarTypes",
            component: CreateCarTypes,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "vehicleTypes create",
                subject: "vehicleTypes",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditCarTypes",
            component: EditCarTypes,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "vehicleTypes edit",
                subject: "vehicleTypes",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowCarTypes",
            component: ShowCarTypes,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "vehicleTypes show",
                subject: "vehicleTypes",
              },
            },
          },
        ],
      },
      // End:: CarTypes Config

      // Start:: Anchors  Config
      {
        path: "/anchors",
        name: "AnchorsHome",
        component: AnchorsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAnchors",
            component: AllAnchors,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "anchors index",
                subject: "anchors",
              },
            },
          },
          {
            path: "create",
            name: "CreateAnchors",
            component: CreateAnchors,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "anchors create",
                subject: "anchors",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAnchors",
            component: EditAnchors,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "anchors edit",
                subject: "anchors",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAnchors",
            component: ShowAnchors,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "anchors show",
                subject: "anchors",
              },
            },
          },
        ],
      },
      // End:: CarTypes Config

      // Start:: CarModals  Config
      {
        path: "/carModals",
        name: "CarModalsHome",
        component: CarModalsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCarModals",
            component: AllCarModals,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateCarModals",
            component: CreateCarModals,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditCarModals",
            component: EditCarModals,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowCarModals",
            component: ShowCarModals,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: CarModals Config

      // Start:: nationalities  Config
      {
        path: "/nationalities",
        name: "NationalitiesHome",
        component: NationalitiesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllNationalities",
            component: AllNationalities,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateNationalities",
            component: CreateNationalities,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditNationalities",
            component: EditNationalities,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowNationalities",
            component: ShowNationalities,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: nationalities Config

      // Start:: Financial Reports Routes Config
      {
        path: "/financial-reports",
        name: "FinancialReportsHome",
        component: FinancialReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllFinancialReports",
            component: AllFinancialReports,
            meta: {
              middleware: [auth],
            },
          },
          // {
          //   path: "show/:id",
          //   name: "ShowFinancialReport",
          //   component: ShowFinancialReport,
          //   props: true,
          //   meta: {
          //     middleware: [auth],
          //   },
          // },
        ],
      },
      // End:: Financial Reports Routes Config

      // Start:: Packages Reports Routes Config
      {
        path: "/packages-reports",
        name: "PackageReportsHome",
        component: PackageReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllPackageReports",
            component: AllPackageReports,
            meta: {
              middleware: [auth],
            },
          },
          // {
          //   path: "show/:id",
          //   name: "ShowFinancialReport",
          //   component: ShowFinancialReport,
          //   props: true,
          //   meta: {
          //     middleware: [auth],
          //   },
          // },
        ],
      },
      // End:: packages Reports Routes Config

      // Start:: Offers Routes Config
      {
        path: "/offers",
        name: "OffersHome",
        component: OffersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOffers",
            component: AllOffers,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowOffer",
            component: ShowOffer,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateOffers",
            component: CreateOffers,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditOffers",
            component: EditOffers,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Offers Routes Config

      // Start:: Ads  Config
      {
        path: "/ads",
        name: "AdsHome",
        component: AdsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAds",
            component: AllAds,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "sliders index",
                subject: "sliders",
              },
            },
          },
          {
            path: "create",
            name: "CreateAds",
            component: CreateAds,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "sliders create",
                subject: "sliders",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAds",
            component: EditAds,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "sliders edit",
                subject: "sliders",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAds",
            component: ShowAds,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "sliders show",
                subject: "sliders",
              },
            },
          },
        ],
      },
      // End:: Ads Config

      // Start:: Services  Config
      {
        path: "/services",
        name: "ServicesHome",
        component: ServicesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllServices",
            component: AllServices,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "services index",
                subject: "services",
              },
            },
          },
          {
            path: "create",
            name: "CreateServices",
            component: CreateServices,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "services create",
                subject: "services",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditServices",
            component: EditServices,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "services edit",
                subject: "services",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowServices",
            component: ShowServices,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "services show",
                subject: "services",
              },
            },
          },
        ],
      },
      // End:: Services Config

      // Start:: additionalServices  Config
      {
        path: "/additionalServices",
        name: "AdditionalServicesHome",
        component: AdditionalServicesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdditionalServices",
            component: AllAdditionalServices,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additionalServices index",
                subject: "additionalServices",
              },
            },
          },
          {
            path: "create",
            name: "CreateAdditionalServices",
            component: CreateAdditionalServices,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additionalServices create",
                subject: "additionalServices",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAdditionalServices",
            component: EditAdditionalServices,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additionalServices edit",
                subject: "additionalServices",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAdditionalServices",
            component: ShowAdditionalServices,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additionalServices show",
                subject: "additionalServices",
              },
            },
          },
        ],
      },
      // End:: additionalServices Config

      // Start:: additionalFields  Config
      {
        path: "/additionalFields",
        name: "AdditionalFieldsHome",
        component: AdditionalFieldsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdditionalFields",
            component: AllAdditionalFields,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additionalFields index",
                subject: "additionalFields",
              },
            },
          },
          {
            path: "create",
            name: "CreateAdditionalFields",
            component: CreateAdditionalFields,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additionalFields create",
                subject: "additionalFields",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAdditionalFields",
            component: EditAdditionalFields,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additionalFields edit",
                subject: "additionalFields",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAdditionalFields",
            component: ShowAdditionalFields,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "additionalFields show",
                subject: "additionalFields",
              },
            },
          },
        ],
      },
      // End:: additionalFields Config

      // Start:: Orders Routes Config
      {
        path: "/orders",
        name: "OrdersHome",
        component: OrdersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOrders",
            component: AllOrders,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowOrder",
            component: ShowOrder,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Orders Routes Config

      // Start:: OrdersReservations Config
      {
        path: "/ordersReservations",
        name: "OrdersReservationsHome",
        component: OrdersReservationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOrdersReservations",
            component: AllOrdersReservations,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowOrdersReservations",
            component: ShowOrdersReservations,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: OrdersReservations Config

      // Start:: Employees  Config
      {
        path: "/employees",
        name: "EmployeesHome",
        component: EmployeesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllEmployees",
            component: AllEmployees,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateEmployees",
            component: CreateEmployees,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditEmployees",
            component: EditEmployees,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowEmployees",
            component: ShowEmployees,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Employees Types Config

      // Start:: Contact Messages Routes Config
      {
        path: "/contact-messages",
        name: "ContactMessagesHome",
        component: ContactMessagesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllContactMessages",
            component: AllContactMessages,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "contactuses index",
                subject: "contactuses",
              },
            },
          },
        ],
      },
      // End:: Contact Messages Routes Config

      // Start:: App Content Routes Config
      {
        path: "/app-content",
        name: "AppContentHome",
        component: AppContentHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "about-us",
            name: "AboutUs",
            component: AboutUs,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "terms",
            name: "Terms",
            component: Terms,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: App Content Routes Config

      // Start:: App Settings Routes Config
      {
        path: "/settings",
        component: AppSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings index",
            subject: "settings",
          },
        },
      },
      // End:: App Settings Routes Config

      // Start:: App Settings Routes Config
      {
        path: "/contact_settings",
        component: GeneralSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings create",
            subject: "settings",
          },
        },
      },
      // End:: App Settings Routes Config

      // Start:: Roles Routes Config
      {
        path: "/roles",
        name: "RolesHome",
        component: RolesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRoles",
            component: AllRoles,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles index",
                subject: "roles",
              },
            },
          },
          {
            path: "create",
            name: "CreateRole",
            component: CreateRole,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles create",
                subject: "roles",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditRole",
            component: EditRole,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles edit",
                subject: "roles",
              },
            },
          },
        ],
      },
      // End:: Roles Routes Config

      // Start:: Admins Routes Config
      {
        path: "/admins",
        name: "AdminsHome",
        component: AdminsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllAdmins,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users create",
                subject: "users",
              },
            },
          },
          {
            path: "create",
            name: "CreateAdmin",
            component: CreateAdmin,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users create",
                subject: "users",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAdmin",
            component: EditAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users create",
                subject: "users",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAdmin",
            component: ShowAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users create",
                subject: "users",
              },
            },
          },
        ],
      },
      // End:: Admins Routes Config

      // Start:: All Notifications Route Config
      {
        path: "/all-notifications",
        name: "NotificationsHome",
        component: NotificationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllNotifications,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateNotificationss",
            component: CreateNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "todo create",
                subject: "notifications",
              },
            },
          },
        ],
      },
      // End:: All Notifications Route Config
    ],
  },
  // ***************** End:: Content Routes Config

  // ***************** Start:: Forbidden Route Config
  {
    path: "/forbidden",
    name: "ForbiddenPage",
    component: ForbiddenPage,
  },
  // ***************** End:: Forbidden Route Config

  // ***************** Start:: Not Found Route Config
  {
    path: "/:notFound(.*)",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
  // ***************** End:: Not Found Route Config
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
  routes,
});

// Start:: Middleware And Router Guards
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

// permissions

router.beforeEach((to, from, next) => {
  // console.log(to);
  // Check if the route requires permission
  if (to.meta && to.meta.requiresPermission) {
    const { action, subject } = to.meta.requiresPermission;

    // Retrieve permissions from localStorage
    const storedPermissions = JSON.parse(
      localStorage.getItem("qarbcom_roles")
    )?.permissions;

    // Check if the user has the required permission
    if (
      storedPermissions.some(
        (permission) =>
          permission.action === action && permission.subject === subject
      )
    ) {
      next(); // User has permission, allow access to the route
    } else {
      // User doesn't have permission, redirect to a fallback route or show an error message
      next("/forbidden"); // Replace '/fallback' with the route path or name of your fallback route
    }
  } else {
    next(); // Route doesn't require permission, allow access to the route
  }
});

// authentication
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  } else if (localStorage.getItem("qarbcom_admin_dashboard_user_token")) {
    if (
      to.name == "LoginForm" ||
      to.name == "ResetPasswordEmailForm" ||
      to.name == "PhoneVerification" ||
      to.name == "ChangePhoneNumberForm" ||
      to.name == "ResetPasswordForm"
    ) {
      return next("/home");
    } else {
      return next();
    }
  }
  return next();
});
// End:: Middleware And Router Guards

export default router;
