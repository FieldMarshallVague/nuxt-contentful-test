import client from '../plugins/contentful';

export const state = () => ({
  navItems: []
})

export const mutations = {
  setNavItems(state, payload) {
      state.navItems = payload;
  }
}

export const actions = {
  async getNavItems({commit}) {
    const response = await client.getEntries({
      content_type: 'navItem',
      order: 'fields.order'
    });
    if (response.items.length > 0) {
      commit('setNavItems', response.items);
    }
  }
}
