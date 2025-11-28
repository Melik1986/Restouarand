<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  align: 'center',
});
</script>

<template>
  <div :class="['flex flex-col mb-12', `text-${align}`]">
    <div v-if="subtitle" class="text-primary-main mb-4 flex items-center gap-4 justify-center">
      <!-- Декоративные линии, если нужно, можно добавить -->
      <span class="h-[1px] w-12 bg-primary-dark opacity-50"></span>
      <img src="/src/assets/vue.svg" alt="icon" class="w-6 h-6 opacity-0" />
      <!-- Placeholder icon space -->
      <span class="h-[1px] w-12 bg-primary-dark opacity-50"></span>
    </div>
    <h2 class="font-headings text-3xl md:text-4xl uppercase tracking-[0.2em] text-primary-main">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-text-secondary font-primary max-w-2xl mx-auto">
      {{ subtitle }}
    </p>
  </div>
</template>
