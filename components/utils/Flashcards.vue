<template>
    <div class="w-80 p-4 font-main">
        <div>
            <UProgress :value="currentCardIndex" :max="props.cards.length - 1" />
            <div class="card bg-white w-72 h-72 mt-4 cursor-pointer select-none" @dblclick="flipCard">
                <div class="inner relative w-full h-full text-center rounded-lg" ref="card">
                    <div class="front absolute w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-lg font-semibold p-3" >
                        <div ref="front" ></div>
                    </div>
                    <div class="back absolute w-full h-full flex border-2 text-md font-medium rounded-lg items-center justify-center p-3 text-">
                        <div  ref="back" ></div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center">
                <div class="flex items-center gap-3 mt-3">
                    <UButton icon="i-heroicons-arrow-left" size="sm"  @click="navigateCard(-1)" :disabled="currentCardIndex == 0"/>
                    <div class="font-medium text-sm">{{ currentCardIndex + 1 }} out of {{ props.cards.length }}</div>
                    <UButton icon="i-heroicons-arrow-right" size="sm" @click="navigateCard(1)" :disabled="currentCardIndex == props.cards.length - 1"/>   
                </div>
            </div>
        </div>
    </div>
</template>
.
<script setup>
const props = defineProps({
    cards: Array,
})

const currentCardIndex = ref(-1);
const card = ref();
const isFlipped = ref(false);

const refresh = ref(0);

const back = ref();
const front = ref();

const flipCard = () => {
    if(isFlipped.value) {
        card.value.style.transform = 'rotateY(0deg)';
    }
    else {
        card.value.style.transform = 'rotateY(180deg)';
    }
    refresh.value++;
    front.value.innerHTML = cleanMath(front.value.innerHTML);
    back.value.innerHTML = cleanMath(back.value.innerHTML);
    formatMath(card.value);
    isFlipped.value = !isFlipped.value;
}

const navigateCard = (step) => {
    if(isFlipped.value) flipCard();
    currentCardIndex.value += step;
    front.value.innerHTML = props.cards[currentCardIndex.value].question; 
    back.value.innerHTML = props.cards[currentCardIndex.value].answer;
}

onMounted(() => {
    navigateCard(1);
    formatMath(card.value);
})

</script>

<style scoped>
.card {
  perspective: 1000px;
}

.inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.front, .back {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}
</style>