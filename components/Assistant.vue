<template>
    <div class="min-w-96 max-w-96 border-l-2 border-gray-200 font-main">
        <div class="flex flex-col justify-between h-screen py-5 pl-3.5 pr-1">
            <h1 class="bg-white w-full text-[22px] pb-2 font-semibold">Tutor</h1>
            <div class=" overflow-y-auto -mb-12">
                <div v-if="messages.length != 0">
                    <TransitionGroup name="list" tag="ul" class="space-y-3">
                        <div v-for="(message, index) in messages" :key="message">
                            <div class="h-8 w-8 rounded-full p-2 bg-gray-100 select-none flex items-center gap-4">
                                <img :src="message.role == 'user' ? '/user.png' : '/icon.png'" alt="Avatar" />
                                <span>{{ message.role == 'user' ? 'You' : 'Tutor' }}</span>
                            </div>
                            <div class="p-1.5">
                                <p v-if="message.role == 'user'">{{ message.content }}</p>
                                <div v-if="message.role == 'assistant' && !isGenerating">
                                    <ChatAssistantResponse :content="message.content" />
                                </div>
                                <div v-if="index == messages.length - 1 && isGenerating" class="space-y-1">
                                    <USkeleton class="h-6 w-full" />
                                    <USkeleton class="h-4 w-3/4" />
                                    <USkeleton class="h-4 w-5/6" />
                                </div>
                            </div>
                        </div>
                    </TransitionGroup>
                    <div class="h-10"></div>
                </div>
                <div v-else class="text-center">
                    <UIcon name="i-heroicons-sparkles"  class="text-xl"/>
                    What can I help you with today?
                </div>
            </div>
            <div class="w-[356px] z-20">
                <div class="w-full h-14 gradient"></div>
                <div class="relative">
                    <div class="bg-white">
                        <UTextarea v-model="request" color="primary" size="lg" variant="none"
                            placeholder="Type a message" :rows="1" autoresize :maxrows="4"
                            :ui="{ rounded: 'rounded-lg', padding: { lg: 'py-3 pr-10' } }"
                            class="text-justify bg-gray-100 rounded-lg whitespace-nowrap" />
                    </div>
                    <div class="absolute top-0 right-2">
                        <div class="h-11 flex items-center">
                            <UButton color="primary" icon='i-heroicons-arrow-up' size="xs" variant="solid" @click="chat"
                                :disabled="isGenerating || request == ''" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const request = ref('');
const messages = ref([])

const isGenerating = ref(false);

const currentPage = useCurrentPage();

const chat = async () => {
    messages.value.push({
        role: "user",
        content: request.value,
    })
    request.value = '';
    isGenerating.value = true;

    setTimeout(() => {
        messages.value.push({
            role: "assistant",
            content: '',
        })
    }, 500)

    const data = await $fetch('/api/assistant', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: { messages: messages.value, content: currentPage.value.content },
    });

    const messageCount = messages.value.length;
    messages.value[messageCount - 1].content = data;

    isGenerating.value = false;
}

</script>

<style scoped>
.gradient {
    background: linear-gradient(0deg, white, rgba(255, 255, 255, 0.5));
}

.list-enter-active,
.list-leave-active {
  transition: all 0.7s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>