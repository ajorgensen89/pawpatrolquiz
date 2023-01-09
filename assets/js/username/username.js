/** Credit to https://www.youtube.com/watch?v=fARJwGqdbKQ See README.md for credit**/
/**Create a username */
let username;

document.getElementById("submitButton").onclick = function () {
    username = document.getElementById("userText").value;
    console.log(username);
    document.getElementById("usernameLabel").textContent = username +
        "!! Welcome!! You are ready to play? Click on 'Start Game'!!";
};