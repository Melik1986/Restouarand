<script setup lang="ts">
import ProductCard from '@/components/features/ProductCard.vue';
import VideoScrollHero from '@/components/features/VideoScrollHero.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import TheNavbar from '@/components/layout/TheNavbar.vue';
import SectionTitle from '@/components/ui/SectionTitle.vue';

const products = [
  { id: 1, title: 'Cakes', description: 'Pastery specialties with 100% chocolate' },
  { id: 2, title: 'Piece', description: 'Pastery specialties with 100% chocolate' },
  { id: 3, title: 'Make a Wish', description: 'Pastery specialties with 100% chocolate' },
  { id: 4, title: 'Lenten Sweet', description: 'Pastery specialties with 100% chocolate' },
];
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheNavbar />

    <main class="flex-grow">
      <!-- Hero Section with Video Scroll Effect -->
      <VideoScrollHero />

      <!-- Products Section -->
      <section class="py-24 bg-background-secondary">
        <div class="container mx-auto px-6">
          <!-- В макете нет заголовка у этой секции, но товары идут сразу. Можно оставить без title или добавить скрытый -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :title="product.title"
              :description="product.description"
            />
          </div>
        </div>
      </section>

      <!-- About Us Section (Optional additional text block if needed, 
           but footer covers "About Us" in the mock usually. 
           Let's add a specific section if "Sweet Tooth" intro is separate) -->
      <section class="py-24 bg-background-primary relative overflow-hidden">
        <div class="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div class="w-full md:w-1/2">
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
          <div class="w-full md:w-1/2 flex justify-center">
            <img
              src="https://placehold.co/500x400/1a1a1a/C5A059?text=Interior"
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
