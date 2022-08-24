const trucks = require("../models/truck");

const truckController = {};

truckController.getAll = async (req, res) => {
    
    await trucks.findAll()
        .then(data => {
            res.status(200).send(data);
        
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro"

            });
        });
       
    
    

};

truckController.getOne = async (req, res) => {
    const findTruck = req.params.id
    
    const project = await trucks.findOne({ where: { id:findTruck } });
    if (project === null) {
        res.status(400).send({
            error:true,
            message:"Erro veículo não encontrado"
        });
        
    } else {

        res.status(200).send(project);
    };

};

truckController.create = async (req, res) => {
    
    function verificaCampos (data) {
        const values = Object.values(data);
        let state = true;
        
        values.forEach(value => {
            if(!value.trim()) {
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
            createTruck();
            
        };
        
        
    };

    const newTruck = req.body;
    const createTruck = async () => {

        try {
            const [truck, created] = await trucks.findOrCreate({
                where:{placa:newTruck.placa},
                defaults:{
                    id: newTruck.id,
                    apelido: newTruck.apelido, 
                    ano: newTruck.ano, 
                    cor: newTruck.cor, 
                    rendimento: newTruck.rendimento 
                }
            });
            
            if(created) {
                res.status(200).send(truck)
                return;
    
            }else {
    
                res.status(400).send(
                    {
                        error:true, 
                        message:"Veículo já cadastrado"
                    }
                )
                return;
    
            };
            
        } catch (error) {

            res.status(500).send(
                {
                    error:true, 
                    message: error.message || "Ocorreu um erro, tente novamente"
                }

            );
            
        };
   
    };

    verificaCampos(newTruck);

};

truckController.update = async (req, res) => {
    const dataTruck = req.body;
    const truckId = req.params.id;
    
    await trucks.update(
        {
            id:dataTruck.id, 
            apelido:dataTruck.apelido, 
            placa:dataTruck.placa, 
            ano:dataTruck.ano, 
            cor:dataTruck.cor, 
            rendimento:dataTruck.rendimento
        },
        
        {
            returning:true,
            where: {
                id:truckId
            }
        }
    )
        .then(data => {
            if(data) {
                res.status(200).send(data);

            }else {
                res.status(400).send(
                    {
                        message:"Não foi possivel atualizar os dados do veículo"

                    }
                );
                
            };
        })
        .catch(err => {
            res.status(500).send(
                {
                    error:true, 
                    message:err.message
                
                }
            );

        });
    
};

truckController.delete = async (req, res) => {
    const truckDelete = req.params.id;
    trucks.destroy({
        where: {
            id:truckDelete
        }
    })
    .then( data => {
        if(data) {
            res.status(200).send(
                {
                    message:"Caminhão deletado"

                }
            );
        }else {
            res.status(400).send(
                {
                    message:"Não foi possivel deletar o veículo"

                }
            );
        }
    })
    .catch(err => {
        res.status(500).send(
        {
            error:true, 
            message:err.message

        });

    });
};



module.exports = truckController;