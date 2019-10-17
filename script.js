// Connect Four

console.log("sanity check", $);

(function() {
    // Play section

    var currentPlayer = "player1";
    var slot = $(".slot");
    var column = $(".columns");
    var curplay = $("#curplay");

    function switchPlayers() {
        if (currentPlayer == "player1") {
            $("#mainTheme")[0].play();
            $("#mainTheme")[0].volume = 0.15;
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    function switchColor() {
        if (currentPlayer == "player1") {
            $("#cursor").css("background-color", "#d9c791");
            $("#cursor").css("background-image", "url(assets/white.png)");
        } else {
            $("#cursor").css("background-color", "black");
            $("#cursor").css("background-image", "url(assets/black.png)");
        }
    }

    function changePlayerDisplay() {
        if (currentPlayer == "player1") {
            curplay.text("Current Player : Player 1");
        } else {
            curplay.text("Current Player : Player 2");
        }
    }

    // Mouse Pointer
    column.on("mousemove", function(e) {
        $("#cursor").css("visibility", "visible");
        $("#cursor").css({
            left: e.pageX - 50,
            top: e.pageY - 120
        });

        column.css({
            cursor: "none"
        });
    });

    var diagonalWin = [
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
        console.log("Signal");
        var soundCounter = Math.floor(Math.random() * 3 + 1);
        $(`#gamepiece${soundCounter}`)[0].play();
        $(`#gamepiece${soundCounter}`).volume = 0.1;

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
            modalPopup();
            return;
        } else if (checkForVictory($(".row" + i))) {
            // horizontal
            // do victory dance
            modalPopup();
            return;
        } else if (checkDiag(diagonalWin)) {
            // diagonal;
            modalPopup();
            return;
        } else {
            switchPlayers();
            switchColor();
            changePlayerDisplay();
        }

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
            for (var i = 0; i < slot.length; i++) {
                slot.eq(i).removeClass("player1");
                slot.eq(i).removeClass("player2");
            }
        }

        // Modal section

        function modalPopup() {
            var modal = $(".winner-modal");
            var newgame = $(".newgame");
            var close = $(".close");
            var winpiece = $(".winnerpiece");
            var wintext = $(".winnertext");
            // $("#mainTheme")[0].pause();
            $("#applause")[0].play();
            $("#applause")[0].volume = 0.5;

            $("#cursor").off("mousemove");
            $("#cursor").css("opacity", "0");

            if (currentPlayer == "player1") {
                wintext.text("Winner - Player 1");
                // winpiece.css("background-color", "#d9c791");
                winpiece.css("background-image", "url(assets/white.png)");
            } else {
                wintext.text("Winner - Player 2");
                // winpiece.css("background-color", "black");
                winpiece.css("background-image", "url(assets/black.png)");
            }

            modal.css("visibility", "visible");
            // $(".modal-content").css("visibility", "visible");
            $(".modal-content").addClass("on");
            $("body").addClass("stop-scrolling");

            newgame.on("click", function() {
                clearBoard();
                $("#mainTheme")[0].play();
                $("#mainTheme")[0].currentTime = 0;
                $("#cursor").css("opacity", "0.7");
                $("body").removeClass("stop-scrolling");
                $(".modal-content").removeClass("on");
                // modal.css("display", "none");
            });

            close.on("click", function() {
                clearBoard();
                $("#mainTheme")[0].play();
                $("#mainTheme")[0].currentTime = 0;
                $("#cursor").css("opacity", "0.7");
                $("body").removeClass("stop-scrolling");
                $(".modal-content").removeClass("on");
                // modal.css("display", "none");
            });
        }
    });

    //END
})();
