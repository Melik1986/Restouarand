<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ref, onMounted, onUnmounted } from 'vue';

import SectionTitle from '../ui/SectionTitle.vue';

import ProductCard from './ProductCard.vue';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const cardsContainerRef = ref<HTMLElement | null>(null);
const animationProgress = ref(0);

const products = [
  {
    id: 3,
    title: 'Chocolate Dreams',
    description: 'Decadent multi-layered chocolate cake with rich ganache.',
    modelPath: '/animation/model-3',
    frameCount: 6,
  },
  {
    id: 4,
    title: 'Berry Tart Piece',
    description: 'Fresh forest berries on a crispy butter crust with vanilla cream.',
    modelPath: '/animation/model-4',
    frameCount: 6,
  },
  {
    id: 5,
    title: 'Celebration Cupcake',
    description: 'Fluffy sponge cake topped with magical swirls of frosting.',
    modelPath: '/animation/model-5',
    frameCount: 6,
  },
  {
    id: 6,
    title: 'Pistachio Delight',
    description: 'Delicate nutty flavor with a hint of matcha and coconut.',
    modelPath: '/animation/model-6',
    frameCount: 5,
  },
];

onMounted(() => {
  // 1. Анимация появления карточек (до пининга или в начале)
  if (cardsContainerRef.value) {
    gsap.from(cardsContainerRef.value.children, {
      scrollTrigger: {
        trigger: cardsContainerRef.value,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }

  // 2. Пининг и вращение моделей
  if (sectionRef.value) {
    gsap.to(animationProgress, {
      value: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'center center',
        end: '+=1500',
        pin: true,
        scrub: 1,
        onUpdate: self => {
          animationProgress.value = self.progress;
        },
      },
    });
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => {
    if (t.trigger === sectionRef.value || t.trigger === cardsContainerRef.value) t.kill();
  });
});
</script>

<template>
  <section ref="sectionRef" class="py-32 bg-background-secondary relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
      <SectionTitle title="Sweet Tooth" subtitle="Our Delicious Menu" />

      <div
        ref="cardsContainerRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :title="product.title"
          :description="product.description"
          :model-path="product.modelPath"
          :frame-count="product.frameCount"
          :progress="animationProgress"
        />
      </div>
    </div>
  </section>
</template>
