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
  if(eat === "1"){
    var eatState = {
      devoured: false
    }
    let more = confirm('Make another?');
    if(more){
      $.ajax('/' + id, {
        type: 'PUT',
        data: eatState
      }).then(function(){
        console.log('updated');
        location.reload();
      })
    }
  }
});

$("#submit").on("click", function(event){
  event.preventDefault()
  console.log($("#burgerForm").val().trim());
  let newBurger = {
    burger: $("#burgerForm").val().trim(),
    devoured: false
  }
  console.log(newBurger);
  $.ajax("/burgers", {
    type: "POST",
    data: newBurger
  }).then(
    function(){
      console.log("new burger created");
      location.reload();
    }
  )
})
