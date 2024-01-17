<template>
  <div>
    KeyBoard
    <input class="invisible-input" @keydown="handleKeydown" autofocus />
    <div class="keyboard-base">
      <KeyboardKey
        v-for="character in characters"
        :key="character"
        :character="character"
        :isActive="character.split(' ').some((c) => pressedKeys.includes(c))"
        :class="[
          'key',
          character,
          character == '\\ |' ? 'backslash' : '',
          character === activeKey ? 'active' : '',
        ]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import characters from "../keyboardCharacters.ts";

const props = defineProps(["shortcuts"]);
const emit = defineEmits(["validation"]);
const pressedKeys = ref([]);
const activeKey = ref("");
const handleKeydown = (event) => {
  event.preventDefault();
  if (event.key === "Enter") {
    checkAnswer();
  } else {
    activeKey.value = event.key;
    if (event.key.length === 1) {
      pressedKeys.value.push(event.key.toUpperCase());
    } else {
      pressedKeys.value.push(event.key);
    }
  }
};

const checkAnswer = () => {
  console.log(pressedKeys.value);

  let answerKeys = props.shortcuts.split("+");
  answerKeys = answerKeys.map((key) => (key === "Ctrl" ? "Control" : key));
  console.log(answerKeys);
  const isCorrect = answerKeys.every(
    (key, index) => key === pressedKeys.value[index]
  );

  emit("validation", isCorrect);
  pressedKeys.value = [];
};
</script>

<style scoped>
body * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.keyboard-base {
  max-width: 1085px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(197, 197, 197);
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(30, 30px);
  grid-template-rows: repeat(5, 60px);
  grid-gap: 5px;
}

.key {
  background-color: rgb(243, 243, 243);
  border: 2px solid black;
  border-radius: 5px;
  grid-column: span 2;
  font-size: 20px;
  text-align: center;
  padding-top: 5px;
  word-spacing: 10px;
}
/* .invisible-input {
  opacity: 0;
  position: absolute;
  pointer-events: none;
  height: 0;
  width: 0;
} */

.active {
  border: 1px solid #eeeeee;
}

.Backspace {
  grid-column: span 4;
}

.Tab {
  grid-column: span 3;
}

.backslash {
  grid-column: span 3;
}

.CapsLock {
  grid-column: span 4;
}

.Return {
  grid-column: span 4;
}

.Shift {
  grid-column: span 5;
}

.Ctrl {
  grid-column: span 3;
}

.Command {
  grid-column: span 3;
  font-size: 14px;
}

.Space {
  grid-column: span 13;
}
</style>
