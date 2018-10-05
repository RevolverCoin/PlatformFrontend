const emailRexExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export const promiseChainify = promises =>
promises.reduce((promiseAcc, promise) =>
    promiseAcc.then(result => promise.then(Array.prototype.concat.bind(result))),
    Promise.resolve([]))


export default emailRexExp
