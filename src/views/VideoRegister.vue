<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <label for="url" class="form-label">URL</label>
        <input
          type="text"
          class="form-control"
          id="url"
          aria-describedby="urlHelp"
          :placeholder="placeholder.url"
          v-model="video.url"
          @change="onChangeUrl"
        />
        <div id="urlHelp" class="form-text">It must be a YouTube URL.</div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="video.title"
          :placeholder="placeholder.title"
        />
      </div>
      <div class="col-6">
        <label for="title" class="form-label">Channel</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="video.channelTitle"
          :placeholder="placeholder.channel"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <label class="form-label">Tag(s)</label>
        <VueMultiselect
          ref="tagsSelect"
          v-model="selectedTags"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="name"
          track-by="code"
          :options="tagsOptions"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
        />
      </div>
      <div class="col-6">
        <label class="form-label">Group(s)</label>
        <VueMultiselect
          ref="groupsSelect"
          v-model="selectedGroups"
          tag-placeholder="Add this as new group"
          placeholder="Search or add a group"
          label="name"
          track-by="code"
          :options="groupsOptions"
          :multiple="true"
          :taggable="true"
          @tag="addGroup"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          v-model="video.description"
        />
      </div>
    </div>
    <!-- <div class="row mt-3">
      <div class="col-12">
        <label for="description" class="form-label">Thumbnail</label>
        <img :src="video.thumbnail" />
      </div>
    </div> -->
    <button class="btn btn-danger mt-3" @click="create" :disabled="loading">Create</button>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import { getVideoDataByCode } from "@/services/Youtube";
import { createVideo } from "@/services/Video";
import { getTagByName, createTag } from "@/services/Tag";
import { getGroupByName, createGroup } from "@/services/Group";

export default {
  components: { VueMultiselect },
  data() {
    return {
      loading: false,
      video: {
        url: "",
        ytId: "",
        title: "",
        channelTitle: "",
        channelId: "",
        description: "",
        thumbnail: "",
        tags: "",
        groups: "",
      },
      placeholder: {},
      selectedTags: [],
      tagsOptions: [
        { name: "Vlogs", code: "vlg" },
        { name: "Stages", code: "stg" },
        { name: "MVs", code: "mvs" },
      ],
      selectedGroups: [],
      groupsOptions: [
        { name: "Le Sserafim", code: "lsf" },
        { name: "Woo!Ah!", code: "wow" },
        { name: "NewJeans", code: "nwj" },
      ],
    };
  },
  mounted() {
    const videosToPlaceholder = [
      {
        url: "https://www.youtube.com/watch?v=C3GouGa0noM",
        title: "GODS ft. NewJeans (뉴진스)",
        duration: "4:15",
      },
      {
        url: "https://youtu.be/hkXHJEL1yqo",
        title: "CHUU 츄 'Underwater' MV",
        duration: "4:24",
      },
      {
        url: "https://www.youtube.com/watch?v=7TKNM_esPUs",
        title:
          "tripleS(트리플에스) EVOLution - Invincible | 수트댄스 | Suit Dance | Performance | 4K",
        duration: "3:26",
      },
    ];

    this.placeholder =
      videosToPlaceholder[
        Math.floor(Math.random() * videosToPlaceholder.length)
      ];
  },
  methods: {
    async onChangeUrl() {
      function extractYoutubeCode(url) {
        const youtubeShortenedLink = "https://youtu.be/";
        const youtubeFullLink = "https://www.youtube.com/watch?v=";

        const isYoutubeUrl =
          !url.includes(youtubeShortenedLink) && !url.includes(youtubeFullLink);
        if (isYoutubeUrl) return null;

        const isShortenedLink = url.includes(youtubeShortenedLink);
        const cutQuantity = isShortenedLink
          ? youtubeShortenedLink.length
          : youtubeFullLink.length;

        const youtubeIdLength = 11;
        return url.slice(cutQuantity, cutQuantity + youtubeIdLength);
      }

      const youtubeCode = extractYoutubeCode(this.video.url);
      if (!youtubeCode) return;

      const ytVideo = await getVideoDataByCode(youtubeCode);
      if (!ytVideo) return;

      this.video = {
        url: `https://youtu.be/${ytVideo.id}`,
        ytId: ytVideo.id,
        title: ytVideo.snippet.title,
        thumbnail:
          ytVideo.snippet.thumbnails?.maxres?.url ??
          ytVideo.snippet.thumbnails.high.url,
        channelId: ytVideo.snippet.channelId,
        channelTitle: ytVideo.snippet.channelTitle,
        description: ytVideo.snippet.description
      };
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.tagsOptions.push(tag);
      this.selectedTags.push(tag);
      setTimeout(() => {
        this.$refs.tagsSelect.activate();
      }, 5);
    },
    addGroup(newGroup) {
      const group = {
        name: newGroup,
        code: newGroup.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.groupsOptions.push(group);
      this.selectedGroups.push(group);
      setTimeout(() => {
        this.$refs.groupsSelect.activate();
      }, 5);
    },
    async create() {
      this.loading = true;
      let video = JSON.parse(JSON.stringify(this.video));

      video.tags = [];
      for (const tag of this.selectedTags) {
        let tagModel = await getTagByName(tag.name);
        if (!tagModel) tagModel = await createTag({name: tag.name});
        video.tags.push(tagModel.id);
      }

      video.groups = [];
      for (const group of this.selectedGroups) {
        let groupModel = await getGroupByName(group.name);
        if (!groupModel) groupModel = await createGroup({name: group.name});
        video.groups.push(groupModel.id);
      }

      await createVideo(video);

      if (localStorage.getItem('tutorial') === 'firstVideo')
        localStorage.removeItem('firstVideo');

      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.form-label {
  color: white;
}
.language-json {
  color: white;
}
.btn-danger {
  background-color: transparent;
}
</style>
