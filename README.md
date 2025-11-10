# System Conversion Methods

## Punter Scale
### Visual Representation
Always have .00 decimal precision (or more). Also, names:
1: Easy
2: Medium
3: Hard
4: Harder
5: Insane
6: Expert
7: Extreme
8: Madness
9: Master
10: Grandmaster
11: Grandmaster+1
12: Grandmaster+2
13: TAS
14: TAS+1
15: TAS+2
16+: etc

#### Subdifficulties
These subdifficulties are prefixes for difficulties if the level's decimal representation is lower than the flat .00.

Floor: -0.50 (only used for Easy because no lower difficulty)
Bottom: -0.40 through -0.50
Low: -0.25 through -0.40
Base: -0.25 through 0.25
High: +0.25 through 0.40
Peak: +0.40 through 0.50
Skyline: +0.50 (overrides Floor)

## MichaelChan system
### To Punter
Use this table:

0.1: 0.1
1: 1
2: 1.5
3: 2
4: 3
8: 4
10: 5
20: 7
30: 8
40: 9
50: 10
60: 11
80: 12
100: 13
200: 15

Then, linearly interpolate (150: 14, 6: 3.5)
### From Punter
That same table in reverse.
### Visual Representation
If less than 1, multiply value by 10 and add ⚡ emoji.
If 1-9.99, add 💥 emoji.
If 10-99, add 💣 and divide by 10.
If 100+, add 🧨 and divide by 100.
All emojis are added to the end. Round to only as many deccimals as needed (1.10 -> 1.1, 2.00 -> 2)

## Scheep Extended (Numerical)
### To Punter
Use this table:

0: 0
1: 0.5
2: 1
3: 1.5
4: 2.50
5: 3
6: 3.25
7: 3.5
7.5: 4
8: 5
9: 7
10: 8
11: 9
12: 10
13: 11
14: 12
14.5: 13
15: 15

Then linearly interpolate.

### From Punter
Inverse of above table, linearly interpolate

### Visual Representation
Follow this chart to convert numerical value to a name. The conversion name is going to be like 0.50 (Baby).

#### Ratings
Baby (0)
Easy (1)
Medium (2)
Hard (3)
Harder (3.5)
Difficult (4)
Intense (5)
Remorseless (6)
Insane (7)
Insane EX (7.5)
Madness (8)
Extreme (9)
Xtreme (10)
??????? (11)
Impossible (12)
Ascended (13)
TAS (14)
Cwktao's Wrath (15)