import {html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {bookmarks} from '../tmp-beaker.js'
import {Table} from '/vendor/beaker-app-stdlib/js/com/table.js'
import {BeakerEditBookmarkPopup} from '/vendor/beaker-app-stdlib/js/com/popups/edit-bookmark.js'
import tableCSS from '/vendor/beaker-app-stdlib/css/com/table.css.js'
import bookmarksListingCSS from '../../css/com/bookmarks-listing.css.js'

class BookmarksListing extends Table {
  static get properties() {
    return { 
      rows: {type: Array},
      currentCategory: {attribute: 'current-category'}
    }
  }

  constructor () {
    super()

    this.bookmarks = []
    this.load()
  }

  async load () {
    this.bookmarks = await bookmarks.list({
      filters: {
        pinned: this.currentCategory === 'pinned'
      }
    })
    this.requestUpdate()
  }

  get columns () {
    return [
      {id: 'favicon', width: 30, renderer: 'renderRowFavicon'},
      {id: 'title', flex: 1, renderer: 'renderRowTitle'},
      {id: 'buttons', width: 75, renderer: 'renderRowButtons'}
    ]
  }

  get rows () {
    return this.bookmarks
  }

  set rows (v) {
    // noop
  }

  get fontAwesomeCSSUrl () {
    return '/vendor/beaker-app-stdlib/css/fontawesome.css'
  }

  getRowHref (row) {
    return row.href
  }

  // rendering
  // =

  renderRowFavicon (row) {
    return html`<img class="favicon" src="beaker-favicon:32,${row.href}">`
  }

  renderRowTitle (row) {
    return row.title || html`<em>Untitled</em>`
  }

  renderRowButtons (row) {
    return html`
      <div>
        <button class="btn transparent" @click=${e => this.onClickEdit(e, row)}><i class="fas fa-pencil-alt"></i></button>
        <button class="btn transparent" @click=${e => this.emit('move-to-trash', {href: row.href})}><i class="fas fa-trash"></i></button>
      </div>
    `
  }

  // events
  // =

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'current-category' && newval) {
      // trigger a load when we change categories
      this.load()
    }
  }

  emit (evt, detail) {
    this.dispatchEvent(new CustomEvent(evt, {detail}))
  }
  
  async onClickEdit (e, bookmark) {
    e.preventDefault()
    e.stopPropagation()

    try {
      // render popup
      var b = await BeakerEditBookmarkPopup.create(bookmark)
      console.log('TODO', b)
  
      // TODO
      // delete old bookmark if url changed
      // if (originalBookmark.href !== b.href) {
      //   await beaker.bookmarks.unbookmarkPrivate(originalBookmark.href)
      // }
  
      // // set the bookmark
      // await beaker.bookmarks.bookmarkPrivate(b.href, b)
      // await beaker.bookmarks.setBookmarkPinned(b.href, b.pinned)
  
      // await loadBookmarks()
    } catch (e) {
      // ignore
      console.log(e)
    }
  }
}
BookmarksListing.styles = [tableCSS, bookmarksListingCSS]
customElements.define('bookmarks-listing', BookmarksListing)

// helpers
// =

function getOwner (archive) {
  return archive.isOwner ? 'me' : ''
}

// get the offsetTop relative to the document
function getTop (el) {
  let top = 0
  do {
    top += el.offsetTop
  } while ((el = el.offsetParent))
  return top
}

// simple timediff fn till Intl.RelativeTimeFormat lands
// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
const msPerMinute = 60 * 1000;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerMonth = msPerDay * 30;
const msPerYear = msPerDay * 365;
const now = Date.now()
function timeDifference (ts) {
  var elapsed = now - ts
  if (elapsed < msPerMinute) {
    let n = Math.round(elapsed/1000)
    return `${n} ${pluralize(n, 'second')} ago`
  } else if (elapsed < msPerHour) {
    let n = Math.round(elapsed/msPerMinute)
    return `${n} ${pluralize(n, 'minute')} ago`
  } else if (elapsed < msPerDay ) {
    let n = Math.round(elapsed/msPerHour )
    return `${n} ${pluralize(n, 'hour')} ago`
  } else if (elapsed < msPerMonth) {
    let n = Math.round(elapsed/msPerDay)
    return `${n} ${pluralize(n, 'day')} ago`
  } else if (elapsed < msPerYear) {
    let n = Math.round(elapsed/msPerMonth)
    return `${n} ${pluralize(n, 'month')} ago`
  } else {
    let n = Math.round(elapsed/msPerYear )
    return `${n} ${pluralize(n, 'year')} ago`
  }
}
