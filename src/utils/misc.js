//const emailRexExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const emailRexExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;


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

export default emailRexExp


String.prototype.hexEncode = function(){
  // var hex, i;

  // var result = "";
  // for (i=0; i<this.length; i++) {
  //     hex = this.charCodeAt(i).toString(16);
  //     result += ("000"+hex).slice(-4);
  // }

  // return result
  return this;
}

String.prototype.hexDecode = function(){
  // var j;
  // var hexes = this.match(/.{1,4}/g) || [];
  // var back = "";
  // for(j = 0; j<hexes.length; j++) {
  //     back += String.fromCharCode(parseInt(hexes[j], 16));
  // }

  // return back;
  return this;
}