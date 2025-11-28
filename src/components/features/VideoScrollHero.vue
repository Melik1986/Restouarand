<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ref, onMounted, onUnmounted } from 'vue';

import UiButton from '../ui/UiButton.vue';

gsap.registerPlugin(ScrollTrigger);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const sectionRef = ref<HTMLElement | null>(null);

const frameCount = 100;
const currentFrame = { index: 0 };
const images: HTMLImageElement[] = [];
const imagesLoaded = ref(0);

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    // Используем SVG или плейсхолдеры если нет реальных кадров
    const frameIndex = String(i).padStart(4, '0');
    img.src = `/animation/${frameIndex}.svg`; // Предполагаем, что есть SVG, или используем заглушку
    // Если SVG нет, можно было бы рисовать программно, но для простоты предположим что они есть
    // (скрипт генерации был удален, но можно добавить fallback на error)

    img.onload = () => {
      imagesLoaded.value++;
      if (imagesLoaded.value === 1) {
        render(); // Render first frame immediately
      }
    };
    img.onerror = () => {
      // Fallback logic could go here
      // console.warn(`Failed to load frame ${frameIndex}`);
    };
    images.push(img);
  }
};

const render = () => {
  const canvas = canvasRef.value;
  const context = canvas?.getContext('2d');
  if (!canvas || !context) return;

  const img = images[currentFrame.index];
  if (img) {
    // Cover logic for canvas
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Если изображение не загрузилось или ошибка, рисуем фон
    if (img.complete && img.naturalHeight !== 0) {
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    } else {
      context.fillStyle = '#1a1a1a';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#C5A059';
      context.font = '30px Arial';
      context.textAlign = 'center';
      context.fillText('Video Effect Placeholder', canvas.width / 2, canvas.height / 2);
    }
  }
};

const handleResize = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    render();
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  preloadImages();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: canvasRef.value, // Pin the canvas
      // markers: true, // Debug
    },
    onUpdate: render, // Redraw on every tick
  });

  tl.to(currentFrame, {
    index: frameCount - 1,
    snap: 'index',
    ease: 'none',
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section ref="sectionRef" class="relative h-[400vh] bg-background-primary">
    <!-- Sticky Container for Canvas and Overlay -->
    <div class="sticky top-0 h-screen w-full overflow-hidden">
      <canvas ref="canvasRef" class="absolute top-0 left-0 w-full h-full object-cover z-0"></canvas>

      <!-- Overlay Content -->
      <div
        class="absolute inset-0 bg-background-overlay/40 z-10 flex flex-col items-center justify-center text-center px-4"
      >
        <div class="relative z-20">
          <h1
            class="text-primary-main font-script text-6xl md:text-8xl lg:text-9xl mb-4 drop-shadow-lg opacity-0 animate-fade-in-up"
            style="animation-delay: 0.5s; animation-fill-mode: forwards"
          >
            Bon <br />
            appetit!
          </h1>
          <p
            class="text-text-primary font-primary text-sm md:text-base max-w-md mx-auto mb-8 opacity-0 animate-fade-in-up"
            style="animation-delay: 1s; animation-fill-mode: forwards"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel eros sit amet nulla
            pellentesque cursus nbam.
          </p>
          <div
            class="opacity-0 animate-fade-in-up"
            style="animation-delay: 1.5s; animation-fill-mode: forwards"
          >
            <UiButton variant="primary" size="lg">Tastefull</UiButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-up {
  animation-name: fadeInUp;
  animation-duration: 1s;
}
</style>
