<template>
  <header>
    <nav>
      <RouterLink to="/">Shop</RouterLink>
      <RouterLink to="/battle">Battle</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <span>Dodo & Guigui</span><img src="../public/images/logo.svg" /><span>Octo Technology</span>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
header,
footer {
  padding: 1rem;
  background-color: #3d3d3d;
  color: white;
}

main {
  background-color: #cda781;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
