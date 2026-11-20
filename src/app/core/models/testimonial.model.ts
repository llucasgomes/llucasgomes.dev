export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship?: string; // ex: 'Gerenciou Lucas diretamente' ou 'Trabalhou com Lucas na mesma equipe'
  linkedinUrl: string;
  avatarUrl?: string;
  initials: string;
  summary: string; // Depoimento resumido de alto impacto
  fullQuote?: string;
}
