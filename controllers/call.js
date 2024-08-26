const { call } = require('../db/db');

module.exports = {
    // Get all de calls
    async getAllCalls(req, res){
        try{
            // Procedemos a buscar todos los registros
            const getAllCalls = await call.findAll().catch(err => {
                console.log(err);
                return null;
            })
            // Validamos el resultado. Si esta vacio o es null. Enviamos 404. NotFound
            if(!getAllCalls || !getAllCalls.lenght) return res.status(404).json({msg: 'No hay llamadas aun.'});

            // Caso contrario, mostramos todos los resultados
            res.status(200).json(getAllCalls);
        }catch(err){
            console.log(err);
            res.status(500).json({msg: 'Ha ocurrido un error en la principal.'});
        }
    },

    // Mostramos un registro en particular. 
    async getCall(req, res){
        try{
            // Recibimos parametro por params.
            const { callReference } = req.params;

            // Validamos que el parametro entre correctamente
            if(!callReference) return res.status(404).json({msg: 'Los parametros no son validos'});

            // Caso contrario, avanzamos...
            const searchCall = await call.findByPk(callReference).catch(err => {
                console.log(err);
                return null;
            });

            // Validamos el resultado
            if(!searchCall) return res.status(404).json({msg: 'No hemos encontrado esta llamada.'});
            // Caso contrario, mostramos respuesta
            res.status(200).json(searchCall);
        }catch(err){
            console.log(err);
            res.status(501).json({msg: 'Ha ocurrido un error en la principal'});
        }
    },
    // Agregamos llamada
    async addCall(req, res){
        try{
            // Recibimos parametros por body
            const { name, phone, email, from } = req.body;

            // Validamos que los parametros entren correctamente
            if(!name || !phone || !from) return res.status(501).json({msg: 'Los parametros no son validos.'});
        
            // Caso contrario, avanzamos...
            const addData = await call.create({
                name,
                number:phone,
                email: email ? email : '',
                from,
                type:'',
                state: 'pending',
            }).catch(err => {
                console.log(err);
                return null;
            });
            // Validamos el registro
            if(!addData) return res.status(401).json({msg: 'Ha ocurrido un error al intentar agregar recurso...'});
            // Caso contrario, Avanzamos...
            // Enviamos respuesta 201. Succesful.
            console.log('Registro...');
            res.status(201).json({msg: '¡Con exito!'});
        }catch(err){
            console.log(err);
            res.status(501).json({msg: 'Ha ocurrido un error en la principal'});
        }
    },
    // Subscription
    async addEmail(req, res){
        try{
            // Recibimos datos por body;
            const { email, from } = req.body;
            if(!email || !from) return res.status(501).json({msg: 'Parametro no es valido.'});
            
            // Caso contrario, avanzamos...
            const subscribe = await call.create({
                name:'',
                phone: '',
                email,
                type: 'subscription',
                state: 'pending',
                from
            }).catch(err => {
                console.log(err);
                return null;
            })
            // Validamos resultado 501. Mistake!
            if(!subscribe) return res.status(401).json({msg: 'Ha ocurrido un error al intentar agregar recurso.'})
        
            // Caso contrario... Avanzamos
            res.status(201).json({msg: '¡Exito!'});
        }catch(err){
            console.log(err);
            return null;
        }
    }
}