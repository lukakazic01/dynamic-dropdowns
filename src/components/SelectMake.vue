<template>
  <div class="select-container">
    <label>MakeResponse</label>
    <div class="select-wrapper">
      <span v-if="makes.loading" class="loader" />
      <select
        v-model="make"
        :class="[isInvalid && 'invalid']"
        :disabled="!makes.data || makes.loading || isInvalid"
        @change="emit('change')"
      >
        <option v-if="make === null" :value="null" selected disabled>Select make</option>
        <option v-for="make in makes.data" :key="make.id" :value="make.name">{{ make.name }}</option>
      </select>
      <p class="error-message" v-if="isInvalid">Sorry, something went while trying to get makes, please try again.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {MakeResponse} from "@/types/MakeResponse";
import {computed} from "vue";

const { makes } = defineProps<{
  makes: MakeResponse,
}>()
const emit = defineEmits<{
  change: []
}>()
const make = defineModel<string | null>('make', { required: true });
const isInvalid = computed(() => (Array.isArray(makes.data) && !makes.data.length) || makes.error)
</script>

<style scoped>
@import '../assets/home.scss';
</style>