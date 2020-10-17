import { ItemMenu } from './item-menu';

export class Cargo{

    static cargos ={
        DESENVOLEDOR:         {  id: 0, nome: "Desenvolvedor",   acessos: Object.values(ItemMenu.itemMenu)}, 
        MEDICO :              {  id: 1, nome: "Medico",          acessos: ItemMenu.itemMenu.TRATAMENTO },
        FARMACEUTICO :        {  id: 2, nome: "Farmacêutico",    acessos: ItemMenu.itemMenu.ANTIBIOTICO},
        INTERNACAO :          {  id: 3, nome: "Internação",      acessos: ItemMenu.itemMenu.PACIENTE},
        FARMACIA :            {  id: 4, nome: "Farmácia",        acessos: ItemMenu.itemMenu.ANTIBIOTICO},
        ADMINISTRADOR :       {  id: 5, nome: "Administrador",   acessos: ItemMenu.itemMenu.FUNCIONARIO},
    }
}