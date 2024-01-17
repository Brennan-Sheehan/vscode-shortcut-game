<template>
  <div>
    <button @click="count++">Next</button>
    <div>
      {{ shortcuts.shortcutData[count] }}
    </div>
  </div>
</template>

<script setup></script>
