export class Sexo{

    static Sexo = {
        MASCULINO :        {  id: 1, nome: 'Masculino'},
        FEMININO :        {  id: 2, nome: 'Feminino'}
    };

    static getSexo(nomeSexo){
      return Object.values(Sexo.Sexo).find(idSexo => idSexo.id == nomeSexo).nome;
    }
}
