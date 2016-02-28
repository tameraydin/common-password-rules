'use strict'

const ALPHABET_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';

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

module.exports = {
  containsLowerCase: (password, times) => {
    return regTest('(.*?[a-z]){' + defaultsTo(times, 1) + ',}',
      password);
  },
  containsUpperCase: (password, times) => {
    return regTest('(.*?[A-Z]){' + defaultsTo(times, 1) + ',}',
      password);
  },
  containsDigit: (password, times) => {
    return regTest('(.*?\\d){' + defaultsTo(times, 1) + ',}',
      password);
  },
  containsSpecialChar: (password, times) => {
    return regTest('(.*?[_\\W]){' + defaultsTo(times, 1) + ',}',
      password);
  },
  contains: (password, charSet, times) => {
    return regTest('(.*?' + charSet + '){' + defaultsTo(times, 1) + ',}',
      password);
  },
  excludesRecurringChars: (password, times) => {
    return !regTest('(\\w)\\1{' + (defaultsTo(times, 3) - 1) + ',}',
      password);
  },
  excludesSequentialLetters: (password, times) => {
    return !containsSequentialsFrom(
      [ALPHABET_LOWERCASE, ALPHABET_UPPERCASE], password, times);
  },
  excludesSequentialNumbers: (password, times) => {
    return !containsSequentialsFrom(
      [NUMBERS], password, times);
  },
  excludesPossibleBirthDate: (password) => {
    return !regTest(
        '([0123]\\d|[a-zA-Z_/.-])' +
        '([0123]\\d|[a-zA-Z_/.-])' +
        '(19[6789]\\d|20[0]\\d)',
      password);
  }
};
