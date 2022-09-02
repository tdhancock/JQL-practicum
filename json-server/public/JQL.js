class ElementCollection extends Array {
  ready(cb) {
    const isReady = this.some((e) => {
      return e.readyState != null && e.readyState != 'loading';
    });
    if (isReady) {
      cb();
    } else {
      this.on('DOMContentLoaded', cb);
    }
    return this;
  }

  innerTxt(t) {
    this[0].innerText = t;
    return this;
  }

  innerHtml(t) {
    if (arguments.length < 1) {
      return this[0].innerHTML;
    } else {
      this[0].innerHTML = t;
      return this;
    }
  }

  removeClass(name) {
    this.forEach((item) => item.classList.remove(name));
    return this;
  }

  addClass(name) {
    this.forEach((item) => item.classList.add(name));
    return this;
  }

  hasClass(name) {
    return this[0].classList.contains(name);
  }

  disabled(v) {
    this.disabled = v;
    return this;
  }

  on(event, cb) {
    this.forEach((item) => item.addEventListener(event, cb));
  }

  containsClass(name) {
    return this[0].classList.contains(name);
  }

  len() {
    this.forEach((x) => {
      return x.length;
    });
  }

  val(x) {
    if (arguments.length < 1) {
      return this[0].value;
    } else {
      this[0].value = x;
      return this[0];
    }
  }

  addAttribute(a, v) {
    this.forEach((item) => item.setAttribute(a, v));
    return this;
  }

  removeAttribute(a) {
    this.forEach((item) => item.removeAttribute(a));
    return this;
  }

  getAttribute(a) {
    return this[0].getAttribute(a);
  }

  hasAttribute(a) {
    return this[0].hasAttribute(a);
  }
}

function $(sel) {
  if (typeof sel === 'string' || sel instanceof String) {
    return new ElementCollection(...document.querySelectorAll(sel));
  } else {
    return new ElementCollection(sel);
  }
}

// $.get = function ({ url, data = {}, success = () => {}, dataType }) {
//   const queryString = Object.entries(data)
//     .map(([key, value]) => {
//       return `${key}=${value}`;
//     })
//     .join('&');
//   fetch(`${url}?${queryString}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': dataType,
//     },
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => success(data));
// };
