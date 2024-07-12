<template>
  
    <form class="w-full" @submit="onSubmit">
      <section class="bg-stone-100 flex flex-row text-center justify-items-stretch place-items-center pt-8 pb-3">
      <div class="rounded-md bg-white basis-4/5 m-auto text-center text-sm sm:basis-3/5 md:basis-1/2 lg:basis-1/2">
      <slot />
 

      <div>
        <button  class="text-white bg-theme-grey m-8 py-2 w-full max-w-32 rounded-full" v-if="hasPrevious" type="button" @click="goToPrev">
          Previous
        </button>
        <button class="text-white bg-theme-violet m-8 py-2 w-full max-w-32 rounded-full" type="submit">{{ isLastStep ? 'Submit' : 'Suivant' }}</button>
      </div>
    </div>
  </section>
    </form>

  </template>
  
  <script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { ref, computed, provide } from 'vue';
  
  const props = defineProps({
    validationSchema: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['submit']);
  const currentStepIdx = ref(0);
  
  // Injects the starting step, child <form-steps> will use this to generate their ids
  const stepCounter = ref(0);
  provide('STEP_COUNTER', stepCounter);
  
  // Inject the live ref of the current index to child components
  // will be used to toggle each form-step visibility
  provide('CURRENT_STEP_INDEX', currentStepIdx);
  
  // if this is the last step
  const isLastStep = computed(() => {
    return currentStepIdx.value === stepCounter.value - 1;
  });
  
  // If the `previous` button should appear
  const hasPrevious = computed(() => {
    return currentStepIdx.value > 0;
  });
  
  // extracts the indivdual step schema
  const currentSchema = computed(() => {
    return props.validationSchema[currentStepIdx.value];
  });
  
  const { values, handleSubmit } = useForm({
    // vee-validate will be aware of computed schema changes
    validationSchema: currentSchema,
    // turn this on so each step values won't get removed when you move back or to the next step
    keepValuesOnUnmount: true,
  });
  
  // We are using the "submit" handler to progress to next steps
  // and to submit the form if its the last step
  const onSubmit = handleSubmit((values) => {
    if (!isLastStep.value) {
      currentStepIdx.value++;
  
      return;
    }
  
    // Let the parent know the form was filled across all steps
    emit('submit', values);
  });
  
  function goToPrev() {
    if (currentStepIdx.value === 0) {
      return;
    }
  
    currentStepIdx.value--;
  }
  </script>
  