<script setup>
import { twMerge } from "tailwind-merge";

const props = defineProps({
   value: String,
   required: Boolean,
   showRequired: {
      type: Boolean,
      default: false,
   },
   showOptional: {
      type: Boolean,
      default: true,
   },
});
const field = inject("field", props);
</script>

<template>
   <label :class="[
      twMerge(
         ' transition-colors  text-sm font-medium capitalize text-secondary-500 group-focus-within:text-primary-700',
         'after:text-surface-600 after:ms-2 after:text-xs after:text-gray-300',
         $attrs?.class
      ),
      field?.required &&
      field.showRequired &&
      'after:content-[attr(data-required-label)] ',
      !field?.required &&
      field.showOptional &&
      'after:content-[attr(data-optional-label)] ',
   ]" :data-required-label="`*`" :data-optional-label="''">
      <span v-if="value">{{ value }}</span>
      <span v-else>
         <slot />
      </span>
   </label>
</template>
