import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
  // Removido imports e mantido standalone: false
})
export class Tab1Page {
  valorEmp: number = 0;
  taxaMensal: number = 0;
  numeroMes: number = 0;
  valorParcela: number = 0;

  constructor(private alertController: AlertController) {}

  async calcular() {
    // Validações iniciais
    if (this.valorEmp <= 0 || this.taxaMensal <= 0 || this.numeroMes <= 0) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, insira valores válidos e positivos para o valor emprestado, taxa mensal e número de meses.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Verifica se a taxa mensal é maior que 20%
    if (this.taxaMensal > 20) {
      const alert = await this.alertController.create({
        header: 'Cuidado',
        message: 'Sua taxa está maior que 20%, pode ser arriscado!',
        buttons: ['OK'],
      });
      await alert.present();
      return; // Interrompe a execução se a taxa for inválida
    }

    // Exibe alerta para taxa menor ou igual a 20%
    if (this.taxaMensal <= 20) {
      const alert = await this.alertController.create({
        header: 'Cuidado',
        message: 'Sua taxa está menor que 20%, talvez você poderia avaliar com mais cuidado.',
        buttons: ['OK'],
      });
      await alert.present();
    }

    // Converte a taxa mensal de porcentagem para decimal (ex.: 5% -> 0.05)
    const taxaDecimal = this.taxaMensal / 100;

    // Fórmula de amortização: P = [V * i] / [1 - (1 + i)^(-n)]
    try {
      this.valorParcela = (this.valorEmp * taxaDecimal) / (1 - Math.pow(1 + taxaDecimal, -this.numeroMes));
      if (!isFinite(this.valorParcela)) {
        throw new Error('Cálculo inválido');
      }
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Não foi possível calcular a parcela. Verifique os valores inseridos.',
        buttons: ['OK'],
      });
      await alert.present();
      this.valorParcela = 0;
    }
  }
}
