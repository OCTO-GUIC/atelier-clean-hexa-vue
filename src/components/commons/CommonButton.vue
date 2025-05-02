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
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: rgb(54, 3, 98);
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  border: 2px solid rgb(54, 3, 98);
  transition: all ease-in-out 0.3s;

  &:hover {
    background-color: #fff;
    color: rgb(54, 3, 98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      background-color: rgb(54, 3, 98);
      color: #fff;
    }
  }
}
</style>
