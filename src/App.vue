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
    <span>Dodo & Guigui</span><img src="/images/logo.svg" alt="" /><span>Octo Technology</span>
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
  position: relative;
  padding: 0 0.5rem;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  font-size: 1.25rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 0;
    bottom: -8px;
    display: block;
    width: 100%;
    background: #fff;
    transition: all ease-in-out 0.3s;
  }

  &:hover:before {
    height: 4px;
  }
}

main {
  background-color: #cda781;
  overflow: hidden;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.router-link-active {
  font-weight: 700;
}
</style>
