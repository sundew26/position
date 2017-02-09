var path = require('path')
var glob = require('glob')
exports.getEntry = function(globPath, pathDir){
  var files = glob.sync(globPath);
  var entries = {}, entry, dirname, basename, pathname, extname;
  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
    entries[pathname.replace('src/js/',"")] = ['./' + entry];
  }
  return entries;
}
