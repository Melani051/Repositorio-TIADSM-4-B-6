const express = require('express'); 
const app = express(); 
const PORT = 3000; 



app.use(express.json()); 

//arreglo "todos"
let todos=
[
    {id:1,tarea:'Recoger mi cuarto'},
    {id:2,tarea:'Darle de comer a los perros'},
    {id:3,tarea:'lavar los platos'},
    {id:4,tarea:'Sacudir la sala'},
    {id:5,tarea:'Estudiar'}
]

//GET
app.get
(
    '/todo', //ruta

    (req,res)=>

        {
            res.json(todos); 

        }
);

//GET tarea id
app.get
(
    '/todo/:id',
    (req,res)=>
    {
        const id=parseInt(req.params.id); //convierte el id a un valor entero
        const tarea=todos.find(e=>e.id === id); //busca la tarea 
       
        if(tarea)
        {
            res.json(tarea);
        }
        else
        {
            res.status(404).send('Tarea no localizado');
        }
    }
)

//POST agregar 
app.post
(
    '/todo',
    (req,res)=>
    {
        const newTarea = 
        {
            id:todos.length+1, 
            tarea:req.body.tarea 

        };
        todos.push(newTarea);
        res.status(201).json(newTarea); 

    }
);

//PUT actualizar 
app.put
(
    '/todo/:id',
    (req,res)=>
    {
        const id=parseInt(req.params.id);
        const chores=todos.find(t=>t.id===id);
        if(chores)
        {
            chores.tarea=req.body.tarea;// actualiza la tarea
            res.json(chores);// envía la tarea actualizada

        }
        else
        {
            res.status(404).send('Tarea no encontrada');
        }
    }
);

//DELETE eliminar 
app.delete
(
    '/todo/:id', 
    (req,res)=>
    {
        const id=parseInt(req.params.id);
        const index=todos.findIndex(t=>t.id===id);
        if(index!==-1)//existe la tarea que estas buscando
        {
            todos.splice(index,1);//elimina 
            res.send('Tarea eliminada');
        }
        else
        {
            res.status(404).send('Tarea no encontrada');
        }
    }
);
app.listen
(PORT,()=>
    {
        console.log('Servidor ejecutando en http://localhost:${PORT}'); //se manda un mensaje para notificar del servidor
    }
);
