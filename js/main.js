import {LitElement, css, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {profiles} from './tmp-beaker.js'
import './com/sidebar.js'
import './com/header-controls.js'
import './com/bookmarks-listing.js'

class Bookmarks extends LitElement {
  static get properties() {
    return {
      currentUser: {type: Object},
      currentCategory: {type: String},
      searchQuery: {type: String},
    }
  }

  constructor () {
    super()
    this.currentUser = null
    this.currentCategory = 'your'
    this.searchQuery = ''
    this.load()
  }

  async load () {
    this.currentUser = await profiles.getCurrentUser()
  }

  render() {
    if (!this.currentUser) {
      return html`<div></div>`
    }
    return html`
      <div class="container">
        <nav>
          <bookmarks-sidebar
            current-category="${this.currentCategory}"
            @set-category=${this.onSetCategory}
          ></bookmarks-sidebar>
        </nav>
        <main>
          <bookmarks-header-controls
            @query-changed=${this.onQueryChanged}
          ></bookmarks-header-controls>
          <bookmarks-listing
            current-category="${this.currentCategory}"
            search-query="${this.searchQuery}"
            show-extended
          ></bookmarks-listing>
        </main>
      </div>
    `
  }

  onSetCategory (e) {
    this.currentCategory = e.detail.category
  }

  onQueryChanged (e) {
    this.searchQuery = e.detail.query
  }
}
Bookmarks.styles = css`
.container {
  display: flex;
}

nav {
  width: 170px;
  padding: 20px 15px;
}

main {
  flex: 1;
  padding: 16px 80px 0 0;
}

`

customElements.define('bookmarks-main', Bookmarks)
