import { shallowMount } from '@vue/test-utils'
import MainHeader from '@/components/MainHeader.vue'

describe('MainHeader.vue', () => {
  it('renders card with props', () => {
    const wrapper = shallowMount(MainHeader);
    const items = wrapper.findAll('.items');
    expect(items.length).toBe(2);
  })
})
