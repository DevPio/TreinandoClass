class Server {

    constructor(){
        this.nunjucks = require('nunjucks')
        this.express = require('express');
        this.fetch = require('node-fetch')
        this.server = this.express()
        this.initServer()
        this.configN()
        this.poks()
    }

    initServer(){
        this.server.set("view engine","njk")
        this.server.use(this.express.static("public"))
     
        

        this.server.get('/',(req,res)=>{


            
            this.fetch('https://pokeapi.co/api/v2/pokemon/')
            .then((results)=>{
                return results.json()
            })
            .then((json)=>{
                let poks = json.results

              let trat = poks.map((item,index)=>{
                    
                return {
                    id: index + 1,
                    url:item.url,
                    name: item.name[0].toLocaleUpperCase() + item.name.replace(item.name[0],'')
                }
                
                })
                console.log(trat)
                console.log(poks)
                return res.render('index',{pokemons:trat})
            })

            
        })

        this.server.listen(8080,()=>{
            console.log('Servidor rodando')
        })

        this.server.get('/pokes/:id',(req,res)=>{

            let {id} = req.params

            this.fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((results)=>{
                return results.json()
            })
            .then((json)=>{
                
                return res.render('poks',{pok:json})
            })
            

        })

    }
    configN(){
        this.nunjucks.configure("views",{
            express:this.server
        })
    }

    poks(){
        
    }
   

}

new Server()