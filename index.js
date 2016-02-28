(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.commonPasswordRules = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ALPHABET_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
var ALPHABET_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var DIGITS = '0123456789';

var defaultsTo = function defaultsTo(val, def) {
  return typeof val === 'number' ? val : def;
};

var regTest = function regTest(exp, str) {
  return new RegExp(exp, 'g').test(str);
};

var containsSequentialsFrom = function containsSequentialsFrom(orderedLists, password, times) {
  times = defaultsTo(times, 3);
  var len = password.length;
  var passwordArr = password.split('');
  var found = false;

  password.split('').forEach(function (letter, index) {
    if (found || len - times + 1 <= 0) {
      return;
    }

    var foundIndex = Math.max(orderedLists[0].indexOf(letter), orderedLists[1] ? orderedLists[1].indexOf(letter) : -1);

    if (foundIndex > -1) {
      for (var i = 1; i < times; i++) {
        if (orderedLists[0][foundIndex + i] !== password.charAt(index + i) && (!orderedLists[1] || orderedLists[1][foundIndex + i] !== password.charAt(index + i))) {
          return;
        }
      }

      found = true;
    }
  });

  return found;
};

/**
 * @exports commonPasswordRules
 */
module.exports = {
  /**
   * Checks whether the given password contains a lowercase letter.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=1] Minimum number of required lowercase letters
   * @return {Boolean}
   */
  containsLowerCase: function containsLowerCase(password, times) {
    return regTest('(.*?[a-z]){' + defaultsTo(times, 1) + ',}', password);
  },
  /**
   * Checks whether the given password contains an uppercase letter.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=1] Minimum number of required uppercase letters
   * @return {Boolean}
   */
  containsUpperCase: function containsUpperCase(password, times) {
    return regTest('(.*?[A-Z]){' + defaultsTo(times, 1) + ',}', password);
  },
  /**
   * Checks whether the given password contains a digit.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=1] Minimum number of required digits
   * @return {Boolean}
   */
  containsDigit: function containsDigit(password, times) {
    return regTest('(.*?\\d){' + defaultsTo(times, 1) + ',}', password);
  },
  /**
   * Checks whether the given password contains a special (non-word) character.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=1] Minimum number of required special characters
   * @return {Boolean}
   */
  containsSpecialChar: function containsSpecialChar(password, times) {
    return regTest('(.*?[_\\W]){' + defaultsTo(times, 1) + ',}', password);
  },
  /**
   * Checks whether the given password contains a character from the given set.
   *
   * @param  {String}  password  Password string
   * @param  {String}  charSet   A regex character set
   * @param  {Integer} [times=1] Minimum number of required characters
   * @return {Boolean}
   */
  contains: function contains(password, charSet, times) {
    return regTest('(.*?' + charSet + '){' + defaultsTo(times, 1) + ',}', password);
  },
  /**
   * Checks that the given password does not contain recurring alphanumeric
   * characters.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=3] Minimum recursion number
   * @return {Boolean}
   */
  excludesRecurringChars: function excludesRecurringChars(password, times) {
    return !regTest('(\\w)\\1{' + (defaultsTo(times, 3) - 1) + ',}', password);
  },
  /**
   * Checks that the given password does not contain sequential
   * case-insensitive letters.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=3] Minimum sequence
   * @return {Boolean}
   */
  excludesSequentialLetters: function excludesSequentialLetters(password, times) {
    return !containsSequentialsFrom([ALPHABET_LOWERCASE, ALPHABET_UPPERCASE], password, times);
  },
  /**
   * Checks that the given password does not contain sequential digits.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=3] Minimum sequence
   * @return {Boolean}
   */
  excludesSequentialDigits: function excludesSequentialDigits(password, times) {
    return !containsSequentialsFrom([DIGITS], password, times);
  },
  /**
   * Checks that the given password does not a possible birth-date.
   *
   * @param  {String}  password  Password string
   * @return {Boolean}
   */
  excludesBirthDate: function excludesBirthDate(password) {
    return !regTest('([0123]\\d|[a-zA-Z_/.-])' + '([0123]\\d|[a-zA-Z_/.-])' + '(19[6789]\\d|20[0]\\d)', password);
  }
};

},{}]},{},[1])(1)
});