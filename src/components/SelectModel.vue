<template>
  <div class="select-container">
    <label>ModelResponse</label>
    <div class="select-wrapper">
      <span v-if="models.loading" class="loader" />
      <select
        v-model="model"
        :class="[isInvalid && 'invalid']"
        :disabled="!models.data || models.loading || isInvalid"
        @change="emit('change')"
      >
        <span v-if="models.loading" class="loader" />
        <option v-if="model === null" :value="null" selected disabled>Select model</option>
        <option v-for="model in models.data" :key="model.model" :value="model.model">{{ model.model }}</option>
      </select>
      <p class="error-message" v-if="isInvalid">Sorry, something went while trying to get models, please try again.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ModelResponse} from "@/types/ModelResponse";
import {computed} from "vue";

const { models } = defineProps<{
  models: ModelResponse,
}>()
const emit = defineEmits<{
  change: []
}>()
const model = defineModel<string | null>('model', { required: true });
const isInvalid = computed(() => (Array.isArray(models.data) && !models.data.length) || models.error)
</script>

<style scoped>
@import '../assets/home.scss';
</style>