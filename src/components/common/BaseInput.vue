<script setup>
import { twMerge } from "tailwind-merge";
import FloatingLabel from "./FloatingLabel.vue";

defineOptions({
   inheritAttrs: false,
});

const props = defineProps({
   type: {
      default: "text",
      type: String,
   },
   as: {
      type: String,
      default: "input",
   },
   id: String,
   /** @type{import("vue").PropType<string|number|null|undefined>} */
   modelValue: [String, Object, Number],
   required: Boolean,
   ariaDescribedBy: String,
   endIcon: [String, Object, Function],
   startIcon: [String, Object, Function],
   iconClass: String,
   floatingLabel: String,
   showPlaceholder: Boolean,
   wrapperClass: String,
});

defineEmits(["update:modelValue"]);

const field = inject("field", props);

const input = ref(null);

onMounted(() => {
   if (input.value.hasAttribute("autofocus")) {
      input.value.focus();
   }
});

defineExpose({ focus: () => input.value.focus(), el: input });

const iconPadding = 0.5;
const iconWidth = 1;
const iconWrapperWidth = iconPadding * 2 + iconWidth + 0.5;
const showEyeSlashIcon = ref(false);
const togglePasswordInput = () => {
   if (input.value?.type === "text") {
      showEyeSlashIcon.value = false;
      input.value.type = "password";
   } else {
      input.value.type = "text";
      showEyeSlashIcon.value = true;
   }
};
/**
 * Returns a new object with the specified keys excluded.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The input object.
 * @param {(keyof T)[]} keysToExclude - The keys to exclude from the new object.
 * @returns {Partial<T>} - A new object with the specified keys excluded.
 */
function excludeKeys(obj, keysToExclude) {
   const newObj = {};
   for (const key in obj) {
      if (!keysToExclude.includes(key)) {
         newObj[key] = obj[key];
      }
   }
   return newObj;
}
const modifiedField = computed(() => {
   return excludeKeys(field.value, ["required"]);
});
</script>

<template>
   <div :style="{
      '--icon-wrapper-width': iconWrapperWidth + 'rem',
      '--icon-padding': iconPadding + 'rem',
      '--icon-width': iconWidth + 'rem',
   }" :class="[
   'relative isolate text-gray-600 focus-within:text-primary-500 dark:text-gray-300',
   wrapperClass,
]">
      <component :is="as" v-bind="Object.fromEntries(
         Object.entries($attrs).filter(
            ([key]) => !key.includes('class')
         )
      )
         " :id="field.id" :aria-describedby="field.ariaDescribedBy" ref="input" :type="type"
         :required="modifiedField.required" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
         :class="[
            twMerge(
               'block w-full rounded-lg p-3 text-sm shadow-sm transition-colors duration-150 focus:ring-0 disabled:cursor-not-allowed focus-within:border-none focus-visible:ring focus-visible:ring-primary-200 focus-visible:border-none focus-visible:outline-primary-400',
               $attrs.class
            ),
            'text-secondary-500 focus:text-secondary-500 dark:text-gray-400',
            ' disabled:contrast-75 dark:disabled:contrast-75',
            field.invalid
               ? 'border border-red-500  focus:border-primary-500'
               : 'border-gray-200 focus:border-primary-500    enabled:hover:enabled:border-gray-300 enabled:focus:hover:border-primary-500 dark:border-gray-700 dark:focus:border-primary-950 dark:enabled:hover:border-gray-600 dark:enabled:focus:hover:border-primary-950',
            'focus:shadow-sm focus:shadow-primary-100 ',
            !!props?.floatingLabel
               ? 'peer placeholder-transparent placeholder:text-[0px] '
               : ' placeholder-gray-300 dark:placeholder-gray-600',
            !!props?.showPlaceholder
               ? '!placeholder-gray-300 placeholder:!text-sm dark:!placeholder-gray-600'
               : '',
            {
               'ps-[--icon-wrapper-width]':
                  !!props?.startIcon || $slots.startIcon,
               'pe-[--icon-wrapper-width]':
                  !!props?.endIcon || $slots.endIcon,
            },
            {
               'form-input': props.as === 'input',
               'form-textarea': props.as === 'textarea',
            },
         ]" />

      <FloatingLabel v-if="!!props?.floatingLabel" :for="field.id" :value="floatingLabel" :required="field.required"
         :showPlaceholder="props?.showPlaceholder" :icon-wrapper-width="!!props.startIcon ? iconWrapperWidth : 0" />
      <slot name="startIcon">
         <div v-if="props?.startIcon"
            class="absolute inset-y-0 start-0 grid place-content-center px-[var(--icon-padding)]">
            <component :is="props.startIcon" :class="[
               'aspect-square w-[var(--icon-width)] transition-colors duration-150',
               iconClass,
            ]" />
         </div>
      </slot>
      <slot name="endIcon" classes="absolute inset-y-0 end-0 grid place-content-center px-[var(--icon-padding)]">
         <div v-if="props?.endIcon ||
            (props.type === 'password' && modelValue?.length)
            " class="absolute inset-y-0 end-0 grid place-content-center px-[var(--icon-padding)]">
            <template v-if="props.type !== 'password'">
               <component :is="props.endIcon" :class="[
                  'aspect-square w-[var(--icon-width)] transition-colors duration-150',
                  iconClass,
               ]" />
            </template>
            <template v-else>
               <span v-if="modelValue?.length" role="button" @click="togglePasswordInput" class="cursor-pointer">
                  <span :class="showEyeSlashIcon ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                     class="aspect-square w-[var(--icon-width)] transition duration-150 hover:opacity-90" />
               </span>
            </template>
         </div>
      </slot>
   </div>
</template>
<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
   -webkit-appearance: none !important;
   margin: 0 !important;
}

/* Firefox */
input[type="number"] {
   -moz-appearance: textfield !important;
}

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
   display: none;
}
</style>
