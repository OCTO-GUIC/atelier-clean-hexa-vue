<template>
  <header>
    <nav>
      <RouterLink to="/">Shop</RouterLink>
      <RouterLink to="/battle">Battle</RouterLink>
    </nav>
    <SoldierHeader />
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
import SoldierHeader from './components/Header/SoldierHeader.vue'
</script>

<style scoped>
header,
footer {
  padding: 1rem;
  background-color: rgb(54, 3, 98);
  color: white;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav a {
  padding: 0 0.5rem;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
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
