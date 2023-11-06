<template>
  <div class="home_page_wrapper">
    <ComingSoon/>
  </div>
</template>

<script>
import ComingSoon from "@/components/ui/ComingSoon.vue";


// START:: IMPORTING CHARTS
import SparksAreaCharts from "@/components/charts/SparksAreaCharts.vue";
import ColumnChart from "@/components/charts/ColumnChart.vue";
import DonutChart from "@/components/charts/DonutChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import RadialChart from "@/components/charts/RadialChart.vue";
// END:: IMPORTING CHARTS

export default {
  name: "HomePage",

  components: {
    ComingSoon,
    SparksAreaCharts,
    ColumnChart,
    RadialChart,
    DonutChart,
    LineChart,
  },

  data() {
    return {
      // START:: SELECTED SALES FILTER
      selectedSalesFilter: this.$t("BUTTONS.monthly"),
      selectedTransactionFilter: this.$t("BUTTONS.weekly"),
      selectedOrdersFilter: this.$t("BUTTONS.weekly"),
      selectedOrdersRateFilter: this.$t("BUTTONS.yearly"),
      // END:: SELECTED SALES FILTER
    };
  },

  methods: {
    // START:: FILTER STATISTICS
    filterSalesAnalyses(filterValue, transFilterValue) {
      console.log(filterValue);
      this.selectedSalesFilter = transFilterValue;
    },
    filterOrders(filterValue, transFilterValue) {
      console.log(filterValue);
      this.selectedOrdersFilter = transFilterValue;
    },
    filterTransactions(filterValue, transFilterValue) {
      console.log(filterValue);
      this.selectedTransactionFilter = transFilterValue;
    },
    filterOrdersRate(filterValue, transFilterValue) {
      console.log(filterValue);
      this.selectedOrdersRateFilter = transFilterValue;
    },
    // END:: FILTER STATISTICS
  },

  mounted() {
    // START:: FIRE METHODS
    // END:: FIRE METHODS
  },
};
</script>

<style lang="scss" scoped>
.home_page_wrapper {
  position: relative;
}
</style>