<script setup>
import BaseLabel from "./BaseLabel.vue";
const props = defineProps({
   showPlaceholder: Boolean,
   iconWrapperWidth: Number,
});
</script>
<template>
   <BaseLabel :class="[
      showPlaceholder
         ? 'peer-placeholder-shown:text-transparent'
         : 'peer-placeholder-shown:text-gray-400',
   ]"
      class="peer-placeholder-shown:fl__position peer-focus:!inline-start-3 !inline-start-3 pointer-events-none absolute top-0 flex origin-top-left -translate-y-1/2 scale-90 items-center rounded bg-white px-1.5 text-left text-xs text-primary transition-all duration-300 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:p-0 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:scale-90 peer-focus:bg-white peer-focus:px-1.5 peer-focus:text-xs peer-focus:text-primary" />
</template>

<style>
.peer:placeholder-shown~.peer-placeholder-shown\:fl__position {
   inset-inline-start: calc(v-bind(iconWrapperWidth) * 1rem + theme(inset.3));
}
</style>
