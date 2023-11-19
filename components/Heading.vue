<template>
  <div class="mx-auto" :class="column">
    <h2
      class="text-2xl sm:text-3xl md:text-4xl lg:text-brand-header text-center pb-5 text-brand-dark"
      :class="h_class"
    >
      {{ title }}
    </h2>
    <p
      :class="p_class"
      class="font-rubik text-brand-sub-header text-center text-brand-gray leading-relaxed"
    >
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["title", "text", "column", "h_class", "p_class"],
};
</script>
