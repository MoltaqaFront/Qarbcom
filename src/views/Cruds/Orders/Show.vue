<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.showOrder") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.order_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.orderNumber')" v-model.trim="data.id"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.status')" v-model.trim="data.status" disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.orderType')" v-model.trim="data.orderType"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Products.created_at')" v-model.trim="data.orderDate"
            disabled />

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.store_data') }}</h4>
          </div>

          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')" disabled />
          <!-- End:: Image Upload Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.store_name')" v-model.trim="data.store_name"
            disabled />

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.client_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('TABLES.Clients.name')" v-model.trim="data.client_name"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Clients.phone')" v-model.trim="data.client_phone"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.receiver_phone')"
            v-model.trim="data.receiver_phone" disabled />

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.location_address') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.address')"
            v-model.trim="data.address_location_from" disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.address')"
            v-model.trim="data.address_location_to" disabled />

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.driver_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.driverName')" v-model="data.driver_name"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.driver_phone')" v-model="data.driver_phone"
            disabled />

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.price_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.payment_method_brand')"
            v-model="data.payment_method_brand" disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Services.price')" v-model="data.price" disabled />

          <div class="all_content" v-if="data.order_type_id !== 3 && parents.length > 1">
            <h3 class="text-center">{{ $t('BUTTONS.additions') }}</h3>

            <div class="row repeat_parent" v-for="(parent, parentIndex) in parents" :key="'a' + parentIndex"
              style="border: 2px solid #F6A513;margin-bottom:20px;border-radius: 10px;">

              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="parent.nameAr"
                  disabled />
              </div>

              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="parent.nameEn"
                  disabled />
              </div>

              <div class="col-lg-6 col-12">

                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.item_name')"
                  v-model.trim="parent.is_multiple_choice.name" disabled />

              </div>
              <div class="col-lg-6 col-12">

                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.required_item')"
                  v-model.trim="parent.is_required.name" disabled />

              </div>

              <div class="col-12">
                <h3 class="text-center">{{ $t('BUTTONS.components') }}</h3>
              </div>


              <div class="row repeat_child align-items-center" v-for="(child, childIndex) in parent.additions_children"
                :key="'b' + childIndex">
                <div class="col-lg-6 col-12">
                  <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="child.nameAr"
                    disabled />
                </div>
                <div class="col-lg-6 col-12">
                  <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="child.nameEn"
                    disabled />
                </div>
                <div class="col-lg-6 col-12">
                  <base-input type="text" :placeholder="$t('PLACEHOLDERS.price')" v-model.trim="child.price" disabled />
                </div>

              </div>

            </div>

          </div>

          <div class="form_title_wrapper" v-if="status_key == 'rejected'">
            <h4>{{ $t('PLACEHOLDERS.reason_reject') }}</h4>
          </div>

          <base-input v-if="status_key == 'rejected'" col="6" rows="6" type="textarea" disabled
            :placeholder="$t('PLACEHOLDERS.reason')" v-model="reason_reject" required />


        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "CreateProduct",

  data() {
    return {

      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send

      data: {

        order_type_id: null,

        // order info

        id: null,
        status: null,
        orderType: null,
        orderDate: null,

        // store info

        store_name: null,
        image: {
          path: null,
          file: null,
        },

        // address location
        address_location_from: null,
        address_location_to: null,




        // client info

        client_name: null,
        client_phone: null,
        receiver_phone: null,

        // driver info

        driver_name: null,
        driver_phone: null,

        category: null,
        storeType: null,

        payment_method_brand: '',
        price: ''

      },


      // product info

      parents: [
        {
          nameAr: '',
          nameEn: '',
          is_multiple_choice: '',
          is_required: '',
          additions_children: [],
        },
      ],
      multiple_choice: [],
      is_required: [],

      // End:: Data Collection To Send

      allStores: [],
      allCategories: [],

      status_key: null,
      reason_reject: null


    };
  },

  computed: {
    multipleStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
    requiredStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
  },

  methods: {

    // start get all stores

    async getAllStores() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores",
        });
        this.allStores = res.data.body.stores;
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getAllCategories() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores/types/categories",
        });
        this.allCategories = res.data.body.orderTypes;
        console.log(res.data.body.orderTypes)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end get all stores

    async getDataToEdit() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/orders/${this.$route.params.id}`,
        });



        // order info

        this.data.order_type_id = res.data.body.order.order_type.id;

        this.data.id = res.data.body.order.id;
        this.data.status = res.data.body.order.status;
        this.data.orderType = res.data.body.order.order_type.title;
        this.data.orderDate = res.data.body.order.created_at;


        this.data.client_name = res.data.body.order.user.name;
        this.data.client_phone = res.data.body.order.user.phone;
        this.data.receiver_phone = res.data.body.order.receiver_phone;

        this.data.address_location_from = res.data.body.order.fast_addresses.from;
        this.data.address_location_to = res.data.body.order.fast_addresses.to;

        this.data.store_name = res.data.body.order.store?.title;
        this.data.image.path = res.data.body.order.store?.logo;

        this.status_key = res.data.body.order.status_key;
        this.reason_reject = res.data.body.order.last_status.reason;

        this.data.driver_name = res.data.body.order.driver?.name;
        this.data.driver_phone = res.data.body.order.driver?.phone;

        this.data.payment_method_brand = res.data.body.order.payment_method_brand;
        this.data.price = res.data.body.order?.price;

        this.parents = res.data.body.order.order_items;

        console.log(res.data.body.order.status_key)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "products create");
    // End:: Fire Methods

    this.getAllStores();
    this.getAllCategories();
    this.getDataToEdit()
  },
};
</script>

<style lang="scss" scoped>
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
</style>