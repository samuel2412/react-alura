import PubSub from 'pubsub-js'

export default class TratadorErros{
   

    publicaErros(erros){
        for(var i=0;i<erros.length;i++){
            var erro = erros[i];
            PubSub.publish('erro-validacao',erro);
        }
    }

}