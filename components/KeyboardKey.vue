<template>
  <div>
    <div :class="{ 'active-key': props.isActive }">{{ props.character }}</div>
  </div>
</template>

<script setup>
const props = defineProps(["character", "isActive"]);
</script>

<style>
.active-key {
  color: red;
}
</style>
