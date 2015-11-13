//after
function create(name) {
  if (window.global[name]) {
    return window.global[name];
  }
}
