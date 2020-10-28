import { Pipe, PipeTransform } from '@angular/core';
import { Cargo } from '@app/enum/cargo';

@Pipe({ name: 'getNomeCargoPeloId' })
export class GetCargoPipe implements PipeTransform {
  transform(tipoFuncionario: any) {
    return Cargo.getCargo(tipoFuncionario);
  }
}
