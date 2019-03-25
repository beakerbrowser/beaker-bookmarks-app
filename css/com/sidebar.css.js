import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
}

.brand {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 10px;
}

.brand img {
  width: 32px;
  height: 32px;
  margin-right: 5px;
}

h5 {
  margin: 10px 5px;
  color: #666;
}

.nav a {
  display: block;
  padding: 5px 10px;
  cursor: pointer;
  color: rgba(51, 51, 51, 0.9);
}

.nav a:hover {
  color: var(--color-link);
}

.nav a.active {
  font-weight: bold;
}

img.thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  top: 3px;
  margin-right: 1px;
}
`
export default cssStr