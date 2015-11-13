//before
function create(name) {
  if (win.global[name]) {
    return win.global[name];
  }
}
