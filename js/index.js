$(window).load(function () {

    var body = $("body"),
        universe = $("#universe"),
        solarsys = $("#solar-system");

    var init = function () {
        body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function () {
            $(this).removeClass('hide-UI').addClass("set-speed");
            $(this).dequeue();
        });
    };

    var setView = function (view) { universe.removeClass().addClass(view); };

    $("#toggle-data").click(function (e) {
        body.toggleClass("data-open data-close");
        e.preventDefault();
    });

    $("#toggle-controls").click(function (e) {
        body.toggleClass("controls-open controls-close");
        e.preventDefault();
    });


    function getwikiimage(place) {
        var URL = 'https://uk.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles=';
        if (place === 'Земля' || place === 'Сонце')
            URL += place;
        else
            URL += place + ' (планета)';
        $.getJSON(URL, function (data) {
            var obj = data.query.pages;
            var ob = Object.keys(obj)[0];
            console.log(obj[ob]["original"].source);
            try {
                $("#planetImage").attr("src",obj[ob]["original"].source);
            }
            catch (err) {
                $("#planetImage").attr("src","https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Gas_giants_in_the_solar_system.jpg/465px-Gas_giants_in_the_solar_system.jpg");
            }
        });
    }


    function dowiki(place) {
        var URL = 'https://uk.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&origin=*&titles=';
        if (place === 'Земля' || place === 'Сонце')
            URL += place;
        else
            URL += place + ' (планета)';
        $.getJSON(URL, function (data) {
            var obj = data.query.pages;
            var ob = Object.keys(obj)[0];
            console.log(obj[ob]["extract"]);
            try {
                if (place === 'Сонце')
                    $('#tPlanet').html('Інформація про зорю ' + place);
                else
                    $('#tPlanet').html('Інформація про планету ' + place);
                $('#wikiText').html(obj[ob]["extract"]);
                $('#wikiText').append('<br> Детальніше - у <a href="https://uk.wikipedia.org/wiki/' + place + '" target="_blank">Вікіпедії</a> (посилання - <b>в навігаційному рядку<b>)')
                var newPlace="";
                if (place === 'Земля' || place === 'Сонце')
                    newPlace = place;
                else
                    newPlace = place + ' (планета)';
                $('#navDetails').attr("href", "https://uk.wikipedia.org/wiki/" + newPlace);
                $('#navDetails').html("Про "+place+" в Вікіпедії");
                getwikiimage(place);
            }
            catch (err) {
                $('#wikiText').html('На жаль, сталась невідома помилка, й нам не вдалось отримати дані з Вікіпедії, однак Ви можете спробувати знайти інформацію про планету <a href="https://uk.wikipedia.org/wiki/' + place + '" target="_blank" style="z-index:-9999;">самотужки</a>');
            }
        });
    }


    $("#data a").click(function (e) {
        var ref = $(this).attr("class");
        var pTitle = $(this).attr("title");
        solarsys.removeClass().addClass(ref);
        $(this).parent().find('a').removeClass('active');
        $(this).addClass('active');
        //console.log(pTitle);
        dowiki(pTitle);
        e.preventDefault();
    });

    $(".set-view").click(function () { body.toggleClass("view-3D view-2D"); });
    $(".set-zoom").click(function () { body.toggleClass("zoom-large zoom-close"); });
    $(".set-speed").click(function () { setView("scale-stretched set-speed"); });
    $(".set-size").click(function () { setView("scale-s set-size"); });
    $(".set-distance").click(function () { setView("scale-d set-distance"); });

    init();
    dowiki('Земля');

});