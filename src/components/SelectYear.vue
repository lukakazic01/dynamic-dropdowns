<template>
  <div class="select-container">
    <label>Year</label>
    <div class="select-wrapper">
      <span v-if="years.loading" class="loader" />
      <select
        v-model.number="year"
        :class="[years.error && 'invalid']"
        :disabled="years.loading || years.error"
        @change="emit('change')"
      >
        <option v-if="year === null" :value="null" selected disabled>Select year</option>
        <option v-for="year in years.data" :key="year" :value="year">{{ year }}</option>
      </select>
      <p class="error-message" v-if="years.error">Sorry, something went while trying to get years, please try again.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {YearResponse} from "@/types/YearResponse";

const { years } = defineProps<{
  years: YearResponse,
}>()
const emit = defineEmits<{
  change: []
}>()
const year = defineModel<number | null>('year', { required: true });
</script>

<style scoped>
@import '../assets/home.scss';
</style>