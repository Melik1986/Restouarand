<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  description: string;
  modelPath?: string;
  frameCount?: number;
  fallbackImage?: string;
  progress?: number | null; // Новый проп: внешний прогресс анимации (0..1)
}

const props = withDefaults(defineProps<Props>(), {
  frameCount: 1,
  modelPath: '',
  fallbackImage: '',
  progress: null,
});

const currentFrame = ref(1);
const cardRef = ref<HTMLElement | null>(null);
const images = ref<HTMLImageElement[]>([]);

// Реакция на внешний прогресс
watch(
  () => props.progress,
  newProgress => {
    if (newProgress !== null && props.frameCount > 1) {
      // Конвертируем прогресс (0..1) в индекс кадра (1..frameCount)
      const frame = Math.min(
        Math.max(1, Math.round(newProgress * (props.frameCount - 1) + 1)),
        props.frameCount
      );
      currentFrame.value = frame;
    }
  }
);

const currentImageSrc = computed(() => {
  if (!props.modelPath) return props.fallbackImage;
  // Если анимация не нужна или всего 1 кадр
  if (props.frameCount <= 1) return `${props.modelPath}/0001.png`;

  const frameIndex = String(currentFrame.value).padStart(4, '0');
  return `${props.modelPath}/${frameIndex}.png`;
});

const preloadImages = () => {
  if (!props.modelPath || props.frameCount <= 1) return;

  for (let i = 1; i <= props.frameCount; i++) {
    const img = new Image();
    const frameIndex = String(i).padStart(4, '0');
    img.src = `${props.modelPath}/${frameIndex}.png`;
    images.value.push(img);
  }
};

onMounted(() => {
  preloadImages();

  // Используем внутренний ScrollTrigger только если не передан внешний прогресс
  if (props.progress === null && props.frameCount > 1 && cardRef.value) {
    const frameObj = { val: 1 };

    gsap.to(frameObj, {
      val: props.frameCount,
      snap: 'val',
      ease: 'none',
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top bottom-=100', // Начинаем, когда верх карточки появляется снизу
        end: 'bottom top+=100', // Заканчиваем, когда низ карточки уходит вверх
        scrub: 1, // Плавная привязка к скроллу
      },
      onUpdate: () => {
        currentFrame.value = Math.round(frameObj.val);
      },
    });
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => {
    if (t.trigger === cardRef.value) t.kill();
  });
});
</script>

<template>
  <div ref="cardRef" class="flex flex-col items-center text-center group relative z-10">
    <div
      class="w-64 h-64 mb-6 transform transition-transform duration-500 group-hover:scale-110 relative flex items-center justify-center"
    >
      <!-- Имитация десерта видом сверху (если нет картинки и модели) -->
      <div
        v-if="!modelPath && !fallbackImage"
        class="w-48 h-48 rounded-full overflow-hidden shadow-2xl bg-neutral-800 flex items-center justify-center relative"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-[#3a2a1a] to-[#1a1a1a]"></div>
        <!-- "Глазурь" -->
        <div class="absolute inset-4 rounded-full border-4 border-[#C5A059]/30 border-dashed"></div>
        <div
          class="absolute inset-0 flex items-center justify-center text-[#C5A059] font-script text-3xl opacity-50"
        >
          Sweet
        </div>
      </div>
      <img
        v-else
        :src="currentImageSrc"
        :alt="title"
        class="w-full h-full object-contain drop-shadow-2xl filter"
      />
    </div>
    <h3 class="text-sm font-headings text-primary-main uppercase tracking-[0.2em] mb-4">
      {{ title }}
    </h3>
    <div class="w-8 h-[1px] bg-primary-main/50 mb-4"></div>
    <p
      class="text-text-secondary text-[10px] max-w-[180px] font-primary leading-relaxed uppercase tracking-wider opacity-80"
    >
      {{ description }}
    </p>
  </div>
</template>
