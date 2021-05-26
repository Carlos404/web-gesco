import { Pipe, PipeTransform } from '@angular/core';
import { Cargo } from '@app/enum/cargo';
import { StatusTratamento } from './../enum/status-tratamento';
import { Sexo } from './../enum/sexo';
import { Aplicacao } from '@app/enum/aplicacao';

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

@Pipe({ name: 'getNomeSexoPeloCodigo' })
export class GetNomeSexoPipe implements PipeTransform {
  transform(nomeSexo: any) {
    return Sexo.getSexo(nomeSexo);
  }
}

@Pipe({ name: 'getNomeAplicacaoPeloCodigo' })
export class GetNomeAplicacaoPipe implements PipeTransform {
  transform(nomeAplicacao: any) {
    return Aplicacao.getAplicacao(nomeAplicacao);
  }
}
