import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDsP405XF6qrMWNRePyB5ixnhom5gG1zUQ",
    libraries: "places",
  },
});
