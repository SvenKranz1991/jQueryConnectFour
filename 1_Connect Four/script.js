// Connect Four

console.log("sanity check", $);

(function() {
    // Play section
    var currentPlayer = "player1";
    var slot = $(".slot");
    var column = $(".columns");

    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    function switchColor() {
        if (currentPlayer == "player1") {
            $("#cursor").css("background-color", "green");
        } else {
            $("#cursor").css("background-color", "red");
        }
    }

    // Mouse Pointer
    column.on("mousemove", function(e) {
        // event.stopImmediatePropagation("click");
        $("#cursor").css({
            left: e.pageX - 50,
            top: e.pageY - 120
        });

        column.css({
            cursor: "none"
        });
    });

    //  Make Coin Dissapear on leave
    //
    // column.on("mouseleave", function(e) {
    //     $("#cursor").css({
    //         visibility: hidden
    //     });
    // });

    var myOriginalDiagonalWinArray = [
        [2, 9, 16, 23],
        [1, 8, 15, 22],
        [8, 15, 22, 29],
        [0, 7, 14, 21],
        [7, 14, 21, 28],
        [14, 21, 28, 35],
        [6, 13, 20, 27],
        [13, 20, 27, 34],
        [20, 27, 34, 41],
        [12, 19, 26, 33],
        [19, 26, 33, 40],
        [18, 25, 32, 39],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [9, 14, 19, 24],
        [5, 10, 15, 20],
        [10, 15, 20, 25],
        [15, 20, 25, 30],
        [11, 16, 21, 26],
        [16, 21, 26, 31],
        [21, 26, 31, 36],
        [17, 22, 27, 32],
        [22, 27, 32, 37],
        [23, 28, 33, 38]
    ];

    column.on("click", function(e) {
        var slotsInColumn = $(e.currentTarget).find(".slot");
        console.log(slotsInColumn);

        // var columnWasFull = true;
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);
                // columnWasFull = false;
                break;
            }
        }

        function checkForVictory(slots) {
            var count = 0;
            for (var i = 0; i < slots.length; i++) {
                if (slots.eq(i).hasClass(currentPlayer)) {
                    count++;
                    if (count == 4) {
                        // winner
                        return true;
                    }
                }
            }
        }

        // When full?
        if (i == -1) {
            return;
        }

        // victory checks
        if (checkForVictory(slotsInColumn)) {
            // vertical
            // do victory dance
            setTimeout(function() {
                prompt(currentPlayer + " - winner");
                clearBoard();
            }, 500);
            return;
        } else if (checkForVictory($(".row" + i))) {
            // horizontal
            // do victory dance
            setTimeout(function() {
                prompt(currentPlayer + " - winner");
                clearBoard();
            }, 500);
            return;
        } else if (checkDiag(myOriginalDiagonalWinArray)) {
            // diagonal;
            setTimeout(function() {
                prompt(currentPlayer + " - winner");
                clearBoard();
            }, 500);
            return;
        } else {
            switchPlayers();
            switchColor();
        }

        // switchPlayers();

        function checkDiag(arr) {
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                count = 0;
                for (var j = 0; j < arr[i].length; j++) {
                    if (slot.eq(arr[i][j]).hasClass(currentPlayer)) {
                        count++;
                        console.log(count);
                    }
                    if (count == 4) {
                        return true;
                    }
                }
            }
        }

        //Clear Board
        function clearBoard() {
            console.log("gesundheit");
            for (var i = 0; i < slot.length; i++) {
                slot.eq(i).removeClass("player1");
                slot.eq(i).removeClass("player2");
            }
        }
    });

    // Modal section

    //END
})();

//______________________
// Modal Section

// function modalPopup() {
//     var modal = $(".modal");
//     var modalbutton = $(".btnclose");
//
//     modal.css("display", "flex");
//     $("body").addClass("stop-scrolling");
//     // modal.addClass("on");
//     cross.on("click", function() {
//         console.log("click");
//         modal.css("display", "none");
//         $("body").removeClass("stop-scrolling");
//     });
//
//     modalbutton.on("click", function() {
//         console.log("click");
//         modal.css("display", "none");
//         $("body").removeClass("stop-scrolling");
//     });
// }
//
// $(document).ready(function() {
//     setTimeout(function() {
//         modalPopup();
//     }, 1000);
// });
