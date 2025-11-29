<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import IconCrown from '@/components/ui/icons/IconCrown.vue';

const isScrolled = ref(false);
const isMenuOpen = ref(false);

const checkScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4',
      isScrolled ? 'bg-background-primary/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent',
    ]"
  >
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex flex-col items-center">
        <IconCrown class="w-6 h-6 mb-1 text-primary-main" />
        <span class="text-primary-main text-lg font-script tracking-widest">Sweet Tooth</span>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <!-- Можно добавить пункты меню -->
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="text-primary-main hover:text-primary-light focus:outline-none"
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMenuOpen"
        class="absolute top-full left-0 w-full bg-background-secondary border-t border-primary-dark/20 p-6 shadow-xl md:hidden"
      >
        <ul class="flex flex-col gap-4 text-center">
          <li>
            <a href="#" class="text-text-primary hover:text-primary-main transition-colors">Home</a>
          </li>
          <li>
            <a href="#" class="text-text-primary hover:text-primary-main transition-colors"
              >About Us</a
            >
          </li>
          <li>
            <a href="#" class="text-text-primary hover:text-primary-main transition-colors">Menu</a>
          </li>
          <li>
            <a href="#" class="text-text-primary hover:text-primary-main transition-colors"
              >Contact</a
            >
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>
