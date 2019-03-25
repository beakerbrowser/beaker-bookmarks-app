import { LitElement, html, css } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import headerControlsCSS from '../../css/com/header-controls.css.js'

class HeaderControls extends LitElement {
  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="search-container">
        <input autofocus="autofocus" placeholder="Search your bookmarks" type="text" class="search" @keyup=${this.onKeyupSearch}>
        <i class="fa fa-search"></i>
      </div>
    `
  }

  onKeyupSearch (e) {
    this.dispatchEvent(new CustomEvent('query-changed', {detail: {query: e.currentTarget.value}}))
  }
}
HeaderControls.styles = headerControlsCSS

customElements.define('bookmarks-header-controls', HeaderControls)