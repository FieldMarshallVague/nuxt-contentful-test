import client from '../plugins/contentful';

export const state = () => ({
  pages: []
})

export const mutations = {
  setPages(state, payload) {
      state.pages = payload;
  }
}

export const actions = {
  async getPages({commit}) {
    const response = await client.getEntries({
      content_type: 'Page'
    });
    if (response.items.length > 0) {
      commit('setPages', response.items);
    }
  }
}
