<template>
    <div class="overflow-hidden">
        <div class="flex space-between ">
            <Sidebar v-if="displaySidebar"/>
            <div class="grow max-h-screen overflow-y-auto">
                <slot />
            </div>
            <Assistant v-if="displayAssistant"/>
        </div>
    </div>
</template>

<script setup>
const currentRoute = useRoute();
const routes = ref(['app', 'materials', 'settings', 'signup', 'login']);

const displayAssistant = computed(() => {
    for(let route of routes.value) {
        if(currentRoute.path.includes(route)) return false;
    }

    return true;
})


const routesx = ref(['signup', 'login']);

const displaySidebar = computed(() => {
    for(let routex of routesx.value) {
        if(currentRoute.path.includes(routex)) return false;
    }

    return true;
})

</script>

<style scoped>

</style>