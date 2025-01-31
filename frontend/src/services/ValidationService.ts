export class ValidationService {
    static isValidString(value: string, fieldName: string): string | null {
      if (!value.trim()) return `${fieldName} é obrigatório.`;
      return null;
    }
  
    static isValidInteger(value: any, fieldName: string): string | null {
      if (isNaN(value) || parseInt(value) <= 0) return `${fieldName} deve ser um número inteiro positivo.`;
      return null;
    }
  
    static isValidDecimal(value: any, fieldName: string): string | null {
      if (!value || isNaN(parseFloat(value))) return `${fieldName} deve ser um número decimal válido.`;
      return null;
    }
  
    static validateProductForm(data: any): string | null {
      return (
        this.isValidString(data.name, 'Nome') ||
        this.isValidString(data.description, 'Descrição') ||
        this.isValidInteger(data.quantity, 'Quantidade') ||
        this.isValidDecimal(data.price, 'Preço')
      );
    }
  }
  