'use strict';

/**
 *
 *  My BigNumber's implementation in a simple way, support for any radix 
 *  @author switer
 *  
 **/

function add (a, b, radix) {
    radix = radix || 10
    var value = ''
    var maxLength = a.length > b.length ? a.length:b.length

    a = reverseStr(a)
    b = reverseStr(b)

    var aChar 
    var bChar
    var carry = 0
    var sum
    var value
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
    return str.split('').reverse().join('')
}

/**
 *  BigNumber Constructor
 **/
function BigNumer (num, radix) {
    this._num = num
    this._radix = radix || 10
}
BigNumer.prototype.add = function (summand) {
    this._num = add(this._num, summand, this._radix)
}
BigNumer.prototype.toString = function (radix) {
    return this._num
}
