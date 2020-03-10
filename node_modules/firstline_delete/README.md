# Firstline_delete

## What is this? 

Firstline_delete is a [npm](http://npmjs.org) async module for [NodeJS](http://nodejs.org/), that **reads and returns the first line of any file and then deletes it**. It uses native JS promises.

## How to install

`yarn add firstline_delete`

## Usage

`firstline_delete(filePath, [lineEnding])`

- filePath (String): the full path to the file you want to read.
- lineEnding (String, optional): the character used for line ending (defaults to `\n`).

Reads first line from `filePath` and then deletes it.

Returns a promise, eventually fulfilled with a string.

## Examples

```js
// Imagine the file content is:
// abc
// def
// ghi
//

firstline_delete('./testfile.txt');
// -> Returns a promise that will be fulfilled with 'abc'.

firstline_delete('./textfile.txt', '\r');
// -> Same as above, but using '\r' as line ending.
```
