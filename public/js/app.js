$('.burger').on('click', function () {
  const id = $(this)[0].id;
  const eat = $(this)[0].attributes.devoured.value;

  if (eat === '0') {
    let eat = confirm('Eat the burger?');
    var eatState = {
      devoured: eat,
    };
    console.log(eatState);
    if (eat) {
      $.ajax('/' + id, {
        type: 'PUT',
        data: eatState,
      }).then(function () {
        console.log('updated');
        location.reload();
      });
    }
  }
  if (eat === '1') {
    var eatState = {
      devoured: false,
    };
    let more = confirm('Make another?');
    if (more) {
      $.ajax('/' + id, {
        type: 'PUT',
        data: eatState,
      }).then(function () {
        console.log('updated');
        location.reload();
      });
    }
  }
});

$('#submit').on('click', function (event) {
  event.preventDefault();
  let newBurger = {
    burger: $('#burgerForm').val().trim(),
    devoured: false,
  };
  $.ajax('/burgers', {
    type: 'POST',
    data: newBurger,
  }).then(function () {
    console.log('new burger created');
    location.reload();
  });
});

$('.delete').on('click', function () {
  const id = $(this)[0].id;
  var del = confirm('Delete burger?');
  if (del) {
    $.ajax('/burgers/' + id, {
      type: 'DELETE',
    }).then(function () {
      console.log('deleted burger ', id);
      location.reload();
    });
  }
});
