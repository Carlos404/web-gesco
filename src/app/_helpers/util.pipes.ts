import { Pipe, PipeTransform } from '@angular/core';
import { Cargo } from '@app/enum/cargo';
import { StatusTratamento } from './../enum/status-tratamento';

@Pipe({ name: 'getNomeCargoPeloId' })
export class GetCargoPipe implements PipeTransform {
  transform(tipoFuncionario: any) {
    return Cargo.getCargo(tipoFuncionario);
  }
}

@Pipe({ name: 'getStatusTratamentoPeloCodigo' })
export class GetStatusTratamentoPipe implements PipeTransform {
  transform(statusTratamento: any) {
    return StatusTratamento.getStatusTratamento(statusTratamento);
  }
}
