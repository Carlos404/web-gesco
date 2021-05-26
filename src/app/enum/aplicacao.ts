export class Aplicacao{

    static Aplicacoes =  {
        ENDOVENOSA : {id: 1, nome: 'EV'},
        INTRAMUSCULAR : {id: 2, nome: 'IM'},
        IMCP : {id: 3, nome: 'IM - CP'},
        COMPRIMIDO : {id: 4, nome: 'CP'},
    };

    static getAplicacao(nomeAplicacao){
        return Object.values(Aplicacao.Aplicacoes).find(idAplicacao => idAplicacao.id == nomeAplicacao).nome;
      }
}