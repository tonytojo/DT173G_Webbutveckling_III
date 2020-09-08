//Skapa ett chackbräde
function CreateChessBoard() 
{
    CreateTableData();
    CreateBottom_a_To_h();
}

//Skapa den nedre raden på chackbrädet där det står a till h
function CreateBottom_a_To_h() 
{
    var tbl = document.getElementById('places');
    var row = document.createElement("tr");
    var cell;
    var pos_aToh = ["dummy", "a", "b", "c", "d", "e", "f", "g", "h"];

    //Loopa runt för de 4 kolumnerna
    for (var i = 0; i < pos_aToh.length; i++) 
    {
        if (i == 0)
        // Skapa node td och lägg till detta som barn till raden
            row.appendChild(document.createElement("td"));
        else {
            // Skapa th element, attribute scope samt textnode
            cell = document.createElement("th");
            cell.setAttribute("scope", "col");

            //Lägg till text node som barn till cellen
            cell.appendChild(document.createTextNode(pos_aToh[i]));
            row.appendChild(cell);
        }
    }

    //Lägg till raden till tabellen
    tbl.appendChild(row);
} // end CreateTableHeader

//Skapa tabellens data. Vi har en 6 X 4 matris.
//För varje kolumn då j=0 skapar vi ett th element, attribute samt text node header
//För varje kolumn då j!= 0 skapar vi td element samt text node som visas om 
//platsen är bokad eller inte
function CreateTableData() 
{
    //Hämta elementet för tabellen
    var tbl = document.getElementById('places');
    var row;
    var cell;
    var seat = 1;
    var indexArr = ["dummy", "57", "58", "59", "60", "61", "62", "63", "64",
                             "49", "50", "51", "52", "53", "54", "55", "56",
                             "41", "42", "43", "44", "45", "46", "47", "48",
                             "33", "34", "35", "36", "37", "38", "39", "40",
                             "25", "26", "27", "28", "29", "30", "31", "32",
                             "17", "18", "19", "20", "21", "22", "23", "24",
                             "9", "10", "11", "12", "13", "14", "15", "16",
                             "1", "2",  "3",   "4",  "5",  "6",  "7",  "8"];
    var radNummer = [["8"], ["7"],
                    ["6"], ["5"],
                    ["4"], ["3"],
                    ["2"], ["1"]];

    //loopa runt i de 5 raderna
    for (var i = 0; i < radNummer.length; i++) //6
    {
        row = document.createElement("tr");
        for (var j = 0; j < 9; j++) 
        {
            //Skapa th header med scope=row samt text node data
            if (j == 0) 
            {
                cell = document.createElement("th");
                cell.setAttribute("scope", "row");
                cell.appendChild(document.createTextNode(radNummer[i][j]));
                row.appendChild(cell);
            }
            else 
            {
                //Skapa td samt text node data som visar om plasen är bokad eller inte
                var cell = document.createElement("td");
                cell.setAttribute("id", indexArr[seat++]);
                cell.appendChild(document.createTextNode(chessBoard[i][j]));
                row.appendChild(cell);
            }
        }

        //Lägg till raden till tabellen
        tbl.appendChild(row);
    }
} //end CreateTableData


//Placera springare i position rad,colNum
function PlaceraSpringare(rad, colNum) 
{
    plats = (rad - 1) * 8 + colNum;
    document.getElementById(plats).innerHTML = ++sekvensCounter;
    chessBoard[rad][colNum] = sekvensCounter;
}


//Beräknar var nästa springare ska placeras
function Process(rad, colNum) 
{
    var radColArr;
    var colChar;
    var plats;

    //Hämta start position för springaren     
    //Hantera rader, columner
    rad = parseInt($("#ddlrader option:selected").text());
    colChar = $("#ddlkolumner option:selected").text();
    colNum = colChar.charCodeAt(0) - 96;

    //Ursprungsplacering för springaren har användaren bestämt
    PlaceraSpringare(rad, colNum);

    //Loopa runt och placera en springare på samtliga 64 rutor utan att placera den på samma ruta två gånger
    for (var i = 1; i < RutorOnchessBoard; i++) 
    {
        //Gå till alla platser som en springare kan gå till och för varje plats beräknas hur
        //många lediga platser som det finns
        //add 2 rader + add 1 kolumn
        if (rad + 2 >= 1 && rad + 2 <= 8 && colNum + 1 >= 1 && colNum + 1 <= 8)
            CheckCountMin(minObj, CountValidPositions(rad + 2, colNum + 1), rad + 2, colNum + 1);

        //add 2 rader + minska en kolumn
        if (rad + 2 >= 1 && rad + 2 <= 8 && colNum - 1 >= 1 && colNum - 1 <= 8)
            CheckCountMin(minObj, CountValidPositions(rad + 2, colNum - 1), rad + 2, colNum - 1);

        //add 1 rader + add 2 kolumn
        if (rad + 1 >= 1 && rad + 1 <= 8 && colNum + 2 >= 1 && colNum + 2 <= 8)
            CheckCountMin(minObj, CountValidPositions(rad + 1, colNum + 2), rad + 1, colNum + 2);

        //add 1 rader + minska 2 kolumner
        if (rad + 1 >= 1 && rad + 1 <= 8 && colNum - 2 >= 1 && colNum - 2 <= 8)
            CheckCountMin(minObj, CountValidPositions(rad + 1, colNum - 2), rad + 1, colNum - 2);

        //minska 1 rad + add 2 kolumn
        if (rad - 1 >= 1 && rad - 1 <= 8 && colNum + 2 >= 1 && colNum + 2 <= 8)
            CheckCountMin(minObj, CountValidPositions(rad - 1, colNum + 2), rad - 1, colNum + 2);

        //minska 1 rad + minska 2 kolumner
        if (rad - 1 >= 1 && rad - 1 <= 8 && colNum - 2 >= 1 && colNum - 2 <= 8)
            CheckCountMin(minObj, CountValidPositions(rad - 1, colNum - 2), rad - 1, colNum - 2);

        //minska 2 rader + add 1 kolumn
        if (rad - 2 >= 1 && rad - 2 <= 8 && colNum + 1 >= 1 && colNum + 1 <= 8)
            CheckCountMin(minObj, CountValidPositions(rad - 2, colNum + 1), rad - 2, colNum + 1);

        //minska 2 rader + minska 1 kolumner
        if (rad - 2 >= 1 && rad - 2 <= 8 && colNum - 1 >= 1 && colNum - 1 <= 8)
            CheckCountMin(minObj, CountValidPositions(rad - 2, colNum - 1), rad - 2, colNum - 1);

        radColArr = loc.split("_");
        rad = parseInt(radColArr[0]);
        colNum = parseInt(radColArr[1]);
        minObj.count = 99;
        loc = "";
        PlaceraSpringare(rad, colNum);
    }
}

//Kontrollerar om vi har ett nytt minsta värde
//Om vi har det spara detta i minObj
function CheckCountMin(minObj, count, rad, col) 
{
    //Ledig position ?
    if (chessBoard[rad][col] == "") 
    {
        //Om vi har ett nytt minsta värde spara då i minObj
        if (count < minObj.count) 
        {
            minObj.count = count;
            loc = rad + "_" + col;
        }
    }
}

//Beräkna och returnera antal giltiga positioner som springaren kan gå till om den står
//på rad=rad, col = colNum
function CountValidPositions(rad, colNum) 
{
    var CountValidPositions = 0;

    //add 2 rader + add 1 kolumn
    if (rad + 2 >= 1 && rad + 2 <= 8 && colNum + 1 >= 1 && colNum + 1 <= 8) 
    {
        //Ledig position ?
        if (chessBoard[rad + 2][colNum + 1] == "")
            CountValidPositions++;
    }

    //add 2 rader + minska en kolumn
    if (rad + 2 >= 1 && rad + 2 <= 8 && colNum - 1 >= 1 && colNum - 1 <= 8) 
    {
        //Ledig position ?
        if (chessBoard[rad + 2][colNum - 1] == "")
            CountValidPositions++;
    }

    //add 1 rader + add 2 kolumn
    if (rad + 1 >= 1 && rad + 1 <= 8 && colNum + 2 >= 1 && colNum + 2 <= 8) 
    {
        //Ledig position ?
        if (chessBoard[rad + 1][colNum + 2] == "")
            CountValidPositions++;
    }


    //add 1 rader + minska 2 kolumner
    if (rad + 1 >= 1 && rad + 1 <= 8 && colNum - 2 >= 1 && colNum - 2 <= 8) 
    {
        //Ledig position ?
        if (chessBoard[rad + 1][colNum - 2] == "")
            CountValidPositions++;
    }


    //minska 1 rad + add 2 kolumn
    if (rad - 1 >= 1 && rad - 1 <= 8 && colNum + 2 >= 1 && colNum + 2 <= 8) 
    {
        //Ledig position ?
        if (chessBoard[rad - 1][colNum + 2] == "")
            CountValidPositions++;
    }


    //minska 1 rad + minska 2 kolumner
    if (rad - 1 >= 1 && rad - 1 <= 8 && colNum - 2 >= 1 && colNum - 2 <= 8) 
    {
        //Ledig position ?
        if (chessBoard[rad - 1][colNum - 2] == "")
            CountValidPositions++;
    }

    //minska 2 rad + add 1 kolumn
    if (rad - 2 >= 1 && rad - 2 <= 8 && colNum + 1 >= 1 && colNum + 1 <= 8) 
    {
        //Ledig position ?
        if (chessBoard[rad - 2][colNum + 1] == "")
            CountValidPositions++;
    }

    //minska 2 rad + minska 1 kolumner
    if (rad - 2 >= 1 && rad - 2 <= 8 && colNum - 1 >= 1 && colNum - 1 <= 8) 
    {
        //Ledig position ?
        if (chessBoard[rad - 2][colNum - 1] == "")
            CountValidPositions++;
    }

    return CountValidPositions;
}

function Clear() 
{
    var table=document.getElementById("places");
    var r=1; //start counting rows in table
    while(row=table.rows[r++])
    {
      var c=1; //start counting columns in row
      while(cell=row.cells[c++])
      {
        cell.innerHTML=''; // do sth with cell
      }
    }
}
