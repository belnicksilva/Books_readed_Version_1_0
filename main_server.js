const ejs = require ("ejs");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const pg = require('pg');
const alert = require('alert'); 

//------jquery------------------------
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

const app = express();

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"booklist",
    password:"PostgreSQL284153389",
    port:5432,
});

db.connect();

//call external app
app.use(('/public'),express.static('./public'));
app.use(('/views'),express.static('./views'));

//parse external data
app.use(express.urlencoded({extended:false}));

//external auxiliar variables
var isbn=null;


app.get("/",async (req,res)=>{
    
    let sort=req.body.sort_items;
    let db_data =await db.query(`SELECT id,nome,rate,data,resume,isbn FROM booklist1 ORDER BY id ASC`);

    try{
        res.render("index.ejs",{book:db_data});
    }catch(err){
        console.log(err)
    }
});

app.get("/create.ejs",async (req,res)=>{
    try{
        await res.render("create.ejs",{imag_flag:false});
    }catch(err){
        console.log(err);
    }
});

app.post('/external_search',async (req,res)=>{
    try{
        isbn=req.body.isbn;
        let i=true;
        const url=`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
        
        let data=await db.query(`SELECT id FROM booklist1 WHERE isbn=$1`,[isbn])
        if(data.rowCount!==0){
            i=false; 
            console.log('O livro existe na base de dados');
        }
        res.render("create.ejs",{image:url,imag_flag:i, isbn:isbn});
    }
    catch(err){
        console.log(err);
    }
});

app.post('/create',async (req,res)=>{
    try{
        let nome=req.body.nome;
        let rate=parseInt(req.body.rate);
        let resume=req.body.creatResume;
        let date=req.body.creatDate;

        await db.query(`INSERT INTO booklist1 (nome,rate,resume,data,isbn) VALUES ($1,$2,$3,$4,$5)`,[nome,rate,resume,date,isbn]);
        await res.render("create.ejs",{imag_flag:false});
    }
    catch(err){
        console.log(err);
    }
    
});

app.post("/update",async(req,res)=>{
    let rate=parseInt(req.body.rate_edit),resume=req.body.editResume,date=req.body.editDate,id=parseInt(req.body.id_edit);
    let r=parseInt(req.body.rate_comp);
    if(r!==rate&&req.body.rate_comp!==""){
        rate=r;
    }
    try{
        await db.query(`UPDATE booklist1 SET resume=$1,data=$2 WHERE id=$3`,[resume,date,id]);
        let db_data =await db.query(`SELECT id,nome,rate,data,resume,isbn FROM booklist1`);
        res.end();
    }catch(err){
        console.log(err);
    }   
});

app.post("/delete", async (req,res)=>{
    let id=req.body.id_edit;

    console.log(id)
    let db_data =await db.query(`SELECT id,nome,rate,data,resume,isbn FROM booklist1`);
    try{
        await db.query("DELETE FROM booklist1 WHERE id=$1",[id]);
        res.end();
    }catch(err){
        console.log(err);
    }
    
});

app.listen(3000,()=>{
    console.log("Port 3000 listening...");
});