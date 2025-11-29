<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ref, onMounted, onUnmounted } from 'vue';

import UiButton from '../ui/UiButton.vue';

gsap.registerPlugin(ScrollTrigger);

const canvasRef1 = ref<HTMLCanvasElement | null>(null);
const canvasRef2 = ref<HTMLCanvasElement | null>(null);
const sectionRef = ref<HTMLElement | null>(null);
const backgroundLoaded = ref(false);

const model1Count = 27;
const model2Count = 13;
const currentFrame1 = { index: 0 };
const currentFrame2 = { index: 0 };
const model1Images: HTMLImageElement[] = [];
const model2Images: HTMLImageElement[] = [];
const imagesLoaded = ref(0);

const preloadImages = () => {
  // Load Model 1 - приоритет на первое изображение
  const firstImg = new Image();
  firstImg.src = `/animation/model-1/0001.png`;
  firstImg.onload = () => {
    model1Images[0] = firstImg;
    imagesLoaded.value++;
    // Отрисовываем первое изображение сразу
    if (canvasRef1.value) {
      renderCanvas(canvasRef1.value, model1Images, 0);
    }
  };
  model1Images[0] = firstImg;

  // Загружаем остальные кадры Model 1
  for (let i = 2; i <= model1Count; i++) {
    const img = new Image();
    const frameIndex = String(i).padStart(4, '0');
    img.src = `/animation/model-1/${frameIndex}.png`;
    img.onload = () => {
      imagesLoaded.value++;
    };
    model1Images.push(img);
  }

  // Load Model 2
  for (let i = 1; i <= model2Count; i++) {
    const img = new Image();
    const frameIndex = String(i).padStart(4, '0');
    img.src = `/animation/model-2/${frameIndex}.png`;
    img.onload = () => {
      imagesLoaded.value++;
    };
    model2Images.push(img);
  }
};

const renderCanvas = (
  canvas: HTMLCanvasElement | null,
  images: HTMLImageElement[],
  frameIndex: number
) => {
  const context = canvas?.getContext('2d');
  if (!canvas || !context) return;

  const img = images[frameIndex];
  if (img && img.complete && img.naturalHeight !== 0) {
    const isMobile = canvas.width < 768;
    let ratio;

    if (isMobile) {
      // На мобильных подгоняем по ширине с отступами
      ratio = (canvas.width * 0.9) / img.width;
    } else {
      // На десктопе ограничиваем высоту (например, 75% высоты экрана)
      // Используем Math.min для 'contain' логики, чтобы не обрезать,
      // но также учитываем, чтобы не было слишком мелко
      const hRatio = (canvas.width * 0.5) / img.width; // Занимать не более 50% ширины
      const vRatio = (canvas.height * 0.75) / img.height; // Занимать не более 75% высоты
      ratio = Math.min(hRatio, vRatio);
    }

    // Смещаем центр изображения вправо
    let centerShiftX;
    let centerShiftY;

    if (isMobile) {
      centerShiftX = (canvas.width - img.width * ratio) / 2; // Центрируем по горизонтали
      centerShiftY = canvas.height * 0.6 - (img.height * ratio) / 2; // Смещаем чуть ниже центра
    } else {
      centerShiftX = canvas.width * 0.75 - (img.width * ratio) / 2; // Справа на десктопе
      centerShiftY = (canvas.height - img.height * ratio) / 2; // Центрируем по вертикали
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
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
  }
};

const render1 = () => renderCanvas(canvasRef1.value, model1Images, currentFrame1.index);
const render2 = () => renderCanvas(canvasRef2.value, model2Images, currentFrame2.index);

const handleResize = () => {
  if (canvasRef1.value) {
    canvasRef1.value.width = window.innerWidth;
    canvasRef1.value.height = window.innerHeight;
    render1();
  }
  if (canvasRef2.value) {
    canvasRef2.value.width = window.innerWidth;
    canvasRef2.value.height = window.innerHeight;
    render2();
  }
};

// Ленивая загрузка фона
const loadBackground = () => {
  const bgImg = new Image();
  bgImg.src = '/backgraund.png';
  bgImg.onload = () => {
    if (sectionRef.value) {
      sectionRef.value.style.backgroundImage = `url('/backgraund.png')`;
      backgroundLoaded.value = true;
    }
  };
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);

  // Загружаем фон после загрузки страницы (lazy loading)
  loadBackground();

  preloadImages();

  // Анимация появления canvas одновременно с заголовком или сразу после
  if (canvasRef1.value) {
    gsap.set(canvasRef1.value, { opacity: 0 });
    // Проверяем, загружено ли первое изображение перед показом canvas
    const checkAndShow = () => {
      if (model1Images[0] && model1Images[0].complete) {
        render1();
        gsap.to(canvasRef1.value, {
          opacity: 1,
          duration: 1,
          delay: 1.6, // Появляется после заголовка (заголовок: delay 0.5s + duration 1s = 1.5s)
          ease: 'power2.out',
        });
      } else {
        // Если еще не загружено, ждем
        setTimeout(checkAndShow, 50);
      }
    };
    checkAndShow();
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: '+=4000', // Создаем виртуальный скролл на 4000px
      scrub: 1,
      pin: true, // Пинним саму секцию, а не внутренний контейнер
    },
  });

  // 1. Анимация кадров Model 1
  tl.to(currentFrame1, {
    index: model1Count - 1,
    snap: 'index',
    ease: 'none',
    duration: 2,
    onUpdate: render1,
  })
    // 2. Model 1 уезжает вправо, Model 2 появляется
    .to(canvasRef1.value, { x: '150%', duration: 1, ease: 'power1.inOut' }, '+=0.2')
    .fromTo(
      canvasRef2.value,
      { x: '-100%', autoAlpha: 1 },
      { x: '0%', duration: 1, ease: 'power1.inOut' },
      '<'
    )
    // 3. Анимация кадров Model 2
    .to(currentFrame2, {
      index: model2Count - 1,
      snap: 'index',
      ease: 'none',
      duration: 2,
      onUpdate: render2,
    })
    // 4. Model 2 уезжает вправо
    .to(canvasRef2.value, { x: '150%', duration: 1, ease: 'power1.inOut' }, '+=0.2');
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative h-screen bg-background-primary overflow-hidden"
    :style="{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: backgroundLoaded ? `url('/backgraund.png')` : 'none',
    }"
  >
    <!-- Canvas 1 -->
    <canvas
      ref="canvasRef1"
      class="absolute top-0 left-0 w-full h-full object-cover z-10"
      style="opacity: 0"
    ></canvas>

    <!-- Canvas 2 (initially hidden/offset) -->
    <canvas
      ref="canvasRef2"
      class="absolute top-0 left-0 w-full h-full object-cover z-10 opacity-0"
      style="transform: translateX(-100%)"
    ></canvas>

    <!-- Overlay Content -->
    <div
      class="absolute inset-0 bg-background-overlay/10 z-20 flex flex-col justify-center items-start px-4 md:px-20 pointer-events-none"
    >
      <div class="relative z-20 pointer-events-auto w-full md:w-1/2 text-left">
        <img
          src="/title.svg"
          alt="Bon appetit"
          class="mb-6 drop-shadow-xl opacity-0 animate-fade-in-up w-full max-w-xl transform -rotate-6 origin-left"
          style="animation-delay: 0.5s; animation-fill-mode: forwards"
        />
        <p
          class="text-text-primary font-primary text-sm md:text-base max-w-lg mb-10 opacity-0 animate-fade-in-up tracking-wide"
          style="animation-delay: 1s; animation-fill-mode: forwards"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel eros sit amet nulla
          pellentesque cursus nbam.
        </p>
        <div
          class="opacity-0 animate-fade-in-up"
          style="animation-delay: 1.5s; animation-fill-mode: forwards"
        >
          <UiButton
            variant="primary"
            size="lg"
            class="px-12 py-4 text-sm tracking-[0.2em] font-bold !rounded-sm"
            >TASTEFULL</UiButton
          >
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
