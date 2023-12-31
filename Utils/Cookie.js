export function setCookie(cname, cvalue, hours) {
  let d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000); // (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

/**
 * Delete a cookie
 * @param {String} cname, cookie name
 */
export function deleteCookie(cname) {
  var d = new Date();
  d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
  var expires = "expires=" + d.toGMTString();
  window.document.cookie = cname + "=" + "; " + expires;
}
