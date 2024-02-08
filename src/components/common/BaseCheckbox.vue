<script setup>
import { computed } from "vue";
import { v4 as uuid } from "uuid";
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
   id: {
      type: String,
      default: () => `field-${uuid()}`,
   },
   modelValue: {
      type: [Array, Boolean],
      default: false,
   },
   value: {
      type: String,
      default: null,
   },
});

const proxyChecked = computed({
   get() {
      return props.modelValue;
   },

   set(val) {
      emit("update:modelValue", val);
   },
});
</script>

<template>
   <label for="">
      <CheckboxRoot v-model:checked="proxyChecked"
         class="transition-colors border rounded shadow-sm cursor-pointer peer form-checkbox accent-current focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-primary-200 dark:focus-visible:ring-offset-primary-900"
         :class="[
            'text-primary',
            'size-6',
            'bg-gray-50 checked:!bg-primary-500 dark:bg-gray-900 ',
            'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600',
         ]">
         <CheckboxIndicator class="flex items-center justify-center w-full h-full bg-white rounded">
            <slot name="icon">
               <span class="i-heroicons-check" />
            </slot>
         </CheckboxIndicator>
      </CheckboxRoot>
      <span>
         <slot />
      </span>
   </label>
</template>
