<template>
  <button :disabled="disabled" :onclick="() => {}">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
export type CommonButtonProps = {
  label: string
  disabled?: boolean
}
defineProps<CommonButtonProps>()
</script>

<style scoped>
button {
  padding: 0.5rem;
  cursor: pointer;
  background-color: #f58c22;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  border: 2px solid #f58c22;
  transition: all ease-in-out 0.3s;

  &:hover {
    background-color: #fff;
    color: #f58c22;
  }
}
</style>
