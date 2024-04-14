<template>
    <div class="min-w-72 h-screen border-r-2 py-5 px-3.5 border-gray-200 font-main">
        <div class="relative h-full w-full">
            <div class="flex items-center gap-2">
                <div>
                    <img src="/icon.png" alt="logo" class="rounded-md w-7 h-7 object-cover"/>
                </div>
                <h1 class="text-[22px] font-bold font-main">Flash</h1>
            </div>
            <UDivider class="mt-3 mb-2.5"/>
            <div>
                <UVerticalNavigation 
                    :links="links" 
                    class="font-main"
                    :ui="{ 
                        padding: 'p-2.5', 
                        active: 'text-gray-900 dark:text-primary-400 font-semibold',
                        inactive: 'text-gray-700',
                        icon: {
                            active: 'text-gray-900',
                            inactive: 'text-gray-700',
                        },
                    }" 
                />
            </div>
            <div class="mt-4">
                <div class="flex w-full justify-between px-1 mb-1.5">
                    <h6 class="text-xs font-semibold text-gray-500">PAGES</h6>
                    <UIcon name="i-heroicons-chevron-down" class="text-gray-100"/>
                </div>
                <ClientOnly> 
                    <div class="flex flex-col-reverse gap-0.5">
                        <div v-for="page in authUser.data.pages" class="px-2.5 py-1.5 rounded-md cursor-pointer" :class="currentPageId == page.id ? 'bg-gray-100 border-r-4 border-primary-500' : ''">
                            <NuxtLink :to="`/page/${page.id}`" @click="currentPageId = page.id">
                                <div class="flex gap-2 items-center" >
                                    <UIcon name="i-heroicons-document" />
                                    <div class="text-sm">{{ page.name }}</div>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                    <template #fallback>
                        <div class="space-y-2.5">
                            <USkeleton class="h-7 w-full" />
                            <USkeleton class="h-7 w-full" />
                            <USkeleton class="h-7 w-full" />
                        </div>
                    </template>
                </ClientOnly> 
            </div>
            <div class="absolute bottom-0 font-main w-full space-y-1 p-1">
                <UPopover :ui="{ width: 'w-64'}">
                    <UButton color="black" size="xl" icon="i-heroicons-plus" block class="font-main rounded-full text-sm">New Page</UButton>
                    <template #panel="{ close }" class="w-full">
                        <div class="p-3 w-full">
                            <UButton v-for="(option, index) in pageOptions" @click="() => { createPage(index); close() }" color="gray" variant="ghost" size="sm" block>{{ option.name }}</UButton>
                        </div>
                    </template>
                </UPopover>
            </div>
        </div>
    </div>
</template>

<script setup>
import { addDoc, arrayUnion, collection, updateDoc, doc } from 'firebase/firestore'

const { $db } = useNuxtApp();
const authUser = useAuthUser();
const currentPageId = ref(useRoute().params.id);

const links = [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/app'
    },
    {
        label: 'Materials',
        icon: 'i-heroicons-document-duplicate',
        to: '/materials'
    },
    {
        label: 'Settings',
        icon: 'i-heroicons-cog-6-tooth',
        to: '/settings'
    }
] 

const pageOptions = ref([
    {
        name: 'Empty',
    },
    {
        name: 'PDF',
    },
    {
        name: 'Audio',
    }
])

watch(currentPageId, (newValue) => {
    console.log(newValue)
})

const createPage = async (optionIndex) => {
    const newPage = await addDoc(collection($db, "pages"), {
        name: "New Page",
        type: optionIndex,
        content: "",
    });
    await updateDoc(doc($db, "users", authUser.value.uid), {
        pages: arrayUnion({
            name: "New Page",
            id: newPage.id,
        }),
    });

    authUser.value.data.pages.push({
        name: "New Page",
        id: newPage.id, 
    })

    currentPageId.value = newPage.id;
    await navigateTo({
        path: `/page/${newPage.id}`,
        query: {
            type: optionIndex,
        }
    })
}

</script>

<style lang="scss" scoped>

</style>