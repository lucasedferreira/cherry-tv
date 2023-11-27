import { shallowMount } from '@vue/test-utils'
import VideoCard from '@/components/VideoCard.vue'

describe('VideoCard.vue', () => {
  it('renders card with props', () => {
    const video = {
      title: 'title'
    };

    const wrapper = shallowMount(VideoCard, {
      props: { video }
    });

    const title = wrapper.find('.video_poster__title');
    expect(title.text()).toMatch(video.title);
  })
})
