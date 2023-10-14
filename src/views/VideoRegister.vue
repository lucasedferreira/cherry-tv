<template>
  <div>
    <label class="typo__label">Tagging</label>
    <VueMultiselect
      ref="multiselect"
      v-model="value"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      label="name"
      track-by="code"
      :options="options"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
    />
    <pre class="language-json"><code>{{ value  }}</code></pre>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";

export default {
  components: { VueMultiselect },
  data() {
    return {
      value: [{ name: "Javascript", code: "js" }],
      options: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
      ],
    };
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
      setTimeout(() => {
        // debugger;
        this.$refs.multiselect.activate()
      }, 5);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
