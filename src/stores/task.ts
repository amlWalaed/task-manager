import { defineStore, acceptHMRUpdate } from "pinia";

export const useTaskStore = defineStore("Task", () => {
   const listStore = useListStore()
   const tasks = ref([
      { name: "complete vue course", id: 0, is_completed: false, list_id: 0 },
      { name: "buy the dinner", id: 1, is_completed: false, list_id: 1 },
      { name: "eat the cats", id: 2, is_completed: false, list_id: 2 },
      { name: "read a book", id: 3, is_completed: true, list_id: 3 }
   ])
   const markAsCompleted = (task: Task) => {
      task.is_completed = !task.is_completed
   }

   const showTaskForm = ref(false)
   const selectedList = ref()
   const openTaskForm = (listId:number) => {
      showTaskForm.value = true
      selectedList.value = listId
   }
   return {
      tasks,
      markAsCompleted,

      showTaskForm,
      selectedList,
      openTaskForm,
   };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot));
}
