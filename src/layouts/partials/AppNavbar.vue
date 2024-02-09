<script setup lang='ts'>
const navbarRef = ref()
onMounted(() => {
   if (!navbarRef.value) return;

   let navbarHeight = navbarRef.value.clientHeight / 2;

   document.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > navbarHeight) {
         navbarRef.value?.classList.add("bg-white");
      } else {
         navbarRef.value?.classList.remove("bg-white");
      }
   });
});
</script>
<template>
   <nav ref="navbarRef"
        class="sticky top-0 z-10 py-6 shadow">
      <div class="container flex items-center justify-between">
         <AppLogo />

      </div>
   </nav>
</template>