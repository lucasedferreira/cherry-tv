import { shallowMount } from '@vue/test-utils'
import MovieModal from '@/components/MovieModal.vue'

describe('MovieModal.vue', () => {
  it('renders modal with props', () => {
    const video = {
      title: 'title',
      description: 'description',
      loadedTags: [{ id: '1', name: 'tag' }],
      loadedGroups: [{ id: '1', name: 'group' }],
    };

    const wrapper = shallowMount(MovieModal, {
      props: { video }
    });

    const title = wrapper.find('.content__title');
    expect(title.text()).toMatch(video.title);

    const description = wrapper.find('.video-modal__body--first');
    expect(description.text()).toMatch(video.description);

    const tags = wrapper.find('.genres .sub-title');
    expect(tags.text()).toMatch(video.loadedTags[0].name);

    const groups = wrapper.find('.groups .sub-title');
    expect(groups.text()).toMatch(video.loadedGroups[0].name);
  })
})
