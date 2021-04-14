$(document).ready(function() {
  $('body').append('<link rel="stylesheet" type="text/css" href="style.css">');

  var temas = ["Dog", "Cat", "Bird", "Turtle", "Fish"];

  var i = 0;
  
  //Crear los botones de los animales
  for( ; i < temas.length; i++){
  $("#animal-buttons").append(`<button class="animalButton" animalType="${temas[i]}">${temas[i]}</button>`);
}
  
  //If you click a button
  $("body").on("click", ".animalButton", function(){
    $("#animals").empty()
    var type = $(this).attr('animalType');
    var api = "qQnzFjJNSBMuUDMs0enZt07vYYxyO3mw"
    //Formar url del giphy
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + api + "&limit=10";
    
    $.ajax({
      type: "GET",
      url: queryURL,
     success: function(respuesta){
      for(var j = 0; j < 10; j++){
        $("#animals").append(`<div class="animal-item" movement="false" imgMoving="${respuesta.data[j].images.fixed_height.url}" imgNotMoving="${respuesta.data[j].images.fixed_height_still.url}"><p> Rating: ${respuesta.data[j].rating} </p><img src = '${respuesta.data[j].images.fixed_height_still.url}'></img></div>`);
      }
    },
      error: function(){
        console.log("No se ha podido obtener la información");
      }
    })
    
  })
  
  $("body").on("click", ".animal-item" , function(img){
    var moving = $(this).attr('movement');
    if(moving == 'false'){
      //Cambiar imagen por la que si se mueve
      var imagen = $(this).attr('imgMoving');
      $(this).children().attr('src', imagen);
      $(this).attr('movement', 'true');
    }
    else{
      //Cambiar imagen por la que no se mueve
      var imagen = $(this).attr('imgNotMoving');
      $(this).children().attr('src', imagen);
      $(this).attr('movement', 'false');
    }
  })
  
});
