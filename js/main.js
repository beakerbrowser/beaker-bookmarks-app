import {LitElement, css, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {profiles} from './tmp-beaker.js'
import '/vendor/beaker-app-stdlib/js/com/app-header.js'
import './com/sidebar.js'
import './com/bookmarks-listing.js'

class Bookmarks extends LitElement {
  static get properties() {
    return {
      currentUser: {type: Object},
      currentCategory: {type: String}
    }
  }

  constructor () {
    super()
    this.currentUser = null
    this.currentCategory = 'all'
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
      <beaker-app-header
        fullwidth
        current-user-url="${this.currentUser.url}"
        fontawesome-src="/vendor/beaker-app-stdlib/css/fontawesome.css"
      ></beaker-app-header>
      <div class="container">
        <nav>
          <bookmarks-sidebar
            current-category="${this.currentCategory}"
            @set-category=${this.onSetCategory}
          ></bookmarks-sidebar>
        </nav>
        <main>
          <bookmarks-listing
            current-category="${this.currentCategory}"
          ></bookmarks-listing>
        </main>
      </div>
    `
  }

  onSetCategory (e) {
    this.currentCategory = e.detail.category
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
