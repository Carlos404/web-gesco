import { ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { ItemMenu } from './item-menu';

export class Cargo{

    static cargos ={
        DESENVOLEDOR:         {  id: 0, nome: 'Desenvolvedor',   acessos: Object.values(ItemMenu.itemMenu)},
        MEDICO :              {  id: 1, nome: 'Medico',          acessos: ItemMenu.itemMenu.TRATAMENTO },
        FARMACEUTICO :        {  id: 2, nome: 'Farmacêutico',    acessos: [ItemMenu.itemMenu.ANTIBIOTICO, ItemMenu.itemMenu.TRATAMENTO]},
        INTERNACAO :          {  id: 3, nome: 'Internação',      acessos: ItemMenu.itemMenu.PACIENTE},
        FARMACIA :            {  id: 4, nome: 'Farmácia',        acessos: [ItemMenu.itemMenu.ANTIBIOTICO, ItemMenu.itemMenu.TRATAMENTO]},
        ADMINISTRADOR :       {  id: 5, nome: 'Administrador',   acessos: ItemMenu.itemMenu.FUNCIONARIO},
    }

    static getCargo(idCargo){
      return Object.values(Cargo.cargos).find(cargo => cargo.id == idCargo).nome;
    }
}
