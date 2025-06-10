import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page {
  netIncome: number = 0;
  expenses: number[] = [0, 0, 0, 0];
  totalExpenses: number = 0;

  constructor(private alertController: AlertController) {}

  calculateTotal() {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + (expense || 0), 0);
  }

  async checkExpenses() {
    if (this.totalExpenses > this.netIncome) {
      const suggestions = this.getSpendingSuggestions();
      const alert = await this.alertController.create({
        header: 'Atenção!',
        subHeader: 'Despesas excedem a renda',
        message: `Suas despesas (R$ ${this.totalExpenses.toFixed(2)}) são maiores que sua renda (R$ ${this.netIncome.toFixed(2)}). Sugestões para reduzir gastos:${suggestions}`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Tudo certo!',
        message: 'Suas despesas estão dentro do orçamento.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  private getSpendingSuggestions(): string {
    const categories = [
      { name: 'Lazer', value: this.expenses[3], suggestion: 'Reduza gastos com lazer, como saídas ou assinaturas.' },
      { name: 'Transporte', value: this.expenses[2], suggestion: 'Considere transporte público ou otimizar rotas.' },
      { name: 'Alimentação', value: this.expenses[1], suggestion: 'Cozinhe mais em casa ou planeje refeições.' },
      { name: 'Moradia', value: this.expenses[0], suggestion: 'Considere renegociar aluguel ou reduzir contas de serviços.' }
    ];

    const validCategories = categories.filter(cat => cat.value > 0);
    if (validCategories.length === 0) {
      return 'Nenhuma despesa registrada para sugerir cortes.';
    }

    return validCategories[0].suggestion;
  }
}
