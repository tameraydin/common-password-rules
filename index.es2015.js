'use strict'

const ALPHABET_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';

const defaultsTo = function(val, def) {
  return typeof val === 'number' ? val : def;
};

const regTest = function(exp, str) {
  return new RegExp(exp, 'g').test(str);
};

const containsSequentialsFrom = function(orderedLists, password, times) {
  times = defaultsTo(times, 3);
  let len = password.length;
  let passwordArr = password.split('');
  let found = false;

  password.split('').forEach((letter, index) => {
    if (found || len - times + 1 <= 0) {
      return;
    }

    let foundIndex = Math.max(orderedLists[0].indexOf(letter),
      orderedLists[1] ? orderedLists[1].indexOf(letter) : -1);

    if (foundIndex > -1) {
      for (let i = 1; i < times; i++) {
        if (orderedLists[0][foundIndex + i] !== password.charAt(index + i) &&
            (!orderedLists[1] ||
            orderedLists[1][foundIndex + i] !== password.charAt(index + i))) {
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
  containsLowerCase: (password, times) => {
    return regTest('(.*?[a-z]){' + defaultsTo(times, 1) + ',}',
      password);
  },
  /**
   * Checks whether the given password contains an uppercase letter.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=1] Minimum number of required uppercase letters
   * @return {Boolean}
   */
  containsUpperCase: (password, times) => {
    return regTest('(.*?[A-Z]){' + defaultsTo(times, 1) + ',}',
      password);
  },
  /**
   * Checks whether the given password contains a digit.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=1] Minimum number of required digits
   * @return {Boolean}
   */
  containsDigit: (password, times) => {
    return regTest('(.*?\\d){' + defaultsTo(times, 1) + ',}',
      password);
  },
  /**
   * Checks whether the given password contains a special (non-word) character.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=1] Minimum number of required special characters
   * @return {Boolean}
   */
  containsSpecialChar: (password, times) => {
    return regTest('(.*?[_\\W]){' + defaultsTo(times, 1) + ',}',
      password);
  },
  /**
   * Checks whether the given password contains a character from the given set.
   *
   * @param  {String}  password  Password string
   * @param  {String}  charSet   A regex character set
   * @param  {Integer} [times=1] Minimum number of required characters
   * @return {Boolean}
   */
  contains: (password, charSet, times) => {
    return regTest('(.*?' + charSet + '){' + defaultsTo(times, 1) + ',}',
      password);
  },
  /**
   * Checks that the given password does not contain recurring alphanumeric
   * characters.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=3] Minimum recursion number
   * @return {Boolean}
   */
  excludesRecurringChars: (password, times) => {
    return !regTest('(\\w)\\1{' + (defaultsTo(times, 3) - 1) + ',}',
      password);
  },
  /**
   * Checks that the given password does not contain sequential
   * case-insensitive letters.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=3] Minimum sequence
   * @return {Boolean}
   */
  excludesSequentialLetters: (password, times) => {
    return !containsSequentialsFrom(
      [ALPHABET_LOWERCASE, ALPHABET_UPPERCASE], password, times);
  },
  /**
   * Checks that the given password does not contain sequential digits.
   *
   * @param  {String}  password  Password string
   * @param  {Integer} [times=3] Minimum sequence
   * @return {Boolean}
   */
  excludesSequentialDigits: (password, times) => {
    return !containsSequentialsFrom(
      [DIGITS], password, times);
  },
  /**
   * Checks that the given password does not a possible birth-date.
   *
   * @param  {String}  password  Password string
   * @return {Boolean}
   */
  excludesBirthDate: (password) => {
    return !regTest(
        '([0123]\\d|[a-zA-Z_/.-])' +
        '([0123]\\d|[a-zA-Z_/.-])' +
        '(19[6789]\\d|20[0]\\d)',
      password);
  }
};
