<script setup lang='ts'>
const props = defineProps<{
   task: Task,
}>()
const taskStore = useTaskStore()
const isCompleted = ref(props.task.is_completed)
</script>
<template>
   <li :class="['flex items-center gap-2 p-3 rounded-lg bg-primary-50']">
      <span class="text-gray-400 cursor-move i-heroicons-squares-2x2 drag-icon" />
      <span :class="[, task.is_completed ? 'line-through' : '']">{{ task.name }}</span>
      <BaseCheckbox v-model="isCompleted"
                    @update:model-value="taskStore.markAsCompleted(task)"
                    class="self-end ms-auto" />
   </li>
</template>