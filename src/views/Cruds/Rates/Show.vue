<template>
  <div class="crud_form_wrapper">

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row align-items-center">

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.order_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.orderNumber')" v-model.trim="data.id"
            disabled />

          <div class="col-6">
            <router-link :to="'/orders/show/' + data.id">
              {{ $t('PLACEHOLDERS.order_details_link') }}
            </router-link>
          </div>

          <h5>{{ $t("PLACEHOLDERS.service_requester_data") }}</h5>

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.phoneNumber')" v-model.trim="data.phone"
            disabled />

          <div class="row">

            <h5>{{ $t("PLACEHOLDERS.provider_info") }}</h5>

            <!-- Start:: Name Input -->
            <base-input col="6" type="text" disabled :placeholder="$t('PLACEHOLDERS.name_provider')"
              v-model.trim="data.provider_name" />
            <!-- End:: Name Input -->


            <div class="form_title_wrapper">
              <h4>{{ $t('PLACEHOLDERS.order_rating') }}</h4>
            </div>

            <div class="d-flex justify-content-start">
              <RatingPreview :rate="+data.review_rate" :size="15" />
            </div>

            <base-input col="6" rows="6" type="textarea" disabled :placeholder="$t('PLACEHOLDERS.comment')"
              v-model="data.comment" required />

          </div>


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

  data() {
    return {

      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send

      data: {
        // order info

        id: null,
        name: null,
        phone: null,
        provider_name: null,
        review_rate: null,
        comment: null,

      },



    };
  },

  methods: {

    async getDataToEdit() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `rates/${this.$route.params.id}`,
        });
        // order info

        this.data.id = res.data.data.Rate.order_id;
        this.data.name = res.data.data.Rate.client.name;
        this.data.phone = res.data.data.Rate.client.mobile;
        this.data.provider_name = res.data.data.Rate.provider.name;
        this.data.review_rate = res.data.data.Rate.rate;
        this.data.comment = res.data.data.Rate.comment;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
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

.map_icon {
  i {
    font-size: 30px;
  }
}
</style>