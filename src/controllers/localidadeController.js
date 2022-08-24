const Localidades = require("../models/localidade");

const localidadeController = {};

localidadeController.getAll = async (req, res) => {
    
    await Localidades.findAll()
        .then(data => {
            res.status(200).send(data);
        
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro"

            });
        });
       
};

localidadeController.create = async (req, res) => {

    if(!req.body.data){
        return res.status(400).send({error:true, message:"Você precisa enviar um arquivo"})

    };
    
    function verificaCampos (data) {
        const values = data
        let state = true
        
        values.map(data => {
            const obj = Object.keys(data)
            
            if(obj.length < 3) {

                res.status(400).send(
                    {
                        error:true, 
                        message:"Todos os campos são obrigatórios"
                    }

                );
                state = false;        
                return;
            };

        });

        if(state) {
            createLocal(data);
        };
         
    };

    let cadastrado = [];    
    const naoCadastrado =[];
    const createLocal = async (data) => {
        
        for(let i =0; i <data.length; i++) {
            try {
                const [local, created] = await Localidades.findOrCreate({
                    where:{id:data[i].id},
                    defaults:{
                        id: data[i].id,
                        nome: data[i].nome, 
                        distancia: data[i].distancia, 
                    
                    }
                    
                });
                
                if(created) {
                    cadastrado.push(data[i].id);
        
                }else {
                    naoCadastrado.push(data[i].id)
                    
        
                };
            } catch (error) {
                res.status(500).send(
                    {
                        error:true, 
                        message: error.message || "Ocorreu um erro, tente novamente"
                    }
                    
                );
                return;
            }
            
        };
        
        res.status(200).send({cadastrado:cadastrado, naocadastrado:naoCadastrado,});
    };

    verificaCampos(req.body.data);

};

module.exports = localidadeController;