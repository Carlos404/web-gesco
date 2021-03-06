import { ItemMenu } from './item-menu';

export class Cargo {

  static cargos = {
    DESENVOLVEDOR: { id: 6, nome: 'DESENVOLVEDOR', acessos: Object.values(ItemMenu.itemMenu) },
    MEDICO: { id: 1, nome: 'MEDICO', acessos: ItemMenu.itemMenu.TRATAMENTO },
    FARMACEUTICO: { id: 2, nome: 'FARMACEUTICO', acessos: [ItemMenu.itemMenu.ANTIBIOTICO, ItemMenu.itemMenu.TRATAMENTO] },
    INTERNACAO: { id: 3, nome: 'INTERNACAO', acessos: ItemMenu.itemMenu.PACIENTE },
    FARMACIA: { id: 4, nome: 'FARMACIA', acessos: [ItemMenu.itemMenu.ANTIBIOTICO, ItemMenu.itemMenu.TRATAMENTO] },
    ADMINISTRADOR: { id: 5, nome: 'ADMINISTRADOR', acessos: ItemMenu.itemMenu.FUNCIONARIO },
  }

  static getCargo(idCargo) {
    return Object.values(Cargo.cargos).find(cargo => cargo.id == idCargo).nome;
  }
}
