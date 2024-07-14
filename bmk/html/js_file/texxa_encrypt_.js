/*  <script type = "text/javascript" >*/
function en(v) {
  return base64encode(xxteaEncrypt(v, "key:washing.com/android.apk"));
}

function long2str(v, w) {
  var vl = v.length;
  var n = (vl - 1) << 2;
  if (w) {
    var m = v[vl - 1];
    if ((m < n - 3) || (m > n)) return null;
    n = m;
  }
  for (var i = 0; i < vl; i++) {
    v[i] = String.fromCharCode(v[i] & 0xff,
      v[i] >>> 8 & 0xff,
      v[i] >>> 16 & 0xff,
      v[i] >>> 24 & 0xff);
  }
  if (w) {
    return v.join('').substring(0, n);
  } else {
    return v.join('');
  }
}

function str2long(s, w) {
  var len = s.length;
  var v = [];
  for (var i = 0; i < len; i += 4) {
    v[i >> 2] = s.charCodeAt(i) |
      s.charCodeAt(i + 1) << 8 |
      s.charCodeAt(i + 2) << 16 |
      s.charCodeAt(i + 3) << 24;
  }
  if (w) {
    v[v.length] = len;
  }
  return v;
}

function xxteaEncrypt(str, key) {
  if (str == "") {
    return "";
  }
  var v = str2long(str, true);
  var k = str2long(key, false);
  if (k.length < 4) {
    k.length = 4;
  }
  var n = v.length - 1;
  var z = v[n],
    y = v[0],
    delta = 0x9E3779B9;
  var mx, e, p, q = Math.floor(6 + 52 / (n + 1)),
    sum = 0;
  while (0 < q--) {
    sum = sum + delta & 0xffffffff;
    e = sum >>> 2 & 3;
    for (p = 0; p < n; p++) {
      y = v[p + 1];
      mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
      z = v[p] = v[p] + mx & 0xffffffff;
    }
    y = v[0];
    mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
    z = v[n] = v[n] + mx & 0xffffffff;
  }
  return long2str(v, false);
}

function xxtea_decrypt(str, key) {
  if (str == "") {
    return "";
  }
  var v = str2long(str, false);
  var k = str2long(key, false);
  if (k.length < 4) {
    k.length = 4;
  }
  var n = v.length - 1;
  var z = v[n - 1],
    y = v[0],
    delta = 0x9E3779B9;
  var mx, e, p, q = Math.floor(6 + 52 / (n + 1)),
    sum = q * delta & 0xffffffff;
  while (sum != 0) {
    e = sum >>> 2 & 3;
    for (p = n; p > 0; p--) {
      z = v[p - 1];
      mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
      y = v[p] = v[p] - mx & 0xffffffff;
    }
    z = v[n];
    mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
    y = v[0] = v[0] - mx & 0xffffffff;
    sum = sum - delta & 0xffffffff;
  }
  return long2str(v, true);
}
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;

  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}

var base64DecodeChars = new Array(　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 　　52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, 　　-1, 　0, 　1, 　2, 　3, 4, 　5, 　6, 　7, 　8, 　9, 10, 11, 12, 13, 14, 　　15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, 　　-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 　　41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {　　
  var c1, c2, c3, c4;　　
  var i, len, out;　　
  len = str.length;　　
  i = 0;　　
  out = "";　　
  while (i < len) {
    /* c1 */
    do {　　
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 == -1);
    if (c1 == -1)　　 break;
    /* c2 */
    do {　　
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 == -1);
    if (c2 == -1)　　 break;
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
    /* c3 */
    do {　　
      c3 = str.charCodeAt(i++) & 0xff;　　
      if (c3 == 61)　 return out;　　
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);
    if (c3 == -1)　　 break;
    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
    /* c4 */
    do {　　
      c4 = str.charCodeAt(i++) & 0xff;　　
      if (c4 == 61)　 return out;　　
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);
    if (c4 == -1)　　 break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);　　
  }　　
  return out;
}