//const emailRexExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const emailRexExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default emailRexExp

export const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi

// at least 6 chars, at least one lowercase, uppercase and digit are required, spaces are not allowed 
export const passwordRegex = /^[A-Za-z0-9#$^+=!*_@%&]*$/
//export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

export const promiseChainify = promises =>
  promises.reduce(
    (promiseAcc, promise) =>
      promiseAcc.then(result => promise.then(Array.prototype.concat.bind(result))).catch(e => {}),
    Promise.resolve([]),
  )

export const testImage = (url, timeoutT) => {
  return new Promise(function(resolve, reject) {
    var timeout = timeoutT || 5000
    var timer,
      img = new Image()
    img.onerror = img.onabort = function() {
      clearTimeout(timer)
      resolve(null)
    }
    img.onload = function() {
      clearTimeout(timer)
      resolve(url)
    }
    timer = setTimeout(function() {
      // reset .src to invalid URL so it stops previous
      // loading, but doesn't trigger new load
      img.src = '//!!!!/test.jpg'
      resolve(null)
    }, timeout)
    img.src = url
  })
}

export const toCurrencyAmount = (val, precision) => {
  return Number.parseFloat(val).toPrecision(precision)
}

export const UrlMatcher = {
  regexYoutube: /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gim,
  regexFacebook: /^(http(s)?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/gim,
  regexReddit: /^(http(s)?:\/\/)?(www\.)?reddit.com\/[a-zA-Z0-9(\.\?)?]/gim,
  regexTwitter: /^(http(s)?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/gim,
  regexBitcointalk: /^(http(s)?:\/\/)?(www\.)?bitcointalk.org\/[a-zA-Z0-9(\.\?)?]/gim,
  regexInstagram: /^(http(s)?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9(\.\?)?]/gim,
  regexGithub: /^(http(s)?:\/\/)?(www\.)?github.com\/[a-zA-Z0-9(\.\?)?]/gim,

  isUrlYoutube(url) {
    return url.match(this.regexYoutube)
  },
  isUrlFacebook(url) {
    return url.match(this.regexFacebook)
  },
  isUrlReddit(url) {
    return url.match(this.regexReddit)
  },
  isUrlTwitter(url) {
    return url.match(this.regexTwitter)
  },
  isUrlBitcointalk(url) {
    return url.match(this.regexBitcointalk)
  },
  isUrlInstagram(url) {
    return url.match(this.regexInstagram)
  },
  isUrlGithub(url) {
    return url.match(this.regexGithub)
  },
}

String.prototype.hexEncode = function() {
  // var hex, i;

  // var result = "";
  // for (i=0; i<this.length; i++) {
  //     hex = this.charCodeAt(i).toString(16);
  //     result += ("000"+hex).slice(-4);
  // }

  // return result
  return this
}

String.prototype.hexDecode = function() {
  // var j;
  // var hexes = this.match(/.{1,4}/g) || [];
  // var back = "";
  // for(j = 0; j<hexes.length; j++) {
  //     back += String.fromCharCode(parseInt(hexes[j], 16));
  // }

  // return back;
  return this
}

export function isWindowBottom() {
  const body = document.body
  const html = document.documentElement

  const windowHeight =
    'innerHeight' in window ? window.innerHeight : html.offsetHeight

  const docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  )
  const customOffset = 5
  
  const windowBottom = windowHeight + window.pageYOffset + customOffset 

  return (windowBottom >= docHeight)
}

export function defaultInitials(name) {
  return name && name.split(/\s/)
      .map(part => part.substring(0, 1).toUpperCase())
      .filter(v => !!v)
      .slice(0, 2)
      .join('');
}

// https://en.wikipedia.org/wiki/Linear_congruential_generator
function _stringAsciiPRNG(value, m) {
  // Xn+1 = (a * Xn + c) % m
  // 0 < a < m
  // 0 <= c < m
  // 0 <= X0 < m

  const charCodes = [...value].map(letter => letter.charCodeAt(0));
  const len = charCodes.length;

  const a = (len % (m - 1)) + 1;
  const c = charCodes.reduce((current, next) => current + next) % m;

  let random = charCodes[0] % m;
  for (let i = 0; i < len; i++)
      random = ((a * random) + c) % m;

  return random;
}

const defaultColors = [
  '#d73d32',
  '#7e3794',
  '#4285f4',
  '#67ae3f',
  '#d61a7f',
  '#ff4080'
];

export
function getRandomColor(value, colors = defaultColors)
{
  // if no value is passed, always return transparent color otherwise
  // a rerender would show a new color which would will
  // give strange effects when an interface is loading
  // and gets rerendered a few consequent times
  if(!value)
      return '#ffffff';

  // value based random color index
  // the reason we don't just use a random number is to make sure that
  // a certain value will always get the same color assigned given
  // a fixed set of colors
  const colorIndex = _stringAsciiPRNG(value, colors.length);
  return colors[colorIndex];
}
