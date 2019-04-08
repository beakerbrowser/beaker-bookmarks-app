import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { profiles } from '../tmp-beaker.js'
import { graph } from '../tmp-unwalled-garden.js'
import sidebarCSS from '../../css/com/sidebar.css.js'

class Sidebar extends LitElement {
  static get properties () {
    return {
      currentCategory: {attribute: 'current-category', reflect: true},
      users: {type: Array}
    }
  }

  constructor () {
    super()
    this.users = []
    this.load()
  }

  async load () {
    var self = await profiles.getCurrentUser()
    var users = await graph.listFollows(self.url)
    this.users = [self].concat(users).filter(Boolean)
  }

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="brand">
        <img src="/img/icon.png">
        <span>Bookmarks</span>
      </div>
      <div class="nav">
        ${this.renderNavItem('your', html`<span class="fas fa-fw fa-star"></span> Your bookmarks`)}
        ${this.renderNavItem('pinned', html`<span class="fas fa-fw fa-thumbtack"></span> Pinned`)}
        <h5>Shared</h5>
        ${this.renderNavItem('network', html`<span class="fas fa-fw fa-globe"></span> All bookmarks`)}
        ${repeat(this.users, u => u, user => this.renderNavItem(user.url, html`<img class="thumb" src="${user.url}/thumb"> ${user.title}`))}
      </div>
    `
  }

  renderNavItem (id, label) {
    const cls = classMap({active: this.currentCategory === id})
    return html`
      <a class="${cls}" @click=${e => this.onClickNavItem(e, id)}>
        ${label}
      </a>
    `
  }

  onClickNavItem (e, id) {
    this.dispatchEvent(new CustomEvent('set-category', {detail: {category: id}}))
  }
}
Sidebar.styles = sidebarCSS

customElements.define('bookmarks-sidebar', Sidebar)