<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline';
  }>(),
  {
    variant: 'primary',
  }
);
</script>

<template>
  <button
    :class="[
      'px-6 py-3 font-semibold uppercase tracking-wider transition-all duration-300',
      variant === 'outline'
        ? 'border border-primary-500 text-primary-500 hover:bg-primary-500/10'
        : 'bg-primary-500 text-background-primary hover:bg-[#B5952F] active:scale-95',
    ]"
  >
    <slot />
  </button>
</template>
