<template>
  <a :href="url" :title="title">{{ label }}</a>
</template>

<script setup lang="ts">
export type CommonLinkProps = {
  url: string
  label: string
  title?: string
}
defineProps<CommonLinkProps>()
</script>
