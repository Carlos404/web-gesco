import { ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { ItemMenu } from './item-menu';

export class StatusTratamento{

    static StatusTratamento = {
        PENDENTE:         {  id: 0, nome: 'Pendente'},
        RECUSADO :        {  id: 1, nome: 'Recusado'},
        APROVADO :        {  id: 2, nome: 'Aprovado'}
    };

    static getStatusTratamento(tipoStatus){
      return Object.values(StatusTratamento.StatusTratamento).find(status => status.id == tipoStatus).nome;
    }
}
