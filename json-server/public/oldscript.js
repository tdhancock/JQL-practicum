// TODO: Wire up the app's behavior here.
// NOTE: The TODOs are listed in index.html
document.addEventListener('DOMContentLoaded', function (event) {
  //fetch
  $('#uvuLabel').hidden = true;
  $('#uvuId').hidden = true;
  classList();

  $('#course').on('change', () => {
    var select = document.getElementById('course');
    var value = select.options[select.selectedIndex].value;
    //console.log(value);
    if (value == '') {
      $('#uvuLabel').hidden = true;
      $('#uvuId').hidden = true;
    } else {
      $('#uvuLabel').hidden = false;
      $('#uvuId').hidden = false;
    }
  });

  const li = $('li');
  for (let i = 0; i < li.length; i++) {
    const el = li[i];
    el.on('click', () => {
      el.children[1].classList.toggle('hidden');
    });
  }

  const removeChilds = (parent) => {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  };

  let uvuId = document.getElementById('uvuId');
  console.log(uvuId);
  uvuId.addEventListener('input', function () {
    if (uvuId.value.length == 8) {
      let body = $('ul')[0];
      // remove all child nodes
      if (body.lastChild) {
        removeChilds(body);
      }
      let id = uvuId.value;
      console.log(id);
      //console.log(id);
      var select = document.getElementById('course');
      var value = select.options[select.selectedIndex].value;
      fillInfo(value, id);
    }
  });

  let button = $('#submitBtn');
  button.on('click', () => {
    console.log('submit clicked');
    var select = $('#course');
    var value = select.options[select.selectedIndex].value;
    let data = {
      courseId: value,
      date: new Date().toLocaleString('en-us').replace(',', ''),
      text: $('textarea')[0].value,
      uvuId: $('#uvuId').value,
      id: createUUID(),
    };
    console.log(data);
    postData(data).then((data) => {
      fillInfo($(data.courseId, data.uvuId));
    });
  });
});

function setUpAccordian() {
  const li = $('li');
  for (let i = 0; i < li.length; i++) {
    console.log[i];
    li[i].on('click', function () {
      console.log('clicked'); 
      //el.children[1].firstChild.classList.toggle('hidden');
      console.log(li[i].children[1].classList);
      if ($('li')[i].hasClass('hidden')) {
        $('li')[i].children[1].removeClass('hidden');
      } else {
        $('li')[i].children[1].addClass('hidden');
      }
    });
  }
  let button = ($('#submitBtn').disabled = false);
  //button.setAttribute('disabled', 'false');
}

function createUUID() {
  return 'xxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function fillInfo(value, id) {
  const res = await axios.get(
    `https://json-server-1fb6dy--3000.local.webcontainer.io/api/v1/logs?courseId=${value}&uvuId=${id}`
  );
  console.log(res.data);
  var logs = res.data;
  console.log($('#uvuIdDisplay'));
  console.log($('#uvuIdDisplay'));
  $('#uvuIdDisplay').textContent = `Student Logs for ${id}`;
  for (i = 0; i < logs.length; i++) {
    console.log(i);
    let parent = document.getElementsByTagName('ul')[0];
    let node = document.createElement('li');
    let div = document.createElement('div');
    let small = document.createElement('small');
    let textnode = logs[i].date;
    small.textContent = textnode;
    div.appendChild(small);
    node.appendChild(div);
    let pre = document.createElement('pre');
    let p = document.createElement('p');
    textnode = logs[i].text;
    p.textContent = textnode;
    pre.appendChild(p);
    node.appendChild(p);
    parent.appendChild(node);
  }
  setUpAccordian();
}

async function postData(data) {
  let val = await axios.post(
    'https://json-server-1fb6dy--3000.local.webcontainer.io/api/v1/logs',
    data
  );
}

async function classList() {
  let val = await axios.get(
    'https://json-server-1fb6dy--3000.local.webcontainer.io/api/v1/courses'
  );
  //console.log(val.data);
  let data = val.data;
  let el = $('#course')[0];

  for (i = 0; i < data.length; i++) {
    let node = document.createElement('option');
    let textnode = data[i].display;
    node.textContent = textnode;
    node.setAttribute('id', data[i].id);
    node.setAttribute('value', data[i].id);
    el.appendChild(node);
    //let val = `<option id='${data.id}' value='${data.id}'>${data.display}</option>`;
  }
}
