<template>
  <div>
    <div v-if="pending">Loading ...</div>
    <div v-else>{{ shortcutsData[count].command }}</div>
    <AppKeyboard
      :shortcuts="shortcutsData[count].keybinding"
      @validation="handleResponse"
    />
    <button @click="count = count - 1">Back</button>
    <button v-if="correct" @click="(count = count + 1), (correct = false)">
      Next
    </button>
  </div>
</template>

<script setup>
import { useAsyncData } from "nuxt/app";
const count = ref(0);
const correct = ref(false);
const supabase = useSupabaseClient();
const handleResponse = (result) => {
  if (result) {
    correct.value = true;
    console.log("correct");
  } else {
    correct.value = false;
    console.log("wrong");
  }
};

const fetchShortcuts = async () => {
  const { data, error } = await supabase
    .from("vscode-keys")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

const { data: shortcutsData, pending } = useAsyncData(
  "shortcuts",
  fetchShortcuts
);
</script>
