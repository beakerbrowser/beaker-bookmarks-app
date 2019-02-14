import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

:host {
  user-select: none;
}

.favicon {
  width: 20px;
  height: 20px;
}

.row .buttons .btn {
  visibility: hidden;
  color: rgba(0,0,0,.5);
}

.row:hover .buttons .btn {
  visibility: visible;
  color: rgba(0,0,0,.5);
}
`
export default cssStr