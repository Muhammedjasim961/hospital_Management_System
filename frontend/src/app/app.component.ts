import { Component, HostListener, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { initFlowbite } from 'flowbite';
import { HospitalsService } from './hospitals.service';
interface NavItem {
  name: string;
  link: string;
  route: string;
}

interface UserMenuItem {
  name: string;
  link: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeInScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '100ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  isUserMenuOpen = false;
  isMobileMenuOpen = false;
  isButtonAnimating = false;
  private animationTimeout: any;

  navItems: NavItem[] = [
    { name: 'Home', link: '/home', route: '/home' },
    { name: 'About', link: '/about', route: '/about' },
    { name: 'Services', link: '/services', route: '/services' },
    { name: 'Doctors', link: '/doctor', route: '/doctor' },
    { name: 'Register', link: '/register', route: '/register' },
  ];

  userMenuItems: UserMenuItem[] = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'My Profile', link: '/profile' },
    { name: 'Appointments', link: '/appointment' },
    { name: 'Medical Records', link: '/records' },
    { name: 'Settings', link: '/settings' },
    { name: 'Sign Out', link: '/logout' },
  ];
  getToken: boolean = false;
  constructor(private hospitalsService: HospitalsService) {}
  ngOnInit(): void {
    initFlowbite();
    this.startAutoPulse();

    //this checks logout/login status
    this.hospitalsService.isLoggedIn$.subscribe((status) => {
      this.getToken = status; // 🔥 updates instantly on login/logout
    });

    // Auto detect if token exists on page refresh
    if (localStorage.getItem('token')) {
      this.hospitalsService.setUserLoggedIn(true);
    }
  }

  startButtonAnimation(): void {
    this.isButtonAnimating = true;
    this.stopAutoPulse();
  }

  stopButtonAnimation(): void {
    this.isButtonAnimating = false;
    this.startAutoPulse();
  }

  private startAutoPulse(): void {
    this.animationTimeout = setTimeout(() => {
      this.isButtonAnimating = true;
      setTimeout(() => {
        this.isButtonAnimating = false;
        this.startAutoPulse();
      }, 2000);
    }, 8000); // Pulse every 8 seconds
  }

  private stopAutoPulse(): void {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }

  closeAllMenus(): void {
    this.isUserMenuOpen = false;
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest('#user-menu-button') &&
      !target.closest('.user-menu-container')
    ) {
      this.isUserMenuOpen = false;
    }
    if (
      !target.closest('.mobile-menu-button') &&
      !target.closest('.mobile-menu-container')
    ) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth >= 768) {
      this.isMobileMenuOpen = false;
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPulse();
  }
}
