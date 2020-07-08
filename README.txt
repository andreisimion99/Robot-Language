    The purpose of the homework is to write an interpreter for the Robot language. The language is used to move a robot on a flat plane. The robot can go forward, backwards, turn or jump.

    Write an interpreter that receives a file with commands as parameter and writes to the screen the position and rotation of the robot after each command.

    If the command was successful, it will output OK x, y, r (exactly like this)
    If there was an error, it will output ERROR LINE followed by the line number: and the error text.

node main.js robot_commands.s
   This will run the robot_commands.s file and write to the screen the position and rotation of the robot after every command or an error for the lines that have errors.