const express = require('express')
const app = express()
const {GoogleAuth} = require('google-auth-library')
const {google} = require('googleapis')
//Variable spreadsheet
const spreadsheetId = '1QkXam1eVH-KmNC55AAHkEfwZ_hfXZqQvikmFXbe5t2s';
const range = 'mySheet' //Name of sheets

app.get("/", async(req, res)=>{
    /*MARK: create Auth of google */
    const auth = new GoogleAuth({
        keyFile: "mySheetApi.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    /*MARK: create client */
    const client = await auth.getClient();
    const sheet = google.sheets({version:"v4", auth: client})
    
    /*MARK: get value from spreadsheet */
    await sheet.spreadsheets.values.get({
        spreadsheetId,
        range
    },(err, data) =>{
       res.send(data.data)
    })
    // Insert Data to spreadsheet
    await sheet.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED", 
        resource :{
            values:[
                [6, "PPSD", "SEJKKJLF"]
            ]
        }
    })
    res.send("Sheet updated! ")

});


app.listen(3000,()=>{
    console.log("Port 3000")
})