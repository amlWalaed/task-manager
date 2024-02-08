<script setup>
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { twMerge, twJoin } from "tailwind-merge";

defineOptions({
   inheritAttrs: false,
});

const props = defineProps({
   loading: Boolean,
   disabled: Boolean,
   as: {
      type: [String, Object],
      default: "button",
   },
   /** @type {import("vue").PropType<'button'|'submit'|'reset'>} */
   type: {
      default: "button",
      type: String,
   },
   /** @type {import("vue").PropType<'primary'|'secondary'|'accent'|'neutral'|'danger'|'info'|'success'|'warning'>} */
   color: {
      type: String,
      default: "primary",
      validator: (val) =>
         [
            "primary",
            "secondary",
            "accent",
            "neutral",
            "danger",
            "info",
            "success",
            "warning",
         ].includes(val),
   },
   /** @type {import("vue").PropType<'solid'|'outline'|'ghost'|'soft'|'link'|'gradient'>} */
   variant: {
      type: String,
      default: "solid",
      validator: (val) =>
         ["solid", "outline", "ghost", "link", "soft", "gradient"].includes(
            val
         ),
   },
   /** @type {import("vue").PropType<"full"| "circle"| "none"| "sm"|'base'| "md"| "lg"|"xl"|"2xl"|"3xl">} */
   roundness: {
      type: String,
      validator: (val) =>
         [
            "full",
            "circle",
            "none",
            "sm",
            "base",
            "md",
            "lg",
            "xl",
            "2xl",
            "3xl",
         ].includes(val),
   },
   /** @type {import("vue").PropType<"xs"| "sm"| "base"| "lg"|"xl">} */
   size: {
      type: String,
      validator: (val) => ["xs", "sm", "base", "lg", "xl"].includes(val),
      default: "sm",
   },
   linkAs: [String, Function],
   label: {
      type: String,
      default: null,
   },
   truncate: {
      type: Boolean,
      default: false,
   },
   iconClass: {
      type: [String, Array],
      default: null,
   },
   leadingIcon: {
      type: [String, Array],
      default: null,
   },
   trailingIcon: {
      type: [String, Array],
      default: null,
   },
   trailingIconWrapperClass: {
      type: [String, Array],
      default: "",
   },
   leadingIconWrapperClass: {
      type: [String, Array],
      default: "",
   },
   trailing: {
      type: Boolean,
      default: false,
   },
   leading: {
      type: Boolean,
      default: false,
   },
});

const buttonClass = computed(() => {
   return cva(["btn group/btn font-title"], {
      defaultVariants: {
         variant: props.variant,
         color: props.color,
         disabled: "false",
         loading: "valse",
         roundness: "lg",
         size: "sm",
      },
      variants: {
         color: {
            primary: ["btn-primary"],
            secondary: ["btn-secondary"],
            accent: ["btn-accent"],
            success: ["btn-success"],
            danger: ["btn-danger"],
            warning: ["btn-warning"],
            info: ["btn-info"],
            neutral: ["btn-neutral"],
         },
         variant: {
            solid: " btn-solid",
            outline: "btn-outline",
            ghost: "btn-ghost",
            soft: "btn-soft",
            link: "btn-link",
            gradient: "btn-gradient",
         },
         roundness: {
            full: "rounded-full",
            circle: "btn-circle",
            none: "rounded-none",
            sm: "rounded-sm",
            base: "rounded",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
            "3xl": "rounded-3xl",
         },
         size: {
            "2xs": "btn-2xs",
            xs: "btn-xs",
            sm: "btn-sm",
            base: "btn-base",
            lg: "btn-lg",
            xl: "btn-xl",
         },
         disabled: {
            true: "btn-disabled",
         },
         loading: {
            true: "btn-loading",
         },
      },
      compoundVariants: [],
   })({
      color: props.color,
      variant: props.variant,
      roundness: props.roundness,
      disabled: props.disabled,
      loading: props.loading,
      size: props.size,
   });
});

const isDisabled = computed(() => props.disabled || props.loading);
const isLink = computed(() => props.as?.toLowerCase() === "link");
const tag = computed(() => (isLink.value ? 'a' : props.as));
// add variant: plain (outline with light bg and solid while hovering) with optional border | solid-inverse
//add colors: accent | custom color
// think about implement the active|focus effect in another way [scale down the button | increase contrast or brightness]
// handle the icon button padding | change the icons to be start and end instead | add "icon" prop

// icon
const ui = computed(() => {
   return {
      icon: {
         base: "flex-shrink-0",
         loading: "animate-spin",
         size: {
            "2xs": "h-4 w-4",
            xs: "h-4 w-4",
            sm: "h-4 w-4",
            base: "h-5 w-5",
            lg: "h-5 w-5",
            xl: "h-6 w-6",
         },
      },
   };
});
const isLeading = computed(() => {
   return (
      (props.iconClass && props.leading) ||
      (props.iconClass && !props.trailing) ||
      props.leadingIcon
   );
});

const isTrailing = computed(() => {
   return (props.iconClass && props.trailing) || props.trailingIcon;
});

const hasIcon = computed(() => {
   return isTrailing.value || isLeading.value;
});
const slots = useSlots();
const iconOnly = computed(() => {
   return hasIcon.value && !props.label?.length && !slots?.default;
});

const leadingIconName = computed(() => {
   return props.leadingIcon || props.iconClass;
});

const trailingIconName = computed(() => {
   return props.trailingIcon || props.iconClass;
});
const iconSize = computed(() =>
   iconOnly.value && props.size == "sm" ? "base" : props.size
);
const leadingIconClass = computed(() => {
   return twJoin(ui.value.icon.base, ui.value.icon.size[iconSize.value]);
});

const trailingIconClass = computed(() => {
   return twJoin(ui.value.icon.base, ui.value.icon.size[iconSize.value]);
});
</script>

<template>
   <component :is="tag" :aria-disabled="isDisabled" :disabled="isDisabled" :type="type" :as="isLink ? linkAs : null"
      :class="twMerge(
         buttonClass,
         isLink && props.variant === 'link' ? 'underline' : '',
         iconOnly && props.variant !== 'link' && 'p-2',
         $attrs.class
      )
         " v-bind="Object.fromEntries(
      Object.entries($attrs).filter(([key]) => !key.includes('class'))
   )
      ">
      <div v-if="props.loading" class="absolute inset-0 grid place-items-center">
         <svg :class="['h-3 max-w-[90%] w-1/2']" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 20" enable-background="new 0 0 0 0"
            xml:space="preserve">
            <circle fill="currentColor" stroke="none" cx="25" cy="10" r="6">
               <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
            </circle>
            <circle fill="currentColor" stroke="none" cx="50" cy="10" r="6">
               <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
            </circle>
            <circle fill="currentColor" stroke="none" cx="75" cy="10" r="6">
               <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
            </circle>
         </svg>
      </div>
      <span v-if="(isLeading && leadingIconName) || $slots.leading" :class="[
         props.loading && 'invisible',
         'inline-flex items-center',
         leadingIconWrapperClass,
      ]">
         <slot name="leading" :disabled="props.disabled" :loading="loading">
            <span :class="[
               leadingIconName,
               leadingIconClass,
               props.loading && 'invisible',
            ]" aria-hidden="true" />
         </slot>
      </span>

      <span v-if="label || $slots.default" :class="[props.loading && 'invisible', 'inline-flex items-center']">
         <slot>
            <span v-if="label" :class="[
               truncate ? 'text-left break-all line-clamp-1' : '',
               props.loading && 'invisible',
            ]">
               {{ label }}
            </span>
         </slot>
      </span>
      <span v-if="(isTrailing && trailingIconName) || $slots.trailing" :class="[
         props.loading && 'invisible',
         'inline-flex items-center',
         trailingIconWrapperClass,
      ]">
         <slot name="trailing" :disabled="props.disabled" :loading="loading">
            <span :class="[
               trailingIconName,
               trailingIconClass,
               props.loading && 'invisible',
            ]" aria-hidden="true" />
         </slot>
      </span>
   </component>
</template>
