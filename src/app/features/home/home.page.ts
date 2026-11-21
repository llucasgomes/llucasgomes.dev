import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Project } from '@/core/models/project.model';
import { NavbarComponent } from '@/shared/components/navbar/navbar.component';
import { ProjectModalComponent } from '@/shared/components/project-modal/project-modal.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { ProjectsBentoComponent } from './sections/projects-bento/projects-bento.component';
import { GithubReposComponent } from './sections/github-repos/github-repos.component';
import { StackMatrixComponent } from './sections/stack-matrix/stack-matrix.component';
import { ExperienceTimelineComponent } from './sections/experience-timeline/experience-timeline.component';
import { TestimonialsSectionComponent } from './sections/testimonials-section/testimonials-section.component';
import { ContactFooterComponent } from './sections/contact-footer/contact-footer.component';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    ProjectsBentoComponent,
    GithubReposComponent,
    StackMatrixComponent,
    ExperienceTimelineComponent,
    TestimonialsSectionComponent,
    ContactFooterComponent,
    ProjectModalComponent,
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-emerald-500/20 selection:text-emerald-400">
      <!-- Navbar Fixa com Glassmorphism e Theme Toggle -->
      <app-navbar></app-navbar>

      <!-- Conteúdo Principal com padding compensando o header fixo -->
      <main class="flex-1 pt-16">
        <app-hero-section></app-hero-section>
        <app-projects-bento (selectProject)="openProjectModal($event)"></app-projects-bento>
        <app-github-repos></app-github-repos>
        <app-stack-matrix></app-stack-matrix>
        <app-experience-timeline></app-experience-timeline>
        <app-testimonials-section></app-testimonials-section>
      </main>

      <!-- Rodapé & Contato -->
      <app-contact-footer></app-contact-footer>

      <!-- Modal de Case Study Técnico -->
      <app-project-modal
        [project]="selectedProject()"
        (closed)="closeProjectModal()"
      ></app-project-modal>
    </div>
  `,
})
export class HomePage {
  protected readonly selectedProject = signal<Project | null>(null);

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
  }
}
