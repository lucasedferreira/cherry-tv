import { shallowMount } from "@vue/test-utils";
import MoviesList from "@/components/MoviesList.vue";
import MovieModal from "@/components/MovieModal";

describe("MoviesList.vue", () => {
  it("renders list with modal", async () => {
    MoviesList.methods.getVideos = jest.fn();
    const wrapper = shallowMount(MoviesList);
    await wrapper.setData({
      videos: [{ id: "1" }, { id: "2" }],
      tag: { id: "1", name: "tag" },
    });

    const movieModal = wrapper.findComponent(MovieModal);
    expect(movieModal.exists()).toBe(true);
  });
});
