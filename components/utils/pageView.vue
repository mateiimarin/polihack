<template>
    <div class="font-main">
        <div class="outline-none"  :contenteditable="currentPage.content != ''" ref="pageView" @keyup="saveEdit"></div>
        <UDropdown :items="pageElements" :popper="{ placement: 'bottom-start' }" class="select-none mt-2">
            <div class="flex gap-1 items-center">
                <UIcon name="i-heroicons-plus" />
                <div class="font-medium text-gray-500">Write anything</div>
            </div>
            <template #item="{ item }">
                <div class="flex gap-2 items-center w-full" @click="appendElement(item)">
                    <i :class="item.icon"></i>
                    <span class="truncate">{{ item.label }}</span>
                </div>
            </template>
        </UDropdown>
    </div>
</template>

<script setup>
const props = defineProps({
    loaded: Boolean,
})

const currentPage = useCurrentPage();
const pageElements = usePageElements();

const pageView = ref();
const saveEdit = () => {
    console.log( cleanMath(pageView.value.innerHTML))
    currentPage.value.content = cleanMath(pageView.value.innerHTML);
    console.log(currentPage.value.content)
}

const appendElement = (element) => {
    pageView.value.innerHTML += element.content;
    pageView.value.innerHTML = cleanMath(pageView.value.innerHTML); 
    formatMath(pageView.value);
    saveEdit();
}

onMounted(() => {
    watch(() => props.loaded, (isLoaded) => {
        if(isLoaded) {
            pageView.value.innerHTML = currentPage.value.content;
            formatMath(pageView.value);
        }
    })
})

</script>

<style scoped>

</style>