<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ref, onMounted } from 'vue';

import IconCrown from '@/components/ui/icons/IconCrown.vue';
import IconWorldMap from '@/components/ui/icons/IconWorldMap.vue';

gsap.registerPlugin(ScrollTrigger);

const footerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (footerRef.value) {
    const columns = footerRef.value.querySelectorAll('.footer-col');

    gsap.from(columns, {
      scrollTrigger: {
        trigger: footerRef.value,
        start: 'top bottom-=50', // Начинаем, когда верх футера появляется снизу
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2, // Задержка между появлением колонок
      ease: 'power2.out',
    });
  }
});
</script>

<template>
  <footer ref="footerRef" class="bg-background-secondary py-20 border-t border-primary-dark/10">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-6">
      <!-- Brand -->
      <div class="flex flex-col items-start justify-center footer-col">
        <h3 class="text-2xl text-primary-main font-headings tracking-widest mb-8">Sweet Tooth</h3>
        <p class="text-text-secondary text-xs leading-loose mb-6 font-primary">
          Eighth Avenue 487, New York<br />
          +387643932728<br />
          pastery@sweettooth.com
        </p>
      </div>

      <!-- About Us Column -->
      <div class="flex flex-col items-center text-center footer-col">
        <div class="mb-6 text-primary-main">
          <IconCrown class="w-12 h-12" />
        </div>
        <h4 class="text-lg text-primary-main font-headings uppercase tracking-[0.2em] mb-6">
          About Us
        </h4>
        <p class="text-text-secondary text-xs leading-loose max-w-xs font-primary">
          Sed ac odio aliquet, fringilla odio eget, tincidunt nunc. Duis aliquet pulvinar ante
          tempor tincidunt. Etiam lacus eros, viverra non massa tempus, commodo fringilla nulla.
          Quisque vehicula.
        </p>
      </div>

      <!-- Map / Socials -->
      <div class="flex flex-col items-end md:justify-center footer-col w-full">
        <!-- World Map -->
        <div class="w-full md:max-w-[240px] mb-8 flex justify-end">
          <IconWorldMap class="w-full" />
        </div>
        <div class="flex gap-4 justify-end w-full md:w-auto">
          <a
            href="#"
            class="w-8 h-8 rounded-full border border-primary-main flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-background-primary transition-colors duration-300"
          >
            <span class="sr-only">Facebook</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="#"
            class="w-8 h-8 rounded-full border border-primary-main flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-background-primary transition-colors duration-300"
          >
            <span class="sr-only">Twitter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path
                d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
              />
            </svg>
          </a>
          <a
            href="#"
            class="w-8 h-8 rounded-full border border-primary-main flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-background-primary transition-colors duration-300"
          >
            <span class="sr-only">Instagram</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="#"
            class="w-8 h-8 rounded-full border border-primary-main flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-background-primary transition-colors duration-300"
          >
            <span class="sr-only">LinkedIn</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
        <div class="mt-10 text-text-muted text-[10px] tracking-wider italic">
          www.DownloadNewThemes.com
        </div>
      </div>
    </div>
  </footer>
</template>
