<script setup lang='ts'>

const props = defineProps<{
   list: Record<string, unknown>,
}>()
const taskStore = useTaskStore()
const taskDescription = ref()
const addTask = () => {
   props.list.items.push({ id: props.list.items.length, name: taskDescription.value, is_completed: false, list_id: props.list.id })
}
</script>
<template>
   <div v-auto-animate
        class="flex items-center gap-2 py-2">
      <template v-if="taskStore.showTaskForm && list.id === taskStore.selectedList">
         <BaseInput placeholder="Write Task you want to complete..."
                    floatingLabel="Task Description"
                    :showPlaceholder="false"
                    wrapperClass="w-full"
                    v-model:modelValue="taskDescription" />
         <BaseButton label="add"
                     size="sm"
                     roundness="full"
                     class="block ms-auto"
                     @click="addTask" />

      </template>

   </div>
</template>