import test from 'ava';
import commonPasswordRules from './index.es2015';

const cPR = commonPasswordRules;

test('containsLowerCase()', t => {
  t.is(cPR.containsLowerCase('FOO'), false);
  t.is(cPR.containsLowerCase('Bar'), true);

  t.is(cPR.containsLowerCase('FOo', 2), false);
  t.is(cPR.containsLowerCase('bAr', 2), true);
});

test('containsUpperCase()', t => {
  t.is(cPR.containsUpperCase('foo'), false);
  t.is(cPR.containsUpperCase('Bar'), true);

  t.is(cPR.containsUpperCase('Foo', 2), false);
  t.is(cPR.containsUpperCase('BaR', 2), true);
});

test('containsDigit()', t => {
  t.is(cPR.containsDigit('foo'), false);
  t.is(cPR.containsDigit('bar1'), true);

  t.is(cPR.containsDigit('foo1', 2), false);
  t.is(cPR.containsDigit('b1a1r', 2), true);
});

test('containsSpecialChar()', t => {
  t.is(cPR.containsSpecialChar('foo'), false);
  t.is(cPR.containsSpecialChar('bar*'), true);

  t.is(cPR.containsSpecialChar('foo{', 2), false);
  t.is(cPR.containsSpecialChar('b&a#r', 2), true);
  t.is(cPR.containsSpecialChar('+bar_', 2), true);
});

test('contains()', t => {
  let charSet = '[$\\\\]';

  t.is(cPR.contains('foo', charSet), false);
  t.is(cPR.contains('b$r', charSet), true);
  t.is(cPR.contains('ba\\', charSet), true);

  t.is(cPR.contains('foo\\', charSet, 2), false);
  t.is(cPR.contains('\\b$r', charSet, 2), true);
  t.is(cPR.contains('b$$r', charSet, 2), true);
});

test('excludesRecurringChars()', t => {
  t.is(cPR.excludesRecurringChars('fooo'), false);
  t.is(cPR.excludesRecurringChars('baar'), true);
  t.is(cPR.excludesRecurringChars('f000o'), false);
  t.is(cPR.excludesRecurringChars('0bar00'), true);

  t.is(cPR.excludesRecurringChars('f__', 2), false);
  t.is(cPR.excludesRecurringChars('_bar_', 2), true);
});

test('excludesSequentialLetters()', t => {
  t.is(cPR.excludesSequentialLetters('abc123'), false);
  t.is(cPR.excludesSequentialLetters('xabyz'), true);

  t.is(cPR.excludesSequentialLetters('xCdy', 2), false);
  t.is(cPR.excludesSequentialLetters('AxBy', 2), true);
});

test('excludesSequentialDigits()', t => {
  t.is(cPR.excludesSequentialDigits('abc789'), false);
  t.is(cPR.excludesSequentialDigits('x901yz'), true);

  t.is(cPR.excludesSequentialDigits('x01y', 2), false);
  t.is(cPR.excludesSequentialDigits('A1B2', 2), true);
});

test('excludesBirthDate()', t => {
  t.is(cPR.excludesBirthDate('foo1990'), false);
  t.is(cPR.excludesBirthDate('01011960'), false);
  t.is(cPR.excludesBirthDate('199bar'), true);
  t.is(cPR.excludesBirthDate('3012200'), true);
});