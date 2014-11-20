'use strict';

var fs = require('fs');
var rimraf = require('rimraf');
var rcedit = require('rcedit');

exports.getAppPath = function(productName) {
	return 'resources/app';
};

exports.patchAtom = function(opts, cb) {
	var p = function (path) { return opts.outputPath + '/' + path; };

	rimraf(p('resources/default_app'), function (err) {
		if (err) { return cb(err); }

		var executablePath = p('atom.exe');
		var versionString = {
			CompanyName: 'GitHub, Inc.',
			FileDescription: 'Atom',
			LegalCopyright: 'Copyright (C) 2014 GitHub, Inc. All rights reserved',
			ProductName: opts.productName,
			ProductVersion: opts.productVersion
		};
		
		rcedit(p('atom.exe'), { 'version-string': versionString }, function (err) {
			if (err) { return cb(err); }

			fs.rename(p('atom.exe'), p(opts.productName + '.exe'), cb);	
		});
	});
};
