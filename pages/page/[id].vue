<template>
    <div class="font-main py-5 px-6">
        <ClientOnly>
            <div class="flex justify-between items-center">
                <UInput color="primary" size="xl" v-model="currentPage.name"
                :ui="{ size: { xl: 'text-2xl font-semibold' }, padding: { xl: 'px-0 py-2' } }" variant="none"
                placeholder="New Page" class="mb-3" />

                <div class="border-2 rounded-lg border-gray-100">
                    <div class="p-1 flex items-center">
                        <div v-if="isPageSaved" class="flex items-center gap-2"><div class="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center"><i class="fi fi-br-check text-xs text-gray-100"></i> </div> <span class="text-sm text-gray-500 font-medium">Saved</span></div>
                        <UButton v-else @click="save" color="gray" icon="i-heroicons-arrow-up-tray" size="sm" variant="ghost">Save</UButton>
                    </div>
                </div>
            </div>
        </ClientOnly>
        <PdfUpload v-if="query == 1"/>
        <ClientOnly v-else>
            <PageView :loaded="isLoaded"/>
            <template #fallback>
                <div class="space-y-2">
                    <USkeleton class="h-12 w-full" />
                    <USkeleton class="h-8 w-5/6" />
                    <USkeleton class="h-72 w-1/2" />
                </div>
            </template>
        </ClientOnly>
    </div>
</template>

<script setup>
const pageId = ref(useRoute().params.id);
const query = ref(useRoute().query.type);

const currentPage = useCurrentPage();
const isPageSaved = ref(true);

const save = async () => {
    await savePage(pageId.value);
    isPageSaved.value = true;
}

const isLoaded = ref(false);

onMounted(async () => {
    currentPage.value = {
        name: '',
        type: null,
        content: '',
    }
    currentPage.value = await getPage(pageId.value);
    isLoaded.value = true;
    console.log(currentPage.value)
    watch(() => currentPage.value.content, (newValue) => {
        isPageSaved.value = false;
    })

    watch(() => currentPage.value.name, (newValue) => {
        isPageSaved.value = false;
    })
})

</script>

<style lang="scss" scoped></style>