Among Us Game flow

Local / Online

How to play / freeplay

click online

BYPASS for MVP with one channel: one open room, anyone can join (no ids/rooms)
Host (create game) | private (enter code) -> public (find game)

click create game

choose map and game params, max players

<!-- Extension -->
click public

shows a list of open rooms and their capacities
and it lets you filter by map which rooms you want to join


## Game Logic

index -> setup (create or join) -> game (GameContext: room_id, game_id)

## Server Logic

create a room_id, game_id, player_id

Each room requires: Map, other game config parameters (e.g. difficulty), number of players
Each player requires: uid, username, colour, roles, winner:false

GameState: map, occupation
When to trigger events + event types
QuestionBank: set of questions to allocate to players

XXXXXXX
XXXXXXX
OAOOOOO
XXXXXXX

XXXXXXX
AOXXXXX
OOXXXXX
XXXXXXX

XXXXXXX
XXOOOXX
XXOAOXX
XXOOOXX

OXXXXXX
OXXXXXX
AXXXXXX
OXXXXXX

XXXXXXX
XXXXXXX
OAOOOOO
XXXXXXX

XXXXXXX
XXXXXXX
OAOOOOO
XXXXXXX

### Empty Map
XXXXXXX
XXXXXXX
XXXXXXX
XXXXXXX

conquered circles


<!-- can add more game types to this configuration -->
while(!winner || timer != 0) {
  continue
} else {
  break
  winner modal popup with fireworks / confetti tbd
}

(0,0)
A: (1,1)

XBXXX
XAXXX
XBBXX
XXXXX

dimensions: 10x10
[0,0] -> [9,9]
empty: [0,0], [2,1] no circles here
ime
{
  events: [
    {
      position: [0,0]
      inProgress: false,
      question: QuestionObj,
      shape: "L",
    },
    {
      position: [0,0]
      inProgress: false,
      question: QuestionObj,
      shape: "L",
    },
  ],
  occupied: {
    player_id: [[0,0], [1,2]], -> count this / number of circles = percentage complete
    player_id: [[0,0], [1,2]]
  }
}