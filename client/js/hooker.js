$(function () {
    $("#getRecentGames").click(function () {
        console.log("entered");
        //do server callback
        var json = '';
        parseRecentGames(json);
    });
});
