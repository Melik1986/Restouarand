<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  image?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center text-center group">
    <div
      class="w-40 h-40 rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary-main transition-all duration-500 mb-6 shadow-lg"
    >
      <img
        :src="image || 'https://placehold.co/200x200/1a1a1a/C5A059?text=Sweet'"
        :alt="title"
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <h3 class="text-lg font-headings text-primary-main uppercase tracking-wider mb-3">
      {{ title }}
    </h3>
    <p class="text-text-secondary text-xs max-w-[200px] font-primary">{{ description }}</p>
  </div>
</template>
