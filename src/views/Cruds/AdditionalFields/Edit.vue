<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.update_additional_fields") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr"
            @input="validateInput" required />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn"
            @input="removeArabicCharacters" @copy="onCopy" @paste="onPaste" required />

          <!-- End:: Name Input -->

          <!-- Start:: vehicle_type Input -->
          <base-select-input col="6" :optionsList="allVehicleTypes" :placeholder="$t('PLACEHOLDERS.type_vechile')"
            v-model="data.vehicle_type" multiple />
          <!-- End:: vehicle_type Input -->

          <!-- Start:: Status Input -->
          <base-select-input col="6" :optionsList="Fields_type" :placeholder="$t('PLACEHOLDERS.additional_field_type')"
            v-model="data.field_type" />
          <!-- End:: Status Input -->

          <div v-if="(data.field_type && data.field_type.value == 'checkbox')
            || (data.field_type && data.field_type.value == 'radio')
            || (data.field_type && data.field_type.value == 'dropdown')">

            <div class="row justify-content-center">
              <span class="add_another" @click="addRow()">
                <i class="fas fa-plus"></i>
              </span>
            </div>

            <div class="row align-items-center" v-for="(item, index) in field_values" :key="'o' + index">

              <div class="col-lg-5 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="item.value_ar"
                  required />
              </div>
              <div class="col-lg-5 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="item.value_en"
                  required />
              </div>

              <div class="col-2">
                <div class="all_actions">
                  <span class="add_another" @click="removeRow(index, item)"
                    :class="{ 'disabled': index == 0 || index == 1 }">
                    <i class="fas fa-minus"></i>
                  </span>

                </div>
              </div>

            </div>

          </div>


          <!-- Start:: Status Input -->
          <base-select-input col="6" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.Adjective')"
            v-model="data.is_required" />
          <!-- End:: Status Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CreateAdditionalFields",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        nameAr: null,
        nameEn: null,
        active: true,
        is_required: null,
        field_type: null,
        vehicle_type: null,
        type: null,
      },
      allVehicleTypes: [],

      field_values: [],
      // End:: Data Collection To Send

      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
    };
  },

  computed: {

    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.required_item"),
          value: 1,
        },
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.optional"),
          value: 0,
        }
      ];
    },

    Fields_type() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.textbox"),
          value: "textbox",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.numberbox"),
          value: "number",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.textarea"),
          value: "textarea",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.checkbox"),
          value: "checkbox",
        },
        {
          id: 5,
          name: this.$t("PLACEHOLDERS.Radio_Button"),
          value: "radio",
        },
        {
          id: 6,
          name: this.$t("PLACEHOLDERS.drop_down"),
          value: "dropdown",
        }
      ];
    },

  },

  methods: {
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },

    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },

    addRow() {
      this.field_values.push(
        {
          value_ar: "",
          value_en: ""
        }
      )
    },

    async removeRow(index, item) {
      this.field_values.splice(index, 1);
      try {
        await this.$axios({
          method: "GET",
          url: `additionalFields/${this.$route.params.id}/delete-additional-field-value/${item.id}`,
        });
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },

    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.nameAr = this.data.nameAr.replace(/[^\u0600-\u06FF\s]/g, "");
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
    },

    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("name[ar]", this.data.nameAr);
      REQUEST_DATA.append("name[en]", this.data.nameEn);
      REQUEST_DATA.append("is_active", +this.data.active);
      REQUEST_DATA.append("is_required", this.data.is_required?.id);
      REQUEST_DATA.append("type", this.data.field_type?.value);
      REQUEST_DATA.append("_method", "put");

      if (this.data.vehicle_type) {
        this.data.vehicle_type.forEach(element => {
          REQUEST_DATA.append("vehicle_type_ids[]", element?.id);
        });
      }

      if (this.field_values) {
        this.field_values.forEach((element, index) => {
          if (element.value_ar) {
            REQUEST_DATA.append(`value[${index}][ar]`, element.value_ar);
          }
          if (element.value_ar) {
            REQUEST_DATA.append(`value[${index}][en]`, element.value_en);
          }
          if (element.id) {
            REQUEST_DATA.append(`value[${index}][id]`, element.id);
          }
        });
      }

      // let valueArray = [];

      // if (this.field_values) {
      //   this.field_values.forEach((element, index) => {
      //     valueArray.push({
      //       'name_ar': element.value_ar,
      //       'name_en': element.value_en,
      //       'id': element.id
      //     })
      //   });
      // }

      // REQUEST_DATA.append('value', JSON.stringify(valueArray))
      // console.log(valueArray)

      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `additionalFields/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/additionalFields/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

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

    // start all ads data

    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `additionalFields/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.data.additionalField.name_ar;
        this.data.nameEn = res.data.data.additionalField.name_en;
        this.data.vehicle_type = res.data.data.additionalField.vehicleTypes;
        this.field_values = res.data.data.additionalField.values;
        this.data.is_required = res.data.data.additionalField.is_required;
        this.data.field_type = { id: 0, name: res.data.data.additionalField.translated_field_type, value: res.data.data.additionalField.type };


        // if (this.data.field_type) {
        //   this.data.field_type =
        //   {
        //     id: 0,
        //     name: this.data.field_type,
        //     value: this.data.field_type,
        //   }
        // }

        if (!this.data.is_required) {
          this.data.is_required =
          {
            id: 0,
            name: this.$t("PLACEHOLDERS.optional"),
            value: 0,
          }
        } else {
          this.data.is_required =
          {
            id: 1,
            name: this.$t("PLACEHOLDERS.required_item"),
            value: 1,
          }
        }

        this.data.active = res.data.data.additionalField.is_active;
        // console.log(res.data.body.add_space)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all ads data

  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    this.showVehicleTypes();
    // End:: Fire Methods
  },
};
</script>

<style lang="scss" scoped>
.all_action {
  display: flex;
  gap: 15px
}

.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--light_gray_clr);
  border-radius: 50%;
  font-size: 18px;
  color: var(--light_gray_clr);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .fa-trash {
    color: #ff2159;
    cursor: pointer
  }
}

.disabled {
  pointer-events: none;
  cursor: no-drop;
}
</style>