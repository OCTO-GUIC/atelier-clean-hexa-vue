<template>
  <header>
      <nav>
        <RouterLink to="/">Store</RouterLink>
        <RouterLink to="/battle">Battle</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      Footer
    </footer>
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>
