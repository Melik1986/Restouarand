<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ref, onMounted } from 'vue';

import ProductsGrid from '@/components/features/ProductsGrid.vue';
import VideoScrollHero from '@/components/features/VideoScrollHero.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import TheNavbar from '@/components/layout/TheNavbar.vue';
import SectionTitle from '@/components/ui/SectionTitle.vue';

gsap.registerPlugin(ScrollTrigger);

const aboutSectionRef = ref<HTMLElement | null>(null);
const aboutTextRef = ref<HTMLElement | null>(null);
const aboutImageRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (aboutSectionRef.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSectionRef.value,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
    });

    if (aboutTextRef.value) {
      tl.from(aboutTextRef.value, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }

    if (aboutImageRef.value) {
      tl.from(
        aboutImageRef.value,
        {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.8' // Запускаем чуть раньше окончания предыдущей анимации
      );
    }
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheNavbar />

    <main class="flex-grow">
      <!-- Hero Section with Video Scroll Effect -->
      <VideoScrollHero />

      <!-- Products Section -->
      <ProductsGrid />

      <!-- About Us Section -->
      <section ref="aboutSectionRef" class="py-24 bg-background-primary relative overflow-hidden">
        <div class="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div ref="aboutTextRef" class="w-full md:w-1/2">
            <SectionTitle
              title="Sweet Tooth"
              align="left"
              subtitle="The best pastry shop in New York"
            />
            <p class="text-text-secondary mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac odio aliquet,
              fringilla odio eget, tincidunt nunc. Duis aliquet pulvinar ante tempor tincidunt.
            </p>
          </div>
          <div ref="aboutImageRef" class="w-full md:w-1/2 flex justify-center">
            <img
              src="/Interior.jpg"
              alt="Interior"
              class="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>
    </main>

    <TheFooter />
  </div>
</template>
