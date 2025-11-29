<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const target = ref<HTMLElement | null>(null);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (target.value) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          // Опционально: отключить наблюдение после появления, если анимация нужна только один раз
          // observer?.disconnect();
        } else {
          isVisible.value = false;
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(target.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div ref="target" :class="['icon-world-map-container', { 'animate-glow': isVisible }]">
    <div
      class="w-full aspect-[2/1] bg-gray-400 transition-all duration-1000 ease-out"
      style="
        mask-image: url('/map.svg');
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-image: url('/map.svg');
        -webkit-mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
      "
    ></div>
  </div>
</template>

<style scoped>
.icon-world-map-container {
  transition: opacity 1s ease-out;
}

.animate-glow div {
  /* Серебряное свечение */
  filter: drop-shadow(0 0 5px rgba(192, 192, 192, 0.5))
    drop-shadow(0 0 10px rgba(192, 192, 192, 0.3));
  background-color: #e5e7eb; /* Более светлый серебряный при свечении */
}
</style>
