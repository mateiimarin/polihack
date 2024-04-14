<template>
    <div>
        <div>
            <div v-if="response.responseType === 'flashcard'">
                <p class="mb-0.5">Sure, here are {{ response.flashcards.length }} flashcards!</p>
                <UButton color="primary" icon="i-heroicons-arrow-up-right" size="xs" variant="soft" @click="isModalOpened = true">Open Flashcards</UButton>
            </div>
            <div v-if="response.responseType === 'message'">
                <div v-html="response.text" ref="responseComponent"></div>
            </div>
        </div>
        <UModal v-model="isModalOpened" :ui="{shadow: 'shadow-lg', width: 'max-w-fit sm:max-w-fit'}">
                <Flashcards :cards="response.flashcards"/>
        </UModal>
    </div>
</template>

<script setup>
const isModalOpened = ref(false);

const props = defineProps({
    content: String,
})

const response = ref();
const responseComponent = ref(null);
console.log(props.content)
response.value = JSON.parse(props.content);

onMounted(() => {
    if(responseComponent.value != null) {
        formatMath(responseComponent.value);
    }
})

</script>

<style scoped>

</style>