import {LitElement, css, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import './com/sidebar.js'
import './com/bookmarks-listing.js'

class Bookmarks extends LitElement {
  static get properties() {
    return {
      currentCategory: {type: String}
    }
  }

  constructor () {
    super()
    this.currentCategory = 'all'
  }

  render() {
    return html`
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
    `
  }

  onSetCategory (e) {
    this.currentCategory = e.detail.category
  }
}
Bookmarks.styles = css`
:host {
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
