$(function() {
    
    $(".newburger-form").on("submit", function(event) {
        event.preventDefault();
        
        const newBurger = {
            burger_name: $("#newBurger").val().trim(),

            devoured: $("[name=devour]:checked").val().trim()
        };

        $.ajax("/api/burgers/", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("The user made a new burger :O ", newBurger);
                location.reload();
            }
        );
    });

    
        
    $(".changeBurgerState").on("click", function(event) {
        event.preventDefault();

        const id = $(this).data("id");
        const newDevour = $(this).data("newdevour");
        const burgerName = $(this).data("burgername");

         const devouredState = {
            devoured: !newDevour,
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
             data: devouredState,
        }).then( () => {
            console.log("User has devoured a burger NOM NOM:", burgerName );
            location.reload();
        });
    });
    
    $(".ate-burger").on("click", function(event) {
        event.preventDefault();

        const id = $(this).data("id");
        const burgerName = $(this).data("burgername");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then( () => {
            console.log("The burger has been deleted", burgerName);
            location.reload();
        })
    })    

});
