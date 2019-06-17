div id=connect4 -- board
// draw a grid
rows 6
cols 7

// player take turns
//
// switch turns

1. HTML/CSS - as quickly as possible - less than an hour - get something acceptable
    - slot(div)
        - square element with a circular element in it
        - classes added to slot element for player1 and player2
    - board(div)
        - column elements containing 6 slot elements
        - row elements contain 7 slot elements
        - one container containing 42 slot elements

2) Javascript

    1. keep track of the current player
    2. column selection
    3. check for victory

        - only the current player could have won
        - three kinds of checks
            - vertical
            - horizontal
            - diagonal

    4. if there was a victory, do the victory dance - show big splashy victory message

    5. if there was no victory, switch players
