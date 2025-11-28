<script setup lang="ts"></script>

<template>
  <footer class="bg-background-secondary py-16 border-t border-primary-dark/20">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
      <!-- Brand -->
      <div class="flex flex-col items-start">
        <h3 class="text-2xl text-primary-main font-headings mb-6">Sweet Tooth</h3>
        <p class="text-text-secondary text-sm leading-relaxed mb-6">
          Eighth Avenue 487, New York<br />
          +387643932728<br />
          pastery@sweettooth.com
        </p>
      </div>

      <!-- About Us Column -->
      <div class="flex flex-col items-center text-center">
        <div class="mb-4 text-primary-main">
          <!-- Crown Icon Placeholder -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-crown"
          >
            <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
          </svg>
        </div>
        <h4 class="text-lg text-primary-main uppercase tracking-widest mb-4">About Us</h4>
        <p class="text-text-secondary text-xs leading-relaxed max-w-xs">
          Sed ac odio aliquet, fringilla odio eget, tincidunt nunc. Duis aliquet pulvinar ante
          tempor tincidunt. Etiam lacus eros, viverra non massa tempus.
        </p>
      </div>

      <!-- Map / Socials -->
      <div class="flex flex-col items-end">
        <!-- World Map Placeholder -->
        <div class="w-full max-w-[200px] opacity-50 mb-6">
          <svg viewBox="0 0 100 50" class="w-full h-auto fill-current text-primary-main">
            <!-- Simplified map shapes -->
            <path d="M10,10 Q20,5 30,10 T50,10 T70,10 T90,10 V40 H10 Z" />
          </svg>
        </div>
        <div class="flex gap-4">
          <a
            href="#"
            class="w-8 h-8 rounded-full border border-primary-main flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-background-primary transition-colors"
          >
            <span class="sr-only">Facebook</span>
            f
          </a>
          <a
            href="#"
            class="w-8 h-8 rounded-full border border-primary-main flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-background-primary transition-colors"
          >
            <span class="sr-only">Twitter</span>
            t
          </a>
          <a
            href="#"
            class="w-8 h-8 rounded-full border border-primary-main flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-background-primary transition-colors"
          >
            <span class="sr-only">Instagram</span>
            i
          </a>
        </div>
        <div class="mt-8 text-text-muted text-xs italic">www.DownloadNewThemes.com</div>
      </div>
    </div>
  </footer>
</template>
