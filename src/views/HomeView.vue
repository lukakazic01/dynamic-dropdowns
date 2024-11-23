<template>
  <div>
    <div class="container">
      <SelectYear :years v-if="years" v-model:year="selectedYear" @change="handleYearChange" />
      <SelectMake :makes v-model:make="selectedMake" @change="handleMakeChange" />
      <SelectModel :models v-model:model="selectedModel" @change="handleModelChange" />
    </div>
    <div class="reset-btn-wrapper">
      <button class="reset-btn" @click="handleFilterResetting">Reset filters</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectYear from "@/components/SelectYear.vue";
import {ref, watch, watchEffect} from "vue";
import axios from "axios";
import type {ApiResponse} from "@/types/utils/ApiResponse";
import SelectMake from "@/components/SelectMake.vue";
import SelectModel from "@/components/SelectModel.vue";
import {useRoute, useRouter} from "vue-router";
import type {CarMake, Make} from "@/types/Make";
import type {CarModel, Model} from "@/types/Model";
import type {Year} from "@/types/Year";

const router = useRouter();
const route = useRoute();

const years = ref<Year>({
  data: null,
  loading: false,
  error: false
});
const makes = ref<Make>({
  data: null,
  loading: false,
  error: false
});
const models = ref<Model>({
  data: null,
  loading: false,
  error: false
});

const selectedYear = ref<number | null>(null);
const selectedMake = ref<string | null>(null);
const selectedModel = ref<string | null>(null);

if (route.query && route.query.year) {
  const { year, make, model } = route.query;
  selectedYear.value = typeof year === 'string' ? Number(year) : null;
  selectedMake.value = typeof make === 'string' ? make : null;
  selectedModel.value = typeof model === 'string' ? model : null;
  if (model && !make) {
    router.push({ path: '/', query: { year: selectedYear.value, make: undefined, model: undefined } });
    selectedModel.value = null;
  }
} else router.push({ path: '/', query: {} });

(async () => {
  try {
    years.value.loading = true;
    const { data } = await axios.get<ApiResponse<number[]>>('https://new.api.nexusautotransport.com/api/vehicles/years');
    years.value.data = data.data;
  } catch (e) {
    years.value.error = true;
  } finally {
    years.value.loading = false;
  }
})();

const getMakes = async () => {
  try {
    makes.value.loading = true;
    const { data } = await axios.get<ApiResponse<CarMake[]>>('https://new.api.nexusautotransport.com/api/vehicles/makes', { params: {
        year: selectedYear.value
      }});
    makes.value.data = data.data;
  } catch (e) {
    makes.value.error = true;
  } finally {
    makes.value.loading = false;
  }
}

const getModels = async () => {
  try {
    models.value.loading = true;
    const { data } = await axios.get<ApiResponse<CarModel[]>>('https://new.api.nexusautotransport.com/api/vehicles/models', { params: {
        year: selectedYear.value,
        make: selectedMake.value
      }})
    models.value.data = data.data;
  } catch (e) {
    models.value.error = true;
  } finally {
    models.value.loading = false;
  }
}

const handleYearChange = () => {
  selectedMake.value = null;
  selectedModel.value = null;
  models.value.data = null;
  router.push({ path: '/', query: { year: selectedYear.value, make: undefined, model: undefined } });
}

const handleMakeChange = () => {
  selectedModel.value = null;
  router.push({ path: '/', query: { ...route.query, make: selectedMake.value, model: undefined } });
};

const handleModelChange = () => {
  router.push({ path: '/', query: { ...route.query, model: selectedModel.value } });
};

const handleFilterResetting = () => {
  selectedYear.value = null;
  selectedMake.value = null;
  selectedModel.value = null;
  makes.value.data = null;
  models.value.data = null;
  router.push({ path: '/', query: {} });
};

watch(() => route.query, async (newParams, oldParams) => {
  if (route.query.year && newParams.year !== oldParams?.year) await getMakes();
  if (route.query.year && route.query.make && newParams.make !== oldParams?.make) await getModels();
}, { immediate: true });
</script>

<style scoped>
@import '../assets/home.scss';
</style>
