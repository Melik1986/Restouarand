<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
});

const classes = computed(() => {
  const base =
    'inline-flex items-center justify-center font-semibold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary-main text-background-secondary hover:bg-primary-light hover:-translate-y-0.5 shadow-md hover:shadow-lg',
    outline:
      'border-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-background-secondary hover:-translate-y-0.5',
    text: 'text-primary-main hover:text-primary-light underline-offset-4 hover:underline',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-8 py-3',
    lg: 'text-base px-10 py-4',
  };

  return [base, variants[props.variant], sizes[props.size]].join(' ');
});
</script>

<template>
  <button :type="props.type" :class="classes" :disabled="props.disabled">
    <slot />
  </button>
</template>
