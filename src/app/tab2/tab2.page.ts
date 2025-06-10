import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class Tab2Page {
  initialValue: number | null = null;
  annualRate: number | null = null;
  years: number | null = null;
  result: string | null = null;

  constructor(private alertController: AlertController) {}

  async calculateCompoundInterest() {
    const P = Number(this.initialValue);
    const r = Number(this.annualRate) / 100;
    const t = Number(this.years);
    const n = 12;

    if (isNaN(P) || isNaN(r) || isNaN(t)) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos com valores válidos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (P <= 0 || t <= 0) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'O valor inicial e o período devem ser maiores que zero.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const M = P * Math.pow(1 + r / n, n * t);
    this.result = M.toFixed(2);

    if (r > 0.15) {
      const alert = await this.alertController.create({
        header: 'Atenção',
        message: 'Taxa de retorno superior a 15% ao ano. Este é um investimento de alto risco.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Sugestão',
        message: 'Considere investimentos mais seguros, como títulos de renda fixa ou fundos balanceados.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
