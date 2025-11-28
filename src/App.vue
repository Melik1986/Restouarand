<script setup lang="ts">
import Lenis from 'lenis';
import { onMounted } from 'vue';

import HomeView from './views/HomeView.vue';

onMounted(() => {
  const lenis = new Lenis();

  lenis.on('scroll', () => {
    // console.log(e)
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
</script>

<template>
  <HomeView />
</template>
