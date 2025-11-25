import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HospitalsService } from '../hospitals.service';
interface ButtonState {
  [key: string]: string;
}
@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  @Input() theme: 'light' | 'dark' = 'light';
  @Output() logout = new EventEmitter<void>();
  displayBtn: boolean = true;
  currentState: string = 'default';
  private states: { [key: string]: ButtonState } = {
    default: {
      '--figure-duration': '100',
      '--transform-figure': 'none',
      '--walking-duration': '100',
      '--transform-arm1': 'none',
      '--transform-wrist1': 'none',
      '--transform-arm2': 'none',
      '--transform-wrist2': 'none',
      '--transform-leg1': 'none',
      '--transform-calf1': 'none',
      '--transform-leg2': 'none',
      '--transform-calf2': 'none',
    },
    hover: {
      '--figure-duration': '100',
      '--transform-figure': 'translateX(1.5px)',
      '--walking-duration': '100',
      '--transform-arm1': 'rotate(-5deg)',
      '--transform-wrist1': 'rotate(-15deg)',
      '--transform-arm2': 'rotate(5deg)',
      '--transform-wrist2': 'rotate(6deg)',
      '--transform-leg1': 'rotate(-10deg)',
      '--transform-calf1': 'rotate(5deg)',
      '--transform-leg2': 'rotate(20deg)',
      '--transform-calf2': 'rotate(-20deg)',
    },
    walking1: {
      '--figure-duration': '300',
      '--transform-figure': 'translateX(11px)',
      '--walking-duration': '300',
      '--transform-arm1': 'translateX(-4px) translateY(-2px) rotate(120deg)',
      '--transform-wrist1': 'rotate(-5deg)',
      '--transform-arm2': 'translateX(4px) rotate(-110deg)',
      '--transform-wrist2': 'rotate(-5deg)',
      '--transform-leg1': 'translateX(-3px) rotate(80deg)',
      '--transform-calf1': 'rotate(-30deg)',
      '--transform-leg2': 'translateX(4px) rotate(-60deg)',
      '--transform-calf2': 'rotate(20deg)',
    },
    walking2: {
      '--figure-duration': '400',
      '--transform-figure': 'translateX(17px)',
      '--walking-duration': '300',
      '--transform-arm1': 'rotate(60deg)',
      '--transform-wrist1': 'rotate(-15deg)',
      '--transform-arm2': 'rotate(-45deg)',
      '--transform-wrist2': 'rotate(6deg)',
      '--transform-leg1': 'rotate(-5deg)',
      '--transform-calf1': 'rotate(10deg)',
      '--transform-leg2': 'rotate(10deg)',
      '--transform-calf2': 'rotate(-20deg)',
    },
    falling1: {
      '--figure-duration': '1600',
      '--walking-duration': '400',
      '--transform-arm1': 'rotate(-60deg)',
      '--transform-wrist1': 'none',
      '--transform-arm2': 'rotate(30deg)',
      '--transform-wrist2': 'rotate(120deg)',
      '--transform-leg1': 'rotate(-30deg)',
      '--transform-calf1': 'rotate(-20deg)',
      '--transform-leg2': 'rotate(20deg)',
    },
    falling2: {
      '--walking-duration': '300',
      '--transform-arm1': 'rotate(-100deg)',
      '--transform-arm2': 'rotate(-60deg)',
      '--transform-wrist2': 'rotate(60deg)',
      '--transform-leg1': 'rotate(80deg)',
      '--transform-calf1': 'rotate(20deg)',
      '--transform-leg2': 'rotate(-60deg)',
    },
    falling3: {
      '--walking-duration': '500',
      '--transform-arm1': 'rotate(-30deg)',
      '--transform-wrist1': 'rotate(40deg)',
      '--transform-arm2': 'rotate(50deg)',
      '--transform-wrist2': 'none',
      '--transform-leg1': 'rotate(-30deg)',
      '--transform-leg2': 'rotate(20deg)',
      '--transform-calf2': 'none',
    },
  };
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private hospitalsService: HospitalsService
  ) {}
  get buttonClasses(): string {
    const baseClass = `logoutButton logoutButton--${this.theme}`;
    const stateClasses = {
      clicked:
        this.currentState === 'walking1' || this.currentState === 'walking2',
      'door-slammed':
        this.currentState === 'walking2' ||
        this.currentState.startsWith('falling'),
      falling: this.currentState.startsWith('falling'),
    };

    const activeClasses = Object.entries(stateClasses)
      .filter(([_, isActive]) => isActive)
      .map(([className]) => className)
      .join(' ');

    return `${baseClass} ${activeClasses}`.trim();
  }

  get currentStyles(): { [key: string]: string } {
    return this.states[this.currentState] || this.states['default'];
  }

  onMouseEnter(): void {
    if (this.currentState === 'default') {
      this.updateButtonState('hover');
    }
  }

  onMouseLeave(): void {
    if (this.currentState === 'hover') {
      this.updateButtonState('default');
    }
  }

  onClick(): void {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      localStorage.removeItem('token');
      this.hospitalsService.setUserLoggedIn(false);
      this.hospitalsService.isLoggedIn$.subscribe((isLogged) => {
        this.displayBtn = isLogged;
        this.router.navigate(['/register']);
      });
      this.displayBtn = false;
      this.showLogoutMessage();
      console.log('Token removed. Logging out.');
    } else {
      this.hospitalsService.setUserLoggedIn(false);
      this.router.navigate(['/register']);
      console.log('No token found. User is not logged in.');
    }
    if (this.currentState === 'default' || this.currentState === 'hover') {
      this.animateLogout();
    }
  }

  private animateLogout(): void {
    this.updateButtonState('walking1');

    setTimeout(() => {
      this.updateButtonState('walking2');

      setTimeout(() => {
        this.updateButtonState('falling1');

        setTimeout(() => {
          this.updateButtonState('falling2');

          setTimeout(() => {
            this.updateButtonState('falling3');

            setTimeout(() => {
              this.resetButton();
              this.logout.emit();
            }, 1000);
          }, parseInt(this.states['falling2']['--walking-duration']));
        }, parseInt(this.states['falling1']['--walking-duration']));
      }, parseInt(this.states['walking2']['--figure-duration']));
    }, parseInt(this.states['walking1']['--figure-duration']));
  }

  private updateButtonState(state: string): void {
    this.currentState = state;
  }

  private resetButton(): void {
    this.currentState = 'default';
  }
  showLogoutMessage() {
    this._snackBar.open('User Logged Out successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }
}
