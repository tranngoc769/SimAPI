#!/usr/bin/env node
'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const firstline = require('../index.js');

chai.should();
chai.use(chaiAsPromised);

describe('firstline_delete', function () {

  const dirPath = path.join(__dirname, 'tmp/');
  const filePath = dirPath + 'test.txt';
  const fileWithNoData = dirPath + 'empty.txt';
  const fileWithOneLine = dirPath + 'oneline.txt';
  const wrongFilePath = dirPath + 'no-test.txt';

  before(function () {
    // Make "tmp" folder
    fs.mkdirSync(dirPath);
  });

  after(function () {
    // Delete "tmp" folder
    rimraf.sync(dirPath);
  });

  describe('Verify that it', function () {
    
    beforeEach(function () {
      // Create mock files 
      fs.writeFileSync(filePath, '1\n2\n3\n', 'utf8');
      fs.writeFileSync(fileWithNoData, '', 'utf8');
      fs.writeFileSync(fileWithOneLine, '1', 'utf8');
    });

    afterEach(function () {
      // Delete mock files
      rimraf.sync(filePath);
    });

    it('should reject if the file does not exist', function () {
      return firstline(wrongFilePath, '\n').should.be.rejected;
    });
    
    it('should return the first line of the file', function () {
      return firstline(filePath).should.eventually.equal('1');
    });
    
    it('should delete the first line and return it then return the second line', function () {
      return firstline(filePath).then(function () {
        return firstline(filePath).should.eventually.equal('2');
      });
    });
    
    it('should return blank if file contains no data', function () {
      return firstline(fileWithNoData).should.eventually.equal('');
    });
    
    it('should return first line if only one line exists', function () {
      return firstline(fileWithOneLine).should.eventually.equal('1');
    });
    
    it('should reject filename is not provided', function () {
      return firstline('').should.be.rejectedWith('Filename missing');
    });

  });

});
