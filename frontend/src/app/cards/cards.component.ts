import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: false,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  cards = [
    {
      title: 'BILLS AND INSURANCES',
      image: '/images/bills.jpg',
      description:
        'Our dedicated billing and insurance team helps you understand coverage, process claims quickly, and manage payments efficiently.',
    },
    {
      title: 'CANCER TREATMENT',
      image: '/images/canser.jpg',
      description:
        'We offer advanced and personalized cancer care using the latest therapies and technologies for every patient’s unique journey.',
    },
    {
      title: 'NEUROLOGY',
      image: '/images/nuerology.jpg',
      description:
        'Our expert neurologists offer advanced diagnosis and treatment for brain, spine, and nerve disorders with personalized care.',
    },
    {
      title: 'ENT',
      image: '/images/ent.jpg',
      description:
        'We provide expert care for all ear, nose, and throat conditions using advanced diagnostics and effective treatments.',
    },
  ];
  doctors = [
    {
      name: 'Dr. John Smith',
      specialty: 'Cardiologist',
      image: '/images/doc-1.jpg',
    },
    {
      name: 'Dr. Jane Doe',
      specialty: 'Pediatrician',
      image: '/images/doc-2.jpg',
    },
    {
      name: 'Dr. Emily Johnson',
      specialty: 'Dermatologist',
      image: '/images/doc-3.jpg',
    },
    {
      name: 'Dr. Michael Brown',
      specialty: 'cardiologist',
      image: '/images/doc-4.jpg',
    },
  ];
  currentIndex = 0;

  nextCard() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }

  prevCard() {
    this.currentIndex =
      (this.currentIndex - 1 + this.cards.length) % this.cards.length;
  }
}
