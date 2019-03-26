import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'
import tooltipCSS from '/vendor/beaker-app-stdlib/css/tooltip.css.js'

const cssStr = css`
${commonCSS}
${tooltipCSS}

:host {
  display: block;
  user-select: none;
  margin-bottom: 60px;
}

.favicon {
  width: 20px;
  height: 20px;
}

.row {
  padding: 0 10px;
  height: auto;
  min-height: 50px;
}

.col.pinned {
  overflow: visible; /* for tooltips */
}

.pin-btn {
  cursor: pointer;
  display: inline-block;
  padding: 6px 9px;
  border-radius: 2px;
  font-size: 12px;
  color: rgba(0,0,0,.5);
}

.pin-btn span {
  visibility: hidden;
}

.pin-btn:hover {
  background: rgba(0, 0, 0, 0.075);
}

.pin-btn:hover span,
.pin-btn.pressed span {
  visibility: visible;
}

.row .buttons .btn {
  visibility: hidden;
  color: rgba(0,0,0,.5);
}

.row:hover .buttons .btn {
  visibility: visible;
  color: rgba(0,0,0,.5);
}

.row .visibility {
  color: #bbb;
}

.row .visibility img {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
}

.extended-info {
  margin: 14px 0;
}

.description-line {
  color: rgba(0,0,0,.75);
}

.tags-line span {
  color: green;
  margin-right: 7px;
  font-size: 10px;
}
`
export default cssStr