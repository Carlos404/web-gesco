export class Aplicacao{

    static Aplicacoes =  {
        ENDOVENOSA : {id: 0, nome: 'EV'},
        INTRAMUSCULAR : {id: 1, nome: 'IM'},
        IMCP : {id: 2, nome: 'IM - CP'},
        COMPRIMIDO : {id: 3, nome: 'CP'},
    };

    static getAplicacao(nomeAplicacao){
        return Object.values(Aplicacao.Aplicacoes).find(idAplicacao => idAplicacao.id == nomeAplicacao).nome;
      }
}