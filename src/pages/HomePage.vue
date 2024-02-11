<template>
  <div class="home_page_wrapper">
    <!-- <ComingSoon /> -->

    <div class="statics mt-4">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12" v-for="(value, key) in statics" :key="'i' + key">
          <div class="box">
            <div class="icon">
              <i v-if="key === 'users_total'" class="fas fa-user-tie"></i>
              <i v-else-if="key === 'providers_count'" class="fas fa-users"></i>
              <i v-else-if="key === 'clients_count'" class="fas fa-users"></i>

              <i v-else-if="key === 'total_orders_count'" class="fas fa-ticket-alt"></i>
              <i v-else-if="key === 'not_completed_orders_count'" class="fas fa-concierge-bell"></i>

              <i v-else-if="key === 'completed_orders_count'" class="fas fa-clipboard-check"></i>
              <i v-else-if="key === 'cancelled_orders_count'" class="fas fa-newspaper"></i>
              <i v-else-if="key === 'rejected_orders_count'" class="fas fa-ban"></i>

            </div>
            <div class="info_box">
              <span v-if="key == 'users_total'">{{ $t('PLACEHOLDERS.total_app_members') }}</span>
              <span v-else-if="key === 'providers_count'">{{ $t('PLACEHOLDERS.service_providers') }}</span>
              <span v-else-if="key === 'clients_count'">{{ $t('PLACEHOLDERS.service_requesters') }}</span>

              <span v-else-if="key === 'total_orders_count'">{{ $t('PLACEHOLDERS.total_orders_created') }}</span>
              <span v-else-if="key === 'not_completed_orders_count'">{{ $t('PLACEHOLDERS.incomplete_orders') }}</span>

              <span v-else-if="key === 'completed_orders_count'">{{ $t('PLACEHOLDERS.completed_orders') }}</span>
              <span v-else-if="key === 'cancelled_orders_count'">{{ $t('PLACEHOLDERS.canceled_orders') }}</span>
              <span v-else-if="key === 'rejected_orders_count'">{{ $t('PLACEHOLDERS.rejected_orders') }}</span>

              <p class="number_box">{{ value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComingSoon from "@/components/ui/ComingSoon.vue";

export default {
  name: "HomePage",

  components: {
    ComingSoon
  },

  data() {
    return {
      statics: []
    };
  },

  methods: {

    async getStatics() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "home-statistics"
        });

        // console.log("All Data ==>", res.data.data);
        this.statics = res.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

  },

  mounted() {

    this.getStatics()

  },
};
</script>

<style lang="scss" scoped>
.home_page_wrapper {
  position: relative;

  min-height: 500px;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;

  .statics {
    .box {
      background: aliceblue;
      padding: 25px;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .icon {
        height: 60px;
        min-width: 60px;
        width: 60px;
        border-radius: 60px;
        background: rgba(0, 123, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 25px
        }
      }

      .info_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        span {
          font-size: 19px;
          color: #6c757d;
        }

        p.number_box {
          font-size: 30px;
          color: #000;
          font-weight: bold;
        }
      }
    }
  }
}

body[dir=ltr] {
  .home_page_wrapper .statics .box {
    flex-direction: row-reverse;

    .info_box {
      align-items: unset;
    }
  }
}
</style>