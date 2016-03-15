# common-password-rules [![Build Status](http://img.shields.io/travis/tameraydin/common-password-rules/master.svg?style=flat-square)](https://travis-ci.org/tameraydin/common-password-rules) [![Coverage Status](https://img.shields.io/coveralls/tameraydin/common-password-rules/master.svg?style=flat-square)](https://coveralls.io/r/tameraydin/common-password-rules?branch=master)

Validation methods for some common password policies.

## Install

```
npm install common-password-rules
```

## Usage

```js
const cPR = require('common-password-rules');

cPR.containsLowerCase('Foo'); // => true
```

## API

* [commonPasswordRules](#common-password-rules--)
    * [.containsLowerCase(password, [times])](#module_commonPasswordRules.containsLowerCase) ⇒ <code>Boolean</code>
    * [.containsUpperCase(password, [times])](#module_commonPasswordRules.containsUpperCase) ⇒ <code>Boolean</code>
    * [.containsDigit(password, [times])](#module_commonPasswordRules.containsDigit) ⇒ <code>Boolean</code>
    * [.containsSpecialChar(password, [times])](#module_commonPasswordRules.containsSpecialChar) ⇒ <code>Boolean</code>
    * [.contains(password, charSet, [times])](#module_commonPasswordRules.contains) ⇒ <code>Boolean</code>
    * [.excludesRecurringChars(password, [times])](#module_commonPasswordRules.excludesRecurringChars) ⇒ <code>Boolean</code>
    * [.excludesSequentialLetters(password, [times])](#module_commonPasswordRules.excludesSequentialLetters) ⇒ <code>Boolean</code>
    * [.excludesSequentialDigits(password, [times])](#module_commonPasswordRules.excludesSequentialDigits) ⇒ <code>Boolean</code>
    * [.excludesBirthDate(password)](#module_commonPasswordRules.excludesBirthDate) ⇒ <code>Boolean</code>

<a name="module_commonPasswordRules.containsLowerCase"></a>
### containsLowerCase(password, [times]) ⇒ <code>Boolean</code>
Checks whether the given password contains a lowercase letter.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>String</code> |  | Password string |
| [times] | <code>Integer</code> | <code>1</code> | Minimum number of required lowercase letters |

<a name="module_commonPasswordRules.containsUpperCase"></a>
### containsUpperCase(password, [times]) ⇒ <code>Boolean</code>
Checks whether the given password contains an uppercase letter.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>String</code> |  | Password string |
| [times] | <code>Integer</code> | <code>1</code> | Minimum number of required uppercase letters |

<a name="module_commonPasswordRules.containsDigit"></a>
### containsDigit(password, [times]) ⇒ <code>Boolean</code>
Checks whether the given password contains a digit.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>String</code> |  | Password string |
| [times] | <code>Integer</code> | <code>1</code> | Minimum number of required digits |

<a name="module_commonPasswordRules.containsSpecialChar"></a>
### containsSpecialChar(password, [times]) ⇒ <code>Boolean</code>
Checks whether the given password contains a special (non-word) character.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>String</code> |  | Password string |
| [times] | <code>Integer</code> | <code>1</code> | Minimum number of required special characters |

<a name="module_commonPasswordRules.contains"></a>
### contains(password, charSet, [times]) ⇒ <code>Boolean</code>
Checks whether the given password contains a character from the given set.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>String</code> |  | Password string |
| charSet | <code>String</code> |  | A regex character set |
| [times] | <code>Integer</code> | <code>1</code> | Minimum number of required characters |

<a name="module_commonPasswordRules.excludesRecurringChars"></a>
### excludesRecurringChars(password, [times]) ⇒ <code>Boolean</code>
Checks that the given password does not contain recurring alphanumeric
characters.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>String</code> |  | Password string |
| [times] | <code>Integer</code> | <code>3</code> | Minimum recursion number |

<a name="module_commonPasswordRules.excludesSequentialLetters"></a>
### excludesSequentialLetters(password, [times]) ⇒ <code>Boolean</code>
Checks that the given password does not contain sequential
case-insensitive letters.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>String</code> |  | Password string |
| [times] | <code>Integer</code> | <code>3</code> | Minimum sequence |

<a name="module_commonPasswordRules.excludesSequentialDigits"></a>
### excludesSequentialDigits(password, [times]) ⇒ <code>Boolean</code>
Checks that the given password does not contain sequential digits.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>String</code> |  | Password string |
| [times] | <code>Integer</code> | <code>3</code> | Minimum sequence |

<a name="module_commonPasswordRules.excludesBirthDate"></a>
### excludesBirthDate(password) ⇒ <code>Boolean</code>
Checks that the given password does not a possible birth-date.

| Param | Type | Description |
| --- | --- | --- |
| password | <code>String</code> | Password string |

## Related

- [PasswordRuler](https://github.com/tameraydin/password-ruler)
- [PasswordRuler Add-ons](https://github.com/tameraydin/password-ruler-addons)

## License

MIT [http://tameraydin.mit-license.org/](http://tameraydin.mit-license.org/)