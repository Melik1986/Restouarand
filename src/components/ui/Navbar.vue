<script setup lang="ts">
import Button from './Button.vue';
</script>

<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 bg-background-primary/80 backdrop-blur-md border-b border-white/5 transition-all duration-300"
  >
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
      <a href="#" class="text-2xl font-serif font-bold text-primary-500 tracking-tight">
        LUMIÈRE
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a
          href="#menu"
          class="text-sm font-medium uppercase text-neutral-100 hover:text-primary-500 transition-colors tracking-widest"
          >Menu</a
        >
        <a
          href="#about"
          class="text-sm font-medium uppercase text-neutral-100 hover:text-primary-500 transition-colors tracking-widest"
          >About</a
        >
        <a
          href="#gallery"
          class="text-sm font-medium uppercase text-neutral-100 hover:text-primary-500 transition-colors tracking-widest"
          >Gallery</a
        >
        <Button variant="primary" class="text-xs px-5 py-2">Reservations</Button>
      </div>

      <!-- Mobile Menu Button (Placeholder) -->
      <button class="md:hidden text-neutral-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>
