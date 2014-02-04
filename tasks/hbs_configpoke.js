/*
 * grunt-hbs-configpoke
 * https://github.com/reharik/grunt-hbs-configpoke
 *
 * Copyright (c) 2014 Raif Harik
 * Licensed under the MIT license.
 */

'use strict';
 var chalk = require('chalk');
var Handlebars = require('handlebars');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('hbsconfigpoke', 'Take handlebars template, compile and render results to a file.  For use poking config files', function() {
      var options = this.options({
          punctuation: '.',
          separator: grunt.util.linefeed + grunt.util.linefeed,
          context:{}
      });

      // Iterate over all specified file groups.
      this.files.forEach(function(f) {
          var output = "";
          var src = f.src.filter(function(filepath) {
              // Warn on and remove invalid source files (if nonull was set).
              if (!grunt.file.exists(filepath)) {
                  grunt.log.warn('Source file "' + filepath + '" not found.');
                  return false;
              } else {
                  return true;
              }
          }).map(function(filepath) {

                  try {
                      var compiledTemplate = Handlebars.compile(grunt.file.read(filepath));
                      return output = compiledTemplate(options.context);

                  } catch (e) {
                      grunt.log.error(e);
                      grunt.fail.warn('Handlebars failed to compile '+filepath+'.');
                  }
              }).join(grunt.util.normalizelf(options.separator));




          grunt.file.write(f.dest, src);
          grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');
      });
  });

};
