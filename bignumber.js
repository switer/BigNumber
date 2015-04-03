'use strict';

/**
 *
 *  My BigNumber's implementation in a simple way, support for any radix 
 *  @author switer
 *  
 **/

function add (a, b, radix) {
    radix = radix || 10
    a = reverseStr(a)
    b = reverseStr(b)

    var maxLength = a.length > b.length ? a.length:b.length

    var aChar 
    var bChar
    var carry = 0
    var sum
    var bitArray = []
    var bitValue = ''

    for (var i = 0; i < maxLength; i ++) {
        aChar = a.charAt(i)
        bChar = b.charAt(i)

        aChar === '' && (aChar = 0)
        bChar === '' && (bChar = 0)

        sum = (carry + parseInt(aChar, radix) + parseInt(bChar, radix)).toString(radix)
        bitValue = sum.substr(sum.length - 1, 1)
        bitArray.push(bitValue)
        carry = parseInt(sum.substr(0, sum.length - bitValue.length) || 0)
    }
    if (carry) bitArray.push(carry)
    return bitArray.reverse().join('')
}

function reverseStr (str) {
    return (str + '').split('').reverse().join('')
}

/**
 *  BigNumber Constructor
 **/
function BigNumer (num, radix) {
    this._num = num
    this._radix = radix || 10
}
BigNumer.prototype.add = function (summand) {
    if (summand != 0) {
        this._num = add(this._num, summand, this._radix)
    }
    return this
}
BigNumer.prototype.mul = function (summand) {
    var num = this._num
    if (summand == 0) {
        this._num = 0
        return
    }
    while (summand - 1) {
        this.add(num)
        summand --
    }
    return this
}
BigNumer.prototype.toString = function (radix) {
    return this._num
}


module.exports = BigNumer